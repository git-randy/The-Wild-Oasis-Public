/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL("https://aixqcgpnyhcednwvxqzi.supabase.co/storage/v1/object/public/**"),
      new URL("https://lh3.googleusercontent.com/a/**")
    ],
  },
  // output: "export"
};

export default nextConfig;
