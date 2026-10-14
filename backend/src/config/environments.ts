import dotenv from "dotenv";
dotenv.config();

const environments = {
  Port: process.env.PORT,
  DatabaseUrl: process.env.DATABASE_URL,
};

export default environments;
