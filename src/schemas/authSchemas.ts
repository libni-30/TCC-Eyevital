import { z } from 'zod';

// Schema de validação para login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email deve ter um formato válido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
  rememberMe: z.boolean().default(false),
});

// Schema de validação para registro
export const registerSchema = z.object({
  username: z
    .string()
    .min(1, 'Nome de usuário é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(20, 'Nome deve ter no máximo 20 caracteres')
    .regex(/^[a-zA-Z0-9_]+$/, 'Nome deve conter apenas letras, números e underscore'),
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email deve ter um formato válido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Senha deve conter ao menos uma letra minúscula, uma maiúscula e um número'),
  confirmPassword: z
    .string()
    .min(1, 'Confirmação de senha é obrigatória'),
}).refine((data: { password: string; confirmPassword: string }) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
