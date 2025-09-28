import { NextResponse } from "next/server";
import type { ColorScheme } from "@/types/landing";

const colorSchemes: ColorScheme[] = [
  { id: "professional", name: "Professional Blue", colors: ["#1e40af", "#3b82f6", "#60a5fa"] },
  { id: "modern", name: "Modern Purple", colors: ["#7c3aed", "#8b5cf6", "#a78bfa"] },
  { id: "energetic", name: "Energetic Orange", colors: ["#ea580c", "#f97316", "#fb923c"] },
  { id: "nature", name: "Nature Green", colors: ["#059669", "#10b981", "#34d399"] },
  { id: "elegant", name: "Elegant Dark", colors: ["#374151", "#6b7280", "#9ca3af"] },
];

export async function GET() {
  return NextResponse.json(colorSchemes);
}
