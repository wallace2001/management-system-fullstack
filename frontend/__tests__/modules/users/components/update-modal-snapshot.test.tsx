import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EditUserModal } from '@/modules/users/components/update-modal';

jest.mock('@/modules/users/hooks/use-update-user', () => ({
  useUpdateUserMutation: () => ({
    mutate: jest.fn(),
    isPending: false,
  }),
}));

jest.mock('@/modules/users/store/use-users-store', () => ({
  useUserModals: () => ({
    selectedUser: { id: '1', username: 'testuser', role: 'USER' },
    isEditOpen: true,
    closeModals: jest.fn(),
  }),
}));

describe('EditUserModal Snapshot', () => {
  it('renderiza corretamente', () => {
    const queryClient = new QueryClient();

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <EditUserModal />
      </QueryClientProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
