'use client'

import { MDXRemote } from 'next-mdx-remote'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import dynamic from 'next/dynamic'

const components = {
  Prog: dynamic(() =>import("./article/prog")),
  Image:dynamic(() =>import("next/image"))
  // Ajoutez d'autres composants personnalisés ici si nécessaire
}



export default function MDXContent({ source }: { source: MDXRemoteSerializeResult }) {
  return <MDXRemote {...source} components={components} />
}