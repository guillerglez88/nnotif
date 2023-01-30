import { type Transaction } from "fundation"

import { create } from "../data/storage"
import { tableExists, createTable } from "../data/ddl"
import { withTx } from "../data/transaction"
import nnotifPublic from "./nnotif-public.json"

const seed = async (): Promise<void> => {
  const data = nnotifPublic as Transaction

  const initialized = await withTx(async (tx) => await tableExists("UserSubs", tx))

  if (initialized) return

  await withTx(async (tx) => {
    await createTable("UserSubs", tx)

    for (const item of data.items) {
      await create(item.body, tx)
    }
  })
}

export { seed }
