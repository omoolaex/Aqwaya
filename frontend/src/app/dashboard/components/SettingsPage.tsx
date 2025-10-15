"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Settings,
  User,
  Bell,
  Shield,
  CreditCard,
  Loader2,
} from "lucide-react";

interface SettingsPageProps {
  onBack: () => void;
}

type SettingItem =
  | { label: string; type: "input"; value: string }
  | { label: string; type: "switch"; value: boolean }
  | { label: string; type: "display"; value: string }
  | { label: string; type: "select"; value: string };

interface SettingsCategory {
  title: string;
  icon: "User" | "Bell" | "Shield" | "CreditCard";
  color: string;
  settings: SettingItem[];
}

const iconMap: Record<SettingsCategory["icon"], React.ElementType> = {
  User,
  Bell,
  Shield,
  CreditCard,
};

export default function SettingsPage({ onBack }: SettingsPageProps) {
  const [settingsCategories, setSettingsCategories] = useState<
    SettingsCategory[] | null
  >(null);
  const [profileSettings, setProfileSettings] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
  });

  // handle input field changes
  const handleChange = (field: keyof typeof profileSettings, value: string) => {
    setProfileSettings((prev) => ({ ...prev, [field]: value }));
  };

  // load saved profile data
  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfileSettings(JSON.parse(savedProfile));
    }
  }, []);

  // save profile data
  const handleSaveChanges = () => {
    localStorage.setItem("userProfile", JSON.stringify(profileSettings));
    alert("Profile updated successfully!");
  };

  // fetch settings categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/settingsCategories");
        const data: SettingsCategory[] = await res.json();

        const storedUser = localStorage.getItem("user");
        const storedProfile = localStorage.getItem("businessProfile");
        const user = storedUser ? JSON.parse(storedUser) : null;
        const profile = storedProfile ? JSON.parse(storedProfile) : null;

        const updatedData = data.map((category) => {
          if (category.title === "Profile Settings" && user && profile) {
            const updatedSettings = category.settings.map((setting) => {
              switch (setting.label) {
                case "Full Name":
                  return { ...setting, value: user.username ?? "" };
                case "Email":
                  return { ...setting, value: user.email ?? "" };
                case "Company":
                  return { ...setting, value: profile.businessName ?? "" };
                default:
                  return setting;
              }
            });
            return { ...category, settings: updatedSettings };
          }
          return category;
        });

        setSettingsCategories(updatedData);
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };

    fetchData();
  }, []);

  if (!settingsCategories) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-3">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-gray-600 text-sm sm:text-base">
          Loading settings data...
        </p>
      </div>
    );
  }

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
              <Settings className="w-8 h-8 text-gray-600" />
              <span>Settings</span>
            </h1>
            <p className="text-gray-600">Manage your account and preferences</p>
          </div>
        </div>
      </div>

      {/* Settings Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {settingsCategories.map((category, categoryIndex) => {
          const Icon = iconMap[category.icon];
          return (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon className={`w-5 h-5 ${category.color}`} />
                  <span>{category.title}</span>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {category.title === "Profile Settings" ? (
                  <>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Full Name</Label>
                      <Input
                        value={profileSettings.fullName}
                        onChange={(e) =>
                          handleChange("fullName", e.target.value)
                        }
                        className="w-48"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Email</Label>
                      <Input
                        value={profileSettings.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="w-48"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Phone</Label>
                      <Input
                        value={profileSettings.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="w-48"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Company</Label>
                      <Input
                        value={profileSettings.company}
                        onChange={(e) =>
                          handleChange("company", e.target.value)
                        }
                        className="w-48"
                      />
                    </div>

                    <Button
                      variant="outline"
                      className="w-full mt-4 bg-gray-900 text-white"
                      onClick={handleSaveChanges}
                    >
                      Save Changes
                    </Button>
                  </>
                ) : (
                  category.settings.map((setting, settingIndex) => (
                    <div
                      key={settingIndex}
                      className="flex items-center justify-between"
                    >
                      <Label className="text-sm font-medium">
                        {setting.label}
                      </Label>
                      <div className="flex items-center">
                        {setting.type === "switch" && (
                          <Switch defaultChecked={setting.value as boolean} />
                        )}
                        {setting.type === "display" && (
                          <span className="text-sm text-gray-600">
                            {setting.value}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}

                {category.title === "Billing" && (
                  <div className="space-y-2 mt-4">
                    <Button variant="outline" className="w-full">
                      Upgrade Plan
                    </Button>
                    <Button variant="outline" className="w-full">
                      Update Payment Method
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Export Data</Label>
              <p className="text-xs text-gray-600">
                Download all your account data
              </p>
            </div>
            <Button variant="outline">Export</Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium text-red-600">
                Delete Account
              </Label>
              <p className="text-xs text-gray-600">
                Permanently delete your account and all data
              </p>
            </div>
            <Button variant="destructive" className="text-white bg-red-400">
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
