import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { type Content, ExternalBlob } from "../../backend";
import {
  useAddContent,
  useDeleteContent,
  useGetContentByPage,
  useUpdateContent,
} from "../../hooks/useQueries";

const PAGES = [
  "home",
  "retreats",
  "courses",
  "drop-in-classes",
  "video-courses",
  "shop",
  "about",
  "contact",
];
const CONTENT_TYPES = [
  "text",
  "image",
  "video",
  "hero-text",
  "section-title",
  "description",
];

export default function ContentManagementAdmin() {
  const [selectedPage, setSelectedPage] = useState("home");
  const { data: content = [], isLoading } = useGetContentByPage(selectedPage);
  const addContent = useAddContent();
  const updateContent = useUpdateContent();
  const deleteContent = useDeleteContent();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const [formData, setFormData] = useState({
    contentType: "text",
    value: "",
    mediaFile: null as File | null,
  });

  const resetForm = () => {
    setFormData({
      contentType: "text",
      value: "",
      mediaFile: null,
    });
    setEditingContent(null);
  };

  const handleEdit = (contentItem: Content) => {
    setEditingContent(contentItem);
    setFormData({
      contentType: contentItem.contentType,
      value: contentItem.value,
      mediaFile: null,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let mediaBlob: ExternalBlob;

      if (formData.mediaFile) {
        const arrayBuffer = await formData.mediaFile.arrayBuffer();
        mediaBlob = ExternalBlob.fromBytes(new Uint8Array(arrayBuffer));
      } else if (editingContent) {
        mediaBlob = editingContent.media;
      } else {
        mediaBlob = ExternalBlob.fromBytes(new Uint8Array());
      }

      const contentData: Content = {
        id: editingContent?.id || `content-${Date.now()}`,
        page: selectedPage,
        contentType: formData.contentType,
        value: formData.value,
        media: mediaBlob,
      };

      if (editingContent) {
        await updateContent.mutateAsync(contentData);
        toast.success("Content updated successfully!");
      } else {
        await addContent.mutateAsync(contentData);
        toast.success("Content added successfully!");
      }

      setDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Failed to save content");
      console.error("Save error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this content?")) return;

    try {
      await deleteContent.mutateAsync(id);
      toast.success("Content deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete content");
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Content Management
          </CardTitle>
          <CardDescription>
            Edit all text, images, and videos across your website pages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Page</Label>
              <Select value={selectedPage} onValueChange={setSelectedPage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAGES.map((page) => (
                    <SelectItem key={page} value={page}>
                      {page
                        .split("-")
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(" ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">
          {selectedPage
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ")}{" "}
          Content
        </h3>
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
              Add Content
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingContent ? "Edit Content" : "Add New Content"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contentType">Content Type</Label>
                <Select
                  value={formData.contentType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, contentType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTENT_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type
                          .split("-")
                          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                          .join(" ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Content Value</Label>
                <Textarea
                  id="value"
                  value={formData.value}
                  onChange={(e) =>
                    setFormData({ ...formData, value: e.target.value })
                  }
                  rows={4}
                  placeholder="Enter text content, URL, or description"
                  required
                />
              </div>
              {(formData.contentType === "image" ||
                formData.contentType === "video") && (
                <div className="space-y-2">
                  <Label htmlFor="media">Media File</Label>
                  <Input
                    id="media"
                    type="file"
                    accept={
                      formData.contentType === "image" ? "image/*" : "video/*"
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        mediaFile: e.target.files?.[0] || null,
                      })
                    }
                  />
                </div>
              )}
              <Button
                type="submit"
                className="w-full"
                disabled={addContent.isPending || updateContent.isPending}
              >
                {addContent.isPending || updateContent.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : editingContent ? (
                  "Update Content"
                ) : (
                  "Add Content"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {content.map((item) => (
            <Card key={item.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded">
                        {item.contentType}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.value}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
                      disabled={deleteContent.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
