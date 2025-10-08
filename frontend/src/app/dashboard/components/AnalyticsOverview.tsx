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
  Loader2,
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
      <div className="flex flex-col justify-center items-center h-screen space-y-3">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-gray-600 text-sm sm:text-base">
          Loading analytics...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left: Back + Title */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center space-x-2 w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
              <span>Analytics</span>
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              Track your marketing performance
            </p>
          </div>
        </div>

        {/* Right: Export Button */}
        <Button variant="outline" className="w-full sm:w-auto">
          Export Report
        </Button>
      </div>

      {/* Overall Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.overallStats.map((stat, idx) => {
          const Icon = iconMap[stat.icon];
          return (
            <Card key={idx}>
              <CardContent className="p-6 flex justify-between items-center gap-4">
                <div>
                  <div className="text-xl md:text-2xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                  <div className={`text-sm ${stat.color}`}>{stat.change}</div>
                </div>
                <Icon className={`w-6 h-6 md:w-8 md:h-8 ${stat.color}`} />
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
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg gap-4"
                >
                  {/* Channel + Icon */}
                  <div className="flex items-center gap-4">
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

                  {/* Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-sm text-center sm:text-left">
                    <div>
                      <p className="font-semibold text-base sm:text-lg">
                        {ch.leads}
                      </p>
                      <p className="text-gray-600 text-xs sm:text-sm">Leads</p>
                    </div>
                    <div>
                      <p className="font-semibold text-base sm:text-lg">
                        {ch.conversion}
                      </p>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Conversion
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-base sm:text-lg">
                        {ch.revenue}
                      </p>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Revenue
                      </p>
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
