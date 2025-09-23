"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  Wand2,
  Target,
  Mail,
  TrendingUp,
  Zap,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Sidebar from "../Sidebar";

// Local User type
type AIStrategy = {
  id: string;
  name: string;
  business_type: string;
  marketing_goals: string[];
  created_at: string;
  generated_strategy: {
    recommended_workflows: {
      type: string;
      name: string;
      description: string;
      suggested_emails: { subject: string }[];
    }[];
  };
  target_audience_profile: {
    description: string;
    pain_points: string;
    value_proposition: string;
    industry: string;
  };
};

interface AIStrategyBuilderProps {
  onBack: () => void;
  onComplete: (strategy: AIStrategy) => void;
}

const AIStrategyBuilder = ({ onBack, onComplete }: AIStrategyBuilderProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [businessInfo, setBusinessInfo] = useState({
    business_name: "",
    business_type: "",
    industry: "",
    target_audience: "",
    customer_pain_points: "",
    unique_value_proposition: "",
    marketing_goals: [] as string[],
    current_challenges: [] as string[],
    email_frequency: "",
    content_preferences: {
      tone: "",
      style: "",
      content_types: [] as string[],
    },
  });

  const businessTypes = [
    "E-commerce",
    "SaaS",
    "Consulting",
    "Education",
    "Healthcare",
    "Real Estate",
    "Finance",
    "Non-profit",
    "B2B Services",
    "Restaurant/Food",
  ];

  const marketingGoals = [
    "Increase sales revenue",
    "Build brand awareness",
    "Nurture leads",
    "Customer retention",
    "Product launches",
    "Educational content",
    "Event promotion",
    "Customer onboarding",
  ];

  const challenges = [
    "Low email open rates",
    "Poor conversion rates",
    "Lack of engaging content",
    "Email deliverability issues",
    "Growing subscriber list",
    "Automation setup",
    "Segmentation strategy",
    "A/B testing implementation",
  ];

  const contentTypes = [
    "Newsletters",
    "Product updates",
    "Educational content",
    "Case studies",
    "Behind-the-scenes",
    "Customer stories",
    "Industry insights",
    "How-to guides",
  ];

  const handleGoalToggle = (goal: string) => {
    setBusinessInfo((prev) => ({
      ...prev,
      marketing_goals: prev.marketing_goals.includes(goal)
        ? prev.marketing_goals.filter((g) => g !== goal)
        : [...prev.marketing_goals, goal],
    }));
  };

  const handleChallengeToggle = (challenge: string) => {
    setBusinessInfo((prev) => ({
      ...prev,
      current_challenges: prev.current_challenges.includes(challenge)
        ? prev.current_challenges.filter((c) => c !== challenge)
        : [...prev.current_challenges, challenge],
    }));
  };

  const handleContentTypeToggle = (type: string) => {
    setBusinessInfo((prev) => ({
      ...prev,
      content_preferences: {
        ...prev.content_preferences,
        content_types: prev.content_preferences.content_types.includes(type)
          ? prev.content_preferences.content_types.filter((t) => t !== type)
          : [...prev.content_preferences.content_types, type],
      },
    }));
  };

  const validateForm = () => {
    if (!businessInfo.business_name.trim()) {
      setError("Business name is required");
      return false;
    }
    if (!businessInfo.business_type) {
      setError("Please select a business type");
      return false;
    }
    if (businessInfo.marketing_goals.length === 0) {
      setError("Please select at least one marketing goal");
      return false;
    }
    setError(null);
    return true;
  };

  const generateStrategy = async () => {
    if (!validateForm()) {
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Simulate AI strategy generation with mock data
      const aiStrategy = {
        recommended_workflows: [
          {
            type: "welcome",
            name: "Welcome Series",
            description: "Introduce new subscribers to your brand.",
            suggested_emails: [{ subject: "Welcome to our community!" }],
          },
        ],
      };

      // Simulate creating a strategy object
      const strategy = {
        id: `strategy-${Date.now()}`,
        name: `${businessInfo.business_name || "Business"} AI Email Strategy`,
        business_type: businessInfo.business_type,
        marketing_goals: businessInfo.marketing_goals,
        created_at: new Date().toISOString(),
        generated_strategy: aiStrategy,
        target_audience_profile: {
          description: businessInfo.target_audience,
          pain_points: businessInfo.customer_pain_points,
          value_proposition: businessInfo.unique_value_proposition,
          industry: businessInfo.industry,
        },
      };

      toast({
        title: "🎉 AI Strategy Generated Successfully!",
        description: `Your personalized email marketing strategy for ${businessInfo.business_name} is ready to implement.`,
      });

      onComplete(strategy);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError(
        "Failed to generate strategy. Please check your information and try again."
      );
      toast({
        title: "Strategy Generation Failed",
        description:
          "Failed to generate strategy. Please check your information and try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Business Information</h2>
        <p className="text-gray-600">
          Tell us about your business to create a tailored AI email strategy
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="business_name">Business Name *</Label>
          <Input
            id="business_name"
            value={businessInfo.business_name}
            onChange={(e) =>
              setBusinessInfo((prev) => ({
                ...prev,
                business_name: e.target.value,
              }))
            }
            placeholder="Your business name"
          />
        </div>

        <div>
          <Label htmlFor="business_type">Business Type *</Label>
          <Select
            value={businessInfo.business_type}
            onValueChange={(value) =>
              setBusinessInfo((prev) => ({ ...prev, business_type: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              {businessTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="industry">Industry/Niche</Label>
          <Input
            id="industry"
            value={businessInfo.industry}
            onChange={(e) =>
              setBusinessInfo((prev) => ({ ...prev, industry: e.target.value }))
            }
            placeholder="e.g., Fashion, Technology, Health"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="target_audience">Target Audience Description</Label>
        <Textarea
          id="target_audience"
          value={businessInfo.target_audience}
          onChange={(e) =>
            setBusinessInfo((prev) => ({
              ...prev,
              target_audience: e.target.value,
            }))
          }
          placeholder="Describe your ideal customers: demographics, interests, behaviors..."
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="customer_pain_points">Customer Pain Points</Label>
        <Textarea
          id="customer_pain_points"
          value={businessInfo.customer_pain_points}
          onChange={(e) =>
            setBusinessInfo((prev) => ({
              ...prev,
              customer_pain_points: e.target.value,
            }))
          }
          placeholder="What problems does your business solve for customers?"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="unique_value_proposition">
          Unique Value Proposition
        </Label>
        <Textarea
          id="unique_value_proposition"
          value={businessInfo.unique_value_proposition}
          onChange={(e) =>
            setBusinessInfo((prev) => ({
              ...prev,
              unique_value_proposition: e.target.value,
            }))
          }
          placeholder="What makes your business unique? Why should customers choose you?"
          rows={3}
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">
          Marketing Goals & Challenges
        </h2>
        <p className="text-gray-600">
          Help our AI understand what you want to achieve
        </p>
      </div>

      <div>
        <Label className="text-base font-semibold">
          Primary Marketing Goals *
        </Label>
        <p className="text-sm text-gray-600 mb-4">
          Select all that apply - AI will prioritize these in your strategy
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {marketingGoals.map((goal) => (
            <div key={goal} className="flex items-center space-x-2">
              <Checkbox
                id={goal}
                checked={businessInfo.marketing_goals.includes(goal)}
                onCheckedChange={() => handleGoalToggle(goal)}
              />
              <Label htmlFor={goal} className="text-sm">
                {goal}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-semibold">
          Current Email Marketing Challenges
        </Label>
        <p className="text-sm text-gray-600 mb-4">
          AI will create solutions for these specific challenges
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {challenges.map((challenge) => (
            <div key={challenge} className="flex items-center space-x-2">
              <Checkbox
                id={challenge}
                checked={businessInfo.current_challenges.includes(challenge)}
                onCheckedChange={() => handleChallengeToggle(challenge)}
              />
              <Label htmlFor={challenge} className="text-sm">
                {challenge}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="email_frequency">Preferred Email Frequency</Label>
        <Select
          value={businessInfo.email_frequency}
          onValueChange={(value) =>
            setBusinessInfo((prev) => ({ ...prev, email_frequency: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="How often do you want to email subscribers?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="2-3-times-week">2-3 times per week</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Mail className="w-12 h-12 text-purple-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Content Preferences</h2>
        <p className="text-gray-600">
          AI will generate content matching your brand voice and style
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="tone">Brand Tone</Label>
          <Select
            value={businessInfo.content_preferences.tone}
            onValueChange={(value) =>
              setBusinessInfo((prev) => ({
                ...prev,
                content_preferences: {
                  ...prev.content_preferences,
                  tone: value,
                },
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select brand tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="authoritative">Authoritative</SelectItem>
              <SelectItem value="playful">Playful</SelectItem>
              <SelectItem value="inspiring">Inspiring</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="style">Communication Style</Label>
          <Select
            value={businessInfo.content_preferences.style}
            onValueChange={(value) =>
              setBusinessInfo((prev) => ({
                ...prev,
                content_preferences: {
                  ...prev.content_preferences,
                  style: value,
                },
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select communication style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="direct">Direct & Concise</SelectItem>
              <SelectItem value="storytelling">Storytelling</SelectItem>
              <SelectItem value="educational">Educational</SelectItem>
              <SelectItem value="conversational">Conversational</SelectItem>
              <SelectItem value="formal">Formal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="text-base font-semibold">
          Content Types You Want to Send
        </Label>
        <p className="text-sm text-gray-600 mb-4">
          AI will create templates and content for selected types
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {contentTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={businessInfo.content_preferences.content_types.includes(
                  type
                )}
                onCheckedChange={() => handleContentTypeToggle(type)}
              />
              <Label htmlFor={type} className="text-sm">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-2" />
          🤖 AI Content Generation
        </h3>
        <p className="text-sm text-blue-700">
          Our AI will automatically generate email templates, subject lines, and
          content calendars based on your preferences. Each piece of content
          will be personalized to your brand voice and target audience.
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold">AI Email Strategy Builder</h1>
              <p className="text-gray-600">
                Create a personalized email marketing strategy powered by
                advanced AI
              </p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4 py-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 ${
                      currentStep > step ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Step {currentStep} of 3</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>

                {currentStep < 3 ? (
                  <Button onClick={() => setCurrentStep(currentStep + 1)}>
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={generateStrategy}
                    disabled={isGenerating}
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    {isGenerating ? (
                      <>
                        <Zap className="w-4 h-4 mr-2 animate-spin" />
                        AI Generating Your Custom Strategy...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 mr-2" />
                        Generate My AI Strategy
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AIStrategyBuilder;
