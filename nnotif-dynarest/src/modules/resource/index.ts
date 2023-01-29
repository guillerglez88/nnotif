import { type Transaction, type Resource } from "fundation"
import { type PoolClient } from "pg"
import mustache from "mustache"
import fs from "fs"
import path from "path"

import { create } from "../../data/storage"
import { provision } from "../../data/ddl"

const processRes = async (res: Resource, tx: PoolClient): Promise<void> => {
  const tplPath = path.resolve(__dirname, "trn.json.tpl")
  const tpl = fs.readFileSync(tplPath, "utf-8")

  const model = { type: res.of, typelc: res.of.toLocaleLowerCase() }
  const json = mustache.render(tpl, model)
  const trn: Transaction = JSON.parse(json)

  await provision(res.of, tx)

  for (const item of trn.items) {
    await create(item.body, tx)
  }
}

export { processRes }
