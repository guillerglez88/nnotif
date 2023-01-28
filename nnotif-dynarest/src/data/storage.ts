import { type ResId } from "fundation"

const create = <T>(tx: object, id: ResId, content: T): T => {
  throw new Error("not-implemented")
}

const fetch = <T>(tx: object, id: ResId): T => {
  throw new Error("not-implemented")
}

const edit = <T>(tx: object, id: ResId, content: T): T => {
  throw new Error("not-implemented")
}

const upsert = <T>(tx: object, id: ResId, content: T): T => {
  throw new Error("not-implemented")
}

const remove = <T>(tx: object, id: ResId): T => {
  throw new Error("not-implemented")
}

const total = (tx: object, query: string): number => {
  throw new Error("not-implemented")
}

const search = <T>(tx: object, type: string, query: string): T[] => {
  throw new Error("not-implemented")
}

export { create, fetch, edit, upsert, remove, total, search }
