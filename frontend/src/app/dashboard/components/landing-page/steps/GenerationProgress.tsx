import React from "react";
import { Zap } from "lucide-react";

const GenerationProgress: React.FC = () => (
  <div className="text-center">
    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
      <Zap className="w-8 h-8 text-white" />
    </div>
    <h3 className="text-xl font-semibold mb-2">
      Generating Your Landing Page...
    </h3>
    <p className="text-gray-600">AI is creating your custom landing page</p>
  </div>
);

export default GenerationProgress;
