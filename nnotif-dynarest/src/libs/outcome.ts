import { type Issue, type Check, type Outcome } from "validation"

import { identity } from "./funcs"

const EMPTY: Outcome = { type: "Outcome", issues: [] }

const isSuccess = <T>(source: Outcome | T): boolean => {
  return (source as Outcome)?.type !== "Outcome"
}

const getSuccess = <T>(source: T | Outcome): T => {
  return fold(source, identity, () => {
    throw new Error("source is a failure")
  })
}

const getFailure = <T>(source: T | Outcome): Outcome => {
  return fold(
    source,
    () => {
      throw new Error("source is a success")
    },
    identity,
  )
}

const check = (checks: Check[]): Outcome => {
  const issues = checks
    .filter(({ test }) => test) //
    .flatMap(({ issues: issue }) => issue)

  return { type: "Outcome", issues }
}

const mapSuccess = <T, W>(source: T | Outcome, map: (t: T) => W): W | Outcome => {
  return fold<T, W | Outcome>(source, map, identity)
}

const mapFailure = <T>(source: T | Outcome, map: (o: Outcome) => Outcome): T | Outcome => {
  return fold<T, T | Outcome>(source, identity, map)
}

const fold = <T, W>(
  source: Outcome | T,
  ifValid: (val: T) => W,
  ifNotValid: (outcome: Outcome) => W,
): W => {
  const outcome = source as Outcome

  if (isSuccess(source)) {
    return ifValid(source as T)
  } else {
    return ifNotValid(outcome)
  }
}

const bind = <T, W>(source: T | Outcome, inner: (t: T) => W | Outcome): W | Outcome => {
  const outcome = source as Outcome

  if (outcome?.type === "Outcome") return outcome

  return inner(source as T)
}

const withHandled = async <T>(
  body: () => Promise<T | Outcome>,
  issues?: Issue[],
): Promise<T | Outcome> => {
  try {
    return await body()
  } catch (error) {
    const outcome: Outcome = {
      type: "Outcome",
      issues: issues ?? [
        {
          level: "error",
          code: "/Coding/outcome-issues?code=exception",
          desc: `Error caught: ${(error as Error).message}, ${JSON.stringify(error)}`,
        },
      ],
    }

    return outcome
  }
}

const withChecks = <T>(getChecks: (t: T) => Check[]): ((t: T) => T | Outcome) => {
  return (t) => {
    const checks = getChecks(t)
    const outcome = check(checks)

    if (outcome.issues.length === 0) return t

    return outcome
  }
}

export {
  EMPTY,
  isSuccess,
  getSuccess,
  getFailure,
  check,
  mapSuccess,
  mapFailure,
  fold,
  bind,
  withHandled,
  withChecks,
}
