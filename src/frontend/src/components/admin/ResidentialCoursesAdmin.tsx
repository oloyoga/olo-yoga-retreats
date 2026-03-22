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
import { Calendar, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ExternalBlob, type ResidentialCourse } from "../../backend";
import {
  useAddResidentialCourse,
  useDeleteResidentialCourse,
  useGetResidentialCourses,
  useUpdateResidentialCourse,
} from "../../hooks/useQueries";

export default function ResidentialCoursesAdmin() {
  const { data: courses = [], isLoading } = useGetResidentialCourses();
  const addCourse = useAddResidentialCourse();
  const updateCourse = useUpdateResidentialCourse();
  const deleteCourse = useDeleteResidentialCourse();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<ResidentialCourse | null>(
    null,
  );
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    currency: "₹",
    monthlyDates: "",
    isPrivateAvailable: true,
    imageFile: null as File | null,
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      currency: "₹",
      monthlyDates: "",
      isPrivateAvailable: true,
      imageFile: null,
    });
    setEditingCourse(null);
  };

  const handleEdit = (course: ResidentialCourse) => {
    setEditingCourse(course);
    setFormData({
      name: course.name,
      description: course.description,
      price: course.price.toString(),
      currency: course.currency,
      monthlyDates: course.monthlyDates.join(", "),
      isPrivateAvailable: course.isPrivateAvailable,
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
      } else if (editingCourse) {
        imageBlob = editingCourse.image;
      } else {
        toast.error("Please select an image");
        return;
      }

      const courseData: ResidentialCourse = {
        id: editingCourse?.id || `course-${Date.now()}`,
        name: formData.name,
        description: formData.description,
        price: BigInt(formData.price),
        currency: formData.currency,
        monthlyDates: formData.monthlyDates
          .split(",")
          .map((d) => d.trim())
          .filter(Boolean),
        isPrivateAvailable: formData.isPrivateAvailable,
        image: imageBlob,
      };

      if (editingCourse) {
        await updateCourse.mutateAsync(courseData);
        toast.success("Course updated successfully!");
      } else {
        await addCourse.mutateAsync(courseData);
        toast.success("Course added successfully!");
      }

      setDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Failed to save course");
      console.error("Save error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
      await deleteCourse.mutateAsync(id);
      toast.success("Course deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete course");
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
          Manage Residential Courses
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
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCourse ? "Edit Course" : "Add New Course"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Course Name</Label>
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
                <Label htmlFor="monthlyDates">
                  <Calendar className="inline h-4 w-4 mr-2" />
                  Monthly Recurring Dates (comma-separated)
                </Label>
                <Input
                  id="monthlyDates"
                  placeholder="e.g., 1st-7th, 15th-21st, Last week of month"
                  value={formData.monthlyDates}
                  onChange={(e) =>
                    setFormData({ ...formData, monthlyDates: e.target.value })
                  }
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Enter recurring date ranges or specific dates for this course
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="privateAvailable"
                  checked={formData.isPrivateAvailable}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      isPrivateAvailable: checked as boolean,
                    })
                  }
                />
                <Label htmlFor="privateAvailable" className="cursor-pointer">
                  Available for private 1-to-1 booking
                </Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Course Image</Label>
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
                  required={!editingCourse}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={addCourse.isPending || updateCourse.isPending}
              >
                {addCourse.isPending || updateCourse.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : editingCourse ? (
                  "Update Course"
                ) : (
                  "Add Course"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id}>
            <div className="aspect-video overflow-hidden">
              <img
                src={course.image.getDirectURL()}
                alt={course.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{course.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {course.description}
              </p>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Price:</strong> {course.currency}{" "}
                  {Number(course.price).toLocaleString()}
                </p>
                <p>
                  <strong>Dates:</strong> {course.monthlyDates.join(", ")}
                </p>
                {course.isPrivateAvailable && (
                  <p className="text-xs text-primary">
                    ✓ Private booking available
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(course)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(course.id)}
                  disabled={deleteCourse.isPending}
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
