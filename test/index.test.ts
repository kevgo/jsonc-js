import assert from "node:assert/strict"
import { test } from "node:test"
import * as fs from "fs"
import * as jsonc from "../src/index"

test("stripComments", () => {
  const give = `
// comment 1
{
  "a": 1, // comment 2
  "url": "https://acme.com",  // contains // inside a string
}`
  const want = `{
  "a": 1,
  "url": "https://acme.com",
}`
  const have = jsonc.strip(give)
  assert.equal(have, want)
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
