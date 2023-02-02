import { type PoolClient } from "pg"
import { v4 as uuid } from "uuid"
import { type Res, type Ref } from "fundation"
import { type InRow, type UpRow, type Sql } from "aliases"
import { type Outcome } from "validation"
import { type Row } from "data"

import { normalize } from "../libs/resource"
import { insert, update } from "./dml"
import { find, list } from "./dql"
import { bind, mapSuccess, withChecks, withHandled } from "../libs/outcome"

const create = async <T extends Res>(resource: T, tx: PoolClient): Promise<T | Outcome> => {
  const inRow: InRow<T> = {
    resource,
    id: resource.id ?? uuid(),
    type: resource.type,
    created: new Date(),
    modified: new Date(),
  }

  const row = await withHandled(async () => await insert(inRow, tx))

  return mapSuccess(row, normalize<T>)
}

const fetch = async <T extends Res>(ref: Ref, tx: PoolClient): Promise<T | Outcome> => {
  const row = await withHandled(async () => await find<T>(ref, tx))

  const check = withChecks((row: Row<T>) => [
    {
      test: row === undefined,
      issues: [
        {
          level: "error",
          code: "/Coding/outcome-issues?code=not-found",
          desc: `Entity "${ref.type}/${ref.id as string}" not found`,
        },
      ],
    },
  ])

  const valid = bind(row, check)

  return mapSuccess(valid, normalize<T>)
}

const edit = async <T extends Res>(resource: T, tx: PoolClient): Promise<T | Outcome> => {
  const upRow: UpRow<T> = {
    resource,
    id: resource.id as string,
    type: resource.type,
    modified: new Date(),
  }

  const row = await withHandled(async () => await update(upRow, tx))

  return mapSuccess(row, normalize<T>)
}

const remove = async <T extends Res>(
  _ref: Ref,
  _tx: PoolClient,
): Promise<T | Outcome> => {
  throw new Error("not-implemented")
}

const total = (_dql: Sql, _tx: PoolClient): number => {
  throw new Error("not-implemented")
}

const search = async <T extends Res>(
  type: string,
  _dql: Sql,
  tx: PoolClient,
): Promise<T[] | Outcome> => {
  const rows = await withHandled(async () => await list<T>(type, 128, tx))

  return mapSuccess(rows, (rows) => rows.map(normalize<T>))
}

export { create, fetch, edit, remove, total, search }
