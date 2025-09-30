"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  MessageSquare,
  Plus,
  Send,
  Users,
  TrendingUp,
} from "lucide-react";

interface SMSWhatsAppMarketingProps {
  onBack: () => void;
}

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
  icon: "Users" | "Send" | "TrendingUp" | "MessageSquare";
}

interface MessagingData {
  campaigns: Campaign[];
  stats: MessagingStats[];
}

const SMSWhatsAppMarketing = ({ onBack }: SMSWhatsAppMarketingProps) => {
  const [data, setData] = useState<MessagingData | null>(null);

  useEffect(() => {
    fetch("/api/messaging")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading messaging...</p>
      </div>
    );
  }

  const iconMap = {
    Users,
    Send,
    TrendingUp,
    MessageSquare,
  };

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto">
          <div>
            <Button
              variant="outline"
              onClick={onBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <MessageSquare className="text-purple-600" />
              <h1 className="text-xl md:text-2xl font-bold">SMS & WhatsApp</h1>
            </div>
            <p className="text-sm text-gray-500">
              Manage SMS and WhatsApp campaigns
            </p>
          </div>
        </div>

        <div className="w-full md:w-auto">
          <Button className="text-white bg-gradient-to-r from-purple-600 to-pink-600">
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {data.stats.map((s, idx) => {
          const Icon = iconMap[s.icon];
          return (
            <Card
              key={idx}
              className="bg-white rounded shadow p-4 border border-gray-100 flex justify-between items-center"
            >
              <CardContent>
                <p className="text-sm text-gray-500">{s.title}</p>
                <p className="text-xl font-semibold">{s.value}</p>
                <span className={`${s.color} text-sm`}>{s.change}</span>
              </CardContent>
              <Icon className={`w-6 h-6 ${s.color}`} />
            </Card>
          );
        })}
      </div>

      {/* Campaign List */}
      <Card className="bg-white border border-gray-200 rounded-lg p-6 shadow">
        <CardHeader>
          <CardTitle className="text-xl font-semibold mb-4">
            SMS & WhatsApp Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.campaigns.map((c) => (
              <div
                key={c.id}
                className="flex flex-col md:flex-row justify-between md:items-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow transition gap-4"
              >
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

                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto text-sm">
                  <div className="grid grid-cols-3 gap-4 flex-1 text-center md:flex md:gap-6 md:text-right">
                    <div>
                      <p className="font-semibold text-center">{c.sent}</p>
                      <span className="text-gray-500 text-xs">Sent</span>
                    </div>
                    <div>
                      <p className="font-semibold text-center">{c.delivered}</p>
                      <span className="text-gray-500 text-xs">Delivered</span>
                    </div>
                    <div>
                      <p className="font-semibold text-center">
                        {c.responseRate}
                      </p>
                      <span className="text-gray-500 text-xs">Response</span>
                    </div>
                  </div>

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
        </CardContent>
      </Card>
    </div>
  );
};
export default SMSWhatsAppMarketing;
