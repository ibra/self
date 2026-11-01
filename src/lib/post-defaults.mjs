import { fileURLToPath } from "node:url";

const layout = fileURLToPath(new URL("../layouts/PostLayout.astro", import.meta.url));

// fills in frontmatter every post repeats; anything set in the file wins.
export function postDefaults() {
  return (tree, file) => {
    const path = file.path.replaceAll("\\", "/");
    if (!path.includes("/src/pages/")) return;

    const defaults = { layout };
    if (path.includes("/src/pages/poetry/")) defaults.tags = ["poetry"];

    file.data.astro.frontmatter = { ...defaults, ...file.data.astro.frontmatter };
  };
}
