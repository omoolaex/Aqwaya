"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  source: string;
  campaign: string;
  status: "New" | "Qualified" | "Contacted";
  score: number;
  date: string;
}

interface Stat {
  label: string;
  value: string;
  change: string;
  color: string;
}

interface LeadsOverviewProps {
  onBack: () => void;
}

const LeadsOverview = ({ onBack }: LeadsOverviewProps) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data: { leads: Lead[]; stats: Stat[] }) => {
        setLeads(data.leads);
        setStats(data.stats);
      })
      .catch((err) => console.error("Error fetching leads:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading leads...</p>
      </div>
    );
  }
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
              <Users className="w-8 h-8 text-blue-500" />
              <span>Leads</span>
            </h1>
            <p className="text-gray-600">Manage and track your leads</p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Download className="w-4 h-4 mr-2" />
          Export Leads
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
              <div className={`text-sm ${stat.color}`}>{stat.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search leads..." className="w-full pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Leads Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
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
                  <tr key={lead.id} className="border-b hover:bg-gray-50">
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
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Mail className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Calendar className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadsOverview;
