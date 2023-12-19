import * as videoRepository from "../repositories/videoRepository";
import * as errorHandling from "../errors/errorHandling";
import { ModulePayload } from "../types/moduleTypes";

export async function validateVideo(videoUrl: string) {
  const registeredVideo = await videoRepository.findOneByUrl(videoUrl);

  if (registeredVideo) {
    throw errorHandling.conflict("This video url already exists.");
  }
}

export async function validateVideoUrlConflict(module: ModulePayload) {
  const videosObj: { [key: string]: boolean } = {};

  // eslint-disable-next-line no-return-assign
  module.classes.forEach((_class) => (videosObj[_class.videoUrl.toLowerCase()] = true));

  if (Object.keys(videosObj).length !== module.classes.length) {
    throw errorHandling.badRequest("There are repeated video urls in the request.");
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const videoUrl of Object.keys(videosObj)) {
    // eslint-disable-next-line no-await-in-loop
    await validateVideo(videoUrl);
  }
}
