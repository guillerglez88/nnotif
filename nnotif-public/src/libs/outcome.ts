import { type Check, type Outcome } from "validation"

const EMPTY: Outcome = { type: "Outcome", issues: [] }

const isValid = (outcome: Outcome): boolean => {
  return (outcome.issues ?? []).length === 0
}

const check = (checks: Check[]): Outcome => {
  const issues = checks
    .filter(({ test }) => test) //
    .flatMap(({ issues: issue }) => issue)

  return { type: "Outcome", issues }
}

const mapValid = <T>(outcome: Outcome, ifValid: () => T): Outcome | T => {
  if (isValid(outcome)) {
    return ifValid()
  }

  return outcome
}

const fold = <T, W>(
  source: Outcome | T,
  ifValid: (val: T) => W,
  ifNotValid: (outcome: Outcome) => W,
): W => {
  const outcome = source as Outcome

  if (outcome.type === "Outcome") {
    return ifNotValid(outcome)
  } else {
    return ifValid(source as T)
  }
}

export { EMPTY, isValid, check, mapValid, fold }
