import { prisma } from "../config/prisma";
import { TVideo } from "../types/videoTypes";

export async function findOneByUrl(url: string): Promise<TVideo | null> {
  const registeredVideo: TVideo | null = await prisma.video.findUnique({
    where: { url },
  });

  return registeredVideo;
}
