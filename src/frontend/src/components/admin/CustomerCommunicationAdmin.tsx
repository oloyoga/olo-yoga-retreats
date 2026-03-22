import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Filter, Mail, MessageSquare, Phone, Search, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  category: "retreat" | "course" | "custom" | "general";
  subject: string;
  message: string;
  status: "new" | "replied" | "resolved";
  date: Date;
}

export default function CustomerCommunicationAdmin() {
  const [inquiries] = useState<Inquiry[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1234567890",
      category: "retreat",
      subject: "Himalayan Retreat Inquiry",
      message:
        "I would like to know more about the Himalayan Yoga & Wellness Retreat. Are there any dates available in March?",
      status: "new",
      date: new Date("2025-01-28"),
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael@example.com",
      category: "course",
      subject: "Residential Course Question",
      message:
        "Can I book a private 1-to-1 residential course? What would be the pricing?",
      status: "replied",
      date: new Date("2025-01-27"),
    },
  ]);

  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Email templates
  const templates = {
    retreat: `Dear [Name],

Thank you for your interest in our yoga retreats at OLO Yoga & Retreats.

[Your message here]

We look forward to welcoming you to our sacred space in Rishikesh.

Namaste,
OLO Yoga Team`,
    course: `Dear [Name],

Thank you for inquiring about our residential courses.

[Your message here]

Feel free to reach out if you have any questions.

Warm regards,
OLO Yoga Team`,
    general: `Dear [Name],

Thank you for contacting OLO Yoga & Retreats.

[Your message here]

Namaste,
OLO Yoga Team`,
  };

  const handleSendEmail = () => {
    if (!selectedInquiry || !replyMessage.trim()) {
      toast.error("Please write a reply message");
      return;
    }

    // In a real implementation, this would send an email via backend
    toast.success(`Email sent to ${selectedInquiry.email}`);
    setReplyMessage("");
    setSelectedInquiry(null);
  };

  const handleSendWhatsApp = () => {
    if (!selectedInquiry) return;

    const phone = selectedInquiry.phone || "";
    const message = encodeURIComponent(
      replyMessage || "Hello from OLO Yoga & Retreats!",
    );
    window.open(
      `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${message}`,
      "_blank",
    );
  };

  const applyTemplate = (category: string) => {
    if (!selectedInquiry) return;
    const template =
      templates[category as keyof typeof templates] || templates.general;
    setReplyMessage(template.replace("[Name]", selectedInquiry.name));
  };

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesCategory =
      filterCategory === "all" || inquiry.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" || inquiry.status === filterStatus;
    const matchesSearch =
      searchQuery === "" ||
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "retreat":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "course":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "custom":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "replied":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-heading flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          Customer Communication
        </h2>
        <p className="text-muted-foreground mt-1">
          Manage customer inquiries and send responses via email or WhatsApp
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inquiry Management</CardTitle>
          <CardDescription>
            Centralize all website form inquiries and respond to customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="inquiries" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="inquiries">All Inquiries</TabsTrigger>
              <TabsTrigger value="templates">Email Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="inquiries" className="space-y-4">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search inquiries..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select
                  value={filterCategory}
                  onValueChange={setFilterCategory}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="retreat">Retreat</SelectItem>
                    <SelectItem value="course">Course</SelectItem>
                    <SelectItem value="custom">Custom Request</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="replied">Replied</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Inquiries List */}
              <div className="space-y-4">
                {filteredInquiries.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No inquiries found</p>
                  </div>
                ) : (
                  filteredInquiries.map((inquiry) => (
                    <Card
                      key={inquiry.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedInquiry?.id === inquiry.id
                          ? "ring-2 ring-primary"
                          : ""
                      }`}
                      onClick={() => setSelectedInquiry(inquiry)}
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <CardTitle className="text-lg">
                              {inquiry.subject}
                            </CardTitle>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{inquiry.name}</span>
                              <span>•</span>
                              <span>{inquiry.email}</span>
                              {inquiry.phone && (
                                <>
                                  <span>•</span>
                                  <span>{inquiry.phone}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Badge
                              className={getCategoryColor(inquiry.category)}
                            >
                              {inquiry.category}
                            </Badge>
                            <Badge className={getStatusColor(inquiry.status)}>
                              {inquiry.status}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {inquiry.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {inquiry.date.toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>

              {/* Reply Section */}
              {selectedInquiry && (
                <Card className="border-primary">
                  <CardHeader>
                    <CardTitle>Reply to {selectedInquiry.name}</CardTitle>
                    <CardDescription>{selectedInquiry.email}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Original Message</Label>
                      <div className="mt-2 p-4 bg-muted rounded-lg">
                        <p className="text-sm">{selectedInquiry.message}</p>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="reply">Your Reply</Label>
                      <Textarea
                        id="reply"
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        placeholder="Type your reply here..."
                        rows={8}
                        className="mt-2"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => applyTemplate("retreat")}
                      >
                        Use Retreat Template
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => applyTemplate("course")}
                      >
                        Use Course Template
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => applyTemplate("general")}
                      >
                        Use General Template
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleSendEmail} className="flex-1">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </Button>
                      {selectedInquiry.phone && (
                        <Button onClick={handleSendWhatsApp} variant="outline">
                          <Phone className="h-4 w-4 mr-2" />
                          WhatsApp
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Email Templates</CardTitle>
                  <CardDescription>
                    Customize response templates for different inquiry types
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(templates).map(([key, template]) => (
                    <div key={key} className="space-y-2">
                      <Label className="text-base capitalize">
                        {key} Template
                      </Label>
                      <Textarea
                        value={template}
                        readOnly
                        rows={8}
                        className="font-mono text-sm"
                      />
                    </div>
                  ))}
                  <p className="text-sm text-muted-foreground">
                    Note: Template customization will be available in a future
                    update
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
