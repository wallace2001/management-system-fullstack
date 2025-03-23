'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';

import { useUsers } from '@/modules/users/hooks/use-get-users';
import { UsersTable } from '@/modules/users/components/users-table';
import { EditUserModal } from '@/modules/users/components/update-modal';
import { ConfirmDeleteUserModal } from '@/modules/users/components/confirm-delete-modal';

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const { data, isLoading } = useUsers();
  const filteredUsers = data?.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="mt-[80px] p-6">
      <EditUserModal />
      <ConfirmDeleteUserModal />
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Usuários</h1>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Buscar por nome de usuário..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <UsersTable users={filteredUsers} isLoading={isLoading} />
    </div>
  );
}
