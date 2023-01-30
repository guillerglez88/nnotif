export interface Subs {
    email: string,
    name?: HumanName
    gender?: string
    dob: Date
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