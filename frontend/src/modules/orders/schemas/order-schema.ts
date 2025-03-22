import { z } from 'zod';

export const orderSchema = z.object({
  id: z.string().uuid().optional(),
  status: z.enum(['PENDING', 'COMPLETED', 'CANCELED'], {
    required_error: 'Status é obrigatório',
  }),
  products: z.record(
    z.string().uuid({ message: 'ID de produto inválido' }),
    z.number().min(1, 'Quantidade mínima é 1')
  ),
});

export type OrderFormValues = z.infer<typeof orderSchema>;
