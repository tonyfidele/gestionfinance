import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma"; // Assure-toi d'avoir exporté ton Prisma client
import { getUserCompanyId } from "@/lib/auth"; // fonction fictive pour récupérer companyId depuis l'utilisateur

// Schema de validation
const entrySchema = z.object({
  date: z.string().nonempty(),
  journalId: z.string().nonempty(),
  description: z.string().nonempty(),
  lines: z
    .array(
      z.object({
        accountId: z.string().nonempty(),
        type: z.enum(["DEBIT", "CREDIT"]),
        amount: z.number().positive(),
      })
    )
    .min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = entrySchema.parse(body);

    // Récupérer l'entreprise de l'utilisateur connecté (multi-tenant)
    const companyId = await getUserCompanyId();
    if (!companyId) return NextResponse.json({ error: "Entreprise introuvable" }, { status: 401 });

    // Vérifier total Débit = total Crédit
    const totalDebit = data.lines
      .filter((l) => l.type === "DEBIT")
      .reduce((acc, l) => acc + l.amount, 0);
    const totalCredit = data.lines
      .filter((l) => l.type === "CREDIT")
      .reduce((acc, l) => acc + l.amount, 0);

    if (totalDebit !== totalCredit) {
      return NextResponse.json(
        { error: `Total Débit (${totalDebit}) ≠ Total Crédit (${totalCredit})` },
        { status: 400 }
      );
    }

    // Créer l'écriture avec les lignes
    const entry = await prisma.entry.create({
      data: {
        date: new Date(data.date),
        journalId: data.journalId,
        description: data.description,
        companyId,
        lines: {
          create: data.lines.map((l) => ({
            accountId: l.accountId,
            type: l.type,
            amount: l.amount,
          })),
        },
      },
      include: { lines: true },
    });

    return NextResponse.json(entry, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues.map((e) => e.message) },
        { status: 400 }
      );
    }
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}