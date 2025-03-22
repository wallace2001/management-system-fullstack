'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useCreateOrder } from '../../hooks/use-order';
import { useOrdersModal } from '../../store/use-orders-modals-store';
import { OrderFormValues, orderSchema } from '../../schemas/order-schema';
import { ProductMultiSelect } from '@/components/product-multi-select';

export function CreateOrderModal() {
  const { createOpen, close } = useOrdersModal();
  const { mutate, isPending } = useCreateOrder();

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      products: {},
      status: 'PENDING',
    },
  });

  const onSubmit = (values: OrderFormValues) => {
    console.log(values);
    mutate(values, {
      onSuccess: () => {
        form.reset();
        close();
      },
    });
  };

  return (
    <Dialog open={createOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Pedido</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="products"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Produtos</FormLabel>
                  <FormControl>
                    <ProductMultiSelect {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" disabled={isPending}>
              Criar Pedido
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
