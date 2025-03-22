'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormField,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/password-input';
import { LoginFormValues, loginSchema } from '../schemas/login-schema';
import { SubmitButton } from '@/components/submit-button';
import Link from 'next/link';
import { useLoginMutation } from '../hooks/use-login-mutation';

export function LoginForm() {
  const loginMutation = useLoginMutation();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-gray-50 px-6 py-8 sm:px-12"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuário</FormLabel>
              <FormControl>
                <Input className="h-12" placeholder="Seu usuário" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Sua senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton>Entrar</SubmitButton>
        <p className="text-center text-sm text-gray-600">
          {'Ainda não tem uma conta? '}
          <Link href="/auth/register" className="font-semibold text-gray-800">
            Cadastrar
          </Link>
        </p>
      </form>
    </Form>
  );
}
