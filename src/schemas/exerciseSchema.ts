import joi from "joi";
import { TCreateResolutionPayload } from "../types/resolutionTypes";

export const createResolutionSchema = joi.object<TCreateResolutionPayload>({
  resolution: joi.string().trim().required(),
  grade: joi.number().required(),
});
