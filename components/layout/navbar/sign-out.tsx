'use client';

import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const { signOut } = useClerk();
  const router = useRouter();

  return <div onClick={() => signOut(() => router.push('/'))}>Logout</div>;
}
