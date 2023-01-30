/**
 * @group unit
 */

import { createResRoute, notFoundRoute, readResResolvedRoute, readResRoute } from "../fixture"
import * as sut from "../../src/libs/routes"

describe("REST Route utilities", () => {
  it("Can calc no-path route match-index", () => {
    const result = sut.calcMatchIndex(notFoundRoute)

    expect(result).toBe(0)
  })

  it("Can calc create-res match-index", () => {
    const result = sut.calcMatchIndex(createResRoute)

    expect(result).toBe(1)
  })

  it("Can calc read-res match-index", () => {
    const result = sut.calcMatchIndex(readResResolvedRoute)

    expect(result).toBe(2)
  })

  it("Can str res-only path", () => {
    const result = sut.stringifyPath(createResRoute)

    expect(result).toBe("/Resource")
  })

  it("Can str res-id path", () => {
    const result = sut.stringifyPath(readResRoute)

    expect(result).toBe("/Resource/:_id")
  })

  it("Can str no-path route", () => {
    const result = sut.stringifyPath(notFoundRoute)

    expect(result).toBe("/")
  })

  it("Can get path component by code", () => {
    const result = sut.getPathComp("/Coding/wellknown-params?code=type", readResRoute)

    expect(result).toEqual({
      name: "_type",
      code: "/Coding/wellknown-params?code=type",
      value: "Resource",
    })
  })

  it("Can get path type", () => {
    const result = sut.getPathTypeValue(readResRoute)

    expect(result).toBe("Resource")
  })

  it("Can get path id name", () => {
    const result = sut.getPathIdName(readResRoute)

    expect(result).toBe("_id")
  })
})
