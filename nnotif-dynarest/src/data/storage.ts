import { type Res, type ResId } from "fundation"
import { type PoolClient } from "pg"

const create = async <T extends Res>(res: T, tx: PoolClient): Promise<T> => {
  throw new Error("not-implemented")
}

const fetch = <T extends Res>(id: ResId, tx: PoolClient): T => {
  throw new Error("not-implemented")
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

const search = async <T extends Res>({ type, query }: { type: string; query?: string }, tx: PoolClient): Promise<T[]> => {
  throw new Error("not-implemented")
}

export { create, fetch, edit, upsert, remove, total, search }
