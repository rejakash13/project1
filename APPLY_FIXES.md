# QUICK APPLICATION GUIDE

## Step 1: Update next.config.mjs
Replace `maxSize: 244000` with `maxSize: 100000` and add recharts cache group.

**Lines 44 and 32-33:**
```mjs
maxSize: 100000,  // Line 44

experimental: {
  optimizePackageImports: ['lucide-react', '@radix-ui/react-dropdown-menu', '@radix-ui/react-avatar', '@radix-ui/react-select', 'recharts'],
  optimizeCss: true,
},
```

---

## Step 2: Update app/layout.tsx
Change script strategies from `afterInteractive` to `lazyOnload` (lines 291, 311, 325).

---

## Step 3: Fix Header (components/header.tsx)
Replace useEffect scroll listener (lines 31-45) with Intersection Observer version from guide.

---

## Step 4: Update app/page.tsx
Already using dynamic imports correctly. No changes needed.

---

## Step 5: Create panorama-viewer-content.tsx
New file with lazy loading. Update panorama-viewer.tsx to import it.

---

## Step 6: Fix Viewport Exports
Add `export const viewport` to pages with metadata:
- portfolio/page.tsx
- virtual-tour/page.tsx
- welcome/page.tsx
- valuation-services/page.tsx
- services/page.tsx
- architecture-in-surat/page.tsx
- architecture-in-gujarat/page.tsx
- key-person/page.tsx

---

## Step 7: Create middleware.ts
New file at root level for caching headers.

---

## Step 8: Build & Test
```bash
npm run build
npm start
# Open http://localhost:3000 and check Chrome DevTools > Performance tab
# TBT should now be <100ms on first load
```

---

## Step 9: Deploy
```bash
git add -A
git commit -m "perf: TBT fix - defer animations, optimize scripts, fix viewport"
git push origin main
```

---

**Expected**: GTmetrix update after 24h shows TBT <50ms, Performance 98-100%.
