'use client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
    router.push('/signIn');
  };

  return (
    //TODO - add styles
    <button className='bg-green-300 text-black' onClick={handleSignOut}>
      Sign Out
    </button>
  );
}
