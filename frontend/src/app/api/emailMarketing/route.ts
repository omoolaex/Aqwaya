import { NextResponse } from "next/server";

// ---- Mock Data ----
const mockCampaigns = [
  {
    id: "campaign-1",
    user_id: "mock-user",
    name: "Welcome Series Campaign",
    subject_line: "Welcome to our community!",
    campaign_type: "sequence",
    status: "active",
    target_segments: ["new_subscribers"],
    content: { html: "<h1>Welcome!</h1>", text: "Welcome!" },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    stats: {
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      unsubscribed: 0,
      bounced: 0,
    },
  },
  {
    id: "campaign-2",
    user_id: "mock-user",
    name: "Product Launch Announcement",
    subject_line: "Exciting new product just launched!",
    campaign_type: "one-time",
    status: "completed",
    target_segments: ["all_subscribers"],
    content: { html: "<h1>New Product</h1>", text: "New Product Launch" },
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    stats: {
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      unsubscribed: 0,
      bounced: 0,
    },
  },
  {
    id: "campaign-3",
    user_id: "mock-user",
    name: "Monthly Newsletter",
    subject_line: "Your monthly update is here",
    campaign_type: "automation",
    status: "paused",
    target_segments: ["engaged_users"],
    content: { html: "<h1>Newsletter</h1>", text: "Newsletter content" },
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    stats: {
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      unsubscribed: 0,
      bounced: 0,
    },
  },
  {
    id: "campaign-4",
    user_id: "mock-user",
    name: "October Promo",
    subject_line: "Save 20% this month!",
    campaign_type: "Promotional",
    status: "Draft",
    target_segments: ["All Subscribers"],
    content: { html: "<p>Promo content</p>", text: "Promo content" },
    stats: {
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      unsubscribed: 0,
      bounced: 0,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const mockStrategies = [
  {
    id: "s1",
    name: "Welcome Series",
    business_type: "E-commerce",
    marketing_goals: ["Increase engagement", "Introduce new users"],
    created_at: new Date().toISOString(),
    generated_strategy: {
      overview: "A welcome email series to onboard new subscribers.",
      next_steps: [
        "Send initial welcome email",
        "Follow up with product intro",
      ],
      content_calendar: [
        "Day 1: Welcome",
        "Day 3: Product Tour",
        "Day 7: Offer",
      ],
      segmentation_strategy: "Target users who signed up within 7 days.",
      success_metrics: ["Open rate", "Click-through rate"],
    },
    target_audience_profile: {
      description: "New subscribers in the last week",
    },
  },
];

// ---- GET handler ----
export async function GET() {
  return NextResponse.json({
    campaigns: mockCampaigns,
    strategies: mockStrategies,
  });
}

// ---- POST handler ----
export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({
    message: "Data received successfully",
    received: body,
  });
}
