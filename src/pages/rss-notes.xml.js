import { feed } from "../lib/feed.js";

export async function get(context) {
  return feed({
    title: "ibrahim hisham ~ notes",
    description: "some blips here and there.",
    posts: await import.meta.glob("./notes/**/*.md", { eager: true }),
    site: context.site,
  });
}
