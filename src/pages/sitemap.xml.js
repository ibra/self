const pages = ["/", "/work", "/notes", "/self"];

export async function get(context) {
  const posts = {
    ...(await import.meta.glob("./notes/**/*.md", { eager: true })),
    ...(await import.meta.glob("./poetry/**/*.md", { eager: true })),
  };

  const urls = [
    ...pages.map((page) => ({ url: page })),
    ...Object.values(posts)
      .filter((post) => !post.frontmatter.archive)
      .map((post) => ({
        url: post.url,
        date: new Date(post.frontmatter.date).toISOString().slice(0, 10),
      })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ url, date }) =>
      `  <url><loc>${new URL(url.endsWith("/") ? url : `${url}/`, context.site)}</loc>${
        date ? `<lastmod>${date}</lastmod>` : ""
      }</url>`
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
}
