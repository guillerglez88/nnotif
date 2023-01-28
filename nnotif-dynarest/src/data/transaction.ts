import { Pool, type PoolClient } from "pg"

import { config } from "@libs/config"

const COMMIT = "COMMIT"
const ROLLBACK = "ROLLBACK"

const pool = new Pool({ connectionString: config.db })

const begin = async (): Promise<PoolClient> => {
  const client = await pool.connect()

  return client
}

const commit = async (client: PoolClient): Promise<void> => {
  await client.query(COMMIT)
}

const rollback = async (client: PoolClient): Promise<void> => {
  await client.query(ROLLBACK)
}

export { begin, commit, rollback }
