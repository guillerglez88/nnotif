/**
 * @group unit
 * @group sql
 * @group dql
 */

import * as sut from "../../src/data/dql"

describe("SQL-DQL operations", () => {
  it("Can build find-by-id DQL", () => {
    const dql = sut.findDQL({ type: "Resource", id: "1" })

    expect(dql).toEqual([
      `SELECT * 
     FROM Resource 
     WHERE id = $1`,
      "1",
    ])
  })

  it("Can build list-by-type DQL", () => {
    const dql = sut.listDQL("Resource", 0, 10)

    expect(dql).toEqual([
      `SELECT * 
     FROM Resource 
     LIMIT 10
     OFFSET 0`,
    ])
  })
})
