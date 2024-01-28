import { prisma } from "../config/prisma";

export async function getOneByClassId(classId: string) {
  const video = await prisma.video.findUnique({
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

  return video;
}
