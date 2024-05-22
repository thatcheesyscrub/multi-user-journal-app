import React from 'react';
import { getProviders, signIn } from 'next-auth/react';

const SignIn = ({ providers }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default SignIn;