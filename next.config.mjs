/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'wordpress-1295903-4709419.cloudwaysapps.com' },
    ]
  }
};

export default nextConfig;
