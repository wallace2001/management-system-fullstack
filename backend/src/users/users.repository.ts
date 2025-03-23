// src/users/users.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    username: string;
    password: string;
    role: 'ADMIN' | 'USER';
  }): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async findById(id: string): Promise<Partial<User> | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async findAll({
    page = 1,
    limit = 10,
    name,
  }: {
    page?: number;
    limit?: number;
    name?: string;
  }): Promise<{
    data: Partial<User[]>;
    totalItems: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
  }> {
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput | undefined = name
      ? {
          username: {
            contains: name,
            mode: Prisma.QueryMode.insensitive,
          },
        }
      : undefined;

    const [totalItems, data] = await Promise.all([
      this.prisma.user.count({ where }),
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      totalItems,
      totalPages,
      currentPage: page,
      perPage: limit,
    };
  }

  async delete(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  async update(id: string, data: Partial<Pick<User, 'username' | 'role'>>): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
