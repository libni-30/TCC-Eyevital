import "dotenv/config";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";

// Also load root .env for BD_UM defined at project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

function sanitize(v) {
  if (!v) return v;
  return v.replace(/^"|"$/g, "").trim();
}

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
});

// Fix BigInt serialization for JSON responses
BigInt.prototype.toJSON = function() {
  return this.toString();
};

// CORS: ambiente de desenvolvimento — refletir qualquer origin (localhost, 127.0.0.1, etc.)
app.use(cors({ origin: true, credentials: false }));
app.use(express.json());

// Log de todas as requests
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});

// Prisma já gerencia o schema automaticamente - não precisa ensureSchema()

function signToken(user) {
  return jwt.sign(
    { id: String(user.id), email: user.email, username: user.username || null },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: "unauthorized" });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "invalid_token" });
  }
}

app.get("/health", (req, res) => res.json({ ok: true }));

app.get("/db/health", async (req, res) => {
  try {
    // Prisma health check
    await prisma.$queryRaw`SELECT 1 as ok`;
    res.json({ ok: true });
  } catch (err) {
    console.error("db/health error:", err);
    res.status(500).json({ ok: false, error: "db_unreachable" });
  }
});

app.get("/db/info", async (req, res) => {
  try {
    const r = await prisma.$queryRaw`select current_user, current_database(), version()`;
    res.json({ ok: true, info: r[0] });
  } catch (err) {
    console.error("db/info error:", err);
    res.status(500).json({ ok: false });
  }
});

app.post("/auth/register", async (req, res) => {
  try {
  let { email, password, username } = req.body || {};
  email = typeof email === 'string' ? email.trim().toLowerCase() : email;
    if (!email || !password)
      return res.status(400).json({ error: "email_and_password_required" });
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        username: username || null,
        passwordHash: hash
      },
      select: {
        id: true,
        email: true,
        username: true
      }
    });
    const token = signToken(user);
    res.json({ user, token });
  } catch (err) {
    if (err?.code === "P2002") {  // Prisma unique constraint error
      return res.status(409).json({ error: "email_already_exists" });
    }
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
  let { email, password } = req.body || {};
  email = typeof email === 'string' ? email.trim().toLowerCase() : email;
    if (!email || !password)
      return res.status(400).json({ error: "email_and_password_required" });
    const row = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        passwordHash: true
      }
    });
    if (!row)
      return res.status(401).json({ error: "invalid_credentials" });
    const ok = await bcrypt.compare(password, row.passwordHash);
    if (!ok) return res.status(401).json({ error: "invalid_credentials" });
    const user = { id: row.id, email: row.email, username: row.username };
    const token = signToken(user);
    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

app.get("/auth/me", authMiddleware, async (req, res) => {
  // opcional: buscar do banco novamente; aqui retornamos payload
  res.json({
    id: req.user.id,
    email: req.user.email,
    username: req.user.username
  });
});

app.post("/auth/logout", (req, res) => {
  // Para JWT, logout é no cliente; mantemos endpoint para compatibilidade
  res.json({ ok: true });
});

