export async function onRequest(context) {
  const { request, params } = context;
  const name = params.name;

  return fetch(`https://ssu.oom-wg.dev/member/${name}`);
}