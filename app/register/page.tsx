import CredentialsForm from '@/components/credentialsForm';
import { getCsrfTokenServerSideProps } from '@/utils/getCsrfToken';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getCsrfToken } from 'next-auth/react';

export default function RegistrationPage({
  csrfToken,
}: InferGetServerSidePropsType<typeof getCsrfTokenServerSideProps>) {
  return (
    <div>
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <div className='flex flex-col items-center p-10 shadow-md'>
          <h1 className='mt-10 mb-4 text-4xl font-bold lg:min-w-[430px] text-center'>
            Register an account:
          </h1>
          <CredentialsForm csrfToken={csrfToken} />
        </div>
      </div>
    </div>
  );
}
