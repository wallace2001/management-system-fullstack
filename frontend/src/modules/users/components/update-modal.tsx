'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { useUpdateUserMutation } from '../hooks/use-update-user';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserModals } from '../store/use-users-store';
import { useEffect } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const schema = z.object({
  username: z.string().min(1, 'Usuário obrigatório'),
  role: z.enum(['ADMIN', 'USER']),
});

type FormValues = z.infer<typeof schema>;

export function EditUserModal() {
  const { selectedUser, isEditOpen, closeModals } = useUserModals();
  const { mutate, isPending } = useUpdateUserMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: selectedUser?.username || '',
      role: selectedUser?.role || 'USER',
    },
  });

  function onSubmit(values: FormValues) {
    mutate(
      { id: selectedUser?.id, ...values },
      { onSuccess: () => closeModals() },
    );
  }

  useEffect(() => {
    if (selectedUser) {
      form.setValue('username', selectedUser.username);
      form.setValue('role', selectedUser.role);
    }
  }, [form, selectedUser]);

  return (
    <Dialog open={isEditOpen} onOpenChange={closeModals}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar usuário</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuário</FormLabel>
                  <FormControl>
                    <Input
                      className="h-12"
                      placeholder="Seu usuário"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USER">USER</SelectItem>
                        <SelectItem value="ADMIN">ADMIN</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending}>Salvar alterações</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
