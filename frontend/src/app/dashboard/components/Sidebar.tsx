"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  MessageSquare,
  Settings,
  Zap,
  Globe,
  // Workflow,
  Bot,
  UsersRound,
  Sparkles,
  LayoutDashboard,
  Target,
  // FileText,
  ChartColumn,
  WandSparkles,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    {
      name: "AI Prompt Builder",
      icon: Zap,
      href: "/dashboard/sections/AIPromptBuilder",
    },
    { name: "Campaigns", icon: Target, href: "/dashboard/sections/campaigns" },
    {
      name: "Landing Pages",
      icon: Globe,
      href: "/dashboard/sections/landingPages",
    },
    { name: "Leads", icon: UsersRound, href: "/dashboard/sections/leads" },
    {
      name: "AI Email Marketing",
      icon: Bot,
      href: "/dashboard/sections/emailMarketing",
    },
    {
      name: "SMS & WhatsApp",
      icon: MessageSquare,
      href: "/dashboard/sections/messaging",
    },
    {
      name: "Analytics",
      icon: ChartColumn,
      href: "/dashboard/sections/analytics",
    },
    { name: "Settings", icon: Settings, href: "/dashboard/sections/settings" },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden p-4">
        <button onClick={toggleSidebar}>
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
         md:translate-x-0 md:static md:block`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b border-gray-200">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="Aqwaya Logo"
                  width={30}
                  height={30}
                  className="w-6 h-6"
                />
                <span className="text-xl font-bold text-blue-900">Aqwaya</span>
              </div>
              <p className="text-gray-500 text-xs ml-2">AI Powered Marketing</p>
            </div>

            <button className="md:hidden" onClick={closeSidebar}>
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          {/* Menu items */}
          <nav className="flex-1 px-4 pt-4 overflow-y-auto">
            {menuItems.map(({ name, icon: Icon, href }) => (
              <Link
                key={name}
                href={href}
                onClick={closeSidebar}
                className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-sm mb-1 ${
                  pathname === href
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {name}
              </Link>
            ))}

            {/* AI Info */}
            <div className="rounded-lg bg-blue-50/50 p-4 text-sm text-purple-500 my-6 border-1 border-text-purple-400">
              <div className="flex gap-2 items-center mb-2">
                <Sparkles className="w-4 h-4" />
                <p className="font-semibold">AI-Powered Features</p>
              </div>
              <p className="mb-2">
                Experience the power of AI across all marketing tools
              </p>
              <div className="flex gap-2 items-center mb-2">
                <Bot className="w-4 h-4" />
                <p>Smart Email Campaigns</p>
              </div>
              <div className="flex gap-2 items-center mb-2">
                <WandSparkles className="w-4 h-4" />
                <p>AI Content Generation</p>
              </div>
              <div className="flex gap-2 items-center mb-2">
                <Target className="w-4 h-4" />
                <p>Intelligent Targeting</p>
              </div>
            </div>
          </nav>

          {/* Footer / User Profile */}
          <div className="p-4 text-sm border-t border-gray-200">
            <div className="flex gap-3 justify-center items-center rounded-lg bg-blue-50/50 p-4 border-1 border-purple-400">
              <div>
                <p className="mx-auto w-12 h-12 flex items-center justify-center bg-gradient-to-r from-purple-400 to-blue-400 rounded-full text-white text-lg">
                  S
                </p>
              </div>
              <div>
                <p className="font-semibold">Sarah Johnson</p>
                <p className="text-purple-500">AI Pro Plan</p>
              </div>
            </div>
          </div>

          {/* Logout button */}
          <div className="px-4 pt-1 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="mt-3 mb-2 flex items-center gap-2 w-full px-4 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-100 transition text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
