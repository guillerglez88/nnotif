export interface Outcome {
  issues: Issue[]
}

export interface Issue {
  level: IssueLevel
  code: WellknownCodes
  desc: string
}

export type IssueLevel = "info" | "warn" | "error"

export type WellknownCodes =
  | "/Coding/nnotif-public-subs-issue?code=required"
  | "/Coding/nnotif-public-subs-issue?code=value"
