// __tests__/ConfirmDeleteUserModal.spec.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmDeleteUserModal } from '@/modules/users/components/confirm-delete-modal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockMutate = jest.fn();
const mockCloseModals = jest.fn();

jest.mock('@/modules/users/hooks/use-delete-user', () => ({
  useDeleteUserMutation: () => ({
    mutate: mockMutate,
    isPending: false,
  }),
}));

jest.mock('@/modules/users/store/use-users-store', () => ({
  useUserModals: () => ({
    isDeleteOpen: true,
    closeModals: mockCloseModals,
    selectedUser: { id: '1', username: 'testuser' },
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

describe('ConfirmDeleteUserModal', () => {
  beforeEach(() => {
    mockMutate.mockReset();
    mockCloseModals.mockReset();
  });

  it('exibe o nome do usuário e os botões', () => {
    renderWithClient(<ConfirmDeleteUserModal />);
    expect(
      screen.getByText(/deseja excluir o usuário testuser/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /excluir/i })).toBeInTheDocument();
  });

  it('chama mutate ao clicar em Excluir', async () => {
    renderWithClient(<ConfirmDeleteUserModal />);
    await userEvent.click(screen.getByRole('button', { name: /excluir/i }));
    expect(mockMutate).toHaveBeenCalledWith(
      '1',
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      }),
    );
  });

  it('fecha modal ao clicar em Cancelar', async () => {
    renderWithClient(<ConfirmDeleteUserModal />);
    await userEvent.click(screen.getByRole('button', { name: /cancelar/i }));
    expect(mockCloseModals).toHaveBeenCalled();
  });
});
