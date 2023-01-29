import { type Transaction, type Resource } from "fundation"
import { type PoolClient } from "pg"
import mustache from "mustache"
import fs from "fs"
import path from "path"

import { create } from "../data/storage"

const processRes = async (res: Resource, tx: PoolClient): Promise<void> => {
  const tplPath = path.resolve(__dirname, "resource-trn.json.tpl")
  const tpl = fs.readFileSync(tplPath, "utf-8")

  const model = { type: res.of, typelc: res.of.toLocaleLowerCase() }
  const json = mustache.render(tpl, model)
  const trn: Transaction = JSON.parse(json)

  for (const item of trn.items) {
    await create(item.body, tx)
  }
}

export { processRes }