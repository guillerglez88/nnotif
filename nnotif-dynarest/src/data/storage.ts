import { type Res, type ResId } from "fundation"
import { type PoolClient } from "pg"
import { v4 as uuid } from "uuid"

const create = async <T extends Res>(res: T, tx: PoolClient): Promise<T> => {
  const id = res.id ?? uuid()
  const type = res.type.toLocaleLowerCase()
  const created = new Date().toUTCString()
  const modified = new Date().toUTCString()

  const sql = `INSERT INTO ${type}(id, resource, created, modified) VALUES($1, $2, $3, $4) RETURNING *`
  const params = [id, res, created, modified]

  const { rows } = await tx.query<{ resource: T }>(sql, params)

  return rows.map(({ resource }) => resource)[0]
}

const fetch = async <T extends Res>(id: ResId, tx: PoolClient): Promise<T> => {
  const sql = `SELECT * FROM ${id.type} WHERE id = $1`
  const params = [id.id]

  const { rows } = await tx.query<{ resource: T }>(sql, params)

  return rows.map(({ resource }) => resource)[0]
}

const edit = <T extends Res>(res: T, tx: PoolClient): T => {
  throw new Error("not-implemented")
}

const upsert = <T extends Res>(res: T, tx: PoolClient): T => {
  throw new Error("not-implemented")
}

const remove = <T extends Res>(id: ResId, tx: PoolClient): T | undefined => {
  throw new Error("not-implemented")
}

const total = (query: string, tx: PoolClient): number => {
  throw new Error("not-implemented")
}

const search = async <T extends Res>(
  { type, query }: { type: string; query?: string },
  tx: PoolClient,
): Promise<T[]> => {
  const { rows } = await tx.query<{ resource: T }>(`SELECT * FROM ${type} LIMIT 128`)

  return rows.map(({ resource }) => resource)
}

export { create, fetch, edit, upsert, remove, total, search }
