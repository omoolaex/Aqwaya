"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  ArrowLeft,
  ChartColumn,
  FunnelIcon,
  Globe,
  Mail,
  MessageSquare,
  Play,
  Plus,
  Search,
  Target,
  UsersRound,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Sidebar from "../../components/Sidebar";

export default function Campaigns() {
  const [view, setView] = useState("list");
  const [search, setSearch] = React.useState("");

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div>
        <Sidebar />
      </div>
      <main className="flex-1 p-6">
        {view === "list" ? (
          // ================= CAMPAIGNS LIST VIEW =================
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-3">
                {/* Back */}
                <div>
                  <Link
                    href="/dashboard"
                    className="text-sm flex items-center gap-2 hover:bg-gray-100 px-4 py-2 text-gray-600 hover:text-gray-900 mb-6"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                  </Link>
                </div>

                <div>
                  <h1 className="text-2xl font-semibold">Campaigns</h1>
                  <p className="text-gray-500 text-xs">
                    Manage all your marketing campaigns in one place
                  </p>
                </div>
              </div>
              <div>
                <Button>
                  <Link
                    href="/dashboard/sections/prompt-builder"
                    className="border border-gray-200 hover:bg-gray-100 px-6 py-2 rounded-lg flex items-center gap-2 bg-white"
                  >
                    <Target />
                    AI Builder
                  </Link>
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg shadow"
                  onClick={() => setView("create")}
                >
                  <Plus /> Create Campaign
                </Button>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search bar */}
              <div className="relative md:w-full">
                {/* Search Icon */}
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                {/* Search Input */}
                <Input
                  type="text"
                  placeholder="Search campaigns..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 border border-gray-200"
                />
              </div>

              {/* Filter dropdown */}
              <Select>
                <SelectTrigger className="border border-gray-200">
                  <div className="flex gap-1 items-center">
                    <FunnelIcon className="w-4 h-4 mr-2 text-gray-800" />
                    <SelectValue placeholder="Filters" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campaigns</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              <Card className="border border-gray-200">
                <CardContent className="flex justify-between items-center px-4 py-6">
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-500">Total Campaigns</p>
                    <p className="text-xl font-bold mt-2 text-blue-500">0</p>
                  </div>
                  <Target className="text-blue-500" />
                </CardContent>
              </Card>
              <Card className="border border-gray-200">
                <CardContent className="flex justify-between items-center px-4 py-6">
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-500">Active Campaigns</p>
                    <p className="text-xl font-bold text-green-600 mt-2">0</p>
                  </div>
                  <Play className="text-green-600" />
                </CardContent>
              </Card>
              <Card className="border border-gray-200">
                <CardContent className="flex justify-between items-center px-4 py-6 ">
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-500">Total Leads</p>
                    <p className="text-xl font-bold text-purple-600 mt-2">0</p>
                  </div>
                  <ChartColumn className="text-purple-600" />
                </CardContent>
              </Card>
              <Card className="border border-gray-200">
                <CardContent className="flex justify-between items-center px-4 py-6">
                  <div className="flex flex-col">
                    <p className="text-sm text-green-600">Total Revenue</p>
                    <p className="text-xl font-bold mt-2 text-green-600">$0</p>
                  </div>
                  <Target className="text-green-600" />
                </CardContent>
              </Card>
            </div>

            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <p className="text-gray-500">All Campaigns</p>
                <div className="mt-4 text-center text-gray-400">
                  No campaigns yet.
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          // ================= CREATE CAMPAIGN VIEW =================
          <>
            <div className="flex gap-8 items-center mb-6">
              <Button
                className="hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg"
                onClick={() => setView("list")}
              >
                <ArrowLeft /> Back to Campaigns
              </Button>
              <div>
                <h1 className="text-2xl font-semibold">Create Campaign</h1>
                <p className="text-gray-500 text-sm">
                  Set up a new marketing campaign
                </p>
              </div>
            </div>

            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-3 mb-6">
                  <Target />
                  <h2 className="font-semibold">Campaign Details</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Campaign Name
                    </label>
                    <Input
                      placeholder="Enter campaign name"
                      className="border border-gray-200"
                    />
                  </div>
                  <div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Campaign Type
                      </label>
                      <Select>
                        <SelectTrigger className="border border-gray-200">
                          <SelectValue placeholder="Select campaign type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Email Marketing">
                            Email Marketing
                          </SelectItem>
                          <SelectItem value="SMS/Whatsapp">
                            SMS/Whatsapp
                          </SelectItem>
                          <SelectItem value="Landing Page">
                            Landing Page
                          </SelectItem>
                          <SelectItem value="Full Funnel">
                            Full Funnel
                          </SelectItem>
                          <SelectItem value="Social Media">
                            Social Media
                          </SelectItem>
                          <SelectItem value="Lead Generation">
                            Lead Generation
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Budget
                    </label>
                    <Input
                      placeholder="e.g., $1,000"
                      className="border border-gray-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Target Audience
                    </label>
                    <Input
                      placeholder="e.g., Small business owners"
                      className="border border-gray-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Campaign Description
                  </label>
                  <Textarea
                    placeholder="Describe your campaign goals and strategy..."
                    className="border border-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Marketing Channels
                  </label>
                  <div className="grid grid-cols-5 gap-4">
                    <Button
                      variant="outline"
                      className="w-full border border-gray-200 flex flex-col p-8"
                    >
                      <Mail />
                      Email
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border border-gray-200 flex flex-col p-8"
                    >
                      <MessageSquare />
                      SMS
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border border-gray-200 flex flex-col p-8"
                    >
                      <MessageSquare />
                      WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border border-gray-200 flex flex-col p-8"
                    >
                      <Globe />
                      Landing Page
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border border-gray-200 flex flex-col p-8"
                    >
                      <UsersRound />
                      Social Media
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <Button
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg"
                    onClick={() => setView("list")}
                  >
                    Cancel
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg shadow">
                    Create Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}
