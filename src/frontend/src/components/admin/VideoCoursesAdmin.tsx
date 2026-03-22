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
import { ExternalBlob, type VideoCourse } from "../../backend";
import {
  useAddVideoCourse,
  useDeleteVideoCourse,
  useGetVideoCourses,
  useUpdateVideoCourse,
} from "../../hooks/useQueries";

export default function VideoCoursesAdmin() {
  const { data: videoCourses = [], isLoading } = useGetVideoCourses();
  const addVideoCourse = useAddVideoCourse();
  const updateVideoCourse = useUpdateVideoCourse();
  const deleteVideoCourse = useDeleteVideoCourse();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<VideoCourse | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    currency: "USD",
    imageFile: null as File | null,
    videoFiles: [] as File[],
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      currency: "USD",
      imageFile: null,
      videoFiles: [],
    });
    setEditingCourse(null);
  };

  const handleEdit = (course: VideoCourse) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price.toString(),
      currency: course.currency,
      imageFile: null,
      videoFiles: [],
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageBlob: ExternalBlob;
      let videoBlobs: ExternalBlob[];

      if (formData.imageFile) {
        const arrayBuffer = await formData.imageFile.arrayBuffer();
        imageBlob = ExternalBlob.fromBytes(new Uint8Array(arrayBuffer));
      } else if (editingCourse) {
        imageBlob = editingCourse.image;
      } else {
        toast.error("Please select an image");
        return;
      }

      if (formData.videoFiles.length > 0) {
        videoBlobs = await Promise.all(
          formData.videoFiles.map(async (file) => {
            const arrayBuffer = await file.arrayBuffer();
            return ExternalBlob.fromBytes(new Uint8Array(arrayBuffer));
          }),
        );
      } else if (editingCourse) {
        videoBlobs = editingCourse.videoFiles;
      } else {
        toast.error("Please select at least one video file");
        return;
      }

      const courseData: VideoCourse = {
        id: editingCourse?.id || `video-course-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        price: BigInt(formData.price),
        currency: formData.currency,
        videoFiles: videoBlobs,
        image: imageBlob,
      };

      if (editingCourse) {
        await updateVideoCourse.mutateAsync(courseData);
        toast.success("Video course updated successfully!");
      } else {
        await addVideoCourse.mutateAsync(courseData);
        toast.success("Video course added successfully!");
      }

      setDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Failed to save video course");
      console.error("Save error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video course?")) return;

    try {
      await deleteVideoCourse.mutateAsync(id);
      toast.success("Video course deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete video course");
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
          Manage Video Courses
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
              Add Video Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCourse ? "Edit Video Course" : "Add New Video Course"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
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
              <div className="space-y-2">
                <Label htmlFor="videos">Video Files</Label>
                <Input
                  id="videos"
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      videoFiles: Array.from(e.target.files || []),
                    })
                  }
                  required={!editingCourse}
                />
                <p className="text-xs text-muted-foreground">
                  You can select multiple video files
                </p>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={
                  addVideoCourse.isPending || updateVideoCourse.isPending
                }
              >
                {addVideoCourse.isPending || updateVideoCourse.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : editingCourse ? (
                  "Update Video Course"
                ) : (
                  "Add Video Course"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoCourses.map((course) => (
          <Card key={course.id}>
            <div className="aspect-video overflow-hidden">
              <img
                src={course.image.getDirectURL()}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {course.description}
              </p>
              <p className="text-xs text-muted-foreground">
                {course.videoFiles.length} video(s)
              </p>
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
                  disabled={deleteVideoCourse.isPending}
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
