import type { Profile } from "@repo/shared";
import { ProfileCard } from "./ProfileCard";

const DISPLAY_LIMIT = 12;

export function ProfileGrid({ profiles }: { profiles: Profile[] }) {
  if (profiles.length === 0) {
    return (
      <p className="text-slate-500" role="status">
        No profiles available at this time.
      </p>
    );
  }

  const list = profiles.slice(0, DISPLAY_LIMIT);

  return (
    <ul
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      role="list"
      aria-label="User profiles"
    >
      {list.map((profile) => (
        <ProfileCard key={profile.urlToken} profile={profile} />
      ))}
    </ul>
  );
}
