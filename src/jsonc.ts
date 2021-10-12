import fs from "fs"

/// converts the given JSONC text to valid JSON by stripping all comments
export function stripComments(text: string): string {
  return text.replace(/\s*\/\/.*$/gm, "")
}

/// parses the given JSONC text into a JS object
export function parse(text: string): any {
  return JSON.parse(stripComments(text))
}

/// reads a JS object from the file with the given name
export function loadSync(filePath: string): string {
  return parse(fs.readFileSync(filePath, "utf-8"))
}
