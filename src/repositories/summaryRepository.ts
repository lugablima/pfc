import { prisma } from "../config/prisma";

export async function getOneByClassId(classId: string) {
  const summary = await prisma.summary.findUnique({
    where: { classId },
    select: {
      id: true,
      url: true,
      class: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return summary;
}
