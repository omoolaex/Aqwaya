"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import { ArrowLeft, Pause, Settings, Workflow, Zap } from "lucide-react";

export default function AutomationDashboard() {
  const [automations] = useState([
    {
      title: "Welcome Email Sequence",
      type: "Email",
      trigger: "New Lead",
      triggered: 245,
      completed: 198,
      conversion: 80.8,
      status: "Active",
    },
    {
      title: "Abandoned Cart Recovery",
      type: "Multi-channel",
      trigger: "Cart Abandonment",
      triggered: 156,
      completed: 89,
      conversion: 57.1,
      status: "Active",
    },
    {
      title: "Follow-up SMS Flow",
      type: "SMS",
      trigger: "Form Submission",
      triggered: 0,
      completed: 0,
      conversion: null,
      status: "Paused",
    },
  ]);

  const stats = [
    {
      title: "Active Automations",
      value: "8",
      change: "+2",
      color: "text-blue-500",
    },
    {
      title: "Total Triggered",
      value: "1,456",
      change: "+12.5%",
      color: "text-green-500",
    },
    {
      title: "Avg. Conversion",
      value: "68.9%",
      change: "+5.2%",
      color: "text-purple-500",
    },
    {
      title: "Time Saved",
      value: "24hrs",
      change: "+3hrs",
      color: "text-orange-500",
    },
  ];

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Email":
        return (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
            Email
          </span>
        );
      case "SMS":
        return (
          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
            SMS
          </span>
        );
      case "Multi-channel":
        return (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            Multi-channel
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
                <Workflow className="text-blue-500" />
                <h1 className="text-xl md:text-2xl font-bold">Automations</h1>
              </div>
              <p className="text-sm text-gray-500">
                Automate your marketing workflows
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="w-full md:w-auto">
            <button className="w-full md:w-auto bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded shadow text-center">
              + Create Automation
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded shadow p-4 border border-gray-100"
            >
              <p className="text-sm text-gray-500">{s.title}</p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xl font-semibold">{s.value}</p>
                <span className={`${s.color} text-sm`}>{s.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Automations List */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Marketing Automations</h2>

          <div className="space-y-4">
            {automations.map((a) => (
              <div
                key={a.title}
                className="flex flex-col md:flex-row justify-between md:items-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow transition gap-4"
              >
                {/* Left: Title & Trigger */}
                <div className="flex items-start md:items-center gap-4 flex-1">
                  <div className="bg-gradient-to-r from-purple-400 to-blue-400 p-2 flex items-center justify-center rounded-lg text-white">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium">{a.title}</p>
                    <p className="text-sm text-gray-500">
                      Trigger: {a.trigger}
                    </p>
                    <div className="mt-1">{getTypeBadge(a.type)}</div>
                  </div>
                </div>

                {/* Right: Stats & Actions */}
                <div className="flex flex-col flex-wrap md:flex-row md:flex-nowrap items-center gap-4 w-full md:w-auto">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 flex-1 text-center md:flex md:gap-6 md:text-right">
                    <div className="flex flex-col">
                      <p className="text-sm">{a.triggered}</p>
                      <span className="text-gray-500 text-xs">Triggered</span>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm">{a.completed}</p>
                      <span className="text-gray-500 text-xs">Completed</span>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm">
                        {a.conversion !== null ? `${a.conversion}%` : "—"}
                      </p>
                      <span className="text-gray-500 text-xs">Conversion</span>
                    </div>
                  </div>

                  {/* Status */}
                  <div
                    className={`text-xs px-2 py-1 rounded ${
                      a.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {a.status}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <div className="bg-white px-3 py-2 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer">
                      <Pause className="w-4 h-4" />
                    </div>
                    <div className="bg-white px-3 py-2 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer">
                      <Settings className="w-4 h-4" />
                    </div>
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
