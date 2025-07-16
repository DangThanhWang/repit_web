// scripts/performance-check.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkDatabasePerformance() {
  console.log("🔍 Checking database performance...\n");
  const start = Date.now();

  // Basic connection
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Database connection: OK");
  } catch (error) {
    console.log("❌ Database connection: Failed");
    console.error(error);
    process.exit(1);
  }

  const queries = [
    {
      name: "Simple User Query",
      query: () => prisma.user.findFirst({ select: { id: true } }),
    },
    {
      name: "FlashcardSet with Relations",
      query: () =>
        prisma.flashcardSet.findFirst({
          include: { flashcards: { take: 5 } },
        }),
    },
    {
      name: "Complex Dashboard Query",
      query: () =>
        prisma.flashcardSet.findMany({
          include: {
            flashcards: { select: { id: true } },
            progresses: { select: { learned: true } },
          },
          take: 10,
        }),
    },
  ];

  for (const { name, query } of queries) {
    const qStart = Date.now();
    try {
      await query();
      const duration = Date.now() - qStart;
      console.log(`✅ ${name}: ${duration}ms`);
      if (duration > 1000) {
        console.warn(`⚠️  ${name} is slow (> ${duration}ms)`);
      }
    } catch (error) {
      console.log(`❌ ${name}: Failed`);
      console.error(error);
    }
  }

  const total = Date.now() - start;
  console.log(`\n📊 Total check time: ${total}ms`);

  await prisma.$disconnect();
}

// Only run when called via CLI
if (require.main === module) {
  checkDatabasePerformance()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
