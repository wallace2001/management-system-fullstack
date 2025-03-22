'use client';

import { Button } from '@/components/ui/button';
import { CreateOrderModal } from '@/modules/orders/components/modals/create-order-modal';
import { DeleteOrderModal } from '@/modules/orders/components/modals/delete-order-modal';
import { EditOrderModal } from '@/modules/orders/components/modals/edit-order-modal';
import { ViewOrderModal } from '@/modules/orders/components/modals/view-order-modal';
import { OrdersTable } from '@/modules/orders/components/orders-table';
import { useOrdersModal } from '@/modules/orders/store/use-orders-modals-store';
import { PlusCircle } from 'lucide-react';

export default function OrdersPage() {
  const { openCreate } = useOrdersModal();

  return (
    <div className="mt-[80px] space-y-6 p-6">
      <CreateOrderModal />
      <EditOrderModal />
      <DeleteOrderModal />
      <ViewOrderModal />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Pedidos</h1>
        <Button onClick={openCreate}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Pedido
        </Button>
      </div>

      <OrdersTable />
    </div>
  );
}
