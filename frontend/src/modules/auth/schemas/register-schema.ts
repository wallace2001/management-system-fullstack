import { z } from 'zod';

export const registerSchema = z
  .object({
    username: z.string().min(1, 'O nome de usuário é obrigatório'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z
      .string()
      .min(6, 'A confirmação de senha deve ter pelo menos 6 caracteres'),
    role: z.enum(['ADMIN', 'USER'], {
      message: 'Por favor, selecione uma role válida',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
