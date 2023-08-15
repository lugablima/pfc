/* eslint-disable newline-per-chained-call */
import joi from "joi";
import { SignUpUser } from "../types/authTypes";

export const signUpSchema = joi.object<SignUpUser>({
  name: joi.string().trim().required(),
  email: joi.string().email().required(),
  password: joi.string().trim().min(6).max(12).required(),
});
