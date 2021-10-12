import fs from "fs"

export function stripComments(text: string): string {
  return text.replace(/\s*\/\/.*$/gm, "")
}

export function parse(text: string): any {
  return JSON.parse(stripComments(text))
}

export function loadSync(filePath: string): string {
  return parse(fs.readFileSync(filePath, "utf-8"))
}
