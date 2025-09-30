import { BusinessProfileData } from "@/app/dashboard/components/BusinessProfileSetup";

export async function saveBusinessProfile(data: BusinessProfileData) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as string | Blob);
    }
  });

  const res = await fetch("/api/profile", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to save profile");
  }

  return res.json();
}
