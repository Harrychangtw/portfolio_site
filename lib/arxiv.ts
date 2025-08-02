
import { Paper } from "@/types/paper";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { XMLParser } from "fast-xml-parser";

const ARXIV_API_URL = "http://export.arxiv.org/api/query?id_list=";

export async function fetchArxivPapers(ids: string[]): Promise<Paper[]> {
  if (ids.length === 0) {
    return [];
  }
  const query = ids.join(",");
  const response = await fetch(
    `${ARXIV_API_URL}${query}&max_results=${ids.length}`
  );
  const xmlText = await response.text();

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
  });
  const result = parser.parse(xmlText);

  if (!result.feed || !result.feed.entry) {
    return [];
  }

  const entries = Array.isArray(result.feed.entry)
    ? result.feed.entry
    : [result.feed.entry];

  return entries.map((entry: any) => ({
    title: entry.title.replace(/\\n/g, " ").trim(),
    authors: Array.isArray(entry.author)
      ? entry.author.map((a: any) => a.name)
      : [entry.author.name],
    date: entry.published,
    url: entry.id,
    source: "arxiv",
  }));
}

export async function getManualPapers(): Promise<Paper[]> {
  const papersDir = path.join(process.cwd(), "content/papers");
  if (!fs.existsSync(papersDir)) {
    return [];
  }
  const filenames = fs.readdirSync(papersDir);

  return filenames.map((filename) => {
    const filePath = path.join(papersDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      title: data.title,
      authors: data.authors,
      date: data.date,
      url: data.url,
      source: "manual",
    };
  });
}
