import React from 'react';
import { useState, useEffect } from 'react';
import { useSession, signIn, getCsrfToken } from 'next-auth/react';
import SignInModal from './SignInModal';

const NewPostForm = ({ refreshPosts, closeModal }) => {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [csrfToken, setCsrfToken] = useState('');
  const [rating, setRating] = useState(1);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token);
    };
    fetchCsrfToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let imageUrl = '';
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
  
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
  
      const data = await res.json();
      if (data.error) {
        console.error('Error uploading image:', data.error);
        return;
      }
  
      imageUrl = data.file.path;
    }
  
    const response = await fetch('/api/posts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'csrf-token': csrfToken,
        'session': JSON.stringify(session),
      },
      credentials: 'include',
      body: JSON.stringify({ title, content, imageUrl, sentimentScore: rating }),
    });
  
    const postData = await response.json();
    refreshPosts();
    setTitle('');
    setContent('');
    setImage(null);
    setRating(1);
    closeModal();
  };  

  return (
    <div>
      {!session && (
        <div>
          <p>You are posting as Anonymous.</p>
          <button
            onClick={() => setIsSignInModalOpen(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Sign in to post under your name
          </button>
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
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="border p-2 rounded"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
          className="border p-2 rounded"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
          className="border p-2 rounded"
        />
        <div className="flex items-center space-x-4">
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="border p-2 rounded"
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>{'🍟'.repeat(value)}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Post
        </button>
      </form>
    </div>
  );
};

export default NewPostForm;
