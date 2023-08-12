import dotenv from "dotenv";

let path: string;

if (process.env.NODE_ENV === "production") {
  path = ".env";
} else if (process.env.NODE_ENV === "dev") {
  path = ".env.dev";
} else {
  path = ".env.test";
}

dotenv.config({ path });
