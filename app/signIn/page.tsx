import {
  GithubSignInButton,
  GoogleSignInButton,
} from '@/components/authButtons';
import CredentialsForm from '@/components/credentialsForm';
import { getCsrfTokenServerSideProps } from '@/utils/getCsrfToken';
import { InferGetServerSidePropsType } from 'next';

export default function SignInPage({
  csrfToken,
}: InferGetServerSidePropsType<typeof getCsrfTokenServerSideProps>) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      {' '}
      <h1 className='mt-10 mb-4 text-4xl font-bold lg:min-w-[430px] text-center'>
        Register an account:
      </h1>
      <div className='flex flex-col items-center p-10 shadow-md'>
        <GoogleSignInButton />
        <GithubSignInButton />
        <span className='text-2xl font-semibold text-white text-center mt-8'>
          Or
        </span>
        <CredentialsForm csrfToken={csrfToken} />
      </div>
    </div>
  );
}
