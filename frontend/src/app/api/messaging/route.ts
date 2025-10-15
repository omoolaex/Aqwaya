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
        sent: 0,
        delivered: 0,
        responseRate: "0%",
        date: new Date().toISOString().split("T")[0],
      },
      {
        id: 2,
        name: "WhatsApp Follow-up",
        type: "WhatsApp",
        status: "Draft",
        sent: 0,
        delivered: 0,
        responseRate: "0%",
        date: new Date().toISOString().split("T")[0],
      },
    ],
    stats: [
      {
        title: "Total Contacts",
        value: "0",
        change: "+0%",
        color: "text-purple-600",
        icon: "Users",
      },
      {
        title: "Delivery Rate",
        value: "0%",
        change: "+0%",
        color: "text-green-600",
        icon: "Send",
      },
      {
        title: "Response Rate",
        value: "0%",
        change: "+0%",
        color: "text-blue-600",
        icon: "TrendingUp",
      },
      {
        title: "Messages Today",
        value: "0",
        change: "+0%",
        color: "text-orange-600",
        icon: "MessageSquare",
      },
    ],
  };

  return NextResponse.json(data);
}
