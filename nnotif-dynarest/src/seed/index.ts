import { type Seq, type Method, type Req, type Transaction } from "fundation"
import { type PoolClient } from "pg"

import { create } from "../data/storage"
import { tableExists, createTable, createSeq } from "../data/ddl"
import { withTx } from "../data/transaction"
import bootstrap from "./bootstrap.json"

const commit = async (item: Req, tx: PoolClient): Promise<void> => {
  if (item.body.type === "Seq") {
    const seq = item.body as Seq
    await createSeq(seq, tx)
  }

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

  const initialized = await withTx(async (tx) => await tableExists("Resource", tx))

  if (initialized) return

  await withTx(async (tx) => {
    for (const item of data.items) {
      ensureAllowed(item.method)
      await commit(item, tx)
    }
  })
}

export { init }
