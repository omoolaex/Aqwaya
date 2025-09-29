"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Mail,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

// Local type definitions
type EmailSegment = {
  id: string;
  user_id: string;
  name: string;
  description: string;
  criteria: Record<string, unknown>;
  subscriber_count: number;
  created_at: string;
  updated_at: string;
};
type EmailSubscriber = {
  id: string;
  user_id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  status: string;
  tags?: string[];
  source?: string;
  custom_fields?: Record<string, unknown>;
  subscribed_at: string;
  updated_at: string;
};

interface SegmentManagerProps {
  user: unknown;
}

// Mock data
const mockSegments: EmailSegment[] = [
  {
    id: "segment-1",
    user_id: "mock-user",
    name: "New Subscribers",
    description: "Subscribers who joined in the last 30 days",
    criteria: {
      subscribed_within_days: 30,
      status: "active",
    },
    subscriber_count: 423,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "segment-2",
    user_id: "mock-user",
    name: "Engaged Users",
    description: "Users who opened emails in the last 30 days",
    criteria: {
      opened_emails_last_30_days: ">= 1",
      status: "active",
    },
    subscriber_count: 1205,
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "segment-3",
    user_id: "mock-user",
    name: "VIP Customers",
    description: "High-value customers with multiple purchases",
    criteria: {
      purchase_count: ">= 5",
      total_spent: ">= 500",
    },
    subscriber_count: 89,
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const mockSubscribers: EmailSubscriber[] = [
  {
    id: "sub-1",
    user_id: "mock-user",
    email: "john.doe@example.com",
    first_name: "John",
    last_name: "Doe",
    status: "active",
    tags: ["customer", "engaged"],
    source: "landing_page",
    custom_fields: { location: "New York", age: 28 },
    subscribed_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "sub-2",
    user_id: "mock-user",
    email: "jane.smith@example.com",
    first_name: "Jane",
    last_name: "Smith",
    status: "active",
    tags: ["new_subscriber"],
    source: "social_media",
    custom_fields: { location: "California", age: 32 },
    subscribed_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const SegmentManager = ({ user }: SegmentManagerProps) => {
  const { toast } = useToast();
  const [segments, setSegments] = useState<EmailSegment[]>(mockSegments);
  const [subscribers] = useState<EmailSubscriber[]>(mockSubscribers);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"segments" | "subscribers">(
    "segments"
  );
  const [newSegment, setNewSegment] = useState({
    name: "",
    description: "",
    criteria: {},
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Type assertion for user
  const typedUser = user as { id: string };

  const handleCreateSegment = () => {
    if (!newSegment.name) {
      toast({
        title: "Name Required",
        description: "Please enter a name for your segment.",
        variant: "destructive",
      });
      return;
    }

    const segment: EmailSegment = {
      id: `segment-${Date.now()}`,
      user_id: typedUser.id,
      name: newSegment.name,
      description: newSegment.description,
      criteria: newSegment.criteria,
      subscriber_count: Math.floor(Math.random() * 1000) + 50,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setSegments((prev) => [segment, ...prev]);
    setNewSegment({ name: "", description: "", criteria: {} });
    setIsCreateModalOpen(false);

    toast({
      title: "Segment Created!",
      description: `${segment.name} has been created successfully.`,
    });
  };

  const filteredSegments = segments.filter(
    (segment) =>
      segment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (segment.description &&
        segment.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredSubscribers = subscribers.filter(
    (subscriber) =>
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (subscriber.first_name &&
        subscriber.first_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (subscriber.last_name &&
        subscriber.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Audience Management</h2>
          <p className="text-gray-600">
            Manage your email segments and subscribers
          </p>
        </div>

        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Segment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Segment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="segment-name">Segment Name</Label>
                <Input
                  id="segment-name"
                  placeholder="Enter segment name"
                  value={newSegment.name}
                  onChange={(e) =>
                    setNewSegment((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="segment-description">
                  Description (Optional)
                </Label>
                <Textarea
                  id="segment-description"
                  placeholder="Describe this segment..."
                  value={newSegment.description}
                  onChange={(e) =>
                    setNewSegment((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateSegment}>Create Segment</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {subscribers.length.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Subscribers</div>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {segments.length}
                </div>
                <div className="text-sm text-gray-600">Active Segments</div>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {subscribers.filter((s) => s.status === "active").length}
                </div>
                <div className="text-sm text-gray-600">Active Subscribers</div>
              </div>
              <Mail className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {(
                    (subscribers.filter((s) => s.status === "active").length /
                      subscribers.length) *
                    100
                  ).toFixed(1)}
                  %
                </div>
                <div className="text-sm text-gray-600">Engagement Rate</div>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-2 border-b-2 font-medium text-sm ${
            activeTab === "segments"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("segments")}
        >
          Segments ({segments.length})
        </button>
        <button
          className={`px-4 py-2 border-b-2 font-medium text-sm ${
            activeTab === "subscribers"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("subscribers")}
        >
          Subscribers ({subscribers.length})
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Content */}
      {activeTab === "segments" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSegments.map((segment) => (
            <Card
              key={segment.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{segment.name}</CardTitle>
                    {segment.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {segment.description}
                      </p>
                    )}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {segment.subscriber_count.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600">Subscribers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {(
                        (segment.subscriber_count / subscribers.length) *
                        100
                      ).toFixed(1)}
                      %
                    </div>
                    <div className="text-xs text-gray-600">of Total</div>
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  Created: {new Date(segment.created_at).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "subscribers" && (
        <div className="space-y-4">
          {filteredSubscribers.map((subscriber) => (
            <Card key={subscriber.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">
                        {subscriber.first_name && subscriber.last_name
                          ? `${subscriber.first_name} ${subscriber.last_name}`
                          : subscriber.email}
                      </div>
                      <div className="text-sm text-gray-600">
                        {subscriber.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <Badge
                        variant={
                          subscriber.status === "active"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {subscriber.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(subscriber.subscribed_at).toLocaleDateString()}
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {subscriber.tags && subscriber.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {subscriber.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SegmentManager;
