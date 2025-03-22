'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormField,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useUpdateProduct } from '../../hooks/use-product';
import { useProductModals } from '../../store/use-products-modal-store';
import { z } from 'zod';
import { CurrencyInput } from '@/components/currency-input';

const editProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Nome é obrigatório'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  price: z.coerce.number().min(0, 'Preço deve ser maior ou igual a 0'),
  stockQuantity: z.coerce.number().min(0, 'Estoque deve ser maior ou igual a 0'),
});

type EditProductValues = z.infer<typeof editProductSchema>;

export function EditProductModal() {
  const { editOpen, selected, close } = useProductModals();
  const { mutate, isPending } = useUpdateProduct();

  const form = useForm<EditProductValues>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      id: selected?.id ?? '',
      name: selected?.name ?? '',
      category: selected?.category ?? '',
      description: selected?.description ?? '',
      price: selected?.price ?? 0,
      stockQuantity: selected?.stockQuantity ?? 0,
    },
    values: {
      id: selected?.id ?? '',
      name: selected?.name ?? '',
      category: selected?.category ?? '',
      description: selected?.description ?? '',
      price: selected?.price ?? 0,
      stockQuantity: selected?.stockQuantity ?? 0,
    },
  });

  function onSubmit(data: EditProductValues) {
    mutate(data, {
      onSuccess: () => {
        close();
      },
    });
  }

  if (!selected) return null;

  return (
    <Dialog open={editOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Input placeholder="Categoria" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Descrição do produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <CurrencyInput placeholder="Preço" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stockQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estoque</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Estoque" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              Salvar alterações
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
