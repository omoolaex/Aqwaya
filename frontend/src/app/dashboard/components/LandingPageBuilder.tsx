"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Globe, Eye, Code, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import PreviewModal from "./landing-page/PreviewModal";
import DeleteModal from "./landing-page/DeleteModal";
import UserPagesList from "./landing-page/UserPagesList";
import AIGeneratedContentEdit from "./landing-page/AIGeneratedContentEdit";
import AIGeneratedContentPreview from "./landing-page/AIGeneratedContentPreview";

import BasicInfoStep from "./landing-page/steps/BasicInfoStep";
import TemplateSelectStep from "./landing-page/steps/TemplateSelectStep";
import ColorSchemeStep from "./landing-page/steps/ColorSchemeStep";
import GenerationProgress from "./landing-page/steps/GenerationProgress";
import LandingPagePreviewCard from "./landing-page/steps/LandingPagePreviewCard";
import PagePerformanceTools from "./landing-page/steps/PagePerformanceTools";
import { useLandingBuilderSteps } from "./landing-page/useLandingBuilderSteps";
import {
  LandingPage,
  LandingPageFormData,
  Template,
  ColorScheme,
  AIContent,
} from "@/types/landing";

interface LandingPageBuilderProps {
  onBack: () => void;
}

const LandingPageBuilder = ({ onBack }: LandingPageBuilderProps) => {
  const { toast } = useToast();
  const { currentStep, setCurrentStep, goToNext, goToPrev } =
    useLandingBuilderSteps(5);

  const [formData, setFormData] = useState<LandingPageFormData>({
    pageName: "",
    businessName: "",
    industry: "",
    goal: "",
    targetAudience: "",
    valueProposition: "",
    template: "",
    colorScheme: "",
    aiContent: null,
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [userPages, setUserPages] = useState<LandingPage[]>([]);
  const [loadingPages, setLoadingPages] = useState(false);
  const [aiContent, setAIContent] = useState<AIContent | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedPage, setSelectedPage] = useState<LandingPage | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingPageId, setDeletingPageId] = useState<string | null>(null);
  const [isProcessingDelete, setIsProcessingDelete] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [colorSchemes, setColorSchemes] = useState<ColorScheme[]>([]);

  useEffect(() => {
    setLoadingPages(true);

    Promise.all([
      fetch("/api/landing-pages").then((res) => res.json()),
      fetch("/api/landing-templates").then((res) => res.json()),
      fetch("/api/color-schemes").then((res) => res.json()),
    ])
      .then(([pages, templates, colorSchemes]) => {
        setUserPages(pages as LandingPage[]);
        setTemplates(templates as Template[]);
        setColorSchemes(colorSchemes as ColorScheme[]);
      })
      .finally(() => setLoadingPages(false));
  }, [generationComplete]);

  const handleInputChange = (
    field: keyof LandingPageFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceedToStep = (step: number) => {
    switch (step) {
      case 2:
        return !!formData.template;
      case 3:
        return !!formData.colorScheme;
      case 4:
        return true;
      default:
        return true;
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setAIContent(null);
    setEditMode(false);

    try {
      const mockAIContent: AIContent = {
        headline: `Transform Your ${formData.industry || ""} Business Today`,
        subheadline:
          formData.valueProposition ||
          `Discover how ${
            formData.businessName || ""
          } can help you achieve your goals`,
        features: [
          "Proven Results",
          "Expert Support",
          "Quick Setup",
          "24/7 Customer Service",
        ],
        formHeadline: "Get Started Today",
        ctaButton:
          formData.goal === "lead-generation"
            ? "Get My Free Guide"
            : formData.goal === "product-sales"
            ? "Buy Now"
            : formData.goal === "event-signups"
            ? "Reserve My Spot"
            : formData.goal === "trial-signups"
            ? "Start Free Trial"
            : "Get Started",
        testimonial:
          "This has completely changed how we do business! - Happy Customer",
        formFields: [
          { label: "Email Address", type: "email", required: true },
          { label: "Full Name", type: "text", required: false },
        ],
      };

      setAIContent(mockAIContent);

      setCurrentStep(4);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: "Error during generation",
          description: err.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAIContentChange = (
    field: keyof AIContent,
    value: string | string[]
  ) => {
    if (!aiContent) return;
    if (field === "features" && Array.isArray(value)) {
      setAIContent({ ...aiContent, features: value });
    } else if (typeof value === "string") {
      setAIContent({ ...aiContent, [field]: value } as AIContent);
    }
  };

  const handlePreviewPage = (page: LandingPage) => {
    setSelectedPage(page);
    setShowPreviewModal(true);
  };

  const handleEditPage = (page: LandingPage) => {
    setFormData({
      pageName: page.name,
      businessName: page.businessName,
      industry: page.industry,
      goal: page.goal,
      targetAudience: page.targetAudience,
      valueProposition: page.valueProposition,
      template: page.template,
      colorScheme: page.colorScheme,
    });
    setAIContent(page.aiContent || null);
    setEditMode(false);
    setCurrentStep(4);
    toast({
      title: "Page loaded for editing.",
      description: `You're now editing: ${page.name}`,
    });
  };

  const handleDeletePage = (page: LandingPage) => {
    setDeletingPageId(page.id.toString());
    setShowDeleteModal(true);
  };

  const confirmDeletePage = async () => {
    if (!deletingPageId) return;

    setIsProcessingDelete(true);
    const res = await fetch(`/api/landing-pages/${deletingPageId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast({
        title: "Landing Page Deleted",
        description: "The page has been removed.",
      });
      setUserPages((pages) => pages.filter((p) => p.id !== deletingPageId));
    } else {
      toast({
        title: "Delete failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }

    setIsProcessingDelete(false);
    setShowDeleteModal(false);
    setDeletingPageId(null);
  };

  const handleSaveLandingPage = async () => {
    setIsGenerating(true);

    const payload = {
      name: formData.pageName,
      business_name: formData.businessName,
      industry: formData.industry,
      goal: formData.goal,
      target_audience: formData.targetAudience,
      value_proposition: formData.valueProposition,
      template: formData.template,
      color_scheme: formData.colorScheme,
      aiContent: aiContent,
    };

    try {
      const res = await fetch("/api/landing-pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setGenerationComplete(true);
        setCurrentStep(5);
        toast({
          title: "Landing page saved!",
          description: "You can find it in your pages list.",
        });
      } else {
        toast({
          title: "Error saving landing page",
          description: "Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const renderStep4Edit = () => (
    <AIGeneratedContentEdit
      aiContent={aiContent}
      onChange={handleAIContentChange}
      onSave={handleSaveLandingPage}
      onBack={() => setEditMode(false)}
    />
  );

  // Step 4: Preview only mode
  const renderStep4Preview = () => (
    <AIGeneratedContentPreview
      aiContent={aiContent}
      onEdit={() => setEditMode(true)}
      onSave={handleSaveLandingPage}
    />
  );

  // Step 5: User Pages
  const renderUserPages = () => (
    <UserPagesList
      pages={userPages}
      loading={loadingPages}
      onPreview={handlePreviewPage}
      onEdit={handleEditPage}
      onDelete={handleDeletePage}
      onNew={() => {
        setCurrentStep(1);
        setFormData({
          pageName: "",
          businessName: "",
          industry: "",
          goal: "",
          targetAudience: "",
          valueProposition: "",
          template: "",
          colorScheme: "",
          aiContent: null,
        });
        setAIContent(null);
        setEditMode(false);
        setGenerationComplete(false);
      }}
    />
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            formData={formData}
            handleInputChange={handleInputChange}
          >
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Select
                onValueChange={(value) => handleInputChange("industry", value)}
                value={formData.industry}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="retail">Retail/E-commerce</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                  <SelectItem value="fitness">Fitness & Wellness</SelectItem>
                  <SelectItem value="food">Food & Beverage</SelectItem>
                  <SelectItem value="real-estate">Real Estate</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="goal">Primary Goal</Label>
              <Select
                onValueChange={(value) => handleInputChange("goal", value)}
                value={formData.goal}
              >
                <SelectTrigger>
                  <SelectValue placeholder="What's your main goal?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lead-generation">
                    Generate Leads
                  </SelectItem>
                  <SelectItem value="product-sales">
                    Drive Product Sales
                  </SelectItem>
                  <SelectItem value="event-signups">Event Sign-ups</SelectItem>
                  <SelectItem value="trial-signups">
                    Free Trial Sign-ups
                  </SelectItem>
                  <SelectItem value="consultation-booking">
                    Book Consultations
                  </SelectItem>
                  <SelectItem value="email-collection">
                    Email Collection
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </BasicInfoStep>
        );
      case 2:
        return (
          <TemplateSelectStep
            templates={templates}
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 3:
        return (
          <ColorSchemeStep
            colorSchemes={colorSchemes}
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 4:
        if (isGenerating) return <GenerationProgress />;
        if (aiContent) {
          if (editMode) {
            return renderStep4Edit();
          }
          return renderStep4Preview();
        }
        return null;

      case 5:
        return (
          <div className="space-y-6">
            {renderUserPages()}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Your Landing Page is Ready!
              </h3>
              <p className="text-gray-600 mb-6">
                Preview your AI-generated landing page below
              </p>
            </div>
            <LandingPagePreviewCard formData={formData} />
            <PagePerformanceTools />
          </div>
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentStep === 3) {
      handleGenerate();
    } else {
      goToNext();
    }
  };

  const handlePrevious = () => {
    goToPrev();
  };

  const handleClosePreviewModal = () => {
    setShowPreviewModal(false);
    setSelectedPage(null);
  };

  const renderPreviewModal = () => (
    <PreviewModal
      show={showPreviewModal}
      selectedPage={selectedPage}
      onClose={handleClosePreviewModal}
    />
  );

  const renderDeleteModal = () => (
    <DeleteModal
      show={showDeleteModal}
      isProcessing={isProcessingDelete}
      onCancel={() => setShowDeleteModal(false)}
      onDelete={confirmDeletePage}
    />
  );

  return (
    <div className="space-y-6">
      {renderPreviewModal()}
      {renderDeleteModal()}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
        {/* Left section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center space-x-2 w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>

          <div className="text-center sm:text-left mt-2 sm:mt-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center justify-center sm:justify-start space-x-2">
              <Globe className="w-6 sm:w-8 h-6 sm:h-8 text-orange-500" />
              <span>AI Landing Page Builder</span>
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Create high-converting landing pages with AI assistance
            </p>
          </div>
        </div>

        {/* Right section (buttons) */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            disabled={currentStep !== 5 || !generationComplete}
            className="w-full sm:w-auto"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button
            variant="outline"
            disabled={currentStep !== 5 || !generationComplete}
            className="w-full sm:w-auto"
          >
            <Code className="w-4 h-4 mr-2" />
            View Code
          </Button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center sm:justify-start overflow-x-auto space-x-4 mb-8 px-1">
        {[1, 2, 3, 4, 5].map((step) => (
          <div key={step} className="flex items-center flex-shrink-0">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {step}
            </div>
            {step < 5 && (
              <div
                className={`w-12 sm:w-16 h-1 ${
                  currentStep > step ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-6 overflow-x-auto px-1">
        <span className={currentStep === 1 ? "font-medium text-blue-600" : ""}>
          Basic Info
        </span>
        <span className={currentStep === 2 ? "font-medium text-blue-600" : ""}>
          Choose Template
        </span>
        <span className={currentStep === 3 ? "font-medium text-blue-600" : ""}>
          Pick Colors
        </span>
        <span className={currentStep === 4 ? "font-medium text-blue-600" : ""}>
          AI Generation
        </span>
        <span className={currentStep === 5 ? "font-medium text-blue-600" : ""}>
          Your Pages
        </span>
      </div>

      {/* Step Content */}
      <Card className="w-full">
        <CardContent className="p-4 sm:p-8">{renderStepContent()}</CardContent>
      </Card>

      {/* Navigation Buttons */}
      {!isGenerating && currentStep < 5 && (
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="w-full sm:w-auto"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceedToStep(currentStep)}
            className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          >
            {currentStep === 3 ? "Generate Landing Page" : "Next"}
          </Button>
        </div>
      )}

      {currentStep === 5 && (
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setCurrentStep(1);
              setFormData({
                pageName: "",
                businessName: "",
                industry: "",
                goal: "",
                targetAudience: "",
                valueProposition: "",
                template: "",
                colorScheme: "",
              });
              setAIContent(null);
              setEditMode(false);
              setGenerationComplete(false);
            }}
            className="w-full sm:w-auto"
          >
            Create New Page
          </Button>
          <Button
            onClick={onBack}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      )}
    </div>
  );
};

export default LandingPageBuilder;
