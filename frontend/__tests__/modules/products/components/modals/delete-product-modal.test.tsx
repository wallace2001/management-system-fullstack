import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DeleteProductModal } from '@/modules/products/components/modals/delete-product-modal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockMutate = jest.fn();
const mockClose = jest.fn();

jest.mock('@/modules/products/store/use-products-modal-store', () => ({
  useProductModals: () => ({
    deleteOpen: true,
    selected: { id: '1', name: 'Notebook' },
    close: mockClose,
  }),
}));

jest.mock('@/modules/products/hooks/use-product', () => ({
  useDeleteProduct: () => ({
    mutate: mockMutate,
    isPending: false,
  }),
}));

const renderWithClient = (ui: React.ReactNode) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe('DeleteProductModal', () => {
  beforeEach(() => {
    mockMutate.mockReset();
    mockClose.mockReset();
  });

  it('exibe o nome do produto', () => {
    renderWithClient(<DeleteProductModal />);
    expect(screen.getByText(/Notebook/i)).toBeInTheDocument();
  });

  it('chama mutate ao confirmar', async () => {
    renderWithClient(<DeleteProductModal />);
    await userEvent.click(screen.getByRole('button', { name: /confirmar/i }));

    expect(mockMutate).toHaveBeenCalledWith(
      '1',
      expect.objectContaining({ onSuccess: mockClose, onError: expect.any(Function) }),
    );
  });

  it('chama close ao cancelar', async () => {
    renderWithClient(<DeleteProductModal />);
    await userEvent.click(screen.getByRole('button', { name: /cancelar/i }));
    expect(mockClose).toHaveBeenCalled();
  });
});
