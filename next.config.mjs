/** @type {import('next').NextConfig} */
const nextConfig = {
  // allow “dangerous” IP‑based host headers (for testing on an IP:port)
  server: {
    allowDangerousIpBasedRequests: true,
  },
};

export default nextConfig;
