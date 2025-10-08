import { NextResponse } from "next/server";

export const GET = async () => {
  const settingsCategories = [
    {
      title: "Profile Settings",
      icon: "User",
      color: "text-blue-600",
      settings: [
        { label: "Full Name", type: "input", value: "Sarah Johnson" },
        { label: "Email", type: "input", value: "sarah.j@company.com" },
        { label: "Phone", type: "input", value: "+1 (555) 123-4567" },
        { label: "Company", type: "input", value: "Akwaya Marketing" },
      ],
    },
    {
      title: "Notifications",
      icon: "Bell",
      color: "text-yellow-600",
      settings: [
        { label: "Email Notifications", type: "switch", value: true },
        { label: "SMS Notifications", type: "switch", value: false },
        { label: "Campaign Updates", type: "switch", value: true },
        { label: "Weekly Reports", type: "switch", value: true },
      ],
    },
    {
      title: "Security",
      icon: "Shield",
      color: "text-green-600",
      settings: [
        { label: "Two-Factor Authentication", type: "switch", value: false },
        { label: "Login Alerts", type: "switch", value: true },
        { label: "Session Timeout", type: "select", value: "30 minutes" },
      ],
    },
    {
      title: "Billing",
      icon: "CreditCard",
      color: "text-purple-600",
      settings: [
        {
          label: "Current Plan",
          type: "display",
          value: "Pro Plan - $99/month",
        },
        {
          label: "Next Billing Date",
          type: "display",
          value: "February 15, 2024",
        },
        {
          label: "Payment Method",
          type: "display",
          value: "**** **** **** 1234",
        },
      ],
    },
  ];

  return NextResponse.json(settingsCategories);
};
