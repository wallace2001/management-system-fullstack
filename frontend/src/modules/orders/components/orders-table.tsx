'use client';

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Check, Trash2, Eye, Pencil, PackageX } from 'lucide-react';
import { useOrdersModal } from '../store/use-orders-modals-store';
import { useOrdersQuery } from '../hooks/use-orders-query';
import { useUpdateOrderStatus } from '../hooks/use-order';

export function OrdersTable() {
  const { data: orders } = useOrdersQuery();
  const completeMutation = useUpdateOrderStatus();
  const { openDelete, openEdit, openDetail } = useOrdersModal();

  const hasOrders = orders && orders.length > 0;

  return (
    <>
      {hasOrders ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id.slice(0, 8)}...</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>R$ {order.total.toFixed(2)}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="space-x-2 text-right">
                  <Button size="sm" variant="outline" onClick={() => openDetail(order)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => openEdit(order)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={order.status === 'COMPLETED'}
                    className={
                      order.status === 'COMPLETED'
                        ? 'border-green-600 text-green-600 hover:bg-green-50'
                        : ''
                    }
                    onClick={() => completeMutation.mutate(order.id)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => openDelete(order)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
          <PackageX className="w-12 h-12 mb-2" />
          <p className="text-sm">Nenhum pedido encontrado.</p>
        </div>
      )}
    </>
  );
}
