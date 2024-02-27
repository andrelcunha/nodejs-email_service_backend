import dotenv from "dotenv";
import path from "path";

const envParh = path.resolve(__dirname, "../../.env");

dotenv.config({
  path: envParh,
});

export const config = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  AWS_REGION: process.env.AWS_REGION,
  AWS_SES_SENDER: process.env.AWS_SES_SENDER,
};
