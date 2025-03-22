'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash2, Pencil, PackageX } from 'lucide-react';
import { Product } from '@/modules/shared/types/product';
import { useProductModals } from '../store/use-products-modal-store';

export const ProductsTable = ({
  products,
  isLoading = false,
}: {
  products?: Product[];
  isLoading?: boolean;
}) => {
  const { openEdit, openDelete } = useProductModals();

  const renderSkeletonRows = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <TableRow key={`skeleton-${index}`}>
        <TableCell>
          <Skeleton className="h-4 w-24" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-16" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-20" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-28" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-16" />
        </TableCell>
        <TableCell className="space-x-2 text-right">
          <Skeleton className="inline-block h-8 w-8" />
          <Skeleton className="inline-block h-8 w-8" />
        </TableCell>
      </TableRow>
    ));
  };

  if (!isLoading && (!products || products.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <PackageX className="w-12 h-12 mb-2" />
        <p className="text-sm">Nenhum produto encontrado.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Estoque</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? renderSkeletonRows()
          : products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {product.description}
                </TableCell>
                <TableCell>{product.stockQuantity}</TableCell>
                <TableCell className="space-x-2 text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEdit(product)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => openDelete(product)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
};
