import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";

export function getChangelog() {
  const filePath = path.join(process.cwd(), "content", "changelog.md");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content } = matter(fileContents);
  return content;
}
