import * as fs from "fs"
import assert from "node:assert/strict"
import { test } from "node:test"
import * as util from "node:util"
import * as jsonc from "../src/index"

test("stripComments", () => {
  const give = `
// comment 1
{
  "a": 1, // comment 2
  "url": "https://acme.com", // contains // inside a string
}`
  const want = `

{
  "a": 1, \n\
  "url": "https://acme.com", \n\
}`
  const have = jsonc.strip(give)
  if (have !== want) {
    console.log("have:", util.inspect(have))
    console.log("want:", util.inspect(want))
    assert.fail("mismatching strings, see output above")
  }
})

test("parse", () => {
  const give = `
// comment 1
{
  "a": 1 // comment 2
}`
  const want = { a: 1 }
  const have = jsonc.parse(give)
  assert.deepEqual(have, want)
})

test("loadSync", async () => {
  const give = `
// comment 1
{
  "a": 1 // comment 2
}`
  fs.writeFileSync("foo.jsonc", give)
  const want = { a: 1 }
  const have = await jsonc.load("foo.jsonc")
  fs.unlinkSync("foo.jsonc")
  assert.deepEqual(have, want)
})
