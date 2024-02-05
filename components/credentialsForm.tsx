'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCsrfToken } from 'next-auth/react';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import toast from 'react-hot-toast';

type SignInResponse = {
  ok?: boolean;
  error?: string | undefined;
  status: number;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default function CredentialsForm({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const signInResponse = (await signIn('credentials', {
      email: data.get('email'),
      password: data.get('password'),
      redirect: false,
    })) as SignInResponse;

    if (signInResponse && signInResponse.ok) {
      router.push('/home');
    } else {
      setErrorMsg('Email or Password is incorrect!');
      console.log(
        `Status: ${signInResponse.status}
      Error: ${signInResponse.error}`
      );
    }
  };

  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg);
      setErrorMsg(null);
    }
  }, [errorMsg]);

  return (
    <form
      className='flex flex-col w-full mt-8 text-xl font-semibold'
      onSubmit={handleSubmit}
      action='/api/auth/callback/credentials'
    >
      <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
      <input
        className='w-full p-4 mb-4 border border-none rounded-md text-black'
        type='email'
        name='email'
        placeholder='Email'
        required
      />
      <input
        className='w-full p-4 mb-4 border border-none rounded-md text-black'
        type='password'
        name='password'
        placeholder='Password'
        required
      />
      <button
        className='w-full p-4 mb-4 border border-none rounded-md bg-[#46cd90] hover:bg-[#289061] transition-all duration-200'
        type='submit'
      >
        Login
      </button>
    </form>
  );
}
