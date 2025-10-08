import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ExternalLink } from "lucide-react";

interface AIContent {
  headline?: string;
  subheadline?: string;
  features?: string[];
  formHeadline?: string;
  ctaButton?: string;
  testimonial?: string;
}

interface Page {
  name: string;
  ai_content?: AIContent;
}

interface Props {
  show: boolean;
  selectedPage?: Page | null;
  onClose: () => void;
}

const PreviewModal: React.FC<Props> = ({ show, selectedPage, onClose }) => {
  if (!selectedPage) return null;

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Preview: {selectedPage.name}</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in New Tab
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="bg-white border rounded-lg p-8">
            {selectedPage.ai_content ? (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-3xl font-bold mb-4">
                    {selectedPage.ai_content.headline}
                  </h1>
                  <p className="text-xl text-gray-600 mb-6">
                    {selectedPage.ai_content.subheadline}
                  </p>
                </div>

                {selectedPage.ai_content.features && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                    <ul className="list-disc list-inside space-y-2">
                      {selectedPage.ai_content.features.map(
                        (feature, index) => (
                          <li key={index} className="text-gray-700">
                            {feature}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-semibold mb-4">
                    {selectedPage.ai_content.formHeadline ||
                      "Get Started Today"}
                  </h3>
                  <Button className="w-full max-w-md">
                    {selectedPage.ai_content.ctaButton || "Get Started"}
                  </Button>
                </div>

                {selectedPage.ai_content.testimonial && (
                  <div className="text-center italic text-gray-600">
                    &quot;{selectedPage.ai_content.testimonial}&quot;
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  Preview not available - AI content not generated yet
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;
