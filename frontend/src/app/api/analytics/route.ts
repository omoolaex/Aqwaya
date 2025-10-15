import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    overallStats: [
      { label: "Total Revenue", value: "$0", change: "+0%", icon: "TrendingUp", color: "text-green-600" },
      { label: "Total Leads", value: "0", change: "+0%", icon: "Users", color: "text-blue-600" },
      { label: "Avg. Conversion", value: "0%", change: "+0%", icon: "BarChart3", color: "text-purple-600" },
      { label: "ROI", value: "0%", change: "+0%", icon: "TrendingUp", color: "text-emerald-600" },
    ],
    channelStats: [
      { channel: "Email Marketing", leads: 0, conversion: "0%", revenue: "$0", icon: "Mail", bgColor: "from-green-500 to-emerald-500" },
      { channel: "Landing Pages", leads: 0, conversion: "0%", revenue: "$0", icon: "Globe", bgColor: "from-orange-500 to-red-500" },
      { channel: "SMS/WhatsApp", leads: 0, conversion: "0%", revenue: "$0", icon: "MessageSquare", bgColor: "from-purple-500 to-pink-500" },
    ]
  });
}
