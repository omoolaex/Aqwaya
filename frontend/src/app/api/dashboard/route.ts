import { NextResponse } from "next/server";

export async function GET() {
  const stats = [
    {
      title: "Total Leads",
      value: "2,847",
      change: "+12.5%",
      icon: "users",
      color: "text-blue-600",
    },
    {
      title: "Email Opens",
      value: "68.3%",
      change: "+5.2%",
      icon: "mail",
      color: "text-green-600",
    },
    {
      title: "SMS Response Rate",
      value: "24.1%",
      change: "+8.1%",
      icon: "message-square",
      color: "text-purple-600",
    },
    {
      title: "Revenue",
      value: "$12,847",
      change: "+18.7%",
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
      leads: 127,
      conversion: "8.3%",
    },
    {
      id: 2,
      name: "Product Launch Email Series",
      type: "Email Marketing",
      status: "Active",
      leads: 89,
      conversion: "12.1%",
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
