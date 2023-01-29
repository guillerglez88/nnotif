import { type Sql } from "aliases"
import { type Row } from "data"
import { type Res, type Ref } from "fundation"
import { type PoolClient } from "pg"

const findDQL = (ref: Ref): Sql => {
  const dql: Sql = [
    `SELECT * 
     FROM ${ref.type} 
     WHERE id = $1`,
    ref.id,
  ]

  return dql
}

const listDQL = (type: string, limit: number): Sql => {
  const dql: Sql = [
    `SELECT * 
     FROM ${type} 
     LIMIT ${limit}`,
  ]

  return dql
}

const find = async <T extends Res>(ref: Ref, tx: PoolClient): Promise<Row<T>> => {
  const [dql, ...params]: Sql = findDQL(ref)
  const { rows } = await tx.query<Row<T>>(dql as string, params)

  return rows[0]
}

const list = async <T extends Res>(
  type: string,
  limit: number,
  tx: PoolClient,
): Promise<Array<Row<T>>> => {
  const [dql, ...params]: Sql = listDQL(type, limit)
  const { rows } = await tx.query<Row<T>>(dql as string, params)

  return rows
}

export { findDQL, listDQL, find, list }
