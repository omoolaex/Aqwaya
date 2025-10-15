import { NextResponse, type NextRequest } from "next/server";

export interface LandingPage {
  id: number;
  name: string;
  status: "Draft" | "Published";
  visits: number;
  conversions: number;
  conversionRate: string;
  createdDate: string;
}

const landingPages: LandingPage[] = [
  {
    id: 1,
    name: "Summer Sale Landing Page",
    status: "Published",
    visits: 0,
    conversions: 0,
    conversionRate: "0%",
    createdDate: "2025-01-15",
  },
  {
    id: 2,
    name: "Product Launch Page",
    status: "Draft",
    visits: 0,
    conversions: 0,
    conversionRate: "0%",
    createdDate: "2025-01-20",
  },
  {
    id: 3,
    name: "Free Trial Sign-up",
    status: "Published",
    visits: 0,
    conversions: 0,
    conversionRate: "0%",
    createdDate: "2025-01-10",
  },
];

// Helper to compute overview stats
function computeStats(pages: LandingPage[]) {
  const totalVisits = pages.reduce((sum, p) => sum + p.visits, 0);
  const totalConversions = pages.reduce((sum, p) => sum + p.conversions, 0);
  const avgConversionRate =
    pages.length > 0
      ? `${((totalConversions / totalVisits) * 100 || 0).toFixed(1)}%`
      : "0%";

  return {
    totalPages: pages.length,
    totalVisits,
    totalConversions,
    avgConversionRate,
  };
}

// GET all landing pages + stats
export async function GET() {
  const stats = computeStats(landingPages);
  return NextResponse.json({
    landingPages: Array.isArray(landingPages) ? landingPages : [],
    stats,
  });
}

// POST - create new landing page
export async function POST(req: NextRequest) {
  const data = await req.json();

  const newPage: LandingPage = {
    id: landingPages.length + 1,
    name: data.name || "New Landing Page",
    status: data.status || "Draft",
    visits: 0,
    conversions: 0,
    conversionRate: "0%",
    createdDate: new Date().toISOString().split("T")[0],
  };

  landingPages.push(newPage);

  const stats = computeStats(landingPages);
  return NextResponse.json(
    { message: "Landing page created", newPage, stats },
    { status: 201 }
  );
}
