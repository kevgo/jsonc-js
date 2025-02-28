# JSONC reader for JavaScript

![test status](https://github.com/kevgo/jsonc-js/actions/workflows/tests.yml/badge.svg)

This zero-dependency library allows reading JSON that contain comments (JSONC).
It does that stripping comments and then loading the data as normal JSON.

```ts
import * as jsonc from "jsonc-reader"

// load JSONC from a file
const config = await jsonc.load("../my-config.jsonc")

// parse a JSONC string
const jsoncText = `
{
  // a comment
  "one": 1  // another comment
}`
const config = jsonc.parse(jsoncText)
// config === { one: 1 }

// strip comments from a JSONC string
const config = jsonc.strip(jsoncText)
// c === `
{
  "one": 1
}`
```
