import rss from "@astrojs/rss";

export async function get(context) {
  const posts = await import.meta.glob("./poetry/**/*.md", { eager: true });

  const items = Object.values(posts)
    .filter((post) => !post.frontmatter.archive)
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
    .map((post) => ({
      title: post.frontmatter.title,
      pubDate: new Date(post.frontmatter.date),
      link: post.url,
    }));

  return rss({
    title: "ibrahim hisham ~ poetry",
    description: "select pieces from the void.",
    site: context.site,
    items: items,
    customData: `<language>en-us</language>`,
  });
}
