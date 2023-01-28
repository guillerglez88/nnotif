import { type ResId } from "fundation"
import { type PoolClient } from "pg"

const create = <T>(tx: PoolClient, id: ResId, content: T): T => {
  throw new Error("not-implemented")
}

const fetch = <T>(tx: PoolClient, id: ResId): T => {
  throw new Error("not-implemented")
}

const edit = <T>(tx: PoolClient, id: ResId, content: T): T => {
  throw new Error("not-implemented")
}

const upsert = <T>(tx: PoolClient, id: ResId, content: T): T => {
  throw new Error("not-implemented")
}

const remove = <T>(tx: PoolClient, id: ResId): T => {
  throw new Error("not-implemented")
}

const total = (tx: PoolClient, query: string): number => {
  throw new Error("not-implemented")
}

const search = <T>(tx: PoolClient, type: string, query: string): T[] => {
  throw new Error("not-implemented")
}

export { create, fetch, edit, upsert, remove, total, search }
