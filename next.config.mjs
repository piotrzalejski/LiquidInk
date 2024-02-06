/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@types/bcrypt'],
  },
};

export default nextConfig;
