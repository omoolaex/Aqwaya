import { NextResponse } from "next/server";

export async function GET() {
  const stats = [
    {
      title: "Total Leads",
      value: "0",
      change: "+0%",
      icon: "users",
      color: "text-blue-600",
    },
    {
      title: "Email Opens",
      value: "0%",
      change: "+0%",
      icon: "mail",
      color: "text-green-600",
    },
    {
      title: "SMS Response Rate",
      value: "0%",
      change: "+0%",
      icon: "message-square",
      color: "text-purple-600",
    },
    {
      title: "Revenue",
      value: "$0",
      change: "+0%",
      icon: "dollar-sign",
      color: "text-emerald-600",
    },
  ];

  const recentCampaigns = [
    {
      id: 1,
      name: "Summer Sale Landing Page",
      type: "Lead Generation",
      status: "Active",
      leads: 0,
      conversion: "0%",
    },
    {
      id: 2,
      name: "Product Launch Email Series",
      type: "Email Marketing",
      status: "Active",
      leads: 0,
      conversion: "0%",
    },
    {
      id: 3,
      name: "WhatsApp Follow-up Flow",
      type: "SMS/WhatsApp",
      status: "Draft",
      leads: 0,
      conversion: "0%",
    },
  ];

  return NextResponse.json({ stats, recentCampaigns });
}
