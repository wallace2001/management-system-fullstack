import { render, screen } from '@testing-library/react';
import { EditProductModal } from '@/modules/products/components/modals/edit-product-modal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockMutate = jest.fn();
const mockClose = jest.fn();

jest.mock('@/modules/products/hooks/use-product', () => ({
  useUpdateProduct: () => ({
    mutate: mockMutate,
    isPending: false,
  }),
}));

jest.mock('@/modules/products/store/use-products-modal-store', () => {
  return {
    useProductModals: () => ({
      editOpen: true,
      close: mockClose,
      selected: {
        id: '1',
        name: 'Notebook',
        category: 'Tech',
        description: 'desc',
        price: 1000,
        stockQuantity: 10,
      },
    }),
  };
});

const renderWithClient = (ui: React.ReactNode) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe('EditProductModal', () => {
  beforeEach(() => {
    mockMutate.mockReset();
    mockClose.mockReset();
  });

  it('exibe campos preenchidos com valores do produto', () => {
    renderWithClient(<EditProductModal />);
    expect(screen.getByDisplayValue(/Notebook/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Tech/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/desc/)).toBeInTheDocument();
  });
});
