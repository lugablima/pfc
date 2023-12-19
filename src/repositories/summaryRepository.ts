import { prisma } from "../config/prisma";
import { TSummary } from "../types/summaryTypes";

export async function findOneByUrl(url: string): Promise<TSummary | null> {
  const registeredSummary: TSummary | null = await prisma.summary.findUnique({
    where: { url },
  });

  return registeredSummary;
}
