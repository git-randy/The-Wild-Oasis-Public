/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://aixqcgpnyhcednwvxqzi.supabase.co/storage/v1/object/public/**")],
  },
  compiler: {
    removeConsole: {
      exclude: ["error", "warn", "info"],
    }
  }
};

export default nextConfig;
