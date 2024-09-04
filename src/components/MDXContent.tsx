'use client'

import { MDXRemote } from 'next-mdx-remote'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const Prog = dynamic(() => import("./article/prog"), { ssr: false })

const components = {
  Prog,
  Image
  // Ajoutez d'autres composants personnalisés ici si nécessaire
}

export default function MDXContent({ source }: { source: MDXRemoteSerializeResult }) {
  return <MDXRemote {...source} components={components} />
}