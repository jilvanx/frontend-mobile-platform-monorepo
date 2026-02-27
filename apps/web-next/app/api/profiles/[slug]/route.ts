import { NextRequest, NextResponse } from "next/server";

const UPSTREAM = "https://www.hunqz.com/api/opengrid/profiles";

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const upstream = `${UPSTREAM}/${encodeURIComponent(slug)}`;

  try {
    const res = await fetch(upstream, {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream returned ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to reach upstream API" }, { status: 502 });
  }
}
