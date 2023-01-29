import { type RoutePathComp, type Route } from "fundation"

const calcMatchIndex = (route: Route): number => {
  return (route.path ?? []).filter(({ value }) => value).length
}

const stringifyPath = (route: Route): string => {
  return "/" + (route.path ?? []).map(({ name, value }) => value ?? `:${name}`).join("/")
}

const getPathComp = (code: string, route: Route): RoutePathComp => {
  return (route.path ?? []).filter((cmp) => cmp.code === code)[0]
}

const getPathTypeValue = (route: Route): string => {
  return getPathComp("/Coding/wellknown-params?code=type", route).value as string
}

const getPathIdName = (route: Route): string | undefined => {
  return getPathComp("/Coding/wellknown-params?code=id", route)?.name
}

export { calcMatchIndex, stringifyPath, getPathComp, getPathTypeValue, getPathIdName }
