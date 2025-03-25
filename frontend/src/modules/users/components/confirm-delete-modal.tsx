'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useDeleteUserMutation } from '../hooks/use-delete-user';
import { useUserModals } from '../store/use-users-store';
import { handleError } from '@/modules/errors/request-error';

export function ConfirmDeleteUserModal() {
  const { selectedUser, isDeleteOpen, closeModals } = useUserModals();
  const { mutate, isPending } = useDeleteUserMutation();

  return (
    <Dialog open={isDeleteOpen} onOpenChange={closeModals}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Tem certeza que deseja excluir o usuário {selectedUser?.username}?
          </DialogTitle>
        </DialogHeader>
        <DialogDescription />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => closeModals()}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={() =>
              mutate(selectedUser?.id, {
                onSuccess: () => closeModals(),
                onError: handleError,
              })
            }
          >
            Excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
