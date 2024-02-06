'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  //TODO - based on session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      router.push('/signIn');
    }
  }, []);

  return null;
}
