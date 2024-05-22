import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { useSession, signIn } from 'next-auth/react';
import '../globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;