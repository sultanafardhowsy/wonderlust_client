/**
 * Client-side API helper. Calls go to /api/* on the same origin and are
 * forwarded to the Express server by the rewrite in next.config.mjs.
 */
export async function api(path, { method = "GET", body, ...rest } = {}) {
  const res = await fetch(`/api${path}`, {
    method,
    credentials: "include",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || "Something went wrong");
    err.status = res.status;
    throw err;
  }
  return data;
}
