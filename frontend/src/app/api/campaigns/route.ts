import { NextResponse } from "next/server";
import { Campaign } from "@/types/campaign";

export async function GET() {
  const campaigns: Campaign[] = [
    {
      id: "1",
      name: "Welcome Email",
      type: "Email",
      status: "Active",
      description: "Onboarding email for new users",
      targetAudience: "New Signups",
      budget: "$0",
      channels: ["email"],
      leads: 0,
      conversion: "0%",
      revenue: "$0",
      created: "2 days ago",
      lastActive: "1 day ago",
    },
    {
      id: "2",
      name: "Holiday Promo",
      type: "Landing Page",
      status: "Draft",
      description: "Promo for Christmas sales",
      targetAudience: "All Customers",
      budget: "$0",
      channels: ["landing-page", "email"],
      leads: 0,
      conversion: "0%",
      revenue: "$0",
      created: "Just now",
      lastActive: "Never",
    },
    {
      id: "3",
      name: "Re-engagement SMS",
      type: "SMS",
      status: "Paused",
      description: "Target inactive customers with SMS offer",
      targetAudience: "Inactive users",
      budget: "$0",
      channels: ["sms"],
      leads: 0,
      conversion: "0%",
      revenue: "$0",
      created: "5 days ago",
      lastActive: "2 days ago",
    },
  ];

  return NextResponse.json({ campaigns });
}