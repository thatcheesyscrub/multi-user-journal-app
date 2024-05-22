const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const userData = [
  {
    name: 'Jane',
    email: 'jane@example.com',
  },
  {
    name: 'Joe',
    email: 'joe@example.com',
  },
  {
    name: 'Anonymous',
    email: 'anonymous@example.com',
  },
  {
    name: 'Marceline Abadeer',
    email: 'marceline@example.com',
  }
];

const postData = [
  {
    title: 'DAY 1',
    content: 'Today I was to start my scientific journal on the aftermath of the massive worldwide destruction. The mutagenic horrors. The glowing rainstorms. The waves of toxicity in the atmosphere. Those glowing particles that ride the air currents and blow through the ruined cities at night like fireflies.\n\nI was going to start writing about it-but, instead, I found a child.\n\nA little girl, about four or five years old I think. I found this note in her pocket.',
    imageUrl: 'https://res.cloudinary.com/dkzct1gy0/image/upload/f_auto,q_auto/7a4e3f91b410a09b03f60d375c87bbc45c73fb8dr1-1033-789v2_00_e3hinw.jpg',
    sentimentScore: 5,
    authorEmail: 'anonymous@example.com'
  },
  {
    title: 'DAY 2',
    content: 'I forget what number 4 is you see, I\'m losing it. I\'m forgetting things all the time. My mind used to be a steel trap.\n\nOh! I remember what number 4 is. Marceline the sweetest, funniest, smartest, dearest little girl in the world. I am so lucky I found her.\nI must keep it together for her. She gives my life a purpose, something to live for. I\'d do anything to protect her.\n\nANYTHING.\n\nShe needs me and I need her.',
    sentimentScore: 4,
    authorEmail: 'anonymous@example.com'
  },
  {
    title: 'DAY 50-SOMETHING-ISH',
    content: 'I promised not to, but I felt an urge to wear the crown today. It made me feel crazy again. No more! We keep moving around to avoid the hot spots where the creatures seem to be plentiful downtown. In a relatively safe area, I found the least wrecked penthouse apartment in an old shattered hotel at night we\'d look down from the balcony over the expanse of the ruined city. And that\'s when Marcy saw something and told me to come outside. I looked over the rails with her and didn\'t see anything at first. Then she told me to squint my eyes, and she pointed. There were things moving through the streets right below us. They were like people, but floating, transparent. Some white, some reddish, some bluish. Our eyes had to get used to it. You had to squint just right to see them.\n\nThey were EVERYWHERE.\n\nGHOSTS.\n\nIt was as if the population of the city had turned into transparent ghosts, hundreds of ghost pedestrians walking up and down the streets below. I don\'t know if they knew where they were going.\n\nWhen my eyes adjusted I could see them better, I was stunned. I told Gunther to wait, and I ran down the stairs to the street.',
    sentimentScore: 3,
    authorEmail: 'anonymous@example.com'
  },
  {
    title: 'N/A',
    content: 'Okay. I think I\'m losing it for real. I am thinking of a kingdom. A kingdom of ice. It\'s mine. My kingdom I have to go there.\nNO. NONONONO\nI hope I can write again. I\'ll try. But if I can\'t...\n\nI know what to do. This will be my last sane act. I will give this journal to Marcy. Tell her to keep a record. I\'ll keep my notes with me for posterity. If I ever collect them into another book, I\'ll dedicate it to my darling Betty.\n\nI don\'t know what\'s going to happen if I lose my mind for good. I\'m going to talk to Marcy soon about what I have to do. About leaving for my ice kingdom! No! Stop it! If I ever accidentally hurt her while in the manic stages of my madness, I could never forgive myself. I promise I won\'t let that happen.\n\nEVER.\n\nI know I can control myself for a while longer but soon week or months or years from now, when I finally lose it, I\'ll need someone to take care of her when I\'m gone.\n\nFor now, I can still be responsible and protect her but when it happens, I\'ll be ready to do what I have to do.\n\nGod help me.',
    imageUrl: 'https://res.cloudinary.com/dkzct1gy0/image/upload/fl_preserve_transparency/v1716311083/2024-05-21_13_04_17-Hi_You_can_call_me_Blu_reading_Marceline_s_Scrapbook_honestly_and_truly..._xi1wvd.jpg',
    sentimentScore: 1,
    authorEmail: 'anonymous@example.com'
  },
  {
    title: 'DAY 4 WITHOUT DAD',
    content: 'Lonely again. Loneliness is the worst, Diary! I know now that I took for granted my time with Simon. He was so good to me. Why did he have to go completely nuts? Now I have two "fathers" who are crazy! Not to mention no friends, no mother, no purpose, just me.',
    sentimentScore: 1,
    authorEmail: 'marceline@example.com'
  },
  {
    title: 'N/A',
    content: 'When I wake up, I might meet my Dad again and finally learn the rest of the story. Why I was alone, what happened between him and Mom.\n\nBut I was lucky I met Simon. I miss him so much. Maybe I\'ll see him again someday, somehow. I love him as much as I love my Dad. Maybe more.\n\nAfter our long sleep, when this magic icy climate dissolves, I hope Schwabi and Hambo and I wake up to find ourselves in a New World and a New Beginning.',
    sentimentScore: 4,
    authorEmail: 'marceline@example.com'
  }
];

async function main() {
  console.log(`Start seeding ...`);

  for (const u of userData) {
    const existingUser = await prisma.user.findUnique({
      where: { email: u.email },
    });

    if (!existingUser) {
      const user = await prisma.user.create({
        data: u,
      });
      console.log(`Created user with id: ${user.id}`);
    } else {
      console.log(`User with email ${u.email} already exists.`);
    }
  }

  for (const postDataItem of postData) {
    const { authorEmail, ...postDetails } = postDataItem;
    const post = await prisma.post.create({
      data: {
        ...postDetails,
        author: {
          connect: { email: authorEmail }
        }
      },
    });
    console.log(`Created post with id: ${post.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
