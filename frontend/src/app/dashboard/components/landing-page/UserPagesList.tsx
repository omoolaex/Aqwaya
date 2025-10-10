import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, Plus, Globe, Loader2 } from "lucide-react";
import { LandingPage } from "@/types/landing";

interface Props {
  pages: LandingPage[] | null | undefined;
  loading: boolean;
  onPreview: (page: LandingPage) => void;
  onEdit: (page: LandingPage) => void;
  onDelete: (page: LandingPage) => void;
  onNew: () => void;
}

const UserPagesList: React.FC<Props> = ({
  pages,
  loading,
  onPreview,
  onEdit,
  onDelete,
  onNew,
}) => {
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-3">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-gray-600 text-sm sm:text-base">
          Loading your landing pages...
        </p>
      </div>
    );
  }

  const safePages = Array.isArray(pages) ? pages : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Landing Pages</h2>
        <Button onClick={onNew} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Create New Page</span>
        </Button>
      </div>

      {safePages.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Landing Pages Yet</h3>
            <p className="text-gray-600 mb-6">
              Create your first AI-powered landing page to get started
            </p>
            <Button onClick={onNew}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Page
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safePages.map((page) => (
            <Card key={page.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-blue-500" />
                  <span className="truncate">{page.name}</span>
                </CardTitle>
                <div className="text-sm text-gray-500">
                  <p>Business: {page.businessName || "Not specified"}</p>
                  <p>Industry: {page.industry || "Not specified"}</p>
                  <p>Goal: {page.goal || "Not specified"}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-gray-400 mb-4">
                  Created: {new Date(page.createdDate).toLocaleDateString()}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPreview(page)}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(page)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(page)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPagesList;
