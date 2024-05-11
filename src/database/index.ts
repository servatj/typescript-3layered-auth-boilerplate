// src/database/mongoClient.ts
import { Db, MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb";

const uri: string = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName: string = process.env.MONGO_DB_NAME || "userDB";

let db: Db;

export const connectDB = async (): Promise<Db> => {
  const options: MongoClientOptions = {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  };
  try {
    const client: MongoClient = new MongoClient(uri, options);
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

export const getDb = async (): Promise<Db> => {
  if (db) {
    return db;
  } else {
    db = await connectDB();
    logger.info("Using existing connection");
    return db;
  }
};
