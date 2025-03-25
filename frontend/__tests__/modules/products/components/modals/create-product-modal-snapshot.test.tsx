import { render } from '@testing-library/react';
import { CreateProductModal } from '@/modules/products/components/modals/create-product-modal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('@/modules/products/store/use-products-modal-store', () => ({
  useProductModals: () => ({
    createOpen: true,
    close: jest.fn(),
  }),
}));

jest.mock('@/modules/products/hooks/use-product', () => ({
  useCreateProduct: () => ({
    mutate: jest.fn(),
    isPending: false,
  }),
}));

describe('CreateProductModal Snapshot', () => {
  it('renderiza corretamente', () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <CreateProductModal />
      </QueryClientProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
