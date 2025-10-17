import "dotenv/config";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pkg from "pg";
const { Pool } = pkg;

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
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

const pool = new Pool({
  connectionString:
    sanitize(process.env.DATABASE_URL) || sanitize(process.env.BD_UM),
  ssl: { rejectUnauthorized: false }
});

// CORS: ambiente de desenvolvimento — refletir qualquer origin (localhost, 127.0.0.1, etc.)
app.use(cors({ origin: true, credentials: false }));
app.use(express.json());

// Log de todas as requests
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});

async function ensureSchema() {
  console.log("🔄 Iniciando ensureSchema...");
  console.log("📊 Criando tabela users...");
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGSERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      username TEXT,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now()
    );
  `);
  console.log("📊 Criando tabela educacao_materials...");
  await pool.query(`
    CREATE TABLE IF NOT EXISTS educacao_materials (
      id BIGSERIAL PRIMARY KEY,
      titulo TEXT NOT NULL,
      conteudo TEXT,
      categoria TEXT,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    );
  `);
  console.log("📊 Criando tabela chat_messages...");
  await pool.query(`
    CREATE TABLE IF NOT EXISTS chat_messages (
      id BIGSERIAL PRIMARY KEY,
      user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
      message TEXT NOT NULL,
      sender TEXT NOT NULL DEFAULT 'user',
      created_at TIMESTAMPTZ DEFAULT now()
    );
  `);
  console.log(
    "📊 Criando tabela consultas (legado - manter para compatibilidade)..."
  );
  await pool.query(`
    CREATE TABLE IF NOT EXISTS consultas (
      id BIGSERIAL PRIMARY KEY,
      user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
      titulo TEXT NOT NULL,
      descricao TEXT,
      data_horario TIMESTAMPTZ,
      status TEXT DEFAULT 'pendente',
      created_at TIMESTAMPTZ DEFAULT now()
    );
  `);
  console.log("📊 Criando índices...");
  await pool.query(
    "CREATE INDEX IF NOT EXISTS idx_chat_user_id ON chat_messages(user_id);"
  );
  await pool.query(
    "CREATE INDEX IF NOT EXISTS idx_consultas_user_id ON consultas(user_id);"
  );
  await pool.query(
    "CREATE INDEX IF NOT EXISTS idx_educacao_created_at ON educacao_materials(created_at);"
  );
  console.log("🏓 Ping inicial ao banco...");
  await pool.query("SELECT 1");
  console.log("✅ Schema configurado com sucesso!");
}

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
    const r = await pool.query("SELECT 1 as ok");
    res.json({ ok: true, result: r.rows[0] });
  } catch (err) {
    console.error("db/health error:", err);
    res.status(500).json({ ok: false, error: "db_unreachable" });
  }
});

app.get("/db/info", async (req, res) => {
  try {
    const r = await pool.query(
      "select current_user, current_database(), version()"
    );
    res.json({ ok: true, info: r.rows[0] });
  } catch (err) {
    console.error("db/info error:", err);
    res.status(500).json({ ok: false });
  }
});

app.post("/auth/register", async (req, res) => {
  try {
    const { email, password, username } = req.body || {};
    if (!email || !password)
      return res.status(400).json({ error: "email_and_password_required" });
    const hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3) RETURNING id, email, username",
      [email, username || null, hash]
    );
    const user = result.rows[0];
    const token = signToken(user);
    res.json({ user, token });
  } catch (err) {
    if (err?.code === "23505") {
      return res.status(409).json({ error: "email_already_exists" });
    }
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password)
      return res.status(400).json({ error: "email_and_password_required" });
    const result = await pool.query(
      "SELECT id, email, username, password_hash FROM users WHERE email = $1 LIMIT 1",
      [email]
    );
    if (result.rowCount === 0)
      return res.status(401).json({ error: "invalid_credentials" });
    const row = result.rows[0];
    const ok = await bcrypt.compare(password, row.password_hash);
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
    const r = await pool.query(
      "UPDATE users SET password_hash=$2 WHERE email=$1 RETURNING id",
      [email, hash]
    );
    if (r.rowCount === 0) return res.status(404).json({ error: "not_found" });
    res.json({ ok: true });
  } catch (err) {
    console.error("dev-reset-password error:", err);
    res.status(500).json({ error: "server_error" });
  }
});

// ------------------ EDUCACAO (publico leitura) ------------------
app.get("/educacao", async (req, res) => {
  try {
    const r = await pool.query(
      "SELECT id, titulo, categoria, created_at, updated_at FROM educacao_materials ORDER BY created_at DESC LIMIT 200"
    );
    res.json(r.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

app.get("/educacao/:id", async (req, res) => {
  try {
    const r = await pool.query(
      "SELECT id, titulo, conteudo, categoria, created_at, updated_at FROM educacao_materials WHERE id=$1",
      [req.params.id]
    );
    if (r.rowCount === 0) return res.status(404).json({ error: "not_found" });
    res.json(r.rows[0]);
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
    const r = await pool.query(
      "SELECT id, message, sender, created_at FROM chat_messages WHERE user_id=$1 ORDER BY created_at ASC",
      [req.user.id]
    );
    res.json(r.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

// Contar quantas perguntas o usuário já fez
app.get("/chat/count", authMiddleware, async (req, res) => {
  try {
    const r = await pool.query(
      "SELECT COUNT(*) as count FROM chat_messages WHERE user_id=$1 AND sender='user'",
      [req.user.id]
    );
    res.json({ count: parseInt(r.rows[0].count, 10) });
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
    const countResult = await pool.query(
      "SELECT COUNT(*) as count FROM chat_messages WHERE user_id=$1 AND sender='user'",
      [req.user.id]
    );
    const count = parseInt(countResult.rows[0].count, 10);

    if (count >= 10) {
      return res.status(403).json({
        error: "limit_reached",
        message: "Você atingiu o limite de 10 perguntas"
      });
    }

    // Salvar mensagem do usuário
    const userMsg = await pool.query(
      "INSERT INTO chat_messages (user_id, message, sender) VALUES ($1, $2, 'user') RETURNING id, message, sender, created_at",
      [req.user.id, message.trim()]
    );

    // Resposta automática do especialista (simulada - pode ser integrada com IA depois)
    const autoResponse =
      "Obrigado pela sua pergunta! Um especialista irá responder em breve. Esta é uma resposta automática para desenvolvimento.";

    const specialistMsg = await pool.query(
      "INSERT INTO chat_messages (user_id, message, sender) VALUES ($1, $2, 'specialist') RETURNING id, message, sender, created_at",
      [req.user.id, autoResponse]
    );

    res.status(201).json({
      userMessage: userMsg.rows[0],
      specialistMessage: specialistMsg.rows[0],
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
    await pool.query("DELETE FROM chat_messages WHERE user_id=$1", [
      req.user.id
    ]);
    res.json({ ok: true, message: "Histórico limpo com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

// ------------------ CONSULTAS (privado) ------------------
app.get("/consultas", authMiddleware, async (req, res) => {
  try {
    const r = await pool.query(
      "SELECT id, titulo, descricao, data_horario, status, created_at FROM consultas WHERE user_id=$1 ORDER BY created_at DESC",
      [req.user.id]
    );
    res.json(r.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

app.post("/consultas", authMiddleware, async (req, res) => {
  try {
    const { titulo, descricao, data_horario } = req.body || {};
    if (!titulo) return res.status(400).json({ error: "titulo_required" });
    const r = await pool.query(
      "INSERT INTO consultas (user_id, titulo, descricao, data_horario) VALUES ($1,$2,$3,$4) RETURNING id, titulo, descricao, data_horario, status, created_at",
      [req.user.id, titulo, descricao || null, data_horario || null]
    );
    res.status(201).json(r.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

app.get("/consultas/:id", authMiddleware, async (req, res) => {
  try {
    const r = await pool.query(
      "SELECT id, user_id, titulo, descricao, data_horario, status, created_at FROM consultas WHERE id=$1 AND user_id=$2",
      [req.params.id, req.user.id]
    );
    if (r.rowCount === 0) return res.status(404).json({ error: "not_found" });
    res.json(r.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

app.put("/consultas/:id", authMiddleware, async (req, res) => {
  try {
    const { titulo, descricao, data_horario, status } = req.body || {};
    const r = await pool.query(
      "UPDATE consultas SET titulo=COALESCE($1,titulo), descricao=COALESCE($2,descricao), data_horario=COALESCE($3,data_horario), status=COALESCE($4,status) WHERE id=$5 AND user_id=$6 RETURNING id, titulo, descricao, data_horario, status, created_at",
      [
        titulo || null,
        descricao || null,
        data_horario || null,
        status || null,
        req.params.id,
        req.user.id
      ]
    );
    if (r.rowCount === 0) return res.status(404).json({ error: "not_found" });
    res.json(r.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

app.delete("/consultas/:id", authMiddleware, async (req, res) => {
  try {
    const r = await pool.query(
      "DELETE FROM consultas WHERE id=$1 AND user_id=$2 RETURNING id",
      [req.params.id, req.user.id]
    );
    if (r.rowCount === 0) return res.status(404).json({ error: "not_found" });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

ensureSchema()
  .then(() => {
    // Bind em todas as interfaces para aceitar localhost e 127.0.0.1
    const HOST = process.env.HOST || "0.0.0.0";
    app.listen(PORT, HOST, () => {
      console.log(`✅ API listening on http://localhost:${PORT}`);
      console.log(`📡 Servidor pronto para receber conexões`);
    });
  })
  .catch((err) => {
    console.error("Falha ao iniciar API:", err);
    process.exit(1);
  });
