"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Search,
  Filter,
  Plus,
  Target,
  Mail,
  MessageSquare,
  BarChart3,
  Play,
  Edit,
  Copy,
  Trash2,
  ExternalLink,
} from "lucide-react";

import AIPromptBuilder from "./AIPromptBuilder";
import CampaignForm from "./campaign/CampaignForm";
import CampaignDetails from "./campaign/CampaignDetails";
import { Campaign } from "@/types/campaign";

interface CampaignOverviewProps {
  onBack: () => void;
}

const CampaignOverview = ({ onBack }: CampaignOverviewProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState<
    "list" | "create" | "edit" | "details" | "ai-builder"
  >("list");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch campaigns from API
  useEffect(() => {
    fetch("/api/campaigns")
      .then((res) => res.json())
      .then((json) => {
        setCampaigns(json.campaigns);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading campaigns...</p>
      </div>
    );
  }

  // Handle different views
  if (currentView === "ai-builder") {
    return <AIPromptBuilder onBack={() => setCurrentView("list")} />;
  }

  if (currentView === "create") {
    return (
      <CampaignForm
        mode="create"
        onBack={() => setCurrentView("list")}
        onSave={(newCampaign) => {
          setCampaigns((prev) => [
            {
              ...newCampaign,
              id: String(Date.now()),
              leads: 0,
              conversion: "0%",
              revenue: "$0",
              created: "Just now",
              lastActive: "Never",
            },
            ...prev,
          ]);
          setCurrentView("list");
        }}
      />
    );
  }

  if (currentView === "edit" && selectedCampaign) {
    return (
      <CampaignForm
        mode="edit"
        campaign={selectedCampaign}
        onBack={() => setCurrentView("list")}
        onSave={(updatedCampaign) => {
          setCampaigns((prev) =>
            prev.map((c) =>
              c.id === selectedCampaign.id ? { ...c, ...updatedCampaign } : c
            )
          );
          setCurrentView("list");
          setSelectedCampaign(null);
        }}
      />
    );
  }

  if (currentView === "details" && selectedCampaign) {
    return (
      <CampaignDetails
        campaign={selectedCampaign}
        onBack={() => setCurrentView("list")}
        onEdit={() => setCurrentView("edit")}
        onStatusChange={(newStatus) => {
          setCampaigns((prev) =>
            prev.map((c) =>
              c.id === selectedCampaign.id ? { ...c, status: newStatus } : c
            )
          );
        }}
      />
    );
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "landing-page":
        return <Target className="w-4 h-4" />;
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

  const handleCampaignAction = (action: string, campaign: Campaign) => {
    switch (action) {
      case "view":
        setSelectedCampaign(campaign);
        setCurrentView("details");
        break;
      case "edit":
        setSelectedCampaign(campaign);
        setCurrentView("edit");
        break;
      case "duplicate": {
        const duplicated: Campaign = {
          ...campaign,
          id: String(Date.now()),
          name: `${campaign.name} (Copy)`,
          status: "Draft",
          leads: 0,
          conversion: "0%",
          revenue: "$0",
          created: "Just now",
          lastActive: "Never",
        };
        setCampaigns((prev) => [duplicated, ...prev]);
        break;
      }
      case "delete":
        if (confirm("Are you sure you want to delete this campaign?")) {
          setCampaigns((prev) => prev.filter((c) => c.id !== campaign.id));
        }
        break;
      case "toggle-status": {
        const newStatus = campaign.status === "Active" ? "Paused" : "Active";
        setCampaigns((prev) =>
          prev.map((c) =>
            c.id === campaign.id ? { ...c, status: newStatus } : c
          )
        );
        break;
      }
    }
  };

  const filteredCampaigns = campaigns.filter(
    (c) =>
      (c.name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
      (c.type?.toLowerCase() ?? "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4 sm:p-6 md:p-8 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
            <p className="text-gray-600 mt-1">
              Manage all your marketing campaigns in one place
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-start sm:justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentView("ai-builder")}
            className="w-full sm:w-auto"
          >
            <Target className="w-4 h-4 mr-2" />
            AI Builder
          </Button>
          <Button
            onClick={() => setCurrentView("create")}
            className="w-full sm:w-auto text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <Button variant="outline" className="shrink-0">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">
                  {campaigns.length}
                </p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold text-green-600">
                  {campaigns.filter((c) => c.status === "Active").length}
                </p>
              </div>
              <Play className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-purple-600">
                  {campaigns.reduce((sum, c) => sum + (c.leads || 0), 0)}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-emerald-600">
                  $
                  {campaigns
                    .reduce(
                      (sum, c) =>
                        sum +
                        parseInt((c.revenue || "$0").replace(/[$,]/g, "")),
                      0
                    )
                    .toLocaleString()}
                </p>
              </div>
              <Target className="w-8 h-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign list */}
      <Card>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCampaigns.map((campaign) => (
              <Card
                key={campaign.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3
                        className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
                        onClick={() => handleCampaignAction("view", campaign)}
                      >
                        {campaign.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-600">
                          {campaign.type}
                        </span>
                        <span className="text-gray-400">•</span>
                        <div className="flex items-center space-x-1">
                          {(campaign.channels || []).map((ch, i) => (
                            <div key={i} className="text-gray-500">
                              {getChannelIcon(ch)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="hidden sm:block text-center">
                      <p className="text-sm font-semibold text-gray-900">
                        {campaign.leads}
                      </p>
                      <p className="text-xs text-gray-600">Leads</p>
                    </div>
                    <div className="hidden sm:block text-center">
                      <p className="text-sm font-semibold text-gray-900">
                        {campaign.conversion}
                      </p>
                      <p className="text-xs text-gray-600">Conversion</p>
                    </div>
                    <div className="hidden sm:block text-center">
                      <p className="text-sm font-semibold text-gray-900">
                        {campaign.revenue}
                      </p>
                      <p className="text-xs text-gray-600">Revenue</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        campaign.status
                      )}`}
                    >
                      {campaign.status}
                    </span>
                    <div className="flex flex-wrap items-center gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCampaignAction("view", campaign)}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCampaignAction("edit", campaign)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          handleCampaignAction("duplicate", campaign)
                        }
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleCampaignAction("delete", campaign)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <span>Created {campaign.created}</span>
                  <span>Last active {campaign.lastActive}</span>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignOverview;
