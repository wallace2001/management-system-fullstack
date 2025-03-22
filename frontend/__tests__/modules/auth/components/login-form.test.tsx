
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '@/modules/auth/components/login-form';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockMutate = jest.fn();

jest.mock('@/modules/auth/hooks/use-login-mutation', () => ({
  useLoginMutation: () => ({
    mutate: mockMutate,
    isLoading: false,
  }),
}));

const renderWithClient = (ui: React.ReactNode) => {
  const queryClient = new QueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('LoginForm', () => {
  beforeEach(() => {
    mockMutate.mockReset();
  });

  it('renderiza inputs e botão', () => {
    renderWithClient(<LoginForm />);

    expect(screen.getByPlaceholderText(/seu usuário/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/sua senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('mostra erro se enviar sem preencher os campos', async () => {
    renderWithClient(<LoginForm />);

    await userEvent.click(screen.getByRole('button', { name: /entrar/i }));

    expect(await screen.findByText(/invalid username/i)).toBeInTheDocument();
    expect(await screen.findByText(/password must be at least 6 characters/i)).toBeInTheDocument();
  });


  it('envia formulário com valores válidos', async () => {
    renderWithClient(<LoginForm />);

    await userEvent.type(screen.getByPlaceholderText(/seu usuário/i), 'admin');
    await userEvent.type(screen.getByPlaceholderText(/sua senha/i), '123456');
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }));

    expect(mockMutate).toHaveBeenCalledWith({
      username: 'admin',
      password: '123456',
    });
  });
});