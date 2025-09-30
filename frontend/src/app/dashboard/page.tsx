"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AuthGuard from "@/components/authguard";
import {
  Users,
  Mail,
  MessageSquare,
  Zap,
  Target,
  DollarSign,
  Globe,
  ArrowRight,
} from "lucide-react";
import Sidebar from "./components/Sidebar";
import AIPromptBuilder from "./components/AIPromptBuilder";
import CampaignOverview from "./components/CampaignOverview";
import LandingPagesOverview from "./components/LandingPagesOverview";
import LeadsOverview from "./components/LeadsOverview";
import EmailMarketing from "./components/EmailMarketing";
import SMSWhatsAppMarketing from "./components/SMSWhatsappMarketing";
import AnalyticsOverview from "./components/AnalyticsOverview";
import SettingsPage from "./components/SettingsPage";

const Dashboard = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [specificTool, setSpecificTool] = useState<
    "landing-page" | "email" | "sms-whatsapp" | null
  >(null);

  const stats = [
    {
      title: "Total Leads",
      value: "2,847",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Email Opens",
      value: "68.3%",
      change: "+5.2%",
      icon: Mail,
      color: "text-green-600",
    },
    {
      title: "SMS Response Rate",
      value: "24.1%",
      change: "+8.1%",
      icon: MessageSquare,
      color: "text-purple-600",
    },
    {
      title: "Revenue",
      value: "$12,847",
      change: "+18.7%",
      icon: DollarSign,
      color: "text-emerald-600",
    },
  ];

  const recentCampaigns = [
    {
      id: 1,
      name: "Summer Sale Landing Page",
      type: "Lead Generation",
      status: "Active",
      leads: 127,
      conversion: "8.3%",
    },
    {
      id: 2,
      name: "Product Launch Email Series",
      type: "Email Marketing",
      status: "Active",
      leads: 89,
      conversion: "12.1%",
    },
    {
      id: 3,
      name: "WhatsApp Follow-up Flow",
      type: "SMS/WhatsApp",
      status: "Draft",
      leads: 0,
      conversion: "0%",
    },
  ];

  const handleAIToolClick = (
    tool: "landing-page" | "email" | "sms-whatsapp"
  ) => {
    setSpecificTool(tool);
    setCurrentView("AIPromptBuilder");
  };

  const handleBackFromAI = () => {
    setSpecificTool(null);
    setCurrentView("dashboard");
  };

  // Direct access to landing page builder
  const handleLandingPageBuilder = () => {
    setCurrentView("landingPages");
  };

  // Handle AI Campaign Builder click - should go to AI Prompt Builder with no specific tool
  const handleAICampaignBuilder = () => {
    setSpecificTool(null);
    setCurrentView("AIPromptBuilder");
  };

  const renderContent = () => {
    switch (currentView) {
      case "AIPromptBuilder":
        return (
          <AIPromptBuilder
            onBack={handleBackFromAI}
            specificTool={specificTool}
          />
        );
      case "campaigns":
        return <CampaignOverview onBack={() => setCurrentView("dashboard")} />;
      case "landingPages":
        return (
          <LandingPagesOverview
            onBack={() => setCurrentView("dashboard")}
            onCreateNew={handleLandingPageBuilder}
          />
        );
      case "landingPages":
        return (
          <LandingPagesOverview onBack={() => setCurrentView("dashboard")} />
        );
      case "leads":
        return <LeadsOverview onBack={() => setCurrentView("dashboard")} />;
      case "emailMarketing":
        return <EmailMarketing onBack={() => setCurrentView("dashboard")} />;
      case "sms":
        return (
          <SMSWhatsAppMarketing onBack={() => setCurrentView("dashboard")} />
        );
      case "analytics":
        return <AnalyticsOverview onBack={() => setCurrentView("dashboard")} />;
      case "settings":
        return <SettingsPage onBack={() => setCurrentView("dashboard")} />;
      default:
        return (
          <AuthGuard>
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Welcome back, Sarah!
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Here&apos;s what&apos;s happening with your marketing
                    campaigns.
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setSpecificTool(null);
                    setCurrentView("ai-builder");
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Create with AI
                </Button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            {stat.title}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">
                            {stat.value}
                          </p>
                          <p className="text-sm text-green-600 mt-1">
                            {stat.change}
                          </p>
                        </div>
                        <div
                          className={`p-3 rounded-full bg-gray-50 ${stat.color}`}
                        >
                          <stat.icon className="w-6 h-6" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Featured AI Campaign Builder */}
              <Card
                className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 hover:shadow-xl transition-all cursor-pointer"
                onClick={handleAICampaignBuilder}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2">
                    AI Campaign Builder
                  </CardTitle>
                  <p className="text-lg text-gray-600">
                    Generate leads, nurture leads, make sales
                  </p>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-6">
                    Let AI create your complete marketing strategy and implement
                    it across all channels automatically
                  </p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Start Building
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Or Choose a Specific Channel */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Or Choose a Specific Channel
                </h3>
                <p className="text-gray-600 mb-4">
                  Already know what you want to build? Jump directly into our
                  AI-powered channel-specific tools.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card
                    className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-orange-200"
                    onClick={handleLandingPageBuilder}
                  >
                    <CardHeader className="text-center">
                      <div className="mx-auto w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">
                        AI Landing Page Builder
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-center mb-4">
                        Create high-converting landing pages with AI assistance
                        for lead generation and sales
                      </p>
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                        Start Building
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card
                    className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-200"
                    onClick={() => handleAIToolClick("email")}
                  >
                    <CardHeader className="text-center">
                      <div className="mx-auto w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">
                        AI Email Marketing
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-center mb-4">
                        Design and send AI-powered email campaigns that convert
                      </p>
                      <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                        Start Building
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card
                    className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-purple-200"
                    onClick={() => handleAIToolClick("sms-whatsapp")}
                  >
                    <CardHeader className="text-center">
                      <div className="mx-auto w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">
                        AI SMS & WhatsApp
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-center mb-4">
                        Reach customers instantly with AI-crafted text and
                        WhatsApp campaigns
                      </p>
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        Start Building
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Recent Campaigns */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl">Recent Campaigns</CardTitle>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentView("campaigns")}
                  >
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentCampaigns.map((campaign) => (
                      <div
                        key={campaign.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <Target className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {campaign.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {campaign.type}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="text-center">
                            <p className="font-semibold text-gray-900">
                              {campaign.leads}
                            </p>
                            <p className="text-gray-600">Leads</p>
                          </div>
                          <div className="text-center">
                            <p className="font-semibold text-gray-900">
                              {campaign.conversion}
                            </p>
                            <p className="text-gray-600">Conversion</p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              campaign.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {campaign.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </AuthGuard>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 p-8">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
