import { Pool, type PoolClient } from "pg"

import { config } from "../libs/config"

const pool = new Pool({ connectionString: config.db })

const begin = async (): Promise<[PoolClient, () => void]> => {
  const client = await pool.connect()

  await client.query("BEGIN")

  return [
    client,
    () => {
      client.release()
    },
  ]
}

const commit = async (tx: PoolClient): Promise<void> => {
  await tx.query("COMMIT")
}

const rollback = async (tx: PoolClient): Promise<void> => {
  await tx.query("ROLLBACK")
}

const withTx = async <T>(body: (tx: PoolClient) => Promise<T>): Promise<T> => {
  const [tx, release] = await begin()

  try {
    const result = await body(tx)
    await commit(tx)
    return result
  } catch (error) {
    await rollback(tx)
    throw error
  } finally {
    release()
  }
}

export { begin, commit, rollback, withTx }
