/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.beautifyinterior.com", "images.unsplash.com"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
