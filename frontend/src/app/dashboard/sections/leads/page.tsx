"use client";

import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function LeadsPage() {
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
      value: "2,847",
      change: "+12.5%",
      color: "text-blue-600",
    },
    {
      label: "Qualified Leads",
      value: "1,234",
      change: "+8.3%",
      color: "text-green-600",
    },
    {
      label: "Conversion Rate",
      value: "43.4%",
      change: "+5.1%",
      color: "text-purple-600",
    },
    {
      label: "Avg. Lead Score",
      value: "84",
      change: "+2.8%",
      color: "text-orange-600",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          {/* Left: Back + Title */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto">
            <Link
              href="/dashboard"
              className="text-sm flex items-center gap-2 bg-white rounded hover:bg-gray-100 border border-gray-200 px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <Users className="text-blue-500 w-6 h-6" />
                <h1 className="text-xl md:text-2xl font-bold">Leads</h1>
              </div>
              <p className="text-sm text-gray-500">
                Manage and track your leads
              </p>
            </div>
          </div>

          {/* Export Button */}
          <div className="w-full md:w-auto">
            <button className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded shadow flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Export Leads
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow p-6"
            >
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
              <div className={`text-sm ${stat.color}`}>{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Filters + Table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow p-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads..."
                className="w-full pl-10 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="bg-white border border-gray-200 rounded px-4 py-2 flex items-center gap-2 hover:bg-gray-50">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>

          {/* Leads Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Contact</th>
                  <th className="text-left p-4">Source</th>
                  <th className="text-left p-4">Campaign</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Score</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-sm text-gray-500">{lead.date}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="text-sm">{lead.email}</div>
                        <div className="text-sm text-gray-500">
                          {lead.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{lead.source}</td>
                    <td className="p-4">{lead.campaign}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          lead.status === "New"
                            ? "bg-blue-100 text-blue-800"
                            : lead.status === "Qualified"
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="text-sm font-medium">{lead.score}</div>
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-blue-500 rounded-full"
                            style={{ width: `${lead.score}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button className="bg-white border border-gray-200 rounded px-3 py-2 hover:bg-gray-100">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button className="bg-white border border-gray-200 rounded px-3 py-2 hover:bg-gray-100">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button className="bg-white border border-gray-200 rounded px-3 py-2 hover:bg-gray-100">
                          <Calendar className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
