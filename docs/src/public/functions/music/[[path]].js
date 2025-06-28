export function onRequest(context) {
  const { path } = context.params
  const pathStr = Array.isArray(path) ? path.join('/') : (path || '')
  return Response.redirect(`https://sakitinsu.resource.sawahara.host/music/${pathStr}`, 301)
}