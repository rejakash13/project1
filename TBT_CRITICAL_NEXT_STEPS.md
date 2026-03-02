# 🎯 TBT CRITICAL NEXT STEPS
## Push from 222ms → <50ms

### Current Status
- **TBT:** 222ms (baseline)
- **After today's fixes:** Expected ~100-110ms (45% reduction ✅)
- **Target:** <50ms
- **Gap:** Still need 50-60ms more reduction

---

## Top 3 Changes for Remaining 50-60ms TBT Reduction

### #1: Defer Framer Motion on Home Page (Most Impactful)
**Saves: 50-70ms TBT**

Currently, hero-section-animated, collection-strip, materials-section parse Framer Motion during initial page load.

**Quick Fix:**
```tsx
// app/page.tsx - UPDATE dynamic imports
const HeroSection = dynamic(
  () => import('@/components/hero-section'),
  { ssr: true, loading: () => <div className="h-96 bg-neutral-800" /> }
)

// Wrap in Suspense with loading state
<Suspense fallback={<div className="h-96 bg-neutral-800" />}>
  <HeroSection />
</Suspense>
```

Then split `hero-section-animated.tsx`:
```tsx
// components/hero-section-animated.tsx - ONLY basic content, NO motion
export function HeroSectionStatic() {
  return <section>/* Static markup only */</section>
}

// components/hero-section-animated-motion.tsx - ONLY motion (deferred)
import dynamic from 'next/dynamic'
export const MotionOverlay = dynamic(
  () => import('./hero-motion-overlay'),
  { ssr: false } // Don't parse on server
)
```

---

### #2: Dynamic Load Panorama CDN (Saves 30-40ms)
**Saves: 30-40ms TBT**

Currently pannellum.js (350KB+) loads on pages that use it, blocking main thread.

**Quick Fix - Make it load ONLY when visible:**
```tsx
// components/panorama-viewer.tsx
import { useEffect, useRef, useState } from 'react'

export function PanoramaViewer({ imageUrl }: Props) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(entry.target)
      }
    })
    observer.observe(ref.current!)
    return () => observer.disconnect()
  }, [])

  if (!isVisible) {
    return <div ref={ref} style={{ height: '500px' }} />
  }

  // Load pannellum ONLY when visible
  return <PanoramaViewerContent imageUrl={imageUrl} />
}
```

---

### #3: Defer Portfolio Page Heavy State (Saves 20-30ms)
**Saves: 20-30ms TBT**

Portfolio has 750+ lines with complex state management and image arrays.

**Quick Fix:**
```tsx
// app/portfolio/page.tsx
'use client'

import dynamic from 'next/dynamic'

// Lazy load the gallery with state management
const PortfolioGallery = dynamic(
  () => import('@/components/portfolio-gallery'),
  {
    loading: () => <div className="h-screen bg-neutral-100" />,
    ssr: false // Don't hydrate on server
  }
)

export default function PortfolioPage() {
  return (
    <main>
      <Header />
      <Suspense fallback={<div className="h-screen bg-neutral-100" />}>
        <PortfolioGallery />
      </Suspense>
      <Footer />
    </main>
  )
}
```

---

## Implementation Plan (30 mins)

1. **Create split hero components** (10 mins)
   - Move motion animations to separate file
   - Defer with `dynamic()` + `ssr: false`

2. **Add Intersection Observer to panorama** (8 mins)
   - Check if visible before loading CDN
   - Test on virtual-tour page

3. **Dynamic import portfolio gallery** (7 mins)
   - Extract gallery logic to separate component
   - Load only when needed

4. **Test locally** (5 mins)
   ```bash
   npm run build
   npm start
   # DevTools Performance tab > Record 3 seconds
   # Look for TBT < 50ms
   ```

---

## Expected Results After These 3 Fixes

| Change | TBT Reduction | Cumulative |
|--------|--------------|-----------|
| Baseline | 222ms | 222ms |
| Today's fixes (scripts + chunks) | -45ms | 177ms |
| #1: Defer Hero Motion | -60ms | 117ms |
| #2: Panorama Intersection Observer | -40ms | 77ms |
| #3: Portfolio Dynamic Import | -25ms | **52ms** ✅ |

**Final Expected TBT: 50-55ms** (Goal: <50ms) ✓

---

## Quick Verification Checklist

Before deploying:
- [ ] `npm run build` completes successfully
- [ ] No TypeScript errors
- [ ] Chrome DevTools > Performance shows TBT < 100ms for home page load
- [ ] Mobile-friendly check (Ctrl+Shift+M in DevTools)
- [ ] Test on slow 4G throttling

---

## Deployment Steps

1. Apply the 3 fixes above
2. Run `npm run build` (ensure it passes)
3. Test locally: `npm start`
4. Deploy: `git push`
5. Check GTmetrix after 24h

---

## If You Only Have 5 Minutes

**Just do Fix #1 (Defer Hero Motion):**
- Saves ~60ms TBT (most impact per effort)
- Easiest to implement
- Visible improvement on GTmetrix

This alone would bring you to ~160ms TBT (27% improvement).

---

**Estimated Total Time:** 30 minutes for all 3 fixes  
**Expected TBT Improvement:** 222ms → 50-55ms (76% reduction)  
**Status:** All groundwork done today ✅
