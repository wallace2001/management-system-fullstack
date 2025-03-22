import {
  EMAIL_REQUIRED,
  CPF_REQUIRED,
  EMAIL_INVALID,
  CPF_INVALID,
} from '@/modules/shared/validations/messages';
import { z } from 'zod';

export const resetPassowrdSchema = z.object({
  email: z.string({ required_error: EMAIL_REQUIRED }).email(EMAIL_INVALID),
  cpf: z.string({ required_error: CPF_REQUIRED }).min(14, CPF_INVALID),
});

export type ResetPasswordFormValues = z.infer<typeof resetPassowrdSchema>;
