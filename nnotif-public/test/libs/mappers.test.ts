/**
 * @group unit
 */

import { type UserSubs } from "data"

import * as sut from "../../src/libs/mappers"

describe("Mappings", () => {
  it("Can map from dynarest to public subs", () => {
    const usubs: UserSubs = {
      id: "1",
      email: "nnotif-no-reply@mailinator.com",
      gender: "male",
      name: { given: ["John"] },
      consent: true,
      dob: "30-01-2023",
      newsLetterId: "f03aad4e",
      type: "UserSubs",
      etag: "1034",
      url: "/UserSubs/1",
    }

    const result = sut.mapFromUserSubs(usubs)

    expect(result).toEqual({
      id: "1",
      email: "nnotif-no-reply@mailinator.com",
      name: {
        given: ["John"],
      },
      gender: "male",
      dob: "30-01-2023",
      consent: true,
      newsLetterId: "f03aad4e",
    })
  })
})

export {}
