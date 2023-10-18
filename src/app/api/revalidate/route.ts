import { env } from "env";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  const token = req.nextUrl.searchParams.get("token");

  if (token !== env.REVALIDATE_TOKEN)
    return NextResponse.json(
      { ok: false, error: "Invalid token" },
      { status: 401 }
    );

  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true });
};