// DEV ONLY: reset de senha para ambiente local (NÃO habilitar em produção)
app.post("/auth/dev-reset-password", async (req, res) => {
  try {
    if (process.env.NODE_ENV === "production") {
      return res.status(403).json({ error: "forbidden_in_production" });
    }
    const devKey = req.headers["x-dev-key"];
    const expected = process.env.DEV_RESET_KEY || "devkey";
    if (devKey !== expected) {
      return res.status(403).json({ error: "invalid_dev_key" });
    }
  const { email, newPassword } = req.body || {};
    if (!email || !newPassword)
      return res.status(400).json({ error: "email_and_password_required" });
    const hash = await bcrypt.hash(newPassword, 10);
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { passwordHash: hash },
      select: { id: true }
    });
    if (!updatedUser) return res.status(404).json({ error: "not_found" });

    // Enviar e-mail com a nova senha
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    try {
      if (host && user && pass) {
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure: port === 465,
          auth: { user, pass },
        });
        await transporter.sendMail({
          from: process.env.SMTP_FROM || `Eyevital <no-reply@eyevital.local>`,
          to: email,
          subject: "Recuperação de senha - Eyevital",
          text: `Sua nova senha é: ${newPassword}\n\nVocê pode alterá-la após fazer login.`,
          html: `<p>Sua nova senha é: <b>${newPassword}</b></p><p>Você pode alterá-la após fazer login.</p>`,
        });
        console.log(`📧 E-mail de reset enviado para ${email}`);
      } else {
        console.log("[DEV] SMTP não configurado. Conteúdo do e-mail:");
        console.log(`Para: ${email}`);
        console.log(`Assunto: Recuperação de senha - Eyevital`);
        console.log(`Nova senha: ${newPassword}`);
      }
    } catch (mailErr) {
      console.error("Erro ao enviar e-mail de reset:", mailErr);
      // Não falhar o endpoint por e-mail; ainda retornamos ok=true se senha foi trocada
    }

  const includePwdInResponse = process.env.NODE_ENV !== "production";
  res.json(includePwdInResponse ? { ok: true, newPassword } : { ok: true });
  } catch (err) {
    console.error("dev-reset-password error:", err);
    res.status(500).json({ error: "server_error" });
  }
});

