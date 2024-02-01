'use server';
import { PrismaClient } from '@prisma/client';
import { updateCustomerAccessToken } from '..';

type User = { firstName: string; lastName: string; email: string; phone: string; password: string };
const prisma = new PrismaClient();
export async function createUserInDB(data: User) {
  try {
    const createUser = await prisma.user.create({
      data: {
        email: data.email,
        phone: data.phone,
        firstName: data.firstName,
        lastName: data.lastName
      }
    });
    console.log(`USER SAVED IN PRISMA: ${createUser}`);
    await updateCustomerAccessToken({ email: data.email, password: data.password });
  } catch (error) {
    console.log(error);
  }
}
