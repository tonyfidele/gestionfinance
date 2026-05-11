import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany();
  return new Response(JSON.stringify(users));
}

export async function POST(req: Request) {
  const { email } = await req.json();
  const user = await prisma.user.create({ data: { email } });
  return new Response(JSON.stringify(user));
}
