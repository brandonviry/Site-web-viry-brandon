import withMDX from '@next/mdx';
import remarkGfm from 'remark-gfm'
const mdxConfig = withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx','ts','tsx'],
  images: {
    domains: ['placehold.co'], // Autoriser les images de 'placehold.co'
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

// Combiner la configuration MDX avec la configuration des images
export default mdxConfig(nextConfig);
