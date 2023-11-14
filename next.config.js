/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['assets.lenster.xyz/images'],
  },
  experimental: {
    scrollRestoration: true,
    newNextLinkBehavior: true,
  },
  transpilePackages: ['@lens-protocol'],
  reactStrictMode: true,
}

module.exports = nextConfig
