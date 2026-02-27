import { buildProfileImageUrl } from "@repo/shared";
import type { Profile } from "@repo/shared";

export function ProfileCard({ profile }: { profile: Profile }) {
  const src = buildProfileImageUrl(profile.urlToken);
  const alt = profile.name
    ? `Profile photo of ${profile.name}`
    : `Profile ${profile.urlToken}`;

  return (
    <li className="rounded-lg overflow-hidden bg-white shadow transition-shadow hover:shadow-md">
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
      >
        <img
          src={src}
          alt={alt}
          className="w-full aspect-square object-cover"
          width={400}
          height={400}
          loading="lazy"
        />
        {profile.name ? (
          <p className="p-2 text-sm font-medium text-slate-700 truncate">
            {profile.name}
          </p>
        ) : null}
      </a>
    </li>
  );
}
