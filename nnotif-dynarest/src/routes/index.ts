import express, { type Router } from "express"
import { type Route } from "fundation"
import debug from "debug"

import { type Request, type Response } from "../types/aliases"
import { calcMatchIndex, stringifyPath } from "../libs/routes"
import { search } from "../data/storage"
import { withTx } from "../data/transaction"
import * as nerves from "../nerves"
import { fold } from "../libs/outcome"
import { identity } from "../libs/funcs"

debug("nnotif-dynarest:routes-index")

const handle = async (req: Request, res: Response, route: Route): Promise<void> => {
  const nerve = nerves.pick(route.code)

  await withTx(async (tx) => {
    await nerve(req, res, route, tx)
  })
}

/* eslint-disable @typescript-eslint/no-misused-promises */
const register = (route: Route, router: Router): void => {
  const strPath = stringifyPath(route)

  switch (route.method) {
    case "GET":
      router.get(strPath, async (req, res) => {
        await handle(req, res, route)
      })
      break
    case "POST":
      router.post(strPath, async (req, res) => {
        await handle(req, res, route)
      })
      break
    case "PUT":
      router.put(strPath, async (req, res) => {
        await handle(req, res, route)
      })
      break
    case "PATCH":
      router.patch(strPath, async (req, res) => {
        await handle(req, res, route)
      })
      break
    case "DELETE":
      router.delete(strPath, async (req, res) => {
        await handle(req, res, route)
      })
      break
    default:
      break
  }
}

const loadRoutes = async (): Promise<Router> => {
  const router = express.Router()

  const dbRoutes = await withTx(async (tx) => await search<Route>("Route", 0, 1024, tx))

  const routes = fold(dbRoutes, identity, (err) => {
    const message = `Error loading db routes: ${JSON.stringify(err)}`
    debug(message)
    throw new Error(message)
  })

  const sorted = routes.sort((a, b) => calcMatchIndex(b) - calcMatchIndex(a))

  for (const route of sorted) {
    register(route, router)
  }

  return router
}

export { loadRoutes }
