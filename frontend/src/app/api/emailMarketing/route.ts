import { NextResponse } from "next/server";

export async function GET() {
  const campaigns = [
    {
      id: "campaign-1",
      user_id: "mock-user-123",
      name: "Welcome Series",
      subject_line: "Welcome to our community!",
      campaign_type: "sequence",
      status: "active",
      target_segments: ["new_subscribers"],
      content: {
        html: "<h1>Welcome!</h1><p>Thank you for joining us.</p>",
        text: "Welcome! Thank you for joining us.",
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      stats: {
        sent: 1250,
        delivered: 1200,
        opened: 480,
        clicked: 96,
        unsubscribed: 5,
        bounced: 15,
      },
    },
  ];

  const strategies = [
    {
      id: "strategy-1",
      user_id: "mock-user-123",
      name: "Holiday Promo Strategy",
      description: "Send a sequence of promotional emails leading up to the holidays.",
      type: "promotion",
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "strategy-2",
      user_id: "mock-user-123",
      name: "Re-engagement Strategy",
      description: "Target inactive subscribers with special offers.",
      type: "re-engagement",
      status: "draft",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  return NextResponse.json({ campaigns, strategies });
}
