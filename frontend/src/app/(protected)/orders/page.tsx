"use client";

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
    <div className="p-6 mt-[80px] space-y-6">
        <CreateOrderModal />
        <EditOrderModal />
        <DeleteOrderModal />
        <ViewOrderModal />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Pedidos</h1>
        <Button onClick={openCreate}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Novo Pedido
        </Button>
      </div>

      <OrdersTable />
    </div>
  );
}
