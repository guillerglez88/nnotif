import express, { type Router } from "express"
import { type Route } from "fundation"

import { calcMatchIndex, stringifyPath } from "../libs/routes"
import { search } from "../data/storage"
import { withTx } from "../data/transaction"

const register = (route: Route, router: Router): void => {
  const strPath = stringifyPath(route)

  switch (route.method) {
    case "GET":
      router.get(strPath, (req, res, _next) => {
        res.status(200).json({ path: strPath })
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
