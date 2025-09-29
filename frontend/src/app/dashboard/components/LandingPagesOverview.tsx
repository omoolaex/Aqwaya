"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LandingPageBuilder from "./LandingPageBuilder";
import {
  ArrowLeft,
  Globe,
  Plus,
  Eye,
  Edit,
  MoreHorizontal,
} from "lucide-react";

interface LandingPagesOverviewProps {
  onBack: () => void;
  onCreateNew?: () => void;
}

const LandingPagesOverview = ({ onBack }: LandingPagesOverviewProps) => {
  const [currentView, setCurrentView] = useState("overview");
  const [landingPages] = useState([
    {
      id: 1,
      name: "Summer Sale Landing Page",
      status: "Published",
      visits: 2847,
      conversions: 234,
      conversionRate: "8.2%",
      createdDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Product Launch Page",
      status: "Draft",
      visits: 0,
      conversions: 0,
      conversionRate: "0%",
      createdDate: "2024-01-20",
    },
    {
      id: 3,
      name: "Free Trial Sign-up",
      status: "Published",
      visits: 1523,
      conversions: 187,
      conversionRate: "12.3%",
      createdDate: "2024-01-10",
    },
  ]);

  // Handle different views

  if (currentView === "builder") {
    return <LandingPageBuilder onBack={() => setCurrentView("overview")} />;
  }
  if (currentView === "overview") {
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
                <Globe className="w-8 h-8 text-orange-500" />
                <span>Landing Pages</span>
              </h1>
              <p className="text-gray-600">
                Manage your landing pages and track their performance
              </p>
            </div>
          </div>
          <Button
            onClick={() => setCurrentView("builder")}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Landing Page
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Pages
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {landingPages.length}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-orange-50 text-orange-600">
                  <Globe className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Visits
                  </p>
                  <p className="text-2xl font-bold text-gray-900">4,370</p>
                  <p className="text-sm text-green-600">+15.3%</p>
                </div>
                <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                  <Eye className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Conversions
                  </p>
                  <p className="text-2xl font-bold text-gray-900">421</p>
                  <p className="text-sm text-green-600">+8.7%</p>
                </div>
                <div className="p-3 rounded-full bg-green-50 text-green-600">
                  <Plus className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Avg. Conversion Rate
                  </p>
                  <p className="text-2xl font-bold text-gray-900">9.6%</p>
                  <p className="text-sm text-green-600">+2.1%</p>
                </div>
                <div className="p-3 rounded-full bg-purple-50 text-purple-600">
                  <Globe className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Landing Pages List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Landing Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {landingPages.map((page) => (
                <div
                  key={page.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {page.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Created on {page.createdDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">
                        {page.visits.toLocaleString()}
                      </p>
                      <p className="text-gray-600">Visits</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">
                        {page.conversions}
                      </p>
                      <p className="text-gray-600">Conversions</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">
                        {page.conversionRate}
                      </p>
                      <p className="text-gray-600">Rate</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        page.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {page.status}
                    </span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
};

export default LandingPagesOverview;
