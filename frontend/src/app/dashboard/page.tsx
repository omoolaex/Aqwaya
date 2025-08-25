"use client";
import Sidebar from "./components/Sidebar";
import {
  Mail,
  MessageSquare,
  Zap,
  Globe,
  UsersRound,
  DollarSign,
  Target,
} from "lucide-react";

export default function Dashboard() {
  const kpis = [
    {
      label: "Total Leads",
      value: "2,847",
      change: "+12.5%",
      icon: UsersRound,
      color: "text-blue-500",
    },
    {
      label: "Email Opens",
      value: "68.3%",
      change: "+5.2%",
      icon: Mail,
      color: "text-green-500",
    },
    {
      label: "SMS Response Rate",
      value: "24.1%",
      change: "+8.1%",
      icon: MessageSquare,
      color: "text-purple-500",
    },
    {
      label: "Revenue",
      value: "$12,847",
      change: "+18.7%",
      icon: DollarSign,
      color: "text-green-500",
    },
  ];

  const channels = [
    {
      name: "AI Landing Page Builder",
      desc: "Create high-converting landing pages with AI assistance for lead generation and sales",
      color: "bg-gradient-to-r from-orange-400 to-orange-900",
      icon: Globe,
    },
    {
      name: "AI Email Marketing",
      desc: "Design and send AI-powered email campaigns that convert",
      color: "bg-gradient-to-r from-green-400 to-green-900",
      icon: Mail,
    },
    {
      name: "AI SMS & WhatsApp",
      desc: "Reach customers instantly with AI-crafted text and WhatsApp campaigns",
      color: "bg-gradient-to-r from-purple-900 to-purple-400",
      icon: MessageSquare,
    },
  ];

  const campaigns = [
    {
      name: "Summer Sale Landing Page",
      type: "Lead Generation",
      leads: 127,
      conv: "8.3%",
      status: "Active",
    },
    {
      name: "Product Launch Email Series",
      type: "Email Marketing",
      leads: 89,
      conv: "12.1%",
      status: "Active",
    },
    {
      name: "WhatsApp Follow-up Flow",
      type: "SMS/WhatsApp",
      leads: 0,
      conv: "0%",
      status: "Draft",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div>
        <Sidebar />
      </div>

      {/* Main */}
      <main className="flex-1 p-4 sm:p-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-xl font-bold">Welcome back, Sarah!</h1>
            <p className="text-gray-500 text-sm">
              Here&apos;s what&apos;s happening with your marketing campaigns.
            </p>
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-md text-sm">
            + Create with AI
          </button>
        </header>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div>
                <p className="text-gray-500 text-sm">{kpi.label}</p>
                <div className="text-xl font-bold">{kpi.value}</div>
                <p className="text-green-600 text-xs">{kpi.change}</p>
              </div>
              <div
                className={`${kpi.color} w-12 h-12 flex items-center justify-center bg-gray-50 rounded-full`}
              >
                <kpi.icon />
              </div>
            </div>
          ))}
        </div>

        {/* AI Campaign Builder */}
        <div className="bg-purple-50 border border-gray-200 rounded-lg p-6 sm:p-8 text-center mb-8">
          <div className="mx-auto w-12 h-12 flex items-center justify-center bg-gradient-to-r from-purple-400 to-blue-400 rounded-full text-white mb-3">
            <Zap />
          </div>
          <h2 className="text-lg font-semibold">AI Campaign Builder</h2>
          <p className="text-gray-500 text-sm mb-4">
            Generate leads, nurture leads, make sales.
          </p>
          <p className="text-gray-500 text-sm mb-4">
            Let AI create your complete marketing strategy and implement it
            automatically.
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-md">
            Start Building →
          </button>
        </div>

        {/* Channels */}
        <h3 className="font-semibold mb-4">Or Choose a Specific Channel</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {channels.map((ch) => (
            <div
              key={ch.name}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm text-center"
            >
              <div
                className={`${ch.color} mx-auto w-10 h-10 flex items-center justify-center rounded-full text-white mb-3`}
              >
                <ch.icon className="w-5 h-5" />
              </div>
              <h4 className="font-semibold mb-2">{ch.name}</h4>
              <p className="text-gray-500 text-sm mb-4">{ch.desc}</p>
              <button
                className={`${ch.color} text-white px-4 py-2 rounded-md text-sm`}
              >
                Start Building →
              </button>
            </div>
          ))}
        </div>

        {/* Recent Campaigns */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h3 className="font-semibold">Recent Campaigns</h3>
            <button className="text-blue-600 text-sm">View All</button>
          </div>
          <div className="space-y-3">
            {campaigns.map((c, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200 rounded-md px-4 py-3 gap-3"
              >
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg text-white text-lg">
                    <Target />
                  </div>
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-gray-500 text-xs">{c.type}</p>
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 text-sm">
                  <span>{c.leads} Leads</span>
                  <span>{c.conv} Conversion</span>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      c.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
