import React from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { AIContent } from "@/types/landing";

interface Props {
  aiContent: AIContent | null;
  onEdit: () => void;
  onSave: () => void;
}


const AIGeneratedContentPreview: React.FC<Props> = ({
  aiContent,
  onEdit,
  onSave,
}) => {
  if (!aiContent) return <div>Loading...</div>;


  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Headline and Subheadline */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">{aiContent.headline}</h1>
        <p className="text-lg text-gray-700 mb-6">{aiContent.subheadline}</p>
        <Button className="mb-4" onClick={onEdit}>
          <Edit className="w-4 h-4 mr-1" /> Edit Content
        </Button>
      </div>

      {/* Features */}
      <div className="bg-gray-50 rounded-lg p-6 mb-4">
        <h3 className="mb-2 font-semibold">Features</h3>
        <ul className="ml-4 list-disc space-y-1">
          {aiContent.features?.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      </div>

      {/* Form Preview */}
      <div className="bg-blue-50 rounded-lg p-6 mb-4">
        <h3 className="mb-2 font-semibold">{aiContent.formHeadline}</h3>
        <form className="space-y-2">
          {Array.isArray(aiContent.formFields) &&
            aiContent.formFields.map((field, idx) => (
              <Input
                key={idx}
                placeholder={field.label}
                type={
                  ["email", "tel", "text"].includes(field.type)
                    ? field.type
                    : "text"
                }
                disabled
              />
            ))}
          <Button className="w-full mt-2 bg-blue-600">
            {aiContent.ctaButton || "Get Started"}
          </Button>
        </form>
      </div>

      {/* Testimonial */}
      <div className="text-xs text-gray-500 italic text-center mb-2">
        “{aiContent.testimonial}”
      </div>

      {/* Actions */}
      <div className="w-full flex gap-4 mt-6">
        <Button
          className="w-1/2 bg-green-600 hover:bg-green-700"
          onClick={onEdit}
        >
          Edit Content
        </Button>
        <Button className="w-1/2" onClick={onSave}>
          Save Landing Page
        </Button>
      </div>
    </div>
  );
};

export default AIGeneratedContentPreview;
