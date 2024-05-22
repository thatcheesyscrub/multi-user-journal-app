import { findPost } from '../../../prisma/helpers/post';

const handleGET = async (postId, res) => {
  const post = await findPost(postId);
  res.json(post);
};

export default async (req, res) => {
  const postId = req.query.id;

  if (req.method === 'GET') {
    await handleGET(postId, res);
  } else {
    throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
};