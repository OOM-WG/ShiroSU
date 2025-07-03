export async function onRequest(context) {
  const { request, params } = context;
  const name = params.name;

  if (name !== "chenzyadb")
    try {
      const apiRes = await fetch("https://api.github.com/orgs/OOM-WG/members", {
        headers: { "User-Agent": "GitHub" },
      });
      if (!apiRes.ok) return new Response(null, { status: 503 });
      if (!(await apiRes.json()).some((member) => member.login === name))
        return new Response(null, { status: 403 });
    } catch (e) {
      return new Response(null, { status: 503 });
    }

  return fetch(`https://github.com/${name}.png`);
}
