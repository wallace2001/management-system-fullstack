import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EditUserModal } from '@/modules/users/components/update-modal';

const mockMutate = jest.fn();
const mockCloseModals = jest.fn();

jest.mock('@/modules/users/hooks/use-update-user', () => ({
  useUpdateUserMutation: () => ({
    mutate: mockMutate,
    isPending: false,
  }),
}));

jest.mock('@/modules/users/store/use-users-store', () => ({
  useUserModals: () => ({
    selectedUser: { id: '1', username: 'testuser', role: 'USER' },
    isEditOpen: true,
    closeModals: mockCloseModals,
  }),
}));

jest.mock('@/modules/errors/request-error', () => ({
  handleError: jest.fn(),
}));

const renderWithClient = (ui: React.ReactNode) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe('EditUserModal', () => {
  beforeEach(() => {
    mockMutate.mockReset();
    mockCloseModals.mockReset();
  });

  it('renderiza inputs e botão', () => {
    renderWithClient(<EditUserModal />);
    expect(screen.getByPlaceholderText(/seu usuário/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /salvar alterações/i })).toBeInTheDocument();
  });

  it('envia o formulário com dados válidos', async () => {
    renderWithClient(<EditUserModal />);

    await userEvent.clear(screen.getByPlaceholderText(/seu usuário/i));
    await userEvent.type(screen.getByPlaceholderText(/seu usuário/i), 'newname');

    await userEvent.click(screen.getByRole('button', { name: /salvar alterações/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        { id: '1', username: 'newname', role: 'USER' },
        expect.objectContaining({ onSuccess: expect.any(Function) }),
      );
    });
  });

  it('exibe erro se usuário for vazio', async () => {
    renderWithClient(<EditUserModal />);
    await userEvent.clear(screen.getByPlaceholderText(/seu usuário/i));
    await userEvent.click(screen.getByRole('button', { name: /salvar alterações/i }));

    expect(await screen.findByText(/usuário obrigatório/i)).toBeInTheDocument();
  });
});
