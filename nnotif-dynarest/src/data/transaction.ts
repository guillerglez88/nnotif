import { Pool, type PoolClient } from "pg"

import { config } from "../libs/config"

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

const withTx = async <T>(body: (tx: PoolClient) => Promise<T>): Promise<T> => {
  const tx = await begin()

  try {
    const result = await body(tx)
    await commit(tx)
    return result
  } catch (error) {
    await rollback(tx)
    throw error
  }
}

export { begin, commit, rollback, withTx }
