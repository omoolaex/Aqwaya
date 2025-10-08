import { NextResponse } from "next/server";
import { getLandingPages, setLandingPages } from "../route";

// GET one
export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  const pages = getLandingPages();
  const page = pages.find((p) => p.id === Number(params.id));

  if (!page)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(page);
}

// PATCH update
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const updates = await req.json();
  const pages = getLandingPages();

  const idx = pages.findIndex((p) => p.id === Number(params.id));
  if (idx === -1)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  pages[idx] = { ...pages[idx], ...updates };
  setLandingPages(pages);

  return NextResponse.json(pages[idx]);
}

// DELETE one
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  let pages = getLandingPages();
  pages = pages.filter((p) => p.id !== Number(params.id));
  setLandingPages(pages);

  return NextResponse.json({ success: true });
}
