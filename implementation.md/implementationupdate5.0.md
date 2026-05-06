# Design Update: Simple Dark Navy & Gold Theme

This update addresses the color contrast feedback by transitioning the application to a simpler, much darker theme. The new primary palette will consist of Navy Blue and White, with Gold accents. Additionally, we will introduce background carousel animations to add dynamic, subtle movement to the experience.

## User Review Required

> [!IMPORTANT]  
> Please review the styling and animation details before we proceed:
> 1. **Background Carousels**: To clarify, do you want a slow, continuously sliding carousel of abstract images/patterns functioning as the background, or do you mean an animated background featuring floating elements?
> 2. **Colors**: We will switch the default theme to be heavily dark instead of white. Are these premium color choices suitable? 
>    - **Background**: Deep Navy Blue (e.g., `#0A1128`)
>    - **Text**: Pure White or Off-White (e.g., `#F8F9FA`)
>    - **Accents**: Elegant Gold (e.g., `#D4AF37`)
> 3. **Simplicity**: We will remove the complex green/light blue color mix from the previous iteration to maintain the requested simple aesthetic. Let me know if you still want to keep any light mode available at all, or if you want standard dark mode across the board.

## Proposed Changes

### Global Styling & Theme Updates

#### [MODIFY] [index.css](file:///Users/oscarpelayo/B2B%20repo/B2Brepo3.0/src/index.css)
- Replace the existing color CSS variables to use the Navy, White, and Gold scheme.
- Simplify gradients and complex backgrounds to favor a clean, solid dark navy base.
- Darken the base text to be white for strong contrast against the navy.
- Update custom scrollbar and text selection colors to match the gold accent.
- Add keyframes for the continuous background carousel animation.

#### [MODIFY] [tailwind.config.js](file:///Users/oscarpelayo/B2B%20repo/B2Brepo3.0/tailwind.config.js)
- Update any hardcoded color mappings if present to reflect the new `primary` (Navy) and `secondary` (Gold) values.

### Background Animation Implementation

#### [NEW] [BackgroundCarousel.tsx](file:///Users/oscarpelayo/B2B%20repo/B2Brepo3.0/src/components/BackgroundCarousel.tsx) (Or equivalent component)
- A new absolute/fixed positioned layout component containing images or patterns.
- Applies CSS animations or `framer-motion` to smoothly slide or crossfade between slides automatically without user intervention, acting as a rich background layer.

#### [MODIFY] [App.tsx](file:///Users/oscarpelayo/B2B%20repo/B2Brepo3.0/src/App.tsx)
- Embed the new background carousel component uniformly across the application body.

## Verification Plan

### Automated Tests
- Run `npm run dev` to ensure no build errors exist with the new color variable setup.

### Manual Verification
- Manually inspect the application in the browser.
- Verify that the contrast is significantly improved and dark as requested, using white text securely visible on the navy blue.
- Validate that the gold accents naturally highlight headings, buttons, or icons without being visually overwhelming.
- Observe the background carousel to ensure it loops smoothly without causing performance lag or distracting from the core white text content.
