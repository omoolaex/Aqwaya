"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building, Upload, Palette } from "lucide-react";
import AuthGuard from "@/components/authguard";
import { saveBusinessProfile } from "@/lib/profile";

export interface BusinessProfileData {
  businessName: string;
  industry: string;
  website: string;
  location: string;
  description: string;
  employees: string;
  brandColor: string;
  logo?: File | null;
}

interface BusinessProfileSetupProps {
  onComplete: (data: BusinessProfileData) => void;
}

const BusinessProfileSetup = ({ onComplete }: BusinessProfileSetupProps) => {
  const [formData, setFormData] = useState<BusinessProfileData>({
    businessName: "",
    industry: "",
    website: "",
    location: "",
    description: "",
    employees: "",
    brandColor: "#3B82F6",
    logo: null,
  });

  const industries = [
    "E-commerce & Retail",
    "Technology & Software",
    "Healthcare & Medical",
    "Finance & Banking",
    "Education & Training",
    "Real Estate",
    "Professional Services",
    "Manufacturing",
    "Food & Beverage",
    "Travel & Tourism",
    "Non-profit",
    "Other",
  ];

  const employeeSizes = [
    "Just me",
    "2-10 employees",
    "11-50 employees",
    "51-200 employees",
    "200+ employees",
  ];

  const handleInputChange = (
    field: keyof BusinessProfileData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, logo: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await saveBusinessProfile(formData);
      console.log("Saved:", response);

      onComplete(formData);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const isFormValid = () => {
    return formData.businessName && formData.industry;
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
              <Building className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">
              Set Up Your Business Profile
            </CardTitle>
            <p className="text-gray-600">
              Tell us about your business to get started
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Business Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Business Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      placeholder="Your Business Name"
                      value={formData.businessName}
                      onChange={(e) =>
                        handleInputChange("businessName", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry *</Label>
                    <select
                      id="industry"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.industry}
                      onChange={(e) =>
                        handleInputChange("industry", e.target.value)
                      }
                      required
                    >
                      <option value="">Select your industry</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      placeholder="https://yourwebsite.com"
                      value={formData.website}
                      onChange={(e) =>
                        handleInputChange("website", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Business Location</Label>
                    <Input
                      id="location"
                      placeholder="City, Country"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employees">Company Size</Label>
                    <select
                      id="employees"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.employees}
                      onChange={(e) =>
                        handleInputChange("employees", e.target.value)
                      }
                    >
                      <option value="">Select company size</option>
                      {employeeSizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about your business, products, or services..."
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows={3}
                  />
                </div>
              </div>

              {/* Branding */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Brand Identity
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo Upload</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="logo"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("logo")?.click()}
                        className="w-full"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {formData.logo ? formData.logo.name : "Upload Logo"}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brandColor">Brand Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="brandColor"
                        type="color"
                        value={formData.brandColor}
                        onChange={(e) =>
                          handleInputChange("brandColor", e.target.value)
                        }
                        className="w-16 h-10 p-1 rounded"
                      />
                      <Input
                        type="text"
                        value={formData.brandColor}
                        onChange={(e) =>
                          handleInputChange("brandColor", e.target.value)
                        }
                        placeholder="#3B82F6"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-6 border-t">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={!isFormValid()}
                >
                  Complete Setup & Continue to Dashboard
                </Button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  You can update this information later in your settings
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  );
};

export default BusinessProfileSetup;
