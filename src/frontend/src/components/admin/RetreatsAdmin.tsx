import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ExternalBlob, type Retreat } from "../../backend";
import {
  useAddRetreat,
  useDeleteRetreat,
  useGetRetreats,
  useUpdateRetreat,
} from "../../hooks/useQueries";

export default function RetreatsAdmin() {
  const { data: retreats = [], isLoading } = useGetRetreats();
  const addRetreat = useAddRetreat();
  const updateRetreat = useUpdateRetreat();
  const deleteRetreat = useDeleteRetreat();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRetreat, setEditingRetreat] = useState<Retreat | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    price: "",
    currency: "USD",
    availability: "",
    imageFile: null as File | null,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      price: "",
      currency: "USD",
      availability: "",
      imageFile: null,
    });
    setEditingRetreat(null);
  };

  const handleEdit = (retreat: Retreat) => {
    setEditingRetreat(retreat);
    setFormData({
      title: retreat.title,
      description: retreat.description,
      startDate: new Date(Number(retreat.startDate) / 1000000)
        .toISOString()
        .split("T")[0],
      endDate: new Date(Number(retreat.endDate) / 1000000)
        .toISOString()
        .split("T")[0],
      price: retreat.price.toString(),
      currency: retreat.currency,
      availability: retreat.availability.toString(),
      imageFile: null,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageBlob: ExternalBlob;

      if (formData.imageFile) {
        const arrayBuffer = await formData.imageFile.arrayBuffer();
        imageBlob = ExternalBlob.fromBytes(new Uint8Array(arrayBuffer));
      } else if (editingRetreat) {
        imageBlob = editingRetreat.image;
      } else {
        toast.error("Please select an image");
        return;
      }

      const retreatData: Retreat = {
        id: editingRetreat?.id || `retreat-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        startDate: BigInt(new Date(formData.startDate).getTime() * 1000000),
        endDate: BigInt(new Date(formData.endDate).getTime() * 1000000),
        price: BigInt(formData.price),
        currency: formData.currency,
        availability: BigInt(formData.availability),
        image: imageBlob,
      };

      if (editingRetreat) {
        await updateRetreat.mutateAsync(retreatData);
        toast.success("Retreat updated successfully!");
      } else {
        await addRetreat.mutateAsync(retreatData);
        toast.success("Retreat added successfully!");
      }

      setDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Failed to save retreat");
      console.error("Save error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this retreat?")) return;

    try {
      await deleteRetreat.mutateAsync(id);
      toast.success("Retreat deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete retreat");
      console.error("Delete error:", error);
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
        <h2 className="text-2xl font-bold font-heading">Manage Retreats</h2>
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
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingRetreat ? "Edit Retreat" : "Add New Retreat"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    value={formData.currency}
                    onChange={(e) =>
                      setFormData({ ...formData, currency: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="availability">Available Spots</Label>
                <Input
                  id="availability"
                  type="number"
                  value={formData.availability}
                  onChange={(e) =>
                    setFormData({ ...formData, availability: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
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
                  required={!editingRetreat}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={addRetreat.isPending || updateRetreat.isPending}
              >
                {addRetreat.isPending || updateRetreat.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : editingRetreat ? (
                  "Update Retreat"
                ) : (
                  "Add Retreat"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {retreats.map((retreat) => (
          <Card key={retreat.id}>
            <div className="aspect-video overflow-hidden">
              <img
                src={retreat.image.getDirectURL()}
                alt={retreat.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{retreat.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {retreat.description}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(retreat)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(retreat.id)}
                  disabled={deleteRetreat.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
