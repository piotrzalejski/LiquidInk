import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
// import { getServerSession } from 'next-auth';
// import SessionProvider from './components/provider';

export const metadata: Metadata = {
  title: 'LiquidInk',
  description: 'Note-taking Markdown Editor',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getServerSession();
  return (
    <html lang='en'>
      <body>
        {children}
        <Toaster position='top-right' />
      </body>
    </html>
  );
}
