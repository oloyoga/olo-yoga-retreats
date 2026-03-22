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
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { ContactInfo } from "../../backend";
import {
  useGetContactInfo,
  useUpdateContactInfo,
} from "../../hooks/useQueries";

export default function ContactInfoAdmin() {
  const { data: contactInfo, isLoading } = useGetContactInfo();
  const updateContactInfo = useUpdateContactInfo();

  const [formData, setFormData] = useState<ContactInfo>({
    address: "",
    phone: "",
    whatsapp: "",
    email: "",
    googleMapsLink: "",
    googleBusinessLink: "",
    socialLinks: {
      instagram: "",
      youtube: "",
      facebook: "",
    },
  });

  useEffect(() => {
    if (contactInfo) {
      setFormData(contactInfo);
    }
  }, [contactInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateContactInfo.mutateAsync(formData);
      toast.success("Contact information updated successfully!");
    } catch (error) {
      console.error("Error updating contact info:", error);
      toast.error("Failed to update contact information");
    }
  };

  const handleChange = (field: string, value: string) => {
    if (field.startsWith("socialLinks.")) {
      const socialField = field.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-2xl">
          Contact Information
        </CardTitle>
        <CardDescription>
          Manage your business contact details and social media links
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="Full address"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+91 1234567890"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                value={formData.whatsapp}
                onChange={(e) => handleChange("whatsapp", e.target.value)}
                placeholder="+91 1234567890"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="contact@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="googleMapsLink">Google Maps Link</Label>
              <Input
                id="googleMapsLink"
                value={formData.googleMapsLink}
                onChange={(e) => handleChange("googleMapsLink", e.target.value)}
                placeholder="https://maps.app.goo.gl/..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="googleBusinessLink">Google Business Link</Label>
              <Input
                id="googleBusinessLink"
                value={formData.googleBusinessLink}
                onChange={(e) =>
                  handleChange("googleBusinessLink", e.target.value)
                }
                placeholder="https://share.google/..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram URL</Label>
              <Input
                id="instagram"
                value={formData.socialLinks.instagram}
                onChange={(e) =>
                  handleChange("socialLinks.instagram", e.target.value)
                }
                placeholder="https://www.instagram.com/..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="youtube">YouTube URL</Label>
              <Input
                id="youtube"
                value={formData.socialLinks.youtube}
                onChange={(e) =>
                  handleChange("socialLinks.youtube", e.target.value)
                }
                placeholder="https://youtube.com/@..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook URL</Label>
              <Input
                id="facebook"
                value={formData.socialLinks.facebook}
                onChange={(e) =>
                  handleChange("socialLinks.facebook", e.target.value)
                }
                placeholder="https://www.facebook.com/..."
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={updateContactInfo.isPending}
            className="w-full md:w-auto"
          >
            {updateContactInfo.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Contact Information"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
