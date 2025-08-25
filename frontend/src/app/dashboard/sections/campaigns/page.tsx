"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  const [view, setView] = useState("list"); // "list" | "create"

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
              <h1 className="text-2xl font-semibold">Campaigns</h1>
              <Button
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg shadow"
                onClick={() => setView("create")}
              >
                + Create Campaign
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="flex flex-col items-center p-6">
                  <p className="text-sm text-gray-500">Total Campaigns</p>
                  <p className="text-xl font-bold mt-2">0</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6">
                  <p className="text-sm text-gray-500">Active Campaigns</p>
                  <p className="text-xl font-bold text-green-600 mt-2">0</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6">
                  <p className="text-sm text-gray-500">Total Leads</p>
                  <p className="text-xl font-bold text-purple-600 mt-2">0</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6">
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <p className="text-xl font-bold text-green-600 mt-2">$0</p>
                </CardContent>
              </Card>
            </div>

            <Card>
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
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Campaign Details</h1>
              <Button
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg shadow"
                onClick={() => setView("list")}
              >
                ← Back
              </Button>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Campaign Name
                  </label>
                  <Input placeholder="Enter campaign name" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Budget
                    </label>
                    <Input placeholder="e.g., $1,000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Target Audience
                    </label>
                    <Input placeholder="e.g., Small business owners" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Campaign Type
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select campaign type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email Marketing</SelectItem>
                      <SelectItem value="sms">SMS Marketing</SelectItem>
                      <SelectItem value="whatsapp">
                        WhatsApp Marketing
                      </SelectItem>
                      <SelectItem value="social">
                        Social Media Marketing
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Campaign Description
                  </label>
                  <Textarea placeholder="Describe your campaign goals and strategy..." />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Marketing Channels
                  </label>
                  <div className="grid grid-cols-5 gap-4">
                    <Button variant="outline" className="w-full">
                      Email
                    </Button>
                    <Button variant="outline" className="w-full">
                      SMS
                    </Button>
                    <Button variant="outline" className="w-full">
                      WhatsApp
                    </Button>
                    <Button variant="outline" className="w-full">
                      Landing Page
                    </Button>
                    <Button variant="outline" className="w-full">
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
