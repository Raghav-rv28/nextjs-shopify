'use server';
import { cookies } from 'next/headers';

export async function saveToCookies({
  key,
  value,
  path = '/'
}: {
  key: string;
  value: string;
  path?: string;
}) {
  cookies().set(key, value, { path });
}

export async function getFromCookies(key: string | undefined) {
  if (key === undefined) {
    return null;
  }
  return cookies().get(key);
}

export async function getAllCookies() {
  return cookies().getAll();
}
