import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  ExternalBlob,
  type RetreatPackage,
  type RetreatWithPackages,
} from "../../backend";
import {
  useAddRetreatWithPackages,
  useGetAllRetreatsWithPackages,
} from "../../hooks/useQueries";

export default function RetreatsWithPackagesAdmin() {
  const { data: retreats = [], isLoading } = useGetAllRetreatsWithPackages();
  const addRetreat = useAddRetreatWithPackages();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    duration: "",
    overview: "",
    inclusions: "",
    itinerary: "",
    ctaBook: "Book a Retreat",
    ctaWhatsapp: "WhatsApp Inquiry",
    isCustomizable: true,
    hasRecurringDates: true,
    startDate: "",
    endDate: "",
    imageFile: null as File | null,
  });
  const [packages, setPackages] = useState<
    Array<Omit<RetreatPackage, "price"> & { price: string }>
  >([
    {
      roomType: "4-sharing",
      price: "",
      currency: "₹",
      description: "Shared accommodation with 3 other guests",
    },
  ]);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      location: "Rishikesh, Uttarakhand, India",
      duration: "",
      overview: "",
      inclusions: "",
      itinerary: "",
      ctaBook: "Book a Retreat",
      ctaWhatsapp: "WhatsApp Inquiry",
      isCustomizable: true,
      hasRecurringDates: true,
      startDate: "",
      endDate: "",
      imageFile: null,
    });
    setPackages([
      {
        roomType: "4-sharing",
        price: "",
        currency: "₹",
        description: "Shared accommodation with 3 other guests",
      },
    ]);
  };

  const addPackage = () => {
    setPackages([
      ...packages,
      { roomType: "", price: "", currency: "₹", description: "" },
    ]);
  };

  const removePackage = (index: number) => {
    setPackages(packages.filter((_, i) => i !== index));
  };

  const updatePackage = (index: number, field: string, value: string) => {
    const updated = [...packages];
    updated[index] = { ...updated[index], [field]: value };
    setPackages(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!formData.imageFile) {
        toast.error("Please select an image");
        return;
      }

      const arrayBuffer = await formData.imageFile.arrayBuffer();
      const imageBlob = ExternalBlob.fromBytes(new Uint8Array(arrayBuffer));

      const retreatData: RetreatWithPackages = {
        id: `retreat-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        location: formData.location,
        duration: formData.duration,
        overview: formData.overview,
        inclusions: formData.inclusions,
        itinerary: formData.itinerary,
        packages: packages.map((pkg) => ({
          roomType: pkg.roomType,
          price: BigInt(pkg.price),
          currency: pkg.currency,
          description: pkg.description,
        })),
        image: imageBlob,
        ctaBook: formData.ctaBook,
        ctaWhatsapp: formData.ctaWhatsapp,
        isCustomizable: formData.isCustomizable,
        hasRecurringDates: formData.hasRecurringDates,
        startDate: BigInt(new Date(formData.startDate).getTime() * 1000000),
        endDate: BigInt(new Date(formData.endDate).getTime() * 1000000),
      };

      await addRetreat.mutateAsync(retreatData);
      toast.success("Retreat added successfully!");
      setDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Failed to save retreat");
      console.error("Save error:", error);
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-heading">
          Manage Retreats with Packages
        </h2>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Retreat
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Retreat</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 7 Days / 6 Nights"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="overview">Overview</Label>
                <Textarea
                  id="overview"
                  value={formData.overview}
                  onChange={(e) =>
                    setFormData({ ...formData, overview: e.target.value })
                  }
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inclusions">What's Included</Label>
                <Textarea
                  id="inclusions"
                  value={formData.inclusions}
                  onChange={(e) =>
                    setFormData({ ...formData, inclusions: e.target.value })
                  }
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="itinerary">Daily Itinerary</Label>
                <Textarea
                  id="itinerary"
                  value={formData.itinerary}
                  onChange={(e) =>
                    setFormData({ ...formData, itinerary: e.target.value })
                  }
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Pricing Packages</Label>
                  <Button type="button" size="sm" onClick={addPackage}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Package
                  </Button>
                </div>
                {packages.map((pkg, index) => (
                  <Card key={pkg.roomType || String(index)}>
                    <CardContent className="pt-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Room Type</Label>
                          <Input
                            placeholder="e.g., 4-sharing, dual, private"
                            value={pkg.roomType}
                            onChange={(e) =>
                              updatePackage(index, "roomType", e.target.value)
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Price</Label>
                          <div className="flex gap-2">
                            <Input
                              className="w-20"
                              value={pkg.currency}
                              onChange={(e) =>
                                updatePackage(index, "currency", e.target.value)
                              }
                              required
                            />
                            <Input
                              type="number"
                              placeholder="Amount"
                              value={pkg.price}
                              onChange={(e) =>
                                updatePackage(index, "price", e.target.value)
                              }
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Input
                          placeholder="Brief description of this package"
                          value={pkg.description}
                          onChange={(e) =>
                            updatePackage(index, "description", e.target.value)
                          }
                          required
                        />
                      </div>
                      {packages.length > 1 && (
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          onClick={() => removePackage(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="customizable"
                    checked={formData.isCustomizable}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        isCustomizable: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="customizable" className="cursor-pointer">
                    Customizable dates
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="recurring"
                    checked={formData.hasRecurringDates}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        hasRecurringDates: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="recurring" className="cursor-pointer">
                    Year-round availability
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Retreat Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      imageFile: e.target.files?.[0] || null,
                    })
                  }
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={addRetreat.isPending}
              >
                {addRetreat.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Add Retreat"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {retreats.map((retreat) => (
          <Card key={retreat.id} className="overflow-hidden">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="aspect-video md:aspect-auto overflow-hidden">
                <img
                  src={retreat.image.getDirectURL()}
                  alt={retreat.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:col-span-2 p-6">
                <CardTitle className="text-xl mb-2">{retreat.title}</CardTitle>
                <p className="text-sm text-muted-foreground mb-4">
                  {retreat.location} • {retreat.duration}
                </p>
                <div className="flex flex-wrap gap-2">
                  {retreat.packages.map((pkg, idx) => (
                    <span
                      key={pkg.roomType || String(idx)}
                      className="text-xs bg-muted px-2 py-1 rounded"
                    >
                      {pkg.roomType}: {pkg.currency}{" "}
                      {Number(pkg.price).toLocaleString()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
