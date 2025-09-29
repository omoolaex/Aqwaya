// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import {
//   TrendingUp,
//   Users,
//   BarChart3,
//   Mail,
//   Globe,
//   MessageSquare,
//   ArrowLeft,
// } from "lucide-react";
// import { ComponentType, SVGProps } from "react";

// const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
//   TrendingUp,
//   Users,
//   BarChart3,
//   Mail,
//   Globe,
//   MessageSquare,
// };

// export default function AnalyticsOverview() {
//   interface Stat {
//     label: string;
//     value: string;
//     change: string;
//     icon: string;
//     color: string;
//   }

//   interface Channel {
//     channel: string;
//     leads: number;
//     conversion: string;
//     revenue: string;
//     icon: string;
//     bgColor: string;
//   }

//   interface AnalyticsData {
//     overallStats: Stat[];
//     channelStats: Channel[];
//   }

//   const [data, setData] = useState<AnalyticsData | null>(null);

//   useEffect(() => {
//     fetch("/api/analytics")
//       .then((res) => res.json())
//       .then((json) => setData(json));
//   }, []);

//   if (!data) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-gray-600">Loading analytics...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
//       <main className="flex-1 p-6 space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <Link
//               href="/dashboard"
//               className="text-sm flex items-center gap-2 bg-white rounded hover:bg-gray-100 border border-gray-200 px-4 py-2 text-gray-600 hover:text-gray-900"
//             >
//               <ArrowLeft className="w-4 h-4" /> Back
//             </Link>
//             <div>
//               <h1 className="text-3xl font-bold flex items-center space-x-2">
//                 <BarChart3 className="w-8 h-8 text-blue-500" />
//                 <span>Analytics</span>
//               </h1>
//               <p className="text-gray-600">Track your marketing performance</p>
//             </div>
//           </div>
//           <Button variant="outline">Export Report</Button>
//         </div>

//         {/* Overall Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {data.overallStats.map((stat, idx) => {
//             const Icon = iconMap[stat.icon];
//             return (
//               <Card key={idx}>
//                 <CardContent className="p-6 flex justify-between">
//                   <div>
//                     <div className="text-2xl font-bold">{stat.value}</div>
//                     <div className="text-sm text-gray-600">{stat.label}</div>
//                     <div className={`text-sm ${stat.color}`}>{stat.change}</div>
//                   </div>
//                   <Icon className={`w-8 h-8 ${stat.color}`} />
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>

//         {/* Channel Performance */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Channel Performance</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {data.channelStats.map((ch, idx) => {
//                 const Icon = iconMap[ch.icon];
//                 return (
//                   <div
//                     key={idx}
//                     className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
//                   >
//                     <div className="flex items-center space-x-4">
//                       <div
//                         className={`w-12 h-12 bg-gradient-to-r ${ch.bgColor} rounded-lg flex items-center justify-center`}
//                       >
//                         <Icon className="w-6 h-6 text-white" />
//                       </div>
//                       <div>
//                         <h3 className="font-semibold">{ch.channel}</h3>
//                         <p className="text-sm text-gray-600">
//                           Marketing Channel
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-8 text-sm">
//                       <div className="text-center">
//                         <p className="font-semibold text-lg">{ch.leads}</p>
//                         <p className="text-gray-600">Leads</p>
//                       </div>
//                       <div className="text-center">
//                         <p className="font-semibold text-lg">{ch.conversion}</p>
//                         <p className="text-gray-600">Conversion</p>
//                       </div>
//                       <div className="text-center">
//                         <p className="font-semibold text-lg">{ch.revenue}</p>
//                         <p className="text-gray-600">Revenue</p>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// }

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Users,
  Mail,
  MessageSquare,
  Globe,
} from "lucide-react";

interface AnalyticsOverviewProps {
  onBack: () => void;
}

const AnalyticsOverview = ({ onBack }: AnalyticsOverviewProps) => {
  const channelStats = [
    {
      channel: "Email Marketing",
      leads: 1234,
      conversion: "12.3%",
      revenue: "$8,456",
      icon: Mail,
      color: "text-green-600",
      bgColor: "from-green-500 to-emerald-500",
    },
    {
      channel: "Landing Pages",
      leads: 892,
      conversion: "8.7%",
      revenue: "$5,234",
      icon: Globe,
      color: "text-orange-600",
      bgColor: "from-orange-500 to-red-500",
    },
    {
      channel: "SMS/WhatsApp",
      leads: 567,
      conversion: "24.1%",
      revenue: "$3,456",
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "from-purple-500 to-pink-500",
    },
  ];

  const overallStats = [
    {
      label: "Total Revenue",
      value: "$17,146",
      change: "+18.7%",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      label: "Total Leads",
      value: "2,693",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "Avg. Conversion",
      value: "15.0%",
      change: "+3.2%",
      icon: BarChart3,
      color: "text-purple-600",
    },
    {
      label: "ROI",
      value: "285%",
      change: "+45%",
      icon: TrendingUp,
      color: "text-emerald-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
              <BarChart3 className="w-8 h-8 text-blue-500" />
              <span>Analytics</span>
            </h1>
            <p className="text-gray-600">Track your marketing performance</p>
          </div>
        </div>
        <Button variant="outline">Export Report</Button>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overallStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                  <div className={`text-sm ${stat.color}`}>{stat.change}</div>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Channel Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Channel Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {channelStats.map((channel, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${channel.bgColor} rounded-lg flex items-center justify-center`}
                  >
                    <channel.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{channel.channel}</h3>
                    <p className="text-sm text-gray-600">Marketing Channel</p>
                  </div>
                </div>
                <div className="flex items-center space-x-8 text-sm">
                  <div className="text-center">
                    <p className="font-semibold text-lg">{channel.leads}</p>
                    <p className="text-gray-600">Leads</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-lg">
                      {channel.conversion}
                    </p>
                    <p className="text-gray-600">Conversion</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-lg">{channel.revenue}</p>
                    <p className="text-gray-600">Revenue</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">
                Performance chart will be displayed here
              </p>
              <p className="text-sm text-gray-500">
                Connect your analytics tools to view detailed charts
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsOverview;
