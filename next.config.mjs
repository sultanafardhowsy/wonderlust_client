/** @type {import('next').NextConfig} */
const API_URL = process.env.API_URL || "http://localhost:5000";

const nextConfig = {
  reactCompiler: true,
  // Browser calls /api/* on this domain; Next forwards them to the Express API.
  // Same-origin requests mean auth cookies just work (locally and on Vercel).
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${API_URL}/api/:path*` }];
  },
  images: {
    qualities: [75, 90],
  },
};

export default nextConfig;
