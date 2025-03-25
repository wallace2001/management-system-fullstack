import { render } from '@testing-library/react';
import { ConfirmDeleteUserModal } from '@/modules/users/components/confirm-delete-modal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('@/modules/users/hooks/use-delete-user', () => ({
  useDeleteUserMutation: () => ({
    mutate: jest.fn(),
    isPending: false,
  }),
}));

jest.mock('@/modules/users/store/use-users-store', () => ({
  useUserModals: () => ({
    isDeleteOpen: true,
    closeModals: jest.fn(),
    selectedUser: { id: '1', username: 'testuser' },
  }),
}));

describe('ConfirmDeleteUserModal Snapshot', () => {
  it('renderiza corretamente', () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <ConfirmDeleteUserModal />
      </QueryClientProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
