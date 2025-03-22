/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Product } from '@/modules/shared/types/product';
import { useProductsQuery } from '@/modules/products/hooks/use-get-products';

type ProductMultiSelectProps = {
  value: Record<string, number>;
  onChange: (value: Record<string, number>) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export function ProductMultiSelect({
  value,
  onChange,
  className,
  ...props
}: ProductMultiSelectProps) {
  const { data: products = [] } = useProductsQuery();
  const [selectedId, setSelectedId] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!value || typeof value !== 'object') {
      onChange({});
    }
  }, []);

  function handleAddProduct() {
    if (!selectedId || quantity < 1) return;

    const updated = {
      ...value,
      [selectedId]: (value[selectedId] || 0) + quantity,
    };

    onChange(updated);
    setSelectedId('');
    setQuantity(1);
  }

  function handleRemoveProduct(productId: string) {
    const updated = { ...value };
    delete updated[productId];
    onChange(updated);
  }

  return (
    <div className={cn('space-y-2', className)} {...props}>
      <div className="flex gap-2 items-center">
        <Select value={selectedId} onValueChange={setSelectedId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione um produto" />
          </SelectTrigger>
          <SelectContent>
            {products.map((product: Product) => (
              <SelectItem key={product.id} value={product.id}>
                {product.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-24"
          placeholder="Qtd"
        />

        <button
          type="button"
          onClick={handleAddProduct}
          className="px-4 py-2 bg-primary text-white text-sm rounded"
        >
          Adicionar
        </button>
      </div>

      <div className="text-sm text-muted-foreground space-y-1">
        {Object.entries(value).length > 0 ? (
          Object.entries(value).map(([id, qty]) => {
            const name = products.find((p) => p.id === id)?.name || id;
            return (
              <div
                key={id}
                className="flex items-center justify-between border px-2 py-1 rounded"
              >
                <span>
                  {name} — <strong>{qty}x</strong>
                </span>
                <button
                  type="button"
                  className="text-xs text-red-500 hover:underline"
                  onClick={() => handleRemoveProduct(id)}
                >
                  Remover
                </button>
              </div>
            );
          })
        ) : (
          <p>Nenhum produto adicionado.</p>
        )}
      </div>
    </div>
  );
}
