/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  cleanDistDir: true,
  poweredByHeader: false,
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
  },
  transpilePackages: ['next-mdx-remote'],
}

export default nextConfig
