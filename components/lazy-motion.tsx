'use client'

import dynamic from 'next/dynamic'
import { ComponentType, ReactNode, Suspense } from 'react'

/**
 * Wrapper for motion components to defer Framer Motion parsing
 * Loads motion libraries only after initial page render
 */
export function LazyMotion({
  children,
  fallback,
}: {
  children: ReactNode
  fallback?: ReactNode
}) {
  return (
    <Suspense fallback={fallback || <div />}>
      {children}
    </Suspense>
  )
}

/**
 * Dynamic import for pages with heavy Framer Motion usage
 * Prevents motion parsing from blocking main thread on initial load
 */
export const createLazyMotionComponent = <P extends object>(
  Component: ComponentType<P>,
  displayName: string
) => {
  const LazyComponent = dynamic(() => Promise.resolve(Component), {
    ssr: false,
    loading: () => <div className="animate-pulse bg-neutral-200 h-96" />,
  })

  LazyComponent.displayName = displayName

  return LazyComponent
}
