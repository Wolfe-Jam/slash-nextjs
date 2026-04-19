'use client';

import { appConfig } from '@/app.config';

const slashBrand = process.env.NEXT_PUBLIC_SLASH_BRAND === '1';

/**
 * Renders the brand mark.
 *
 * Priority order:
 * 1. `appConfig.brand.logo` (image path) — forker's own logo
 * 2. Slash lightning polygon — only when NEXT_PUBLIC_SLASH_BRAND=1 (Slash's deploy)
 * 3. Gold coin — generic placeholder for the default Token Saver brand
 */
export default function BrandMark({ size = 24 }: { size?: number }) {
  if (appConfig.brand.logo) {
    return (
      <img
        src={appConfig.brand.logo}
        alt={appConfig.brand.name}
        width={size}
        height={size}
        className="rounded"
      />
    );
  }

  // Slash brand — lightning polygon mark
  if (slashBrand) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width={size}
        height={size}
        aria-label={appConfig.brand.name}
      >
        <polygon points="60,0 20,55 48,55 38,100 80,42 52,42" fill={appConfig.brand.accent} />
      </svg>
    );
  }

  // Default placeholder — gold coin.
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-label={appConfig.brand.name}
    >
      <defs>
        <radialGradient id="coinShine" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFE27A" />
          <stop offset="60%" stopColor={appConfig.brand.accent} />
          <stop offset="100%" stopColor="#B8860B" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill="url(#coinShine)" stroke="#FFF" strokeOpacity="0.25" strokeWidth="2" />
      <circle cx="50" cy="50" r="32" fill="none" stroke="#8B6914" strokeOpacity="0.35" strokeWidth="1.5" />
      <text
        x="50"
        y="64"
        fontSize="40"
        textAnchor="middle"
        fill="#3A2A00"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="900"
      >
        $
      </text>
    </svg>
  );
}
