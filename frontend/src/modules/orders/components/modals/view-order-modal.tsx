'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useOrdersModal } from '../../store/use-orders-modals-store';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

export function ViewOrderModal() {
  const { detailOpen, selected, close } = useOrdersModal();

  if (!selected) return null;

  return (
    <Dialog open={detailOpen} onOpenChange={close}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Detalhes do Pedido</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <span className="font-semibold">ID:</span> {selected.id}
          </div>
          <div>
            <span className="font-semibold">Status:</span>{' '}
            <Badge variant={
              selected.status === 'COMPLETED' ? 'default' :
              selected.status === 'PENDING' ? 'secondary' : 'destructive'
            }>
              {selected.status}
            </Badge>
          </div>
          <div>
            <span className="font-semibold">Total:</span> R$ {selected.total.toFixed(2)}
          </div>
          <div>
            <span className="font-semibold">Data:</span>{' '}
            {new Date(selected.createdAt).toLocaleDateString()}
          </div>

          <div>
            <span className="font-semibold block mb-2">Produtos:</span>
            <ScrollArea className="h-48 pr-2">
              <ul className="space-y-2">
                {selected.products.map((item) => (
                  <li key={item.productId} className="text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">{item.product.name}</span>
                      <span>
                        {item.quantity}x - R$ {item.product.price.toFixed(2)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}