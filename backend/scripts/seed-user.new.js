// Script para criar usuário de teste no banco usando Prisma ORM
// Uso: node scripts/seed-user.js [email opcional] [senha opcional] [username opcional]
import 'dotenv/config';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

const prisma = new PrismaClient();

async function main() {
  try {
    const emailArg = process.argv[2];
    const passwordArg = process.argv[3];
    const usernameArg = process.argv[4];
    
    const ts = Date.now();
    const email = emailArg || `seed_${ts}@example.com`;
    const username = usernameArg || `SeedUser_${ts}`;
    const password = passwordArg || 'Senha123!';
    
    console.log('🔄 Criando/atualizando usuário...');
    console.log(`📧 Email: ${email}`);
    console.log(`👤 Username: ${username}`);
    
    const hash = await bcrypt.hash(password, 10);
    
    // Upsert: cria ou atualiza se já existir
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        passwordHash: hash,
        username
      },
      create: {
        email,
        username,
        passwordHash: hash
      },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true
      }
    });
    
    console.log('\n✅ Usuário criado/atualizado com sucesso:');
    console.log('─────────────────────────────────────');
    console.log('ID:', user.id.toString());
    console.log('Email:', user.email);
    console.log('Username:', user.username);
    console.log('Criado em:', user.createdAt.toISOString());
    console.log('\n🔑 Credenciais para login:');
    console.log('─────────────────────────────────────');
    console.log('Email:', email);
    console.log('Senha:', password);
    console.log('─────────────────────────────────────\n');
    
  } catch (err) {
    console.error('❌ Erro ao criar/atualizar usuário:', err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
