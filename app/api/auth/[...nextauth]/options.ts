import type { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '@/utils/database';
import User from '@/models/User';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'username@domain.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        console.log(credentials); // TODO - remove when complete

        try {
          await connectDB();

          // check if user exists
          const dbUser = await User.findOne({
            email: credentials.email,
          });

          if (
            dbUser &&
            (await bcrypt.compare(credentials.password, dbUser.password))
          ) {
            //console.log(`User: ${credentials.email} has been authenticated.`);
            return dbUser;
          }

          // if not
          if (!dbUser) {
            console.log(`User: ${credentials.email} does not exist.`);
          } else {
            console.log(`Incorrect password for user: ${credentials.email}`);
          }
          return null;
        } catch (error) {
          console.log('something went wrong: ', error);
          return null;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GH_ID as string,
      clientSecret: process.env.GH_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
};
