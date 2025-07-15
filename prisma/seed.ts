import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  console.log(`🌱 Seeding...`);

  const hashedPassword = await bcrypt.hash("dangthanhquang", 10);

  const user1 = await prisma.user.create({
    data: {
      email: "alice@example.com",
      password: hashedPassword,
      name: "Alice",
      flashcardSets: {
        create: [
          {
            title: "Basic English Vocabulary",
            description: "Common English words for beginners",
            flashcards: {
              create: [
                { question: "Apple", answer: "Táo" },
                { question: "Book", answer: "Sách" },
                { question: "Car", answer: "Xe hơi" },
              ],
            },
          },
          {
            title: "Colors",
            description: "Learn basic colors",
            flashcards: {
              create: [
                { question: "Red", answer: "Đỏ" },
                { question: "Green", answer: "Xanh lá" },
                { question: "Blue", answer: "Xanh dương" },
              ],
            },
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "bob@example.com",
      password: hashedPassword,
      name: "Bob",
    },
  });

  const course = await prisma.course.create({
    data: {
      name: "Beginner English Course",
      description: "Course for beginners to learn English",
      memberships: {
        create: [
          { userId: user1.id, role: "member" },
          { userId: user2.id, role: "admin" },
        ],
      },
    },
  });

  const firstSet = await prisma.flashcardSet.findFirst({
    where: { userId: user1.id },
  });

  if (firstSet) {
    await prisma.flashcardProgress.create({
      data: {
        userId: user1.id,
        setId: firstSet.id,
        learned: 2,
      },
    });
  }

  console.log(`✅ Done seeding!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
