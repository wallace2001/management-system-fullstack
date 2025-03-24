'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductsTable } from '@/modules/products/components/products-table';
import { PlusCircle } from 'lucide-react';
import { useProductsQuery } from '@/modules/products/hooks/use-get-products';
import { CreateProductModal } from '@/modules/products/components/modals/create-product-modal';
import { DeleteProductModal } from '@/modules/products/components/modals/delete-product-modal';
import { EditProductModal } from '@/modules/products/components/modals/edit-product-modal';
import { useProductModals } from '@/modules/products/store/use-products-modal-store';
import { PaginationWrapper } from '@/components/pagination-wrapper';
import { useDebounce } from '@/modules/shared/hooks/use-debounce';

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useProductsQuery({
    page,
    name: debouncedSearch,
  });

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { openCreate } = useProductModals();

  return (
    <div className="mt-[80px] space-y-6 p-6">
      <CreateProductModal />
      <DeleteProductModal />
      <EditProductModal />

      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Produtos</h1>

        <Button
          onClick={openCreate}
          variant="default"
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" /> Novo Produto
        </Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Buscar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ProductsTable products={data?.data || []} isLoading={isLoading} />

      <div className="flex w-full items-center justify-start">
        {data?.currentPage && data.totalItems && (
          <PaginationWrapper
            currentPage={data.currentPage}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
