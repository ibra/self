import { feed } from "../lib/feed.js";

export async function get(context) {
  return feed({
    title: "ibrahim hisham ~ poetry",
    description: "select pieces from the void.",
    posts: await import.meta.glob("./poetry/**/*.md", { eager: true }),
    site: context.site,
  });
}
