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

export interface Check {
  test: boolean
  issues: Issue[]
}