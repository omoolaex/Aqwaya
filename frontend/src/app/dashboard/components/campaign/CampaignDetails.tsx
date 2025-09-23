"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Edit,
  Play,
  Pause,
  BarChart3,
  Users,
  Mail,
  MessageSquare,
  Globe,
  DollarSign,
  TrendingUp,
  Calendar,
  Target,
} from "lucide-react";
import { Campaign } from "@/types/campaign";
import Sidebar from "../Sidebar";

interface CampaignDetailsProps {
  campaign: Campaign;
  onBack: () => void;
  onEdit: () => void;
  onStatusChange: (status: string) => void;
}

const CampaignDetails = ({
  campaign,
  onBack,
  onEdit,
  onStatusChange,
}: CampaignDetailsProps) => {
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "landing-page":
        return <Globe className="w-4 h-4" />;
      case "email":
        return <Mail className="w-4 h-4" />;
      case "sms":
      case "whatsapp":
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Paused":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleStatusToggle = () => {
    const newStatus = campaign.status === "Active" ? "Paused" : "Active";
    onStatusChange(newStatus);
  };

  const recentActivities = [
    {
      action: "Email sent to 150 subscribers",
      time: "2 hours ago",
      type: "email",
    },
    { action: "New lead captured", time: "4 hours ago", type: "lead" },
    {
      action: "Campaign performance updated",
      time: "6 hours ago",
      type: "update",
    },
    { action: "SMS delivered to 45 contacts", time: "1 day ago", type: "sms" },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Campaigns
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {campaign.name}
                </h1>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-gray-600">{campaign.type}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      campaign.status
                    )}`}
                  >
                    {campaign.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleStatusToggle}
                className={
                  campaign.status === "Active"
                    ? "text-yellow-600 hover:text-yellow-700"
                    : "text-green-600 hover:text-green-700"
                }
              >
                {campaign.status === "Active" ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Activate
                  </>
                )}
              </Button>
              <Button onClick={onEdit}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Campaign
              </Button>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Leads
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {campaign.leads}
                    </p>
                    <p className="text-sm text-green-600">+12% this week</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Conversion Rate
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {campaign.conversion}
                    </p>
                    <p className="text-sm text-green-600">+2.1% this week</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {campaign.revenue}
                    </p>
                    <p className="text-sm text-green-600">+8.3% this week</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Engagement
                    </p>
                    <p className="text-2xl font-bold text-gray-900">68.4%</p>
                    <p className="text-sm text-green-600">+5.2% this week</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Campaign Details and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Campaign Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Description
                    </h4>
                    <p className="text-gray-600">
                      {campaign.description ||
                        "No description provided for this campaign."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Target Audience
                      </h4>
                      <p className="text-gray-600">
                        {campaign.targetAudience || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Budget
                      </h4>
                      <p className="text-gray-600">
                        {campaign.budget || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Marketing Channels
                    </h4>
                    <div className="flex items-center space-x-2">
                      {campaign.channels.map((channel, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full"
                        >
                          {getChannelIcon(channel)}
                          <span className="text-sm capitalize">
                            {channel.replace("-", " ")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        Created {campaign.created}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        Last active {campaign.lastActive}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CampaignDetails;
