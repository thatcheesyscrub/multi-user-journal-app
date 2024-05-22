import React from 'react';
import { useState } from 'react';
import Layout from '../components/Layout';
import PostList from '../components/PostList';

const Journal = () => {
  const [refresh, setRefresh] = useState(false);

  const refreshPosts = () => {
    setRefresh(!refresh);
  };

  return (
    <Layout refreshPosts={refreshPosts}>
      <PostList key={refresh} />
    </Layout>
  );
};

export default Journal;