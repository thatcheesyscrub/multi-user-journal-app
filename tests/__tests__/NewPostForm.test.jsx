import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import NewPostForm from '../../components/NewPostForm';
import fetch from 'cross-fetch';

global.fetch = jest.fn();

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((message) => {
    if (typeof message === 'string' && message.includes('CLIENT_FETCH_ERROR')) {
      return;
    }
    console.error(message);
  });
});

afterAll(() => {
  console.error.mockRestore();
});

test('renders NewPostForm and submits data', async () => {
  const refreshPosts = jest.fn();
  const closeModal = jest.fn();

  global.fetch.mockImplementation((url, options) => {
    if (url.includes('/api/auth/csrf')) {
      return Promise.resolve({
        json: () => Promise.resolve({ csrfToken: 'test-csrf-token' }),
      });
    }
    if (url.includes('/api/posts/create')) {
      return Promise.resolve({
        json: () => Promise.resolve({ success: true }),
      });
    }
    return Promise.resolve({});
  });

  const { getByPlaceholderText, getByText } = render(
    <SessionProvider session={{}}>
      <NewPostForm refreshPosts={refreshPosts} closeModal={closeModal} />
    </SessionProvider>
  );

  const titleInput = getByPlaceholderText('Title');
  const contentInput = getByPlaceholderText('Content');
  const postButton = getByText('Post');

  fireEvent.change(titleInput, { target: { value: 'Test Title' } });
  fireEvent.change(contentInput, { target: { value: 'Test Content' } });
  fireEvent.click(postButton);

  await waitFor(() => expect(refreshPosts).toHaveBeenCalled());
  expect(closeModal).toHaveBeenCalled();
});
