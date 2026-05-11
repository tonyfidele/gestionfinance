// // lib/prisma.ts
// import { PrismaClient } from "@prisma/client";

// // On crée juste une instance unique
// let prisma: PrismaClient;

// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient();
// } else {
//   // Eviter les multiples instances en dev
//   if (!(global as any).prisma) {
//     (global as any).prisma = new PrismaClient();
//   }
//   prisma = (global as any).prisma;
// }

// export default prisma;
//import { PrismaClient } from '@prisma/client';

//const prisma = new PrismaClient();
//export default prisma;


import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}