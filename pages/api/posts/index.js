import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { orderBy = 'createdAt', sort = 'desc' } = req.query;

  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        [orderBy]: sort,
      },
      include: {
        author: true,
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}