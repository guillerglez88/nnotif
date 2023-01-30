import { type Subs } from "data"
import { type Outcome } from "validation"

import { EMPTY } from "../libs/outcome"

const validate = (subs?: Subs): Outcome => {
    if (subs === undefined){
        const outcome: Outcome = { issues: [{
            level: "error",
            code: "/Coding/nnotif-public-subs-issue?code=required",
            desc: "Body is empty"
        }]}

        return outcome
    }

    return EMPTY
}

export { validate }
