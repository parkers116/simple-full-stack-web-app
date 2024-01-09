import { Pool, PoolConfig, PoolClient } from "pg";

export default class PGPool {
  pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      max: Number(process.env.DB_POOL_MAX),
      idleTimeoutMillis: Number(process.env.DB_POOL_IDLE_TIMEOUT),
      connectionTimeoutMillis: Number(process.env.DB_POOL_CONNECTION_TIMEOUT),
    });

    // this.pool.on("release", () => {
    //   console.log("postgres pool connection is released!");
    // });

    this.pool.on("error", function (err: Error, _client: any) {
      console.log(`Idle-Client Error:\n${err.message}\n${err.stack}`);
    });
  }

  /**
   * Create a client using one of the pooled connections
   *
   * @return client
   */
  async connect(): Promise<PoolClient> {
    const client = await this.pool.connect();
    return client;
  }
}
