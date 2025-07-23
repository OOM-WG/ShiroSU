export function onRequest(context) {
  const { path } = context.params;
  return Response.redirect(
    `https://sakitinsu.resource.sawahara.host/assets/${Array.isArray(path) ? path.join("/") : path || ""}`,
    301,
  );
}