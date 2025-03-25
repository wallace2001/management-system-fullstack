import { render } from '@testing-library/react';
import { ProductsTable } from '@/modules/products/components/products-table';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('@/modules/products/store/use-products-modal-store', () => ({
  useProductModals: () => ({
    openEdit: jest.fn(),
    openDelete: jest.fn(),
  }),
}));

describe('ProductsTable Snapshot', () => {
  it('renderiza corretamente com dados', () => {
    const queryClient = new QueryClient();

    const products = [
      {
        id: '1',
        name: 'Produto A',
        category: 'Tech',
        description: 'Descrição do produto A',
        price: 99.99,
        stockQuantity: 10,
        createdAt: new Date().toISOString(),
      },
    ];

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <ProductsTable products={products} />
      </QueryClientProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
