declare module 'next/image' {
  import React from 'react'
  
  export interface ImageProps {
    src: string
    alt: string
    width?: number
    height?: number
    fill?: boolean
    sizes?: string
    quality?: number
    priority?: boolean
    className?: string
    placeholder?: 'blur' | 'empty'
    style?: React.CSSProperties
    blurDataURL?: string
    unoptimized?: boolean
    loader?: (resolverProps: {src: string, width: number, quality?: number}) => string
    [key: string]: any
  }
  
  // Define it as an actual React component function
  const Image: React.ForwardRefExoticComponent<
    ImageProps & React.RefAttributes<HTMLImageElement>
  >
  
  export default Image
}

declare module 'next/link' {
  import React from 'react'
  
  export interface LinkProps {
    href: string
    as?: string
    replace?: boolean
    scroll?: boolean
    shallow?: boolean
    passHref?: boolean
    prefetch?: boolean
    locale?: string | false
    className?: string
    [key: string]: any
  }
  
  // Define it as an actual React component function
  const Link: React.ForwardRefExoticComponent<
    LinkProps & React.RefAttributes<HTMLAnchorElement>
  >
  
  export default Link
}

declare module 'next/dynamic' {
  import React from 'react'
  
  export interface DynamicOptions<T> {
    ssr?: boolean
    loading?: React.ComponentType<{ isLoading: boolean }>
    [key: string]: any
  }
  
  export function dynamic<T>(
    importFunc: () => Promise<{ default: React.ComponentType<T> }>,
    options?: DynamicOptions<T>
  ): React.ComponentType<T>
  
  export default dynamic
}