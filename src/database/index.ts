// src/database/mongoClient.ts
import { Db, MongoClient } from "mongodb";

const uri: string = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName: string = process.env.MONGO_DB_NAME || "userDB";

let db: Db;

export const connectDB = async (): Promise<Db> => {
  try {
    const client: MongoClient = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    logger.info("Connected to MongoDB");
    return db;
  } catch (error) {
    logger.info("Could not connect to MongoDB", error);
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  }
};

export const getDb = (): Db => {
  if (!db) {
    throw new Error("No database found");
  }
  return db;
};
