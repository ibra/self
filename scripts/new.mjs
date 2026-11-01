import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// usage: npm run new poem "title"
//        npm run new note "title" [tags...]

const [kind, title, ...tags] = process.argv.slice(2);

if (!["poem", "note"].includes(kind) || !title) {
  console.error('usage: npm run new <poem|note> "title" [tags...]');
  process.exit(1);
}

const date = new Date().toLocaleDateString("en-CA");
const year = date.slice(0, 4);

const slug = title
  .toLowerCase()
  .normalize("NFKD")
  .replace(/[̀-ͯ]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

const dir = kind === "poem" ? `poetry/${year}` : `notes/${year}`;
const name = kind === "poem" ? slug : date;
const path = fileURLToPath(new URL(`../src/pages/${dir}/${name}.md`, import.meta.url));

if (existsSync(path)) {
  console.error(`already exists: ${path}`);
  process.exit(1);
}

const frontmatter = [
  `title: ${JSON.stringify(title)}`,
  `date: ${date}`,
  ...(tags.length ? [`tags: ${JSON.stringify(tags)}`] : []),
];

mkdirSync(new URL(`../src/pages/${dir}/`, import.meta.url), { recursive: true });
writeFileSync(path, `---\n${frontmatter.join("\n")}\n---\n\n`);
console.log(path);

const editor = process.env.VISUAL || process.env.EDITOR;
if (editor) spawnSync(`${editor} "${path}"`, { stdio: "inherit", shell: true });
