import { NextResponse, type NextRequest } from "next/server";
import type { LandingPage } from "../route";

// --- Typed global store interface ---
interface GlobalStore {
  landingPagesStore?: LandingPage[];
}

// Extend the Node.js global type safely (no 'var' or eslint errors)
declare const globalThis: GlobalStore & typeof global;

// --- Initialize in-memory store (safe for dev) ---
if (!globalThis.landingPagesStore) {
  globalThis.landingPagesStore = [
    {
      id: 1,
      name: "Summer Sale Landing Page",
      status: "Published",
      visits: 2847,
      conversions: 234,
      conversionRate: "8.2%",
      createdDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Product Launch Page",
      status: "Draft",
      visits: 0,
      conversions: 0,
      conversionRate: "0%",
      createdDate: "2024-01-20",
    },
    {
      id: 3,
      name: "Free Trial Sign-up",
      status: "Published",
      visits: 1523,
      conversions: 187,
      conversionRate: "12.3%",
      createdDate: "2024-01-10",
    },
  ];
}

let landingPages = globalThis.landingPagesStore;

// GET one landing page
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const page = landingPages?.find((p) => p.id === Number(id));

  if (!page) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(page, { status: 200 });
}

// PATCH update landing page
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const updates = await req.json();

  if (!landingPages) {
    return NextResponse.json({ error: "No pages found" }, { status: 500 });
  }

  const idx = landingPages.findIndex((p) => p.id === Number(id));
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  landingPages[idx] = { ...landingPages[idx], ...updates };
  globalThis.landingPagesStore = landingPages;

  return NextResponse.json({
    message: "Updated successfully",
    page: landingPages[idx],
  });
}

// DELETE one landing page
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!landingPages) {
    return NextResponse.json({ error: "No pages found" }, { status: 500 });
  }

  landingPages = landingPages.filter((p) => p.id !== Number(id));
  globalThis.landingPagesStore = landingPages;

  return NextResponse.json({
    success: true,
    message: "Deleted successfully",
  });
}
