'use client';

import { Crown, LogOut } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logout } from '@/lib/auth';

export const UserButton = () => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative cursor-pointer outline-none">
        <div className="absolute -top-1 -left-1 z-10 flex items-center justify-center">
          <div className="flex items-center justify-center rounded-full bg-white p-1 drop-shadow-sm">
            <Crown className="size-3 fill-yellow-500 text-yellow-500" />
          </div>
        </div>
        <Avatar className="hover:opcaity-75 transition">
          <AvatarImage alt="" src="https://github.com/shadcn.png" />
          <AvatarFallback className="flex items-center justify-center bg-blue-500 font-medium text-white" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="h-10"
          onClick={async () => {
            logout();
          }}
        >
          <LogOut className="mr-2 size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
