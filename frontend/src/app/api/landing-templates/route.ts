import { NextResponse } from "next/server";
import type { Template } from "@/types/landing";

const templates: Template[] = [
  { id: "lead-gen", name: "Lead Generation", description: "Perfect for capturing emails and generating leads" },
  { id: "product-launch", name: "Product Launch", description: "Showcase new products with compelling CTAs" },
  { id: "event-signup", name: "Event Registration", description: "Drive registrations for webinars and events" },
  { id: "saas-signup", name: "SaaS Sign-up", description: "Convert visitors into trial users" },
  { id: "ecommerce", name: "E-commerce Sale", description: "Promote products and drive purchases" },
  { id: "consultation", name: "Book Consultation", description: "Schedule meetings and consultations" },
];

export async function GET() {
  return NextResponse.json(templates);
}
