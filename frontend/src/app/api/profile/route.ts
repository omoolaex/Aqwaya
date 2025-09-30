import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const businessProfile = {
      businessName: formData.get("businessName") as string,
      industry: formData.get("industry") as string,
      website: formData.get("website") as string,
      location: formData.get("location") as string,
      description: formData.get("description") as string,
      employees: formData.get("employees") as string,
      brandColor: formData.get("brandColor") as string,
      logo: formData.get("logo")
        ? (formData.get("logo") as File).name
        : null,
    };

    return NextResponse.json({
      success: true,
      message: "Business profile saved successfully",
      data: businessProfile,
    });
  } catch (error) {
    console.error("Profile API Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save business profile" },
      { status: 500 }
    );
  }
}
