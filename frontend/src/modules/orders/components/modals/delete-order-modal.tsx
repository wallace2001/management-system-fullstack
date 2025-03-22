'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useOrdersModal } from '../../store/use-orders-modals-store';
import { useDeleteOrder } from '../../hooks/use-order';

export function DeleteOrderModal() {
  const { deleteOpen, selected, close } = useOrdersModal();
  const { mutate, isPending } = useDeleteOrder();

  const onDelete = () => {
    if (!selected?.id) return;
    mutate(selected.id, {
      onSuccess: () => close(),
    });
  };

  if (!selected) return null;

  return (
    <Dialog open={deleteOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar exclusão</DialogTitle>
        </DialogHeader>

        <p>Tem certeza que deseja excluir este pedido?</p>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={close}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onDelete} disabled={isPending}>
            Excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
