import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Zap } from "lucide-react";
import type { AIContent } from "@/types/landing";

interface Props {
  aiContent: AIContent | null;
  onChange: (field: keyof AIContent, value: string | string[]) => void;
  onSave: () => void;
  onBack: () => void;
}

const AIGeneratedContentEdit: React.FC<Props> = ({
  aiContent,
  onChange,
  onSave,
  onBack,
}) => {
  if (!aiContent) return null;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-center mb-4">
        <Zap className="w-8 h-8 text-purple-600 mr-2" />
        <span className="font-bold text-xl">
          Review & Edit Your AI Generated Landing Page
        </span>
      </div>

      <div className="space-y-4 p-6 bg-white rounded shadow border border-blue-100">
        <div>
          <Label htmlFor="headline">Headline</Label>
          <Input
            value={aiContent.headline || ""}
            onChange={(e) => onChange("headline", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="subheadline">Subheadline</Label>
          <Textarea
            value={aiContent.subheadline || ""}
            onChange={(e) => onChange("subheadline", e.target.value)}
          />
        </div>

        <div>
          <Label>Key Features</Label>
          <Textarea
            value={
              Array.isArray(aiContent.features)
                ? aiContent.features.join("\n")
                : ""
            }
            onChange={(e) => onChange("features", e.target.value.split("\n"))}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="ctaButton">Call-to-Action Button Text</Label>
          <Input
            value={aiContent.ctaButton || ""}
            onChange={(e) => onChange("ctaButton", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="testimonial">Testimonial</Label>
          <Textarea
            value={aiContent.testimonial || ""}
            onChange={(e) => onChange("testimonial", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="formHeadline">Form Headline</Label>
          <Input
            value={aiContent.formHeadline || ""}
            onChange={(e) => onChange("formHeadline", e.target.value)}
          />
        </div>
      </div>

      <Button
        className="w-full bg-green-600 hover:bg-green-700"
        onClick={onSave}
      >
        Save Landing Page
      </Button>
      <Button variant="outline" className="w-full" onClick={onBack}>
        Back to Edit Inputs
      </Button>
    </div>
  );
};

export default AIGeneratedContentEdit;
