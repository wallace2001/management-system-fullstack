import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductsTable } from '@/modules/products/components/products-table';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const openEdit = jest.fn();
const openDelete = jest.fn();

jest.mock('@/modules/products/store/use-products-modal-store', () => ({
  useProductModals: () => ({
    openEdit,
    openDelete,
  }),
}));

const renderWithClient = (ui: React.ReactNode) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe('ProductsTable', () => {
  const mockProducts = [
    {
      id: 'p1',
      name: 'Notebook',
      category: 'Tech',
      description: 'Notebook Gamer',
      price: 3500,
      stockQuantity: 5,
      createdAt: new Date().toISOString(),
    },
  ];

  it('renderiza os dados corretamente', () => {
    renderWithClient(<ProductsTable products={mockProducts} />);
    expect(screen.getByText('Notebook')).toBeInTheDocument();
    expect(screen.getByText('Tech')).toBeInTheDocument();
    expect(screen.getByText('R$ 3500.00')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('aciona openEdit ao clicar no botão de editar', async () => {
    renderWithClient(<ProductsTable products={mockProducts} />);
    await userEvent.click(screen.getAllByRole('button')[0]);
    expect(openEdit).toHaveBeenCalledWith(mockProducts[0]);
  });

  it('exibe mensagem de nenhum produto encontrado se lista estiver vazia', () => {
    renderWithClient(<ProductsTable products={[]} />);
    expect(screen.getByText(/nenhum produto encontrado/i)).toBeInTheDocument();
  });

  it('exibe skeletons durante carregamento', () => {
    renderWithClient(<ProductsTable isLoading />);
    expect(screen.getAllByRole('row')).toHaveLength(6); // 1 header + 5 skeletons
  });
});
