export interface Subs {
  email: string
  name?: HumanName
  gender?: string
  dob: string
  consent: boolean
  newsLetterId: string
}

export interface HumanName {
  given: string[]
  family?: string[]
  title?: string[]
  prefix?: string[]
  suffix?: string[]
}

export interface Res {
  id?: string
  type: string
}

export interface UserSubs extends Subs, Res {
  type: "UserSubs"
  url?: string
  etag?: string
}
