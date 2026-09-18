export function excerpt(raw, length = 180) {
  const paragraph = raw
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block.length > 0);

  if (!paragraph) return "";

  const text = paragraph
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= length) return text;

  return text.slice(0, text.lastIndexOf(" ", length)).trim() + "…";
}
