'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { useOrdersModal } from '../../store/use-orders-modals-store';
import { useUpdateOrder } from '../../hooks/use-order';
import {
  OrderFormValues,
  orderSchema,
} from '../../schemas/order-schema';
import { ProductMultiSelect } from '@/components/product-multi-select';

export function EditOrderModal() {
  const { editOpen, selected, close } = useOrdersModal();
  const { mutate, isPending } = useUpdateOrder();

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    values: {
      products:
        selected?.products && Array.isArray(selected.products)
          ? selected.products.reduce((acc, item) => {
              acc[item.productId] = item.quantity;
              return acc;
            }, {} as Record<string, number>)
          : {},
      status: selected?.status || 'PENDING',
    },
  });

  const onSubmit = (values: OrderFormValues) => {
    if (!selected?.id) return;
    mutate(
      {
          id: selected.id,
          status: values.status,
          products: values.products,
      },
      {
        onSuccess: () => close(),
      }
    );
  };

  if (!selected) return null;

  return (
    <Dialog open={editOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Pedido</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="products"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Produtos</FormLabel>
                  <FormControl>
                    <ProductMultiSelect
                      value={field.value}
                      onChange={field.onChange}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              Salvar Alterações
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
