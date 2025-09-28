import { NextResponse } from "next/server";
import type { LandingPage } from "@/types/landing"; 

// In-memory DB (shared between requests during dev)
let landingPages: LandingPage[] = [
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

// GET all pages
export async function GET() {
  return NextResponse.json(landingPages);
}

// POST create new page
export async function POST(req: Request) {
  const body = await req.json();

  const newPage: LandingPage = {
    id: Date.now(),
    createdDate: new Date().toISOString().split("T")[0],
    status: "Draft",
    visits: 0,
    conversions: 0,
    conversionRate: "0%",
    ...body,
  };

  landingPages.push(newPage);
  return NextResponse.json(newPage, { status: 201 });
}

// helper for item routes to use same array
export function getLandingPages() {
  return landingPages;
}
export function setLandingPages(pages: LandingPage[]) {
  landingPages = pages;
}
