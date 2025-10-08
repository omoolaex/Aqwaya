export type EmailCampaign = {
  id: string;
  user_id: string;
  name: string;
  subject_line: string;
  campaign_type: string;
  status: string;
  target_segments: string[];
  content: {
    html: string;
    text: string;
  };
  stats: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    unsubscribed: number;
    bounced: number;
  };
  scheduled_at?: string;
  created_at: string;
  updated_at: string;
};