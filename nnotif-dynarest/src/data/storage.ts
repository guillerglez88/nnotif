import { type PoolClient } from "pg"
import { v4 as uuid } from "uuid"
import { type Row } from "data"
import { type Res, type ResId } from "fundation"

import { normalize } from "../libs/resource"

const create = async <T extends Res>(res: T, tx: PoolClient): Promise<T> => {
  const id = res.id ?? uuid()
  const type = res.type.toLocaleLowerCase()
  const created = new Date().toUTCString()
  const modified = new Date().toUTCString()

  const sql = `INSERT INTO ${type}(id, resource, created, modified) VALUES($1, $2, $3, $4) RETURNING *`
  const params = [id, res, created, modified]

  const { rows } = await tx.query<Row<T>>(sql, params)

  return rows.map((row) => normalize(type, row))[0]
}

const fetch = async <T extends Res>(id: ResId, tx: PoolClient): Promise<T> => {
  const sql = `SELECT * FROM ${id.type} WHERE id = $1`
  const params = [id.id]

  const { rows } = await tx.query<Row<T>>(sql, params)

  return rows.map((row) => normalize(id.type, row))[0]
}

const edit = async <T extends Res>(res: T, tx: PoolClient): Promise<T> => {
  const id = res.id
  const type = res.type.toLocaleLowerCase()
  const modified = new Date().toUTCString()

  const sql = `UPDATE ${type} SET resource=$1, modified=$2 WHERE id=$3 RETURNING *`
  const params = [res, modified, id]

  const { rows } = await tx.query<Row<T>>(sql, params)

  return rows.map((row) => normalize(type, row))[0]
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
  const { rows } = await tx.query<Row<T>>(`SELECT * FROM ${type} LIMIT 128`)

  return rows.map((row) => normalize(type, row))
}

export { create, fetch, edit, remove, total, search }
