import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UsersTable } from '@/modules/users/components/users-table';
import { Profile } from '@/modules/shared/types/profile';

const renderWithClient = (ui: React.ReactNode) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe('UsersTable', () => {
  const mockUsers: Profile[] = [
    {
      id: '1',
      username: 'admin',
      role: 'ADMIN',
      createdAt: new Date('2023-01-01'),
    },
    {
      id: '2',
      username: 'user',
      role: 'USER',
      createdAt: new Date('2023-02-01'),
    },
  ];

  it('deve renderizar os dados da tabela corretamente', () => {
    renderWithClient(<UsersTable users={mockUsers} isLoading={false} />);

    expect(screen.getByText('admin')).toBeInTheDocument();
    expect(screen.getByText('user')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(4); // 2 actions por linha
  });

  it('deve renderizar skeletons enquanto estiver carregando', () => {
    renderWithClient(<UsersTable isLoading />);
    expect(screen.getAllByRole('row')).toHaveLength(6); // 1 header + 5 skeletons
  });

  it('snapshot da tabela', () => {
    const { container } = renderWithClient(
      <UsersTable users={mockUsers} isLoading={false} />,
    );
    expect(container).toMatchSnapshot();
  });
});
