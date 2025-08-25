"use client";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import { ArrowLeft, DollarSign, Users, Zap, TrendingUp } from "lucide-react";

export default function AiPromptBuilderMain() {
  const [step] = useState(1);

  const steps = [1, 2, 3, 4];

  const goals = [
    {
      title: "Generate leads",
      desc: "Create campaigns to capture potential customers",
      icon: <Users className="w-6 h-6" />,
      color: "bg-blue-600",
    },
    {
      title: "Build a sales campaign",
      desc: "Design campaigns to drive direct sales",
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-green-600",
    },
    {
      title: "Nurture leads",
      desc: "Build relationships with existing prospects",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-purple-600",
    },
    {
      title: "Automate follow-up",
      desc: "Set up automated sequences for engagement",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div>
        <Sidebar />
      </div>
      <main className="flex-1 p-6">
        <div className="flex gap-6">
          <div>
            {/* Back */}
            <Link
              href="/dashboard"
              className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 text-gray-600 hover:text-gray-900 mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
          </div>

          <div className="flex items-center justify-center gap-10 mb-10">
            {steps.map((s) => (
              <div
                key={s}
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  s === step
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                <div>
                  {s}
                  <span className="w-8 h-4 bg-gray-900"></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}

        <div className="bg-white border border-gray-200 p-8 rounded-lg shadow max-w-4xl mx-auto">
          {/* Heading */}
          <h2 className="text-2xl font-semibold text-center mb-2">
            What&apos;s your goal?
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Choose the type of campaign you want to create
          </p>

          {/* Goals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {goals.map((g) => (
              <div
                key={g.title}
                className="flex items-start gap-4 p-6 border border-gray-200 hover:border-blue-200 rounded-lg bg-white shadow-sm hover:shadow-md transition"
              >
                <div
                  className={`${g.color} w-10 h-10 flex items-center justify-center rounded-full text-white`}
                >
                  {g.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{g.title}</h3>
                  <p className="text-sm text-gray-500">{g.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Back button */}
          <div className="flex mt-10">
            <Link
              href="/dashboard"
              className="px-4 py-2 border border-gray-200 rounded-md bg-white text-gray-900 flex items-center gap-2 hover:bg-gray-100 mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
