import { useState } from "react";
import { buildProductImageUrl } from "@repo/shared";
import type { Product } from "@repo/shared";

export function ProductCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);
  const rawSrc = product.thumbnail || product.urlToken;
  const src = buildProductImageUrl(rawSrc);
  const alt = product.name
    ? `Product photo of ${product.name}`
    : `Product ${product.urlToken}`;

  return (
    <li className="rounded-lg overflow-hidden bg-white shadow transition-shadow hover:shadow-md">
      <a
        href={src || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
      >
        {imgError || !src ? (
          <div className="w-full aspect-square bg-slate-100 flex items-center justify-center text-slate-400">
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            className="w-full aspect-square object-cover"
            width={400}
            height={400}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
        {product.name ? (
          <p className="p-2 text-sm font-medium text-slate-700 truncate">
            {product.name}
          </p>
        ) : null}
      </a>
    </li>
  );
}

export const ProfileCard = ProductCard;
