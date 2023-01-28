import { type Route } from "fundation"

const calcMatchIndex = (route: Route): number => {
  return (route.path ?? []).filter(({ value }) => value).length
}

const stringifyPath = (route: Route): string => {
  return "/" + (route.path ?? []).map(({ name, value }) => value ?? `:${name}`).join("/")
}

export { calcMatchIndex, stringifyPath }
