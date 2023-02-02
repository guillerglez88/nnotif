import { type PoolClient } from "pg"
import { v4 as uuid } from "uuid"
import { type Res, type Ref } from "fundation"
import { type InRow, type UpRow } from "aliases"
import { type Outcome } from "validation"
import { type Row } from "data"

import { normalize } from "../libs/resource"
import * as dml from "./dml"
import * as dql from "./dql"
import { bind, getSuccess, isSuccess, mapSuccess, withChecks, withHandled } from "../libs/outcome"

const create = async <T extends Res>(resource: T, tx: PoolClient): Promise<T | Outcome> => {
  const inRow: InRow<T> = {
    resource,
    id: resource.id ?? uuid(),
    type: resource.type,
    created: new Date(),
    modified: new Date(),
  }

  const row = await withHandled(async () => await dml.insert(inRow, tx))

  return mapSuccess(row, normalize<T>)
}

const fetch = async <T extends Res>(ref: Ref, tx: PoolClient): Promise<T | Outcome> => {
  const row = await withHandled(async () => await dql.find<T>(ref, tx))

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

  const row = await withHandled(async () => await dml.update(upRow, tx))

  return mapSuccess(row, normalize<T>)
}

const remove = async <T extends Res>(ref: Ref, tx: PoolClient): Promise<T | Outcome> => {
  const result = await fetch<T>(ref, tx)

  if (!isSuccess(result)) return result

  return await withHandled(async () => {
    await dml.remove(ref, tx)
    return getSuccess(result)
  })
}

const total = async (
  type: string,
  offset: number,
  limit: number,
  tx: PoolClient,
): Promise<number | Outcome> => {
  return await withHandled(async () => await dql.total(type, offset, limit, tx))
}

const search = async <T extends Res>(
  type: string,
  offset: number,
  limit: number,
  tx: PoolClient,
): Promise<T[] | Outcome> => {
  const rows = await withHandled(async () => await dql.list<T>(type, offset, limit, tx))

  return mapSuccess(rows, (rows) => rows.map(normalize<T>))
}

export { create, fetch, edit, remove, total, search }
