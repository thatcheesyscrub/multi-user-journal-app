import React from 'react';
import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import SignInModal from './SignInModal';
import NewPostModal from './NewPostModal';

export const Header = () => {
  const { data: session } = useSession();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center space-x-4">
        <a href="/">
          <img src="/icons/beemo.png" alt="Beemo" className="h-8 w-8" />
        </a>
        <button
          onClick={() => setIsNewPostModalOpen(true)}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          New Post
        </button>
      </div>
      <div className="flex items-center space-x-4">
        {session ? (
          <>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Sign out
            </button>
            <span>{session.user.name}</span>
          </>
        ) : (
          <button
            onClick={() => setIsSignInModalOpen(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Sign in
          </button>
        )}
      </div>
      <SignInModal isOpen={isSignInModalOpen} closeModal={() => setIsSignInModalOpen(false)}>
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-xl font-bold">Sign In</h2>
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Sign in with Google
          </button>
        </div>
      </SignInModal>
      <NewPostModal isOpen={isNewPostModalOpen} closeModal={() => setIsNewPostModalOpen(false)} />
    </nav>
  );
};

export default Header;
