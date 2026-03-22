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
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { DropInClass } from "../../backend";
import {
  useAddDropInClass,
  useDeleteDropInClass,
  useGetDropInClasses,
  useUpdateDropInClass,
} from "../../hooks/useQueries";

export default function DropInClassesAdmin() {
  const { data: classes = [], isLoading } = useGetDropInClasses();
  const addDropInClass = useAddDropInClass();
  const updateDropInClass = useUpdateDropInClass();
  const deleteDropInClass = useDeleteDropInClass();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<DropInClass | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    instructor: "",
    time: "",
    durationMinutes: "",
    price: "",
    currency: "USD",
    level: "Beginner",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      instructor: "",
      time: "",
      durationMinutes: "",
      price: "",
      currency: "USD",
      level: "Beginner",
    });
    setEditingClass(null);
  };

  const handleEdit = (classItem: DropInClass) => {
    setEditingClass(classItem);
    setFormData({
      name: classItem.name,
      instructor: classItem.instructor,
      time: new Date(Number(classItem.time) / 1000000)
        .toISOString()
        .slice(0, 16),
      durationMinutes: classItem.durationMinutes.toString(),
      price: classItem.price.toString(),
      currency: classItem.currency,
      level: classItem.level,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const classData: DropInClass = {
        id: editingClass?.id || `class-${Date.now()}`,
        name: formData.name,
        instructor: formData.instructor,
        time: BigInt(new Date(formData.time).getTime() * 1000000),
        durationMinutes: BigInt(formData.durationMinutes),
        price: BigInt(formData.price),
        currency: formData.currency,
        level: formData.level,
      };

      if (editingClass) {
        await updateDropInClass.mutateAsync(classData);
        toast.success("Class updated successfully!");
      } else {
        await addDropInClass.mutateAsync(classData);
        toast.success("Class added successfully!");
      }

      setDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Failed to save class");
      console.error("Save error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this class?")) return;

    try {
      await deleteDropInClass.mutateAsync(id);
      toast.success("Class deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete class");
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
        <h2 className="text-2xl font-bold font-heading">
          Manage Drop-In Classes
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
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingClass ? "Edit Class" : "Add New Class"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Class Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  value={formData.instructor}
                  onChange={(e) =>
                    setFormData({ ...formData, instructor: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Date & Time</Label>
                <Input
                  id="time"
                  type="datetime-local"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="durationMinutes">Duration (minutes)</Label>
                  <Input
                    id="durationMinutes"
                    type="number"
                    value={formData.durationMinutes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        durationMinutes: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Input
                    id="level"
                    value={formData.level}
                    onChange={(e) =>
                      setFormData({ ...formData, level: e.target.value })
                    }
                    placeholder="Beginner, Intermediate, Advanced"
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
              <Button
                type="submit"
                className="w-full"
                disabled={
                  addDropInClass.isPending || updateDropInClass.isPending
                }
              >
                {addDropInClass.isPending || updateDropInClass.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : editingClass ? (
                  "Update Class"
                ) : (
                  "Add Class"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <Card key={classItem.id}>
            <CardHeader>
              <CardTitle className="text-lg">{classItem.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Instructor:</strong> {classItem.instructor}
                </p>
                <p>
                  <strong>Level:</strong> {classItem.level}
                </p>
                <p>
                  <strong>Duration:</strong> {Number(classItem.durationMinutes)}{" "}
                  minutes
                </p>
                <p>
                  <strong>Price:</strong> {classItem.currency}{" "}
                  {Number(classItem.price)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(classItem)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(classItem.id)}
                  disabled={deleteDropInClass.isPending}
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
