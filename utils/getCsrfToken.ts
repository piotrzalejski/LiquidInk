import { GetServerSidePropsContext } from 'next';
import { getCsrfToken } from 'next-auth/react';

export async function getCsrfTokenServerSideProps(
  context: GetServerSidePropsContext
) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
