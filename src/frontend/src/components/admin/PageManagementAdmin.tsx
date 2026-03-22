import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Info } from "lucide-react";

export default function PageManagementAdmin() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Page Management</CardTitle>
          <CardDescription>
            Create, modify, and delete pages with SEO metadata
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Page management functionality requires additional backend support
              for dynamic routing and SEO metadata storage. Currently, pages are
              statically defined in the application. Contact support to enable
              this feature.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
