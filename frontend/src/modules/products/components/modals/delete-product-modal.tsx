import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useProductModals } from '../../store/use-products-modal-store';
import { useDeleteProduct } from '../../hooks/use-product';
import { handleError } from '@/modules/errors/request-error';

export function DeleteProductModal() {
  const { deleteOpen, selected, close } = useProductModals();
  const { mutate, isPending } = useDeleteProduct();

  if (!selected) return null;

  return (
    <Dialog open={deleteOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar exclusão</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <p className="text-sm">
          Deseja remover o produto <strong>{selected.name}</strong>?
        </p>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={close}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={() =>
              mutate(selected.id, { onSuccess: close, onError: handleError })
            }
          >
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
