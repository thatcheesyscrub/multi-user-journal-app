import prisma from '../../lib/prisma';

export const fetchPosts = (orderBy = 'createdAt', sort = 'desc') => {
  return prisma.post.findMany({
    orderBy: {
      [orderBy]: sort,
    },
    include: {
      author: true,
    },
  });
};

export const findPost = (id) => {
  return prisma.post.findUnique({
    where: { id: Number(id) },
    include: { author: true },
  });
};

export async function createPost({ title, content, imageUrl, authorId }) {
  console.log('Data received for post creation:', { title, content, imageUrl, authorId });
  const anonymousUser = await prisma.user.findUnique({ where: { name: 'Anonymous' } });
  return await prisma.post.create({
    data: {
      title,
      content,
      imageUrl,
      author: authorId ? { connect: { id: authorId } } : { connect: { id: anonymousUser.id } },
    },
    include: {
      author: true,
    },
  });
}