import { render } from '@testing-library/react';
import { DeleteProductModal } from '@/modules/products/components/modals/delete-product-modal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('@/modules/products/store/use-products-modal-store', () => ({
  useProductModals: () => ({
    deleteOpen: true,
    selected: { id: '1', name: 'Notebook' },
    close: jest.fn(),
  }),
}));

jest.mock('@/modules/products/hooks/use-product', () => ({
  useDeleteProduct: () => ({
    mutate: jest.fn(),
    isPending: false,
  }),
}));

describe('DeleteProductModal Snapshot', () => {
  it('renderiza corretamente', () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <DeleteProductModal />
      </QueryClientProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
