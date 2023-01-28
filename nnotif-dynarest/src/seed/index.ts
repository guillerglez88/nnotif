import { type Method, type Req, type Transaction } from "fundation"
import { type PoolClient } from "pg"

import { create, search } from "../data/storage"
import { storageDDL } from "../data/ddl"
import { withTx } from "../data/transaction"
import bootstrap from "./bootstrap.json"

const commit = async (item: Req, tx: PoolClient): Promise<void> => {
  const ddl = storageDDL(item.body.type)
  await tx.query(ddl)
  await create(item.body, tx)
}

const ensureAllowed = (method: Method): void => {
  if (!["POST", "PUT"].includes(method)) {
    throw new Error(`Method ${method} not allowed while bootstrapping app`)
  }
}

const isAlreadyInit = async (tx: PoolClient): Promise<boolean> => {
  try {
    await search({ type: "Resource" }, tx)
    return true
  } catch (_error) {
    return false
  }
}

const init = async (): Promise<void> => {
  const data = bootstrap as Transaction

  await withTx(async (tx) => {
    if (await isAlreadyInit(tx)) return

    for (const item of data.items) {
      ensureAllowed(item.method)
      await commit(item, tx)
    }
  })
}

export { init }
