addEventListener('fetch', event => {
  event.respondWith(handle(event.request))
})

const ROBOTS = `# robots.txt for https://getclickr.app
# SAFEST: blocks all crawlers (search engines and most research crawlers).
# Note: robots.txt is advisory — malicious scrapers may ignore it.
User-agent: *
Disallow: /

# Sitemap: https://getclickr.app/sitemap.xml
`

async function handle(request) {
  const url = new URL(request.url)
  if (url.pathname === '/robots.txt') {
    return new Response(ROBOTS, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    })
  }
  // Proxy everything else to origin
  return fetch(request)
}
