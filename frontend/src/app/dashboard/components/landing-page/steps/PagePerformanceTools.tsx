import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Share2, Download, Settings } from "lucide-react";

const PagePerformanceTools: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Performance & Analytics</h3>
        <p className="text-gray-600">
          Track and optimize your landing page performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="text-center pb-3">
            <BarChart3 className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <CardTitle className="text-lg">Analytics</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 mb-3">
              View detailed performance metrics
            </p>
            <Button variant="outline" size="sm" className="w-full">
              View Analytics
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center pb-3">
            <Share2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <CardTitle className="text-lg">Share</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 mb-3">
              Share your landing page
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Get Share Link
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center pb-3">
            <Download className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <CardTitle className="text-lg">Export</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 mb-3">Download HTML/CSS code</p>
            <Button variant="outline" size="sm" className="w-full">
              Export Code
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center pb-3">
            <Settings className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <CardTitle className="text-lg">Settings</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 mb-3">
              Configure page settings
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Page Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PagePerformanceTools;
