"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import { ArrowLeft, Globe, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LandingPages() {
  const [view, setView] = useState("list");

  const stats = [
    { title: "Total Pages", value: "3", change: "+1", color: "text-blue-500" },
    {
      title: "Total Visits",
      value: "4,370",
      change: "+15.3%",
      color: "text-green-500",
    },
    {
      title: "Conversions",
      value: "421",
      change: "+8.7%",
      color: "text-purple-500",
    },
    {
      title: "Avg. Conv. Rate",
      value: "9.6%",
      change: "+2.1%",
      color: "text-orange-500",
    },
  ];

  const pages = [
    {
      title: "Summer Sale Landing Page",
      created: "2024-01-15",
      visits: 2847,
      conversions: 234,
      rate: "8.2%",
      status: "Published",
    },
    {
      title: "Product Launch Page",
      created: "2024-01-20",
      visits: 0,
      conversions: 0,
      rate: "0%",
      status: "Draft",
    },
    {
      title: "Free Trial Sign-up",
      created: "2024-01-10",
      visits: 1523,
      conversions: 187,
      rate: "12.3%",
      status: "Published",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6">
        {view === "list" ? (
          <>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto">
                <Link
                  href="/dashboard"
                  className="text-sm flex items-center gap-2 bg-white rounded hover:bg-gray-100 border border-gray-200 px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </Link>
                <div>
                  <div className="flex items-center gap-2">
                    <Globe className="text-orange-500" />
                    <h1 className="text-xl md:text-2xl font-bold">
                      Landing Pages
                    </h1>
                  </div>
                  <p className="text-sm text-gray-500">
                    Manage your landing pages and track performance
                  </p>
                </div>
              </div>

              <div className="w-full md:w-auto">
                <button
                  onClick={() => setView("create")}
                  className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded shadow text-center flex gap-2 justify-center items-center"
                >
                  <Plus className="w-4 h-4" /> Create Landing Page
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((s) => (
                <div
                  key={s.title}
                  className="bg-white rounded shadow p-4 border border-gray-100"
                >
                  <p className="text-sm text-gray-500">{s.title}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xl font-semibold">{s.value}</p>
                    <span className={`${s.color} text-sm`}>{s.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Landing Pages List */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow">
              <h2 className="text-xl font-semibold mb-4">Your Landing Pages</h2>

              <div className="space-y-4">
                {pages.map((p) => (
                  <div
                    key={p.title}
                    className="flex flex-col md:flex-row justify-between md:items-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow transition gap-4"
                  >
                    {/* Left: Title & Created Date */}
                    <div>
                      <p className="font-medium">{p.title}</p>
                      <p className="text-xs text-gray-500">
                        Created on {p.created}
                      </p>
                    </div>

                    {/* Middle: Stats */}
                    <div className="flex flex-col sm:flex-row gap-6 text-sm text-gray-600">
                      <p>{p.visits} Visits</p>
                      <p>{p.conversions} Conversions</p>
                      <p>{p.rate} Rate</p>
                    </div>

                    {/* Status */}
                    <div
                      className={`text-xs px-2 py-1 rounded ${
                        p.status === "Published"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {p.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Create Landing Page View */}
            <div className="flex gap-4 items-center mb-6">
              <Button
                className="hover:bg-gray-200 text-gray-700"
                onClick={() => setView("list")}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              <h1 className="text-xl md:text-2xl font-bold">
                AI Landing Page Builder
              </h1>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow">
              {/* Progress Steps */}
              <div className="flex justify-between items-center mb-6 text-sm">
                <p className="text-blue-600 font-medium">1. Basic Info</p>
                <p>2. Choose Template</p>
                <p>3. Pick Colors</p>
                <p>4. AI Generation</p>
                <p>5. Review</p>
              </div>

              <h2 className="font-semibold text-lg mb-2">
                Let&apos;s Start with the Basics
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                Tell us about your landing page goals
              </p>

              <div className="space-y-4">
                {/* Landing Page Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Landing Page Name
                  </label>
                  <Input placeholder="e.g., Product Launch 2024" />
                </div>

                {/* Industry Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Industry
                  </label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg">
                      <SelectItem
                        value="technology"
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                      >
                        Technology
                      </SelectItem>
                      <SelectItem
                        value="healthcare"
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                      >
                        Healthcare
                      </SelectItem>
                      <SelectItem
                        value="finance"
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                      >
                        Finance
                      </SelectItem>
                      <SelectItem
                        value="education"
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                      >
                        Education
                      </SelectItem>
                      <SelectItem
                        value="retail"
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                      >
                        Retail/E-commerce
                      </SelectItem>
                      <SelectItem
                        value="consulting"
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                      >
                        Consulting
                      </SelectItem>
                      <SelectItem
                        value="fitness"
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                      >
                        Fitness & Wellness
                      </SelectItem>
                      <SelectItem
                        value="food"
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                      >
                        Food & Beverage
                      </SelectItem>
                      <SelectItem
                        value="realestate"
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                      >
                        Real Estate
                      </SelectItem>
                      <SelectItem
                        value="other"
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                      >
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Primary Goal Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Goal
                  </label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="What's your main goal?" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg">
                      <SelectItem
                        value="leads"
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                      >
                        Generate Leads
                      </SelectItem>
                      <SelectItem
                        value="sales"
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                      >
                        Drive Product Sales
                      </SelectItem>
                      <SelectItem
                        value="awareness"
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                      >
                        Event Sign-ups
                      </SelectItem>
                      <SelectItem
                        value="awareness"
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                      >
                        Free Trial Sign-ups
                      </SelectItem>
                      <SelectItem
                        value="awareness"
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                      >
                        Book Consultation
                      </SelectItem>
                      <SelectItem
                        value="awareness"
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                      >
                        Email Collection
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Target Audience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Audience
                  </label>
                  <Input placeholder="e.g. Small business owners, Tech professionals" />
                </div>

                {/* Value Proposition */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Value Proposition
                  </label>
                  <Textarea placeholder="What unique value do you offer? What problem do you solve?" />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button className="bg-orange-500 text-white">Next</Button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
