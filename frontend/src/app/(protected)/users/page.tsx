'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';

import { useUsers } from '@/modules/users/hooks/use-get-users';
import { UsersTable } from '@/modules/users/components/users-table';
import { EditUserModal } from '@/modules/users/components/update-modal';
import { ConfirmDeleteUserModal } from '@/modules/users/components/confirm-delete-modal';
import { PaginationWrapper } from '@/components/pagination-wrapper';
import { useDebounce } from '@/modules/shared/hooks/use-debounce';

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useUsers({
    page,
    name: debouncedSearch,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

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
          onChange={handleSearchChange}
        />
      </div>

      <UsersTable users={data?.data || []} isLoading={isLoading} />

      <div className='w-full flex justify-start items-center'>
        {data?.currentPage && data.totalItems && (
        <PaginationWrapper
        currentPage={data.currentPage}
        totalPages={data.totalPages}
        onPageChange={setPage}
      />
        )}
      </div>
    </div>
  );
}