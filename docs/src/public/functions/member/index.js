addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  const segments = path.split("/").filter((seg) => seg.length > 0);
  if (segments.length !== 1) return new Response(null, { status: 400 });
  const username = segments[0];

  if (username !== "chenzyadb")
    try {
      const apiRes = await fetch("https://api.github.com/orgs/OOM-WG/members", {
        headers: { "User-Agent": "GitHub" },
      });
      if (!apiRes.ok) return new Response(null, { status: 503 });
      if (!(await apiRes.json()).some((member) => member.login === username))
        return new Response(null, { status: 403 });
    } catch (e) {
      return new Response(null, { status: 503 });
    }

  return fetch(`https://github.com/${username}.png`);
}
