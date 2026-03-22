import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Info } from "lucide-react";

export default function MediaManagementAdmin() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Media Management</CardTitle>
          <CardDescription>
            Upload, organize, and manage photos, videos, and documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Centralized media library management requires additional backend
              support for media organization and tagging. Currently, media is
              managed per content item. Use the Content Management tab to upload
              and manage media for specific pages.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
