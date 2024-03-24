import { Pool, PoolConfig, PoolClient } from "pg";

export default class PGPool {
  pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      max: Number(process.env.POSTGRES_POOL_MAX),
      idleTimeoutMillis: Number(process.env.POSTGRES_POOL_IDLE_TIMEOUT),
      connectionTimeoutMillis: Number(
        process.env.POSTGRES_POOL_CONNECTION_TIMEOUT
      ),
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

export const pool = new PGPool().pool;
