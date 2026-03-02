"use client"

import type { ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

/**
 * CRITICAL: Lightweight reveal using CSS animations instead of Framer Motion
 * This component is on the critical path for homepage performance (LCP, TBT)
 * Avoids importing framer-motion in initial render
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const delayMs = (delay * 1000) + 100 // Add baseline 100ms
  const keyframes = `
    @keyframes reveal-in {
      from {
        opacity: 0;
        transform: translateY(4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `

  return (
    <>
      <style>{keyframes}</style>
      <div
        className={className}
        style={{
          animation: `reveal-in 0.6s cubic-bezier(0.21, 0.47, 0.32, 0.98) ${delayMs}ms both`,
          opacity: 1,
        }}
      >
        {children}
      </div>
    </>
  )
}
