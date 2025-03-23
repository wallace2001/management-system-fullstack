import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoginForm } from '@/modules/auth/components/login-form';

jest.mock('@/modules/auth/hooks/use-login-mutation', () => ({
  useLoginMutation: () => ({
    mutate: jest.fn(),
    isLoading: false,
  }),
}));

describe('LoginForm Snapshot', () => {
  it('renderiza corretamente', () => {
    const queryClient = new QueryClient();

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <LoginForm />
      </QueryClientProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
