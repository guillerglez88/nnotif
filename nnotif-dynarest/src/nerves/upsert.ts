import { type Request, type Response } from "aliases"
import { type Route } from "fundation"
import { type PoolClient } from "pg"

import { fetch } from "../data/storage"
import { getPathIdName, getPathTypeValue } from "../libs/routes"
import * as create from "./create"
import * as update from "./update"

const handler = async (
  req: Request,
  res: Response,
  route: Route,
  tx: PoolClient,
): Promise<void> => {
  const type = getPathTypeValue(route)
  const id = req.params[getPathIdName(route)] as string
  const entity = await fetch({ type, id }, tx)

  if (entity === undefined) {
    await create.handler(req, res, route, tx)
  } else {
    await update.handler(req, res, route, tx)
  }
}

export { handler }
