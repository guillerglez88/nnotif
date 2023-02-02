import { type Request, type Response } from "aliases"
import { type Route } from "fundation"
import { type PoolClient } from "pg"

import { fetch } from "../data/storage"
import { getPathIdName, getPathTypeValue } from "../libs/routes"
import * as create from "./create"
import * as update from "./update"
import { getFailure, isNotFound, isSuccess } from "../libs/outcome"
import { intServErr, withResp } from "../libs/response"

const handler = async (
  req: Request,
  res: Response,
  route: Route,
  tx: PoolClient,
): Promise<void> => {
  const type = getPathTypeValue(route)
  const idKey = getPathIdName(route) as string
  const id = req.params[idKey] as string
  const entity = await fetch({ type, id }, tx)

  if (isSuccess(entity)) {
    await update.handler(req, res, route, tx)
    return
  }

  const outcome = getFailure(entity)

  if (isNotFound(outcome)) {
    await create.handler(req, res, route, tx)
    return
  }

  withResp(entity, intServErr, res)
}

export { handler }
