import { render } from '@testing-library/react';
import { EditProductModal } from '@/modules/products/components/modals/edit-product-modal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('@/modules/products/hooks/use-product', () => ({
  useUpdateProduct: () => ({
    mutate: jest.fn(),
    isPending: false,
  }),
}));

jest.mock('@/modules/products/store/use-products-modal-store', () => ({
  useProductModals: () => ({
    editOpen: true,
    selected: {
      id: '1',
      name: 'Notebook',
      category: 'Tech',
      description: 'Gamer',
      price: 3500,
      stockQuantity: 5,
    },
    close: jest.fn(),
  }),
}));

describe('EditProductModal Snapshot', () => {
  it('renderiza corretamente', () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <EditProductModal />
      </QueryClientProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
