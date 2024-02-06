'use client';
import React from 'react';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCsrfToken } from 'next-auth/react';
import { InferGetServerSidePropsType } from 'next';
import { getCsrfTokenServerSideProps } from '@/utils/getCsrfToken';

type SignInResponse = {
  ok?: boolean;
  error?: string | undefined;
  status: number;
};

export default function CredentialsForm({
  csrfToken,
}: InferGetServerSidePropsType<typeof getCsrfTokenServerSideProps>) {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const isRegisterRoute = usePathname() === '/register';

  const handleSignInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const signInResponse = (await signIn('credentials', {
      email: data.get('email'),
      password: data.get('password'),
      redirect: false,
    })) as SignInResponse;

    if (signInResponse && signInResponse.ok) {
      router.push('/');
    } else {
      setErrorMsg('Email or Password is incorrect!');
      console.log(
        `Status: ${signInResponse.status}
      Error: ${signInResponse.error}`
      );
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const fullName = `${data.get('name')} ${data.get('lastName')}`;
    const capitalizedFullName = fullName
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    console.log(data.get('email'), data.get('password'));
    const res = await fetch('/api/Users', {
      method: 'POST',
      body: JSON.stringify({
        fullName: capitalizedFullName,
        email: data.get('email'),
        password: data.get('password'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      const error = await res.json();
      setErrorMsg(error.message);
      return;
    } else {
      console.log('Registering:', data.get('email'), data.get('password'));
      toast.success('Registration successful!');
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
      onSubmit={isRegisterRoute ? handleRegisterSubmit : handleSignInSubmit}
      action='/api/auth/callback/credentials'
    >
      <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
      {isRegisterRoute && (
        <div className='flex flex-col md:flex-row md:gap-4 md:max-w-[430px]'>
          <input
            className='w-full p-4 mb-4 border border-none rounded-md text-black'
            type='text'
            name='name'
            placeholder='First Name'
            required
          />
          <input
            className='w-full p-4 mb-4 border border-none rounded-md text-black'
            type='text'
            name='lastName'
            placeholder='Last Name'
            required
          />
        </div>
      )}
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
        {isRegisterRoute ? 'Register' : 'Login'}
      </button>
      <p className='flex justify-center items-center'>
        {isRegisterRoute
          ? 'Already have an account?'
          : "Don't have an account?"}
        <a
          href={isRegisterRoute ? '/signIn' : '/register'}
          className='pl-3 text-[#46cd90] hover:text-[#289061] transition-all duration-200 cursor-pointer'
        >
          {isRegisterRoute ? 'Login here' : 'Register here'}
        </a>
      </p>
    </form>
  );
}
