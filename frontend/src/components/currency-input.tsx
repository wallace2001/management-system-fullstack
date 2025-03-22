'use client';

import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

type CurrencyInputProps = {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
};

export function CurrencyInput({ value, onChange, placeholder }: CurrencyInputProps) {
  const [formatted, setFormatted] = useState('');

  useEffect(() => {
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
    setFormatted(formattedValue);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const numericValue = Number(rawValue) / 100;
    onChange(numericValue);
  };

  return (
    <Input
      inputMode="numeric"
      value={formatted}
      onChange={handleChange}
      placeholder={placeholder || 'R$ 0,00'}
    />
  );
}
