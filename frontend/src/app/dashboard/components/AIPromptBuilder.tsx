"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Sparkles,
  Target,
  Users,
  Gift,
  Globe,
  Mail,
  MessageSquare,
  CheckCircle,
  Edit,
  Play,
  Eye,
  TrendingUp,
  Zap,
  DollarSign,
  Save,
} from "lucide-react";
// import { Campaign } from "@/types/campaign";

interface AIPromptBuilderProps {
  onBack: () => void;
  specificTool?: "landing-page" | "email" | "sms-whatsapp" | null;
}

interface StrategyComponent {
  type: string;
  title: string;
  description: string;
  details: string[];
  timeline: string;
  requirements: string[];
  icon: React.ElementType;
  color: string;
  editable: boolean;
}

interface GeneratedStrategy {
  title: string;
  overview: string;
  components: StrategyComponent[];
  implementation: string;
  externalActions: string;
  keyMetrics: string[];
  timeline: string;
}

const AIPromptBuilder = ({ onBack, specificTool }: AIPromptBuilderProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    goal: "",
    audience: "",
    offer: "",
    trafficSource: "",
    industry: "",
    currentChallenges: "",
    timeline: "",
    specificRequirements: "",
  });
  const [generatedStrategy, setGeneratedStrategy] =
    useState<GeneratedStrategy | null>(null);
  const [editingComponent, setEditingComponent] = useState<number | null>(null);
  const [isImplementing, setIsImplementing] = useState(false);
  const [implementationComplete, setImplementationComplete] = useState(false);

  const getGoalOptions = () => {
    if (specificTool === "landing-page") {
      return [
        {
          id: "generate-leads",
          title: "Generate leads with landing page",
          description:
            "Create high-converting landing pages to capture potential customers",
          icon: Users,
          color: "from-blue-500 to-blue-600",
        },
        {
          id: "sell-product",
          title: "Sell product/service directly",
          description:
            "Build sales-focused landing pages for direct conversions",
          icon: DollarSign,
          color: "from-green-500 to-green-600",
        },
        {
          id: "event-registration",
          title: "Drive event registrations",
          description: "Create compelling pages for webinars, events, or demos",
          icon: TrendingUp,
          color: "from-purple-500 to-purple-600",
        },
        {
          id: "app-downloads",
          title: "Increase app downloads",
          description: "Optimize landing pages for mobile app installations",
          icon: Zap,
          color: "from-orange-500 to-orange-600",
        },
      ];
    } else if (specificTool === "email") {
      return [
        {
          id: "nurture-leads",
          title: "Nurture leads with email",
          description:
            "Build relationships with existing prospects through email sequences",
          icon: TrendingUp,
          color: "from-purple-500 to-purple-600",
        },
        {
          id: "product-launch",
          title: "Launch new product/service",
          description:
            "Create email campaigns for product announcements and launches",
          icon: Zap,
          color: "from-orange-500 to-orange-600",
        },
        {
          id: "sales-campaign",
          title: "Drive direct sales",
          description:
            "Design email campaigns focused on converting subscribers to customers",
          icon: DollarSign,
          color: "from-green-500 to-green-600",
        },
        {
          id: "re-engagement",
          title: "Re-engage inactive subscribers",
          description:
            "Win back dormant email subscribers with targeted campaigns",
          icon: Users,
          color: "from-blue-500 to-blue-600",
        },
      ];
    } else if (specificTool === "sms-whatsapp") {
      return [
        {
          id: "instant-engagement",
          title: "Instant customer engagement",
          description:
            "Reach customers immediately with high-impact SMS messages",
          icon: Zap,
          color: "from-orange-500 to-orange-600",
        },
        {
          id: "appointment-booking",
          title: "Drive appointment bookings",
          description:
            "Use SMS/WhatsApp to schedule consultations and appointments",
          icon: TrendingUp,
          color: "from-purple-500 to-purple-600",
        },
        {
          id: "abandoned-cart",
          title: "Recover abandoned carts",
          description: "Send timely SMS reminders to complete purchases",
          icon: DollarSign,
          color: "from-green-500 to-green-600",
        },
        {
          id: "customer-support",
          title: "Automate customer support",
          description:
            "Provide instant support and FAQ responses via messaging",
          icon: Users,
          color: "from-blue-500 to-blue-600",
        },
      ];
    } else {
      return [
        {
          id: "generate-leads",
          title: "Generate leads",
          description: "Create campaigns to capture potential customers",
          icon: Users,
          color: "from-blue-500 to-blue-600",
        },
        {
          id: "build-sales-campaign",
          title: "Build a sales campaign",
          description: "Design campaigns to drive direct sales",
          icon: DollarSign,
          color: "from-green-500 to-green-600",
        },
        {
          id: "nurture-leads",
          title: "Nurture leads",
          description: "Build relationships with existing prospects",
          icon: TrendingUp,
          color: "from-purple-500 to-purple-600",
        },
        {
          id: "automate-followup",
          title: "Automate follow-up",
          description: "Set up automated sequences for engagement",
          icon: Zap,
          color: "from-orange-500 to-orange-600",
        },
      ];
    }
  };

  const handleGoalSelect = (goalId: string) => {
    const goalOptions = getGoalOptions();
    const selectedGoal = goalOptions.find((g) => g.id === goalId);
    setFormData((prev) => ({ ...prev, goal: selectedGoal?.title || "" }));
    setStep(2);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateDetailedStrategy = (): GeneratedStrategy => {
    const goalOptions = getGoalOptions();
    const goalData = goalOptions.find((g) => g.title === formData.goal);

    // Create simple, easy-to-understand strategy based on user inputs
    const baseStrategy = {
      title: `${formData.goal} Strategy for ${formData.audience}`,
      timeline: formData.timeline || "4-6 weeks",
      keyMetrics: [
        "Number of people who visit your page",
        "How many people take action",
        "Cost to get each customer",
        "Overall return on investment",
      ],
    };

    let strategy: GeneratedStrategy;

    if (specificTool === "landing-page" || goalData?.id === "generate-leads") {
      strategy = {
        ...baseStrategy,
        overview: `We'll create a simple, effective landing page that speaks directly to ${formData.audience}. This page will showcase your ${formData.offer} in a way that makes people want to take action. We'll make sure it works perfectly with visitors coming from ${formData.trafficSource}.`,
        components: [
          {
            type: "Landing Page",
            title: "Your Custom Landing Page",
            description: `A page designed specifically for ${formData.audience}`,
            details: [
              `Clear headline that grabs attention and speaks to ${formData.audience}`,
              `Simple explanation of how your ${formData.offer} helps solve their problems`,
              `Trust signals like customer reviews and testimonials`,
              `Easy-to-find buttons that encourage people to take action`,
              `Works perfectly on phones, tablets, and computers`,
              `Loads quickly so visitors don't get frustrated and leave`,
            ],
            timeline: "Week 1-2",
            requirements: [
              "Photos or videos of your product/service",
              "Customer testimonials or reviews",
              "Your brand colors and logo",
              "Clear description of what makes you different",
            ],
            icon: Globe,
            color: "from-blue-500 to-blue-600",
            editable: true,
          },
          {
            type: "Lead Collection",
            title: "Easy Sign-Up Process",
            description: "Simple way to collect visitor information",
            details: [
              `Short forms that don't overwhelm ${formData.audience}`,
              `Your ${formData.offer} presented as something valuable they want`,
              `Pop-ups that appear at the right time to capture leaving visitors`,
              `Social media login options to make signing up easier`,
              `All information collected safely and legally`,
              `Instant confirmation so people know they signed up successfully`,
            ],
            timeline: "Week 2",
            requirements: [
              "Email system to store contacts",
              "Connection to your email marketing tool",
              "Privacy policy and terms",
              "Follow-up email templates",
            ],
            icon: Target,
            color: "from-green-500 to-green-600",
            editable: true,
          },
          {
            type: "Traffic Setup",
            title: `${formData.trafficSource} Integration`,
            description: "Connect your page with your traffic source",
            details: [
              `Messages that match what people expect from ${formData.trafficSource}`,
              `Tracking codes to see how well ${formData.trafficSource} is working`,
              `Different versions to test which works better`,
              `Ability to show ads to people who visited but didn't sign up`,
              `Clear view of which visitors are turning into customers`,
              `Dashboard to see your results in real-time`,
            ],
            timeline: "Week 3",
            requirements: [
              `Access to your ${formData.trafficSource} account`,
              "Google Analytics or similar tracking tool",
              "Goals for what success looks like",
              "Some budget for testing different approaches",
            ],
            icon: TrendingUp,
            color: "from-purple-500 to-purple-600",
            editable: true,
          },
        ],
        implementation: `We'll start by creating a simple layout that looks great and works well for ${formData.audience}. Then we'll add your ${formData.offer} in a way that makes people excited to learn more. We'll connect everything to your ${formData.trafficSource} and make sure you can see exactly how well everything is working.`,
        externalActions: `To get the best results, you should also: Create social media posts that drive people to your landing page. Write blog content that supports your message. Consider partnering with others in the ${
          formData.industry || "relevant"
        } space. Make sure your follow-up emails are ready for new leads.`,
      };
    } else if (specificTool === "email" || goalData?.id === "nurture-leads") {
      strategy = {
        ...baseStrategy,
        overview: `We'll create a series of helpful emails that build trust with ${formData.audience} over time. These emails will provide value while gently introducing your ${formData.offer}. Each email will feel personal and relevant to their needs.`,
        components: [
          {
            type: "Email Series",
            title: "Your Email Journey",
            description: `A series of emails designed for ${formData.audience}`,
            details: [
              `Welcome emails that make a great first impression`,
              `Helpful content that solves problems for ${formData.audience}`,
              `Success stories from customers similar to them`,
              `Emails that address common concerns about ${formData.offer}`,
              `Gentle introductions to your products or services`,
              `Clear calls-to-action that feel natural, not pushy`,
              `Follow-up emails for people who don't respond`,
            ],
            timeline: "Week 1-3",
            requirements: [
              "Email platform account",
              "Your brand voice and style guide",
              "Customer success stories",
              "Clear information about your products/services",
            ],
            icon: Mail,
            color: "from-blue-500 to-blue-600",
            editable: true,
          },
          {
            type: "Personalization",
            title: "Smart Email Customization",
            description: "Emails that adapt to each person's interests",
            details: [
              `Emails sent based on what ${formData.audience} actually does`,
              `Different email paths for different types of people`,
              `Content that changes based on what they're interested in`,
              `Best timing for when each person is most likely to read emails`,
              `Messages that get more relevant over time`,
              `Gradual collection of preferences to improve targeting`,
            ],
            timeline: "Week 2-3",
            requirements: [
              "Information about your subscribers",
              "System to track what people click on",
              "Connection to your customer database",
              "Advanced email features",
            ],
            icon: Target,
            color: "from-green-500 to-green-600",
            editable: true,
          },
          {
            type: "Performance Tracking",
            title: "Results Monitoring",
            description: "Keep track of what's working and what isn't",
            details: [
              `Testing different subject lines and content with ${formData.audience}`,
              `Making sure emails actually reach people's inboxes`,
              `Emails that look great on phones and computers`,
              `Clear reports on who's opening and clicking`,
              `Regular cleanup of inactive subscribers`,
              `Tracking which emails lead to actual sales`,
            ],
            timeline: "Week 3-4",
            requirements: [
              "Email authentication setup",
              "Reporting and analytics tools",
              "System to track sales from emails",
              "Regular schedule for reviewing performance",
            ],
            icon: TrendingUp,
            color: "from-purple-500 to-purple-600",
            editable: true,
          },
        ],
        implementation: `We'll set up your email platform with proper authentication and tracking. Then we'll write a series of emails specifically for ${formData.audience}, making sure your ${formData.offer} fits naturally into valuable content. Everything will be tested to work perfectly on all devices.`,
        externalActions: `To support your email campaign: Create blog posts that give people reasons to join your email list. Use ${formData.trafficSource} to promote your email signup. Share email content on social media to reach more people. Ask existing customers to refer friends to your email list.`,
      };
    } else {
      // SMS/WhatsApp or other strategies
      strategy = {
        ...baseStrategy,
        overview: `We'll set up direct messaging that reaches ${formData.audience} instantly on their phones. These messages will be short, helpful, and perfectly timed to get attention when they're most likely to take action.`,
        components: [
          {
            type: "SMS Campaign",
            title: "Direct Text Messaging",
            description: `Text messages designed for ${formData.audience}`,
            details: [
              `Welcome messages that immediately provide value`,
              `Short, clear messages about your ${formData.offer}`,
              `Reminders for people who started but didn't finish an action`,
              `Important updates and time-sensitive information`,
              `Special offers just for text message subscribers`,
              `Simple surveys to learn what people want`,
            ],
            timeline: "Week 1-2",
            requirements: [
              "Text messaging platform and legal compliance",
              "System to manage who can receive messages",
              "Pre-written message templates",
              "Easy way for people to stop receiving messages",
            ],
            icon: MessageSquare,
            color: "from-blue-500 to-blue-600",
            editable: true,
          },
          {
            type: "WhatsApp Setup",
            title: "WhatsApp Business Messaging",
            description: "Professional WhatsApp communication",
            details: [
              `Professional business profile that builds trust`,
              `Automatic responses to common questions about ${formData.offer}`,
              `Targeted messages to different groups of people`,
              `Interactive buttons and quick reply options`,
              `Automated customer support for basic questions`,
              `Order confirmations and update messages`,
            ],
            timeline: "Week 2-3",
            requirements: [
              "WhatsApp Business account approval",
              "Customer service workflow planning",
              "Connection to your existing systems",
              "Pre-approved message templates",
            ],
            icon: MessageSquare,
            color: "from-green-500 to-green-600",
            editable: true,
          },
          {
            type: "Compliance & Optimization",
            title: "Legal Compliance & Performance",
            description: "Stay legal and optimize your results",
            details: [
              `Full compliance with text messaging laws and regulations`,
              `Clear opt-in and opt-out processes for subscribers`,
              `Best timing based on when ${formData.audience} is most active`,
              `Tracking of message delivery and response rates`,
              `Testing different message styles and timing`,
              `Analysis of which messages lead to actual sales`,
            ],
            timeline: "Week 3-4",
            requirements: [
              "Legal compliance review and approval",
              "Analytics and tracking dashboard",
              "Performance monitoring system",
              "Regular optimization schedule",
            ],
            icon: TrendingUp,
            color: "from-purple-500 to-purple-600",
            editable: true,
          },
        ],
        implementation: `We'll start by setting up your messaging platforms and making sure everything follows legal requirements. Then we'll create message templates designed specifically for ${formData.audience}, incorporating your ${formData.offer} in a natural, helpful way.`,
        externalActions: `To maximize your messaging success: Promote your text/WhatsApp signup through ${formData.trafficSource} and other channels. Train your team on WhatsApp best practices. Create social media content that encourages people to join your messaging lists. Include messaging signup options in all your customer interactions.`,
      };
    }

    return strategy;
  };

  const generateStrategy = () => {
    const detailedStrategy = generateDetailedStrategy();
    setGeneratedStrategy(detailedStrategy);
    setStep(3);
  };

  const updateComponent = (
    index: number,
    updatedComponent: StrategyComponent
  ) => {
    if (generatedStrategy) {
      const updatedComponents = [...generatedStrategy.components];
      updatedComponents[index] = updatedComponent;
      setGeneratedStrategy({
        ...generatedStrategy,
        components: updatedComponents,
      });
    }
    setEditingComponent(null);
  };

  const approveStrategy = () => {
    setIsImplementing(true);
    setTimeout(() => {
      setIsImplementing(false);
      setImplementationComplete(true);
      setStep(4);
    }, 3000);
  };

  const renderStep1 = () => {
    const goalOptions = getGoalOptions();

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {specificTool
              ? `What's your ${specificTool.replace("-", " ")} goal?`
              : "What's your goal?"}
          </h2>
          <p className="text-gray-600">
            {specificTool
              ? `Choose what you want to achieve with ${specificTool.replace(
                  "-",
                  " "
                )}`
              : "Choose the type of campaign you want to create"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goalOptions.map((goal) => (
            <Card
              key={goal.id}
              className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-blue-200"
              onClick={() => handleGoalSelect(goal.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${goal.color} rounded-full flex items-center justify-center`}
                  >
                    <goal.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {goal.title}
                    </h3>
                    <p className="text-sm text-gray-600">{goal.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-start">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>
    );
  };

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Tell AI about your campaign
        </h2>
        <p className="text-gray-600">
          The more details you provide, the better AI can create your campaign
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-green-600" />
              </div>
              <Label className="text-base font-semibold">Target Audience</Label>
            </div>
            <Input
              placeholder="e.g., Small business owners aged 25-45 in the fitness industry"
              value={formData.audience}
              onChange={(e) => handleInputChange("audience", e.target.value)}
              className="w-full mb-3"
            />
            <Input
              placeholder="What industry are you in?"
              value={formData.industry}
              onChange={(e) => handleInputChange("industry", e.target.value)}
              className="w-full"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Gift className="w-4 h-4 text-purple-600" />
              </div>
              <Label className="text-base font-semibold">Your Offer</Label>
            </div>
            <Input
              placeholder="e.g., Free 30-minute marketing strategy consultation"
              value={formData.offer}
              onChange={(e) => handleInputChange("offer", e.target.value)}
              className="w-full"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Globe className="w-4 h-4 text-orange-600" />
              </div>
              <Label className="text-base font-semibold">Traffic Source</Label>
            </div>
            <Input
              placeholder="Tell us where you'll be driving traffic from (e.g., Facebook Ads, Google Ads, LinkedIn, Organic Social)"
              value={formData.trafficSource}
              onChange={(e) =>
                handleInputChange("trafficSource", e.target.value)
              }
              className="w-full"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <Target className="w-4 h-4 text-red-600" />
              </div>
              <Label className="text-base font-semibold">
                Current Challenges
              </Label>
            </div>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="What specific challenges are you facing with your current marketing efforts?"
              value={formData.currentChallenges}
              onChange={(e) =>
                handleInputChange("currentChallenges", e.target.value)
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Label className="text-base font-semibold">Timeline</Label>
            <Input
              placeholder="e.g., 4-6 weeks"
              value={formData.timeline}
              onChange={(e) => handleInputChange("timeline", e.target.value)}
              className="w-full mt-2"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between max-w-2xl mx-auto">
        <Button variant="outline" onClick={() => setStep(1)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Goals
        </Button>
        <Button
          onClick={generateStrategy}
          disabled={
            !formData.audience || !formData.offer || !formData.trafficSource
          }
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          Generate Detailed Strategy
          <Sparkles className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your AI Strategy
        </h2>
        <p className="text-gray-600">
          Review, edit, and approve your personalized marketing strategy
        </p>
      </div>

      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span>{generatedStrategy?.title}</span>
            </div>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit Title
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-6">{generatedStrategy?.overview}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold text-gray-900 mb-2">Timeline</h4>
              <p className="text-sm text-gray-600">
                {generatedStrategy?.timeline}
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold text-gray-900 mb-2">
                What We&apos;ll Track
              </h4>
              <div className="text-sm text-gray-600">
                {generatedStrategy?.keyMetrics
                  .slice(0, 2)
                  .map((metric, index) => (
                    <div key={index}>{metric}</div>
                  ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <h4 className="font-semibold text-gray-900">
              What We&apos;ll Build for You:
            </h4>
            <div className="space-y-4">
              {generatedStrategy?.components.map((component, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-lg border border-blue-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 bg-gradient-to-r ${component.color} rounded-full flex items-center justify-center`}
                      >
                        <component.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">
                          {component.title}
                        </h5>
                        <p className="text-sm text-gray-600">
                          {component.description}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setEditingComponent(
                          editingComponent === index ? null : index
                        )
                      }
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>

                  {editingComponent === index ? (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <Label>Component Title</Label>
                        <Input
                          value={component.title}
                          onChange={(e) =>
                            updateComponent(index, {
                              ...component,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <textarea
                          className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={component.description}
                          onChange={(e) =>
                            updateComponent(index, {
                              ...component,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => setEditingComponent(null)}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingComponent(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <h6 className="font-medium text-gray-800 mb-2">
                          What This Includes:
                        </h6>
                        <ul className="space-y-1">
                          {component.details.map((detail, detailIndex) => (
                            <li
                              key={detailIndex}
                              className="text-sm text-gray-600 flex items-start"
                            >
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <h6 className="font-medium text-gray-800 mb-2">
                            Timeline:
                          </h6>
                          <p className="text-sm text-gray-600">
                            {component.timeline}
                          </p>
                        </div>
                        <div>
                          <h6 className="font-medium text-gray-800 mb-2">
                            What You Need to Provide:
                          </h6>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {component.requirements.map((req, reqIndex) => (
                              <li key={reqIndex} className="flex items-start">
                                <Target className="w-3 h-3 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-white p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-3">
                How We&apos;ll Build This:
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                {generatedStrategy?.implementation}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-3">
                What You Should Do Outside Our Platform:
              </h4>
              <p className="text-sm text-gray-600">
                {generatedStrategy?.externalActions}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(2)}>
          <Edit className="w-4 h-4 mr-2" />
          Edit Campaign Details
        </Button>
        <div className="space-x-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Full Preview
          </Button>
          <Button
            onClick={approveStrategy}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            Approve & Implement
            <CheckCircle className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Campaign Successfully Created!
        </h2>
        <p className="text-gray-600">Your campaign is now ready to use</p>
      </div>

      <Card className="border-2 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-green-600" />
            <span>Campaign: &quot;{generatedStrategy?.title}&quot;</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {generatedStrategy?.components.map((component, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg border border-green-200"
                >
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <component.icon className="w-4 h-4 mr-2" />
                    {component.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {component.description}
                  </p>
                  <div className="space-y-2">
                    <Button size="sm" className="w-full">
                      <Eye className="w-3 h-3 mr-1" />
                      View Result
                    </Button>
                    <Button size="sm" variant="outline" className="w-full">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="w-full">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      View Analytics
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg border border-green-200">
              <h4 className="font-semibold text-gray-900 mb-4">
                Campaign Management
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  Launch Campaign
                </Button>
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview All
                </Button>
                <Button variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Strategy
                </Button>
                <Button variant="outline" className="w-full">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Analytics Dashboard
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(1)}>
          Create New Campaign
        </Button>
        <Button
          onClick={onBack}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    </div>
  );

  const renderImplementationProgress = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 animate-pulse">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          AI is Building Your Campaign...
        </h2>
        <p className="text-gray-600">
          Creating your personalized marketing assets and setting up automation
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {generatedStrategy?.components.map((component, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-900">
                  {component.title} - Complete
                </span>
              </div>
            ))}
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-900">
                Finalizing implementation and testing...
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= stepNumber
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div
                    className={`w-12 h-1 ${
                      step > stepNumber ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-8">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && !isImplementing && renderStep3()}
          {isImplementing && renderImplementationProgress()}
          {step === 4 && implementationComplete && renderStep4()}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIPromptBuilder;
