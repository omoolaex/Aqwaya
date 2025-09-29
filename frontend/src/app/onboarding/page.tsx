"use client";

import { useRouter } from "next/navigation";
import BusinessProfileSetup, {
  type BusinessProfileData,
} from "../dashboard/components/BusinessProfileSetup";
import { toast } from "@/hooks/use-toast";

const Onboarding = () => {
  const router = useRouter();

  const handleProfileComplete = async (profileData: BusinessProfileData) => {
    try {
      const formData = new FormData();

      // Append all string fields except logo
      Object.entries(profileData).forEach(([key, value]) => {
        if (key !== "logo" && typeof value === "string") {
          formData.append(key, value);
        }
      });

      // Append logo if provided
      if (profileData.logo) {
        formData.append("logo", profileData.logo);
      }

      const res = await fetch("/api/profile", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("API response not OK");
      }

      toast({
        title: "Profile setup complete!",
        description: "Welcome to Aqwaya 🎉",
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Failed to save profile",
        description: "Please try again later.",
      });
    }
  };

  return <BusinessProfileSetup onComplete={handleProfileComplete} />;
};

export default Onboarding;
