// app/api/leads/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const leads = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 123-4567",
      source: "Landing Page",
      campaign: "Summer Sale 2024",
      status: "New",
      score: 85,
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@company.com",
      phone: "+1 (555) 987-6543",
      source: "Email Campaign",
      campaign: "Product Launch",
      status: "Qualified",
      score: 92,
      date: "2024-01-14",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@startup.io",
      phone: "+1 (555) 456-7890",
      source: "WhatsApp",
      campaign: "Follow-up Flow",
      status: "Contacted",
      score: 78,
      date: "2024-01-13",
    },
  ];

  const stats = [
    {
      label: "Total Leads",
      value: "0",
      change: "+0%",
      color: "text-blue-600",
    },
    {
      label: "Qualified Leads",
      value: "0",
      change: "+0%",
      color: "text-green-600",
    },
    {
      label: "Conversion Rate",
      value: "0%",
      change: "+0%",
      color: "text-purple-600",
    },
    {
      label: "Avg. Lead Score",
      value: "0",
      change: "+0%",
      color: "text-orange-600",
    },
  ];

  return NextResponse.json({ leads, stats });
}
