import {
  CredentialsSignInButton,
  GithubSignInButton,
  GoogleSignInButton,
} from '@/components/authButtons';
import CredentialsForm from '@/components/credentialsForm';

export default function SignInPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <div className='flex flex-col items-center p-10 shadow-md'>
        <h1 className='mt-10 mb-4 text-4xl font-bold'>Sign In</h1>
        <GoogleSignInButton />
        <GithubSignInButton />
        {/* <button onClick={() => signOut()}>Sign Out</button> */}
        <span className='text-2xl font-semibold text-white text-center mt-8'>
          Or
        </span>
        {/* <CredentialsSignInButton /> */}
        <CredentialsForm />
      </div>
    </div>
  );
}
