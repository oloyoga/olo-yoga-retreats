import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "@tanstack/react-router";
import {
  Activity,
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  Image,
  LayoutDashboard,
  Loader2,
  MessageSquare,
  Package,
  Palette,
  Phone,
  Settings,
  Shield,
  Users,
  Video,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import AnalyticsDashboard from "../components/admin/AnalyticsDashboard";
import BookingsDashboard from "../components/admin/BookingsDashboard";
import BrandCustomizationAdmin from "../components/admin/BrandCustomizationAdmin";
import ContactInfoAdmin from "../components/admin/ContactInfoAdmin";
import ContentManagementAdmin from "../components/admin/ContentManagementAdmin";
import CustomerCommunicationAdmin from "../components/admin/CustomerCommunicationAdmin";
import DropInClassesAdmin from "../components/admin/DropInClassesAdmin";
import MediaManagementAdmin from "../components/admin/MediaManagementAdmin";
import PageManagementAdmin from "../components/admin/PageManagementAdmin";
import ProductsAdmin from "../components/admin/ProductsAdmin";
import ResidentialCoursesAdmin from "../components/admin/ResidentialCoursesAdmin";
import RetreatsWithPackagesAdmin from "../components/admin/RetreatsWithPackagesAdmin";
import StripeSetup from "../components/admin/StripeSetup";
import SystemSettingsAdmin from "../components/admin/SystemSettingsAdmin";
import TestimonialsAdmin from "../components/admin/TestimonialsAdmin";
import VideoCoursesAdmin from "../components/admin/VideoCoursesAdmin";
import { useIsCallerAdmin, useIsStripeConfigured } from "../hooks/useQueries";

export default function AdminPanel() {
  const navigate = useNavigate();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: stripeConfigured } = useIsStripeConfigured();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      navigate({ to: "/" });
    }
  }, [isAdmin, adminLoading, navigate]);

  if (adminLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const tabs = [
    { value: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { value: "analytics", label: "Analytics", icon: Activity },
    { value: "bookings", label: "Bookings", icon: Calendar },
    { value: "retreats", label: "Retreats", icon: BookOpen },
    { value: "courses", label: "Courses", icon: Users },
    { value: "video-courses", label: "Video Courses", icon: Video },
    { value: "classes", label: "Drop-In Classes", icon: Users },
    { value: "products", label: "Products", icon: Package },
    { value: "testimonials", label: "Testimonials", icon: MessageSquare },
    { value: "communication", label: "Communication", icon: MessageSquare },
    { value: "content", label: "Content", icon: FileText },
    { value: "pages", label: "Pages", icon: FileText },
    { value: "media", label: "Media", icon: Image },
    { value: "branding", label: "Branding", icon: Palette },
    { value: "contact", label: "Contact", icon: Phone },
    { value: "stripe", label: "Payments", icon: CreditCard },
    { value: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-full py-8 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-heading text-primary">
                  Admin Panel
                </h1>
                <p className="text-muted-foreground mt-1">
                  Complete control over your yoga retreat and wellness business
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="dark-mode"
                  checked={theme === "dark"}
                  onCheckedChange={(checked) =>
                    setTheme(checked ? "dark" : "light")
                  }
                />
                <Label htmlFor="dark-mode" className="text-sm">
                  Dark Mode
                </Label>
              </div>
            </div>
          </div>
        </div>

        {/* Stripe Configuration Alert */}
        {!stripeConfigured && (
          <Card className="mb-8 border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/20">
            <CardHeader>
              <CardTitle className="text-yellow-800 dark:text-yellow-200">
                Payment Setup Required
              </CardTitle>
              <CardDescription className="text-yellow-700 dark:text-yellow-300">
                Configure Stripe to enable payment processing for retreats,
                courses, and products.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <ScrollArea className="w-full whitespace-nowrap rounded-lg border bg-card">
            <TabsList className="inline-flex w-auto h-auto p-2 gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {/* Dashboard Overview */}
          <TabsContent value="dashboard" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome to OLO Yoga Admin Panel</CardTitle>
                  <CardDescription>
                    Manage your entire yoga retreat and wellness business from
                    this comprehensive dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card
                      className="border-2 hover:border-primary transition-colors cursor-pointer"
                      onClick={() => setActiveTab("analytics")}
                    >
                      <CardHeader>
                        <Activity className="h-8 w-8 text-primary mb-2" />
                        <CardTitle className="text-lg">Analytics</CardTitle>
                        <CardDescription>
                          View revenue, bookings, and performance metrics
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    <Card
                      className="border-2 hover:border-primary transition-colors cursor-pointer"
                      onClick={() => setActiveTab("bookings")}
                    >
                      <CardHeader>
                        <Calendar className="h-8 w-8 text-primary mb-2" />
                        <CardTitle className="text-lg">Bookings</CardTitle>
                        <CardDescription>
                          Manage reservations and approvals
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    <Card
                      className="border-2 hover:border-primary transition-colors cursor-pointer"
                      onClick={() => setActiveTab("retreats")}
                    >
                      <CardHeader>
                        <BookOpen className="h-8 w-8 text-primary mb-2" />
                        <CardTitle className="text-lg">Retreats</CardTitle>
                        <CardDescription>
                          Create and manage yoga retreats
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    <Card
                      className="border-2 hover:border-primary transition-colors cursor-pointer"
                      onClick={() => setActiveTab("courses")}
                    >
                      <CardHeader>
                        <Users className="h-8 w-8 text-primary mb-2" />
                        <CardTitle className="text-lg">Courses</CardTitle>
                        <CardDescription>
                          Manage residential courses
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    <Card
                      className="border-2 hover:border-primary transition-colors cursor-pointer"
                      onClick={() => setActiveTab("products")}
                    >
                      <CardHeader>
                        <Package className="h-8 w-8 text-primary mb-2" />
                        <CardTitle className="text-lg">Products</CardTitle>
                        <CardDescription>
                          Manage shop inventory and orders
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    <Card
                      className="border-2 hover:border-primary transition-colors cursor-pointer"
                      onClick={() => setActiveTab("communication")}
                    >
                      <CardHeader>
                        <MessageSquare className="h-8 w-8 text-primary mb-2" />
                        <CardTitle className="text-lg">Communication</CardTitle>
                        <CardDescription>
                          Manage customer inquiries
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </CardContent>
              </Card>
              <AnalyticsDashboard />
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="bookings" className="mt-6">
            <BookingsDashboard />
          </TabsContent>

          <TabsContent value="retreats" className="mt-6">
            <RetreatsWithPackagesAdmin />
          </TabsContent>

          <TabsContent value="courses" className="mt-6">
            <ResidentialCoursesAdmin />
          </TabsContent>

          <TabsContent value="video-courses" className="mt-6">
            <VideoCoursesAdmin />
          </TabsContent>

          <TabsContent value="classes" className="mt-6">
            <DropInClassesAdmin />
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <ProductsAdmin />
          </TabsContent>

          <TabsContent value="testimonials" className="mt-6">
            <TestimonialsAdmin />
          </TabsContent>

          <TabsContent value="communication" className="mt-6">
            <CustomerCommunicationAdmin />
          </TabsContent>

          <TabsContent value="content" className="mt-6">
            <ContentManagementAdmin />
          </TabsContent>

          <TabsContent value="pages" className="mt-6">
            <PageManagementAdmin />
          </TabsContent>

          <TabsContent value="media" className="mt-6">
            <MediaManagementAdmin />
          </TabsContent>

          <TabsContent value="branding" className="mt-6">
            <BrandCustomizationAdmin />
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <ContactInfoAdmin />
          </TabsContent>

          <TabsContent value="stripe" className="mt-6">
            <StripeSetup />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <SystemSettingsAdmin />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
