// src/lib/prisma.ts - Thay thế toàn bộ file
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error"] : ["error"], // ✅ Disable query logs
    
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// ✅ Remove slow query middleware - causes overhead
// prisma.$use(async (params, next) => {
//   const before = Date.now();
//   const result = await next(params);
//   const after = Date.now();
  
//   if (process.env.NODE_ENV === "development" && after - before > 1000) {
//     console.log(`Slow Query: ${params.model}.${params.action} took ${after - before}ms`);
//   }
  
//   return result;
// });

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});