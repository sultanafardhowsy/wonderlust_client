import "server-only";

const API_URL = process.env.API_URL || "http://localhost:5000";

/** Server Component fetch for public data. Returns null on 404. */
export async function serverApi(path, { revalidate = 30 } = {}) {
  try {
    const res = await fetch(`${API_URL}/api${path}`, { next: { revalidate } });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`API ${res.status}`);
    return res.json();
  } catch (err) {
    console.error(`API request failed: ${path}`, err.message);
    return undefined; // undefined = API unreachable
  }
}
