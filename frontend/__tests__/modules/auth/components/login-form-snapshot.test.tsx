import renderer from 'react-test-renderer';
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

    const tree = renderer
      .create(
        <QueryClientProvider client={queryClient}>
          <LoginForm />
        </QueryClientProvider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
