import { type PoolClient } from "pg"
import { v4 as uuid } from "uuid"
import { type Res, type Ref } from "fundation"
import { type Sql } from "aliases"

import { normalize } from "../libs/resource"
import { insert, update } from "./dml"
import { find, list } from "./dql"

const create = async <T extends Res>(resource: T, tx: PoolClient): Promise<T> => {
  const row = await insert(
    {
      resource,
      id: resource.id ?? uuid(),
      type: resource.type,
      created: new Date(),
      modified: new Date(),
    },
    tx,
  )

  return normalize<T>(row)
}

const fetch = async <T extends Res>(ref: Ref, tx: PoolClient): Promise<T> => {
  const row = await find<T>(ref, tx)

  if (row === undefined) return row

  return normalize<T>(row)
}

const edit = async <T extends Res>(resource: T, tx: PoolClient): Promise<T> => {
  const row = await update(
    {
      resource,
      id: resource.id as string,
      type: resource.type,
      modified: new Date(),
    },
    tx,
  )

  return normalize<T>(row)
}

const remove = <T extends Res>(_ref: Ref, _tx: PoolClient): T | undefined => {
  throw new Error("not-implemented")
}

const total = (_dql: Sql, _tx: PoolClient): number => {
  throw new Error("not-implemented")
}

const search = async <T extends Res>(type: string, _dql: Sql, tx: PoolClient): Promise<T[]> => {
  const rows = await list<T>(type, 128, tx)

  return rows.map(normalize<T>)
}

export { create, fetch, edit, remove, total, search }
