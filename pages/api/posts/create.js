import prisma from '../../../lib/prisma';

export default async (req, res) => {
  if (req.method === 'POST') {
    const session = req.headers.session ? JSON.parse(req.headers.session) : null;
    const { title, content, imageUrl, sentimentScore } = req.body;
    const authorId = session ? session.user.id : null;

    try {
      const postData = {
        title,
        content,
        imageUrl,
        sentimentScore,
      };

      if (authorId) {
        postData.author = { connect: { id: authorId } };
      }

      const post = await prisma.post.create({
        data: postData,
        include: {
          author: true,
        },
      });
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: 'Error creating post' });
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};