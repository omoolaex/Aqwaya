"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { EmailCampaign } from "@/types/emailCampaign";
import {
  Mail,
  Search,
  MoreVertical,
  Play,
  Pause,
  Edit,
  Trash2,
  TrendingUp,
  Users,
  MousePointer,
  Eye,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CampaignDashboardProps {
  onCreateCampaign: () => void;
  onViewCampaign: (campaign: EmailCampaign) => void;
  onEditCampaign: (campaign: EmailCampaign) => void;
  user: unknown;
}

const CampaignDashboard = ({
  onCreateCampaign,
  onViewCampaign,
  onEditCampaign,
}: CampaignDashboardProps) => {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ---- Fetch from mock API ----
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch("/api/emailMarketing");
        if (!res.ok) throw new Error("Failed to fetch campaigns");
        const data = await res.json();
        setCampaigns(data.campaigns || []);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError("Unable to load campaigns. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.subject_line.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || campaign.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "paused":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCampaignTypeIcon = (type: string) => {
    switch (type) {
      case "sequence":
        return <Mail className="w-6 h-6" />;
      case "automation":
        return <Users className="w-6 h-6" />;
      case "one-time":
        return <MousePointer className="w-6 h-6" />;
      default:
        return <Mail className="w-6 h-6" />;
    }
  };

  const calculateOpenRate = (stats: EmailCampaign["stats"]) => {
    if (!stats.sent || stats.sent === 0) return "0%";
    return ((stats.opened / stats.sent) * 100).toFixed(1) + "%";
  };

  const calculateClickRate = (stats: EmailCampaign["stats"]) => {
    if (!stats.sent || stats.sent === 0) return "0%";
    return ((stats.clicked / stats.sent) * 100).toFixed(1) + "%";
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );

  if (error)
    return (
      <div className="text-center py-12 text-gray-600">
        <p>{error}</p>
        <Button onClick={() => location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="w-full sm:max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>

        {/* Filter + Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-auto"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
            <option value="draft">Draft</option>
          </select>

          <Button onClick={onCreateCampaign} className="w-full sm:w-auto">
            <Mail className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Campaigns Grid - Responsive */}
      <div className="grid grid-cols-1 gap-6">
        {filteredCampaigns.map((campaign) => (
          <Card
            key={campaign.id}
            className="hover:shadow-xl border border-gray-200 transition-all duration-200"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl text-gray-700">
                    {getCampaignTypeIcon(campaign.campaign_type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      {campaign.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {campaign.subject_line}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge
                    variant="outline"
                    className={getStatusColor(campaign.status)}
                  >
                    {campaign.status}
                  </Badge>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onViewCampaign(campaign)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onEditCampaign(campaign)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      {campaign.status === "active" && (
                        <DropdownMenuItem>
                          <Pause className="w-4 h-4 mr-2" />
                          Pause
                        </DropdownMenuItem>
                      )}
                      {campaign.status === "paused" && (
                        <DropdownMenuItem>
                          <Play className="w-4 h-4 mr-2" />
                          Resume
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-2">
                {[
                  {
                    icon: <Mail className="w-5 h-5 text-blue-500" />,
                    value: campaign.stats.sent.toLocaleString(),
                    label: "Sent",
                  },
                  {
                    icon: <Eye className="w-5 h-5 text-green-500" />,
                    value: `${calculateOpenRate(campaign.stats)}%`,
                    label: "Open Rate",
                  },
                  {
                    icon: <MousePointer className="w-5 h-5 text-purple-500" />,
                    value: `${calculateClickRate(campaign.stats)}%`,
                    label: "Click Rate",
                  },
                  {
                    icon: <TrendingUp className="w-5 h-5 text-orange-500" />,
                    value: campaign.stats.clicked,
                    label: "Clicks",
                  },
                  {
                    icon: <Users className="w-5 h-5 text-red-500" />,
                    value: campaign.stats.unsubscribed,
                    label: "Unsubscribed",
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center bg-gray-50 rounded-lg py-3 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-center mb-2">
                      {stat.icon}
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between text-sm text-gray-600 gap-1">
                <span>Type: {campaign.campaign_type.replace("_", " ")}</span>
                <span>
                  Created: {new Date(campaign.created_at).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCampaigns.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No campaigns found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? "No campaigns match your search."
                : "You haven't created any campaigns yet."}
            </p>
            <Button onClick={onCreateCampaign}>
              <Mail className="w-4 h-4 mr-2" />
              Create Your First Campaign
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CampaignDashboard;
