import { NextResponse } from "next/server";

interface Campaign {
  id: number;
  name: string;
  type: "SMS" | "WhatsApp";
  status: "Active" | "Draft";
  sent: number;
  delivered: number;
  responseRate: string;
  date: string;
}

interface MessagingStats {
  title: string;
  value: string;
  change: string;
  color: string;
  icon: string;
}

interface MessagingData {
  campaigns: Campaign[];
  stats: MessagingStats[];
}

export async function GET() {
  const data: MessagingData = {
    campaigns: [
      {
        id: 1,
        name: "Welcome SMS Series",
        type: "SMS",
        status: "Active",
        sent: 850,
        delivered: 832,
        responseRate: "24.1%",
        date: "2024-01-15",
      },
      {
        id: 2,
        name: "WhatsApp Follow-up",
        type: "WhatsApp",
        status: "Draft",
        sent: 0,
        delivered: 0,
        responseRate: "—",
        date: "2024-01-18",
      },
    ],
    stats: [
      {
        title: "Total Contacts",
        value: "8,456",
        change: "+12.3%",
        color: "text-purple-600",
        icon: "Users",
      },
      {
        title: "Delivery Rate",
        value: "97.8%",
        change: "+1.2%",
        color: "text-green-600",
        icon: "Send",
      },
      {
        title: "Response Rate",
        value: "24.1%",
        change: "+8.1%",
        color: "text-blue-600",
        icon: "TrendingUp",
      },
      {
        title: "Messages Today",
        value: "1,234",
        change: "+15%",
        color: "text-orange-600",
        icon: "MessageSquare",
      },
    ],
  };

  return NextResponse.json(data);
}
