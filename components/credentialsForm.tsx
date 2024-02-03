'use client';

export default function CredentialsForm() {
  return (
    <form
      className='flex flex-col w-full mt-8 text-xl font-semibold'
      onSubmit={() => {}}
    >
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
        className='w-full p-4 mb-4 border border-none rounded-md bg-blue-600 hover:bg-blue-700 transition-all duration-200'
        type='submit'
      >
        Login
      </button>
    </form>
  );
}
