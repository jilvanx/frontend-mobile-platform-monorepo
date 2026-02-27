import { ProfileGrid } from "./components";
import { getProfiles } from "./lib/profiles";

export default async function HomePage() {
  const profiles = await getProfiles();

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Profiles</h1>
        <p className="mt-1 text-slate-500">
          Server-rendered profile gallery powered by Next.js.
        </p>
      </header>

      <ProfileGrid profiles={profiles} />
    </main>
  );
}
