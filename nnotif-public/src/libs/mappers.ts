import { type Subs, type UserSubs } from "data"
import url from "node:url"
import qs from "node:querystring"

const mapFromUserSubs = (usubs: UserSubs): Subs => {
  const statusUrl = url.parse(usubs.status)
  const statusQs = qs.parse(statusUrl.query as string)
  const statusCode = statusQs.code as string

  return {
    id: usubs.id,
    status: statusCode,
    email: usubs.email,
    name: usubs.name,
    gender: usubs.gender,
    dob: usubs.dob,
    consent: usubs.consent,
    newsLetterId: usubs.newsLetterId,
  }
}

export { mapFromUserSubs }
