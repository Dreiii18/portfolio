export function GET() {
  return new Response(
    `User-agent: *
Allow: /

Sitemap: https://andreiartap.vercel.app/sitemap.xml`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  )
}