"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Save,
  Target,
  Mail,
  MessageSquare,
  Globe,
  Users,
} from "lucide-react";
import { Campaign } from "@/types/campaign";
import Sidebar from "../Sidebar";

interface CampaignFormProps {
  onBack: () => void;
  onSave: (campaign: Campaign) => void;
  campaign?: Campaign;
  mode: "create" | "edit";
}

const CampaignForm = ({
  onBack,
  onSave,
  campaign,
  mode,
}: CampaignFormProps) => {
  const [formData, setFormData] = useState<Campaign>(
    campaign || {
      name: "",
      type: "Email Marketing",
      status: "Draft",
      description: "",
      targetAudience: "",
      budget: "",
      channels: [],
      leads: 0,
      conversion: "0%",
      revenue: "$0",
      created: "Just now",
      lastActive: "Never",
    }
  );

  const campaignTypes = [
    "Email Marketing",
    "SMS/WhatsApp",
    "Landing Page",
    "Full Funnel",
    "Social Media",
    "Lead Generation",
  ];

  const availableChannels = [
    { id: "email", label: "Email", icon: Mail },
    { id: "sms", label: "SMS", icon: MessageSquare },
    { id: "whatsapp", label: "WhatsApp", icon: MessageSquare },
    { id: "landing-page", label: "Landing Page", icon: Globe },
    { id: "social", label: "Social Media", icon: Users },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChannelToggle = (channelId: string) => {
    setFormData((prev) => ({
      ...prev,
      channels: prev.channels.includes(channelId)
        ? prev.channels.filter((c) => c !== channelId)
        : [...prev.channels, channelId],
    }));
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Campaigns
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {mode === "create" ? "Create Campaign" : "Edit Campaign"}
              </h1>
              <p className="text-gray-600 mt-1">
                {mode === "create"
                  ? "Set up a new marketing campaign"
                  : "Update campaign details"}
              </p>
            </div>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Campaign Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Campaign Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter campaign name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Campaign Type</Label>
                    <select
                      id="type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.type}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          type: e.target.value,
                        }))
                      }
                    >
                      {campaignTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget</Label>
                    <Input
                      id="budget"
                      placeholder="e.g., $1,000"
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          budget: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="target">Target Audience</Label>
                    <Input
                      id="target"
                      placeholder="e.g., Small business owners"
                      value={formData.targetAudience}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          targetAudience: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Campaign Description</Label>
                  <textarea
                    id="description"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Describe your campaign goals and strategy..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Channels */}
                <div className="space-y-3">
                  <Label>Marketing Channels</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {availableChannels.map((channel) => (
                      <div
                        key={channel.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          formData.channels.includes(channel.id)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleChannelToggle(channel.id)}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <channel.icon className="w-5 h-5" />
                          <span className="text-sm font-medium">
                            {channel.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <Button type="button" variant="outline" onClick={onBack}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {mode === "create" ? "Create Campaign" : "Save Changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CampaignForm;
