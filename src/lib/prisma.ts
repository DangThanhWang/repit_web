// src/lib/prisma.ts - Optimized version
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // 🚀 Tắt logging trong production
    log: process.env.NODE_ENV === "development" ? ["query"] : ["error"],
    
    // 🚀 Cấu hình connection pool
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    
    // 🚀 Optimization flags
    // omit: {
    //   user: {
    //     password: true, // Không select password mặc định
    //   },
    // },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// 🚀 Connection pool middleware
prisma.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  
  // Log slow queries in development
  if (process.env.NODE_ENV === "development" && after - before > 1000) {
    console.log(`Slow Query: ${params.model}.${params.action} took ${after - before}ms`);
  }
  
  return result;
});

// 🚀 Graceful disconnect
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});