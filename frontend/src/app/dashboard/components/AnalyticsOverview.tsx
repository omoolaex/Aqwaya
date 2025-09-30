"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users,
  BarChart3,
  Mail,
  Globe,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";
import { ComponentType, SVGProps } from "react";

interface AnalyticsOverviewProps {
  onBack: () => void;
}

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  TrendingUp,
  Users,
  BarChart3,
  Mail,
  Globe,
  MessageSquare,
};

export default function AnalyticsOverview({ onBack }: AnalyticsOverviewProps) {
  interface Stat {
    label: string;
    value: string;
    change: string;
    icon: string;
    color: string;
  }

  interface Channel {
    channel: string;
    leads: number;
    conversion: string;
    revenue: string;
    icon: string;
    bgColor: string;
  }

  interface AnalyticsData {
    overallStats: Stat[];
    channelStats: Channel[];
  }

  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading analytics...</p>
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
            <h1 className="text-3xl font-bold flex items-center space-x-2">
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
        {data.overallStats.map((stat, idx) => {
          const Icon = iconMap[stat.icon];
          return (
            <Card key={idx}>
              <CardContent className="p-6 flex justify-between">
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                  <div className={`text-sm ${stat.color}`}>{stat.change}</div>
                </div>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Channel Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Channel Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.channelStats.map((ch, idx) => {
              const Icon = iconMap[ch.icon];
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${ch.bgColor} rounded-lg flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{ch.channel}</h3>
                      <p className="text-sm text-gray-600">Marketing Channel</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-8 text-sm">
                    <div className="text-center">
                      <p className="font-semibold text-lg">{ch.leads}</p>
                      <p className="text-gray-600">Leads</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-lg">{ch.conversion}</p>
                      <p className="text-gray-600">Conversion</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-lg">{ch.revenue}</p>
                      <p className="text-gray-600">Revenue</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
