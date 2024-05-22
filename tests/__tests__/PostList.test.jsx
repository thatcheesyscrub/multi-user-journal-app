import '@testing-library/jest-dom';
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import { RefreshProvider } from '../../contexts/RefreshContext';
import PostList from '../../components/PostList';
import fetch from 'cross-fetch';

global.fetch = jest.fn();

test('renders PostList and displays posts', async () => {
  const posts = [
    { id: 1, title: 'Test Title 1', content: 'Test Content 1', author: { name: 'Test Author 1' } },
    { id: 2, title: 'Test Title 2', content: 'Test Content 2', author: { name: 'Test Author 2' } },
  ];

  global.fetch.mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(posts),
    })
  );

  const { getByText } = render(
    <SessionProvider session={{}}>
      <RefreshProvider>
        <PostList />
      </RefreshProvider>
    </SessionProvider>
  );

  const title1 = await waitFor(() => getByText('Test Title 1'));
  const title2 = await waitFor(() => getByText('Test Title 2'));

  expect(title1).toBeInTheDocument();
  expect(title2).toBeInTheDocument();
});
