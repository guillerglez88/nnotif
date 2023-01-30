import { type Subs, type UserSubs } from "data"

const mapFromUserSubs = (usubs: UserSubs): Subs => {
  return {
    id: usubs.id,
    email: usubs.email,
    name: usubs.name,
    gender: usubs.gender,
    dob: usubs.dob,
    consent: usubs.consent,
    newsLetterId: usubs.newsLetterId,
  }
}

export { mapFromUserSubs }
