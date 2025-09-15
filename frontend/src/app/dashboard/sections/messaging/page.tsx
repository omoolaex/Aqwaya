"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import {
  ArrowLeft,
  MessageSquare,
  Plus,
  Send,
  Users,
  TrendingUp,
} from "lucide-react";

export default function SMSWhatsAppMarketing() {
  const [campaigns] = useState([
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
  ]);

  const stats = [
    {
      title: "Total Contacts",
      value: "8,456",
      change: "+12.3%",
      color: "text-purple-600",
      icon: Users,
    },
    {
      title: "Delivery Rate",
      value: "97.8%",
      change: "+1.2%",
      color: "text-green-600",
      icon: Send,
    },
    {
      title: "Response Rate",
      value: "24.1%",
      change: "+8.1%",
      color: "text-blue-600",
      icon: TrendingUp,
    },
    {
      title: "Messages Today",
      value: "1,234",
      change: "+15%",
      color: "text-orange-600",
      icon: MessageSquare,
    },
  ];

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "SMS":
        return (
          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
            SMS
          </span>
        );
      case "WhatsApp":
        return (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
            WhatsApp
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          {/* Left section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto">
            {/* Back link */}
            <div>
              <Link
                href="/dashboard"
                className="text-sm flex items-center gap-2 bg-white rounded hover:bg-gray-100 border border-gray-200 px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Link>
            </div>

            {/* Title + subtitle */}
            <div>
              <div className="flex items-center gap-2">
                <MessageSquare className="text-purple-600" />
                <h1 className="text-xl md:text-2xl font-bold">
                  SMS & WhatsApp
                </h1>
              </div>
              <p className="text-sm text-gray-500">
                Manage SMS and WhatsApp campaigns
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="w-full md:w-auto">
            <button className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded shadow text-center">
              + New Campaign
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded shadow p-4 border border-gray-100 flex justify-between items-center"
            >
              <div>
                <p className="text-sm text-gray-500">{s.title}</p>
                <p className="text-xl font-semibold">{s.value}</p>
                <span className={`${s.color} text-sm`}>{s.change}</span>
              </div>
              <s.icon className={`w-6 h-6 ${s.color}`} />
            </div>
          ))}
        </div>

        {/* Campaign List */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">
            SMS & WhatsApp Campaigns
          </h2>

          <div className="space-y-4">
            {campaigns.map((c) => (
              <div
                key={c.id}
                className="flex flex-col md:flex-row justify-between md:items-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow transition gap-4"
              >
                {/* Left: Info */}
                <div className="flex items-start md:items-center gap-4 flex-1">
                  <div
                    className={`p-2 flex items-center justify-center rounded-lg text-white ${
                      c.type === "SMS"
                        ? "bg-gradient-to-r from-purple-500 to-blue-500"
                        : "bg-gradient-to-r from-green-500 to-emerald-500"
                    }`}
                  >
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-sm text-gray-500">{c.date}</p>
                    <div className="mt-1">{getTypeBadge(c.type)}</div>
                  </div>
                </div>

                {/* Right: Stats */}
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto text-sm">
                  <div className="grid grid-cols-3 gap-4 flex-1 text-center md:flex md:gap-6 md:text-right">
                    <div>
                      <p className="font-semibold">{c.sent}</p>
                      <span className="text-gray-500 text-xs">Sent</span>
                    </div>
                    <div>
                      <p className="font-semibold">{c.delivered}</p>
                      <span className="text-gray-500 text-xs">Delivered</span>
                    </div>
                    <div>
                      <p className="font-semibold">{c.responseRate}</p>
                      <span className="text-gray-500 text-xs">Response</span>
                    </div>
                  </div>

                  {/* Status */}
                  <div
                    className={`text-xs px-2 py-1 rounded ${
                      c.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {c.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
