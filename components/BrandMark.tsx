'use client';

import { appConfig } from '@/app.config';

/**
 * Renders the brand mark.
 *
 * If `appConfig.brand.logo` is set, renders that image.
 * Otherwise renders a gold coin — a generic, brand-neutral default
 * that suits any token-savings app.
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

  // Default: gold coin SVG. Replace by setting config.brand.logo.
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