// ------------------ EDUCACAO (publico leitura) ------------------
app.get("/educacao", async (req, res) => {
  try {
    const materials = await prisma.educacaoMaterial.findMany({
      select: {
        id: true,
        titulo: true,
        categoria: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { createdAt: "desc" },
      take: 200
    });
    res.json(materials);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

app.get("/educacao/:id", async (req, res) => {
  try {
    const material = await prisma.educacaoMaterial.findUnique({
      where: { id: BigInt(req.params.id) },
      select: {
        id: true,
        titulo: true,
        conteudo: true,
        categoria: true,
        createdAt: true,
        updatedAt: true
      }
    });
    if (!material) return res.status(404).json({ error: "not_found" });
    res.json(material);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

// (Opcional: endpoints POST/PUT/DELETE para materiais se houver role admin)

// ------------------ CHAT (privado) ------------------
// Obter histórico de mensagens do usuário
app.get("/chat/messages", authMiddleware, async (req, res) => {
  try {
    const messages = await prisma.chatMessage.findMany({
      where: { userId: BigInt(req.user.id) },
      select: {
        id: true,
        message: true,
        sender: true,
        createdAt: true
      },
      orderBy: { createdAt: "asc" }
    });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

// Contar quantas perguntas o usuário já fez
app.get("/chat/count", authMiddleware, async (req, res) => {
  try {
    const count = await prisma.chatMessage.count({
      where: {
        userId: BigInt(req.user.id),
        sender: "user"
      }
    });
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

// Enviar mensagem (limitado a 10 perguntas)
app.post("/chat/send", authMiddleware, async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message || !message.trim()) {
      return res.status(400).json({ error: "message_required" });
    }

    // Verificar quantas perguntas o usuário já fez
    const count = await prisma.chatMessage.count({
      where: {
        userId: BigInt(req.user.id),
        sender: "user"
      }
    });

    if (count >= 10) {
      return res.status(403).json({
        error: "limit_reached",
        message: "Você atingiu o limite de 10 perguntas"
      });
    }

    // Salvar mensagem do usuário
    const userMsg = await prisma.chatMessage.create({
      data: {
        userId: BigInt(req.user.id),
        message: message.trim(),
        sender: "user"
      },
      select: {
        id: true,
        message: true,
        sender: true,
        createdAt: true
      }
    });

    // Resposta automática do especialista (simulada - pode ser integrada com IA depois)
    const autoResponse =
      "Obrigado pela sua pergunta! Um especialista irá responder em breve. Esta é uma resposta automática para desenvolvimento.";

    const specialistMsg = await prisma.chatMessage.create({
      data: {
        userId: BigInt(req.user.id),
        message: autoResponse,
        sender: "specialist"
      },
      select: {
        id: true,
        message: true,
        sender: true,
        createdAt: true
      }
    });

    res.status(201).json({
      userMessage: userMsg,
      specialistMessage: specialistMsg,
      questionsRemaining: 10 - (count + 1)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

// Limpar histórico (opcional - para testes)
app.delete("/chat/clear", authMiddleware, async (req, res) => {
  try {
    await prisma.chatMessage.deleteMany({
      where: { userId: BigInt(req.user.id) }
    });
    res.json({ ok: true, message: "Histórico limpo com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

// ------------------ CONSULTAS (privado) ------------------
app.get("/consultas", authMiddleware, async (req, res) => {
  try {
    const consultas = await prisma.consulta.findMany({
      where: { userId: BigInt(req.user.id) },
      select: {
        id: true,
        titulo: true,
        descricao: true,
        dataHorario: true,
        status: true,
        createdAt: true
      },
      orderBy: { createdAt: "desc" }
    });
    res.json(consultas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

app.post("/consultas", authMiddleware, async (req, res) => {
  try {
    const { titulo, descricao, data_horario } = req.body || {};
    if (!titulo) return res.status(400).json({ error: "titulo_required" });
    const consulta = await prisma.consulta.create({
      data: {
        userId: BigInt(req.user.id),
        titulo,
        descricao: descricao || null,
        dataHorario: data_horario ? new Date(data_horario) : null
      },
      select: {
        id: true,
        titulo: true,
        descricao: true,
        dataHorario: true,
        status: true,
        createdAt: true
      }
    });
    res.status(201).json(consulta);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

app.get("/consultas/:id", authMiddleware, async (req, res) => {
  try {
    const consulta = await prisma.consulta.findFirst({
      where: {
        id: BigInt(req.params.id),
        userId: BigInt(req.user.id)
      },
      select: {
        id: true,
        userId: true,
        titulo: true,
        descricao: true,
        dataHorario: true,
        status: true,
        createdAt: true
      }
    });
    if (!consulta) return res.status(404).json({ error: "not_found" });
    res.json(consulta);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

app.put("/consultas/:id", authMiddleware, async (req, res) => {
  try {
    const { titulo, descricao, data_horario, status } = req.body || {};
    const dataToUpdate = {};
    if (titulo) dataToUpdate.titulo = titulo;
    if (descricao !== undefined) dataToUpdate.descricao = descricao;
    if (data_horario !== undefined) dataToUpdate.data_horario = data_horario ? new Date(data_horario) : null;
    if (status) dataToUpdate.status = status;

    const consulta = await prisma.consulta.updateMany({
      where: {
        id: BigInt(req.params.id),
        userId: BigInt(req.user.id)
      },
      data: dataToUpdate
    });
    
    if (consulta.count === 0) return res.status(404).json({ error: "not_found" });
    
    // Buscar o registro atualizado
    const updated = await prisma.consulta.findUnique({
      where: { id: BigInt(req.params.id) },
      select: {
        id: true,
        titulo: true,
        descricao: true,
        dataHorario: true,
        status: true,
        createdAt: true
      }
    });
    
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

app.delete("/consultas/:id", authMiddleware, async (req, res) => {
  try {
    const result = await prisma.consulta.deleteMany({
      where: {
        id: BigInt(req.params.id),
        userId: BigInt(req.user.id)
      }
    });
    if (result.count === 0) return res.status(404).json({ error: "not_found" });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

// Bind em todas as interfaces para aceitar localhost e 127.0.0.1
const HOST = process.env.HOST || "0.0.0.0";
app.listen(PORT, HOST, () => {
  console.log(`✅ API listening on http://localhost:${PORT}`);
  console.log(`📡 Servidor pronto para receber conexões`);
  console.log(`🗄️  Usando Prisma ORM para gerenciar banco de dados`);
});
