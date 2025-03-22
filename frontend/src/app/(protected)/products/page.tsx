'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductsTable } from '@/modules/products/components/products-table';
import { PlusCircle } from 'lucide-react';
import { Product } from '@/modules/shared/types/product';
import { useProductsQuery } from '@/modules/products/hooks/use-get-products';
import { CreateProductModal } from '@/modules/products/components/modals/create-product-modal';
import { DeleteProductModal } from '@/modules/products/components/modals/delete-product-modal';
import { EditProductModal } from '@/modules/products/components/modals/edit-product-modal';
import { useProductModals } from '@/modules/products/store/use-products-modal-store';

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const { data: products, isLoading } = useProductsQuery();
  const { openCreate } = useProductModals();

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product: Product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  return (
    <div className="p-6 space-y-6 mt-[80px]">
        <CreateProductModal />
        <DeleteProductModal />
        <EditProductModal />
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Produtos</h1>

        <Button onClick={openCreate} variant="default" className="flex items-center gap-2">
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

      <ProductsTable
        products={filteredProducts}
        isLoading={isLoading}
      />
    </div>
  );
}
