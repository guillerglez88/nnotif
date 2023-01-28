import express, { type Router } from "express"
import { type Route } from "fundation"

import { type Request, type Response } from "../types/aliases"
import { calcMatchIndex, stringifyPath } from "../libs/routes"
import { search } from "../data/storage"
import { withTx } from "../data/transaction"
import * as nerves from "../nerves"

const handle = (req: Request, res: Response, route: Route): void => {
  const nerve = nerves.pick(route.code)
  nerve(req, res, route)
}

const register = (route: Route, router: Router): void => {
  const strPath = stringifyPath(route)

  switch (route.method) {
    case "GET":
      router.get(strPath, (req, res) => {
        handle(req, res, route)
      })
      break
    case "POST":
      router.post(strPath, (req, res) => {
        handle(req, res, route)
      })
      break
    case "PUT":
      router.put(strPath, (req, res) => {
        handle(req, res, route)
      })
      break
    case "PATCH":
      router.patch(strPath, (req, res) => {
        handle(req, res, route)
      })
      break
    case "DELETE":
      router.delete(strPath, (req, res) => {
        handle(req, res, route)
      })
      break
    default:
      break
  }
}

const loadRoutes = async (): Promise<Router> => {
  const router = express.Router()

  const routes = await withTx(async (tx) => await search<Route>({ type: "Route" }, tx))
  const sorted = routes.sort((a, b) => calcMatchIndex(b) - calcMatchIndex(a))

  for (const route of sorted) {
    register(route, router)
  }

  return router
}

export { loadRoutes }
