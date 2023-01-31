export interface Outcome {
  type: "Outcome"
  issues: Issue[]
}

export interface Issue {
  level: IssueLevel
  code: string
  desc?: string
}

export type IssueLevel = "info" | "warn" | "error"

export type WellknownCodes =
  | "/Coding/nnotif-public-subs-issue?code=required"
  | "/Coding/nnotif-public-subs-issue?code=value"
  | "/Coding/nnotif-public-subs-issue?code=exception"
  | "/Coding/nnotif-public-subs-issue?code=business-rule"

export interface Check {
  test: boolean
  issues: Issue[]
}
