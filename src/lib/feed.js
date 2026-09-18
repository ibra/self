import rss from "@astrojs/rss";
import { excerpt } from "./excerpt.js";

export function feed({ title, description, posts, site }) {
  const items = Object.values(posts)
    .filter((post) => !post.frontmatter.archive)
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
    .map((post) => ({
      title: post.frontmatter.title,
      pubDate: new Date(post.frontmatter.date),
      link: post.url,
      description: post.frontmatter.description ?? excerpt(post.rawContent()),
    }));

  return rss({
    title,
    description,
    site,
    items,
    customData: `<language>en-us</language>`,
  });
}
