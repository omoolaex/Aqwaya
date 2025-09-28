import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    overallStats: [
      { label: "Total Revenue", value: "$17,146", change: "+18.7%", icon: "TrendingUp", color: "text-green-600" },
      { label: "Total Leads", value: "2,693", change: "+12.5%", icon: "Users", color: "text-blue-600" },
      { label: "Avg. Conversion", value: "15.0%", change: "+3.2%", icon: "BarChart3", color: "text-purple-600" },
      { label: "ROI", value: "285%", change: "+45%", icon: "TrendingUp", color: "text-emerald-600" },
    ],
    channelStats: [
      { channel: "Email Marketing", leads: 1234, conversion: "12.3%", revenue: "$8,456", icon: "Mail", bgColor: "from-green-500 to-emerald-500" },
      { channel: "Landing Pages", leads: 892, conversion: "8.7%", revenue: "$5,234", icon: "Globe", bgColor: "from-orange-500 to-red-500" },
      { channel: "SMS/WhatsApp", leads: 567, conversion: "24.1%", revenue: "$3,456", icon: "MessageSquare", bgColor: "from-purple-500 to-pink-500" },
    ]
  });
}
