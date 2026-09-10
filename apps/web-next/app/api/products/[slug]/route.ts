import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_BASE_URL } from "@repo/shared";

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const isCollection = !slug || slug === "all" || slug === "products";
  const upstream = isCollection
    ? DEFAULT_BASE_URL
    : `${DEFAULT_BASE_URL}/${encodeURIComponent(slug)}`;

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
