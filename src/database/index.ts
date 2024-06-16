import { Db, MongoClient, MongoClientOptions } from "mongodb";

let db: Db;

export class DbClient {
  private static instance: DbClient;

  constructor() {}

  public static getInstance(): DbClient {
    if (!DbClient.instance) {
      DbClient.instance = new DbClient();
    }
    return DbClient.instance;
  }

  public async connectDB(): Promise<Db> {
    try {
      const uri: string = process.env.MONGO_URI || "mongodb://localhost:27017";
      const dbName: string = process.env.MONGO_DB_NAME || "testUserDB";
      logger.info("uri" + dbName);
      const options: MongoClientOptions = {};
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
  }

  public async getDb(): Promise<Db> {
    if (db) {
      return db;
    } else {
      db = await this.connectDB();
      logger.info("Using existing connection");
      return db;
    }
  }
}
