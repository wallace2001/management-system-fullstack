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
import { Status, useOrdersQuery } from '../hooks/use-orders-query';
import { useUpdateOrderStatus } from '../hooks/use-order';
import { useState } from 'react';
import { PaginationWrapper } from '@/components/pagination-wrapper';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function OrdersTable() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<Status | undefined>();
  const { data, isLoading } = useOrdersQuery({ page, status });
  const completeMutation = useUpdateOrderStatus();
  const { openDelete, openEdit, openDetail } = useOrdersModal();

  const orders = data?.data || [];
  const hasOrders = orders.length > 0;

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <Select
          value={status}
          onValueChange={(value) => {
            setStatus(value === 'ALL' ? undefined : (value as Status));
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos</SelectItem>
            <SelectItem value="PENDING">Pendente</SelectItem>
            <SelectItem value="COMPLETED">Concluído</SelectItem>
            <SelectItem value="CANCELED">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <div className="space-y-4 p-6">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-md" />
          ))}
        </div>
      ) : hasOrders ? (
        <>
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
              {orders.map((order) => {
                const idDisabled =
                  order.status === 'COMPLETED' || order.status === 'CANCELED';

                return (
                  <TableRow key={order.id}>
                    <TableCell>{order.id.slice(0, 8)}...</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>R$ {order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="space-x-2 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openDetail(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        disabled={idDisabled}
                        variant="outline"
                        onClick={() => openEdit(order)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={idDisabled}
                        className={
                          order.status === 'COMPLETED'
                            ? 'border-green-600 text-green-600 hover:bg-green-50'
                            : ''
                        }
                        onClick={() => completeMutation.mutate(order.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={idDisabled}
                        onClick={() => openDelete(order)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {data?.currentPage && data.totalItems && (
            <div className="mt-6">
              <PaginationWrapper
                currentPage={data.currentPage}
                totalPages={data.totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-muted-foreground flex h-64 flex-col items-center justify-center">
          <PackageX className="mb-2 h-12 w-12" />
          <p className="text-sm">Nenhum pedido encontrado.</p>
        </div>
      )}
    </>
  );
}
