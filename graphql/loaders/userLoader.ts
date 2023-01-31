import DataLoader from 'dataloader';
import prisma from '@/lib/prisma';
import { User } from '.prisma/client';

type BatchUsers = (ids: number[]) => Promise<User[]>;

const batchUsers: BatchUsers = async (ids) => {
  const users = await prisma.user.findMany({
    where: {
      id: { in: ids },
    },
  });

  if (!users) {
    return [];
  }

  const userMap: { [key: string]: User } = {};
  users.forEach((user) => {
    userMap[user.id] = user;
  });

  const res = ids.map((id) => userMap[id]);

  return res;
};

// @ts-ignore
const userLoader = new DataLoader<number, User>(batchUsers);

export default userLoader;
