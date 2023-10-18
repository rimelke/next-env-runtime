import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true });
};
