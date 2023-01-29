import { type Method, type Req, type Transaction } from "fundation"
import { type PoolClient } from "pg"

import { create } from "../data/storage"
import { tableExists, createTable } from "../data/ddl"
import { withTx } from "../data/transaction"
import bootstrap from "./bootstrap.json"

const commit = async (item: Req, tx: PoolClient): Promise<void> => {
  await createTable(item.body.type, tx)
  await create(item.body, tx)
}

const ensureAllowed = (method: Method): void => {
  if (!["POST", "PUT"].includes(method)) {
    throw new Error(`Method ${method} not allowed while bootstrapping app`)
  }
}

const init = async (): Promise<void> => {
  const data = bootstrap as Transaction

  await withTx(async (tx) => {
    const initialized = await tableExists("Resource", tx)

    if (initialized) return

    for (const item of data.items) {
      ensureAllowed(item.method)
      await commit(item, tx)
    }
  })
}

export { init }
