import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRefresh } from '../contexts/RefreshContext';
import LoadingSpinner from './LoadingSpinner';
import SentimentIcon from './SentimentIcon';

const PostList = ({ searchTerm = '' }) => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [orderBy, setOrderBy] = useState('createdAt');
  const [sort, setSort] = useState('desc');
  const { refresh } = useRefresh();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState(searchTerm);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/posts?orderBy=${orderBy}&sort=${sort}`);
      const data = await response.json();
      setPosts(Array.isArray(data) ? data : []);
      setAllPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [orderBy, sort, refresh]);

  useEffect(() => {
    if (search.trim() === '') {
      setPosts(allPosts);
    } else {
      const term = search.toLowerCase();
      const filtered = allPosts.filter((post) => {
        const authorName = post.author ? post.author.name.toLowerCase() : 'anonymous';
        return authorName.includes(term);
      });
      setPosts(filtered);
    }
  }, [search, allPosts]);

  const handleOrderChange = (e) => {
    setOrderBy(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === '') {
      setPosts(allPosts);
    }
  };

  const handleSearch = () => {
    if (search.trim() === '') {
      setPosts(allPosts);
    } else {
      const searchTerm = search.toLowerCase();
      const filtered = allPosts.filter((post) => {
        const authorName = post.author ? post.author.name.toLowerCase() : 'anonymous';
        return authorName.includes(searchTerm);
      });
      setPosts(filtered);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {session && (
        <div className="relative mb-4">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search posts by user"
            className="border p-2 rounded pl-8 w-full"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <span className="absolute left-2 top-2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.85-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:justify-between mb-4 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex space-x-4">
          <div>
            <label htmlFor="orderBy" className="mr-2">Order By:</label>
            <select
              id="orderBy"
              value={orderBy}
              onChange={handleOrderChange}
              className="border p-2 rounded"
            >
              <option value="createdAt">Created Date</option>
              <option value="title">Title</option>
              <option value="sentimentScore">Rating Sentiment</option>
            </select>
          </div>
          <div>
            <label htmlFor="sort" className="mr-2">Sort:</label>
            <select
              id="sort"
              value={sort}
              onChange={handleSortChange}
              className="border p-2 rounded"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden max-w-full md:max-w-xl mx-auto">
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.content}</p>
              </div>
              {post.imageUrl && (
                <div className="w-full h-64 overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img src={post.imageUrl} alt={post.title} className="object-contain h-full w-full" />
                </div>
              )}
              <div className="p-4 border-t">
                <div className="text-gray-500 text-sm mb-2">{new Date(post.createdAt).toLocaleString()}</div>
                {post.author ? (
                  <p className="text-gray-700">Posted by: {post.author.name || 'Anonymous'}</p>
                ) : (
                  <p className="text-gray-700">Posted by: Anonymous</p>
                )}
                <div className="text-gray-700">Rating: <SentimentIcon score={post.sentimentScore} /></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;