'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useOrdersModal } from '../../store/use-orders-modals-store';
import { useDeleteOrder } from '../../hooks/use-order';
import { handleError } from '@/modules/errors/request-error';

export function DeleteOrderModal() {
  const { deleteOpen, selected, close } = useOrdersModal();
  const { mutate, isPending } = useDeleteOrder();

  const onDelete = () => {
    if (!selected?.id) return;
    mutate(selected.id, {
      onSuccess: () => close(),
      onError: handleError,
    });
  };

  if (!selected) return null;

  return (
    <Dialog open={deleteOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancelar pedido ?</DialogTitle>
        </DialogHeader>
        <DialogDescription />

        <p>Tem certeza que deseja cancelar este pedido?</p>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={close}>
            Sair
          </Button>
          <Button variant="destructive" onClick={onDelete} disabled={isPending}>
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
