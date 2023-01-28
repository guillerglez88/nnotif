import { Pool, type PoolClient } from "pg"

const COMMIT = "COMMIT"
const ROLLBACK = "ROLLBACK"

const pool = new Pool()

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
