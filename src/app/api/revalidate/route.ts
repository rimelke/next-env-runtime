import { getEnv } from "env";
import { refreshConfig } from "env/azure.mjs";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  const { env } = await getEnv();

  const token = req.nextUrl.searchParams.get("token");

  if (token !== env.REVALIDATE_TOKEN)
    return NextResponse.json(
      { ok: false, error: "Invalid token" },
      { status: 401 }
    );

  await refreshConfig();
  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true });
};
