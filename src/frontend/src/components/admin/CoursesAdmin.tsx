import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function CoursesAdmin() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-heading">
          Manage Residential Courses
        </h2>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Residential courses management is currently unavailable. The backend
          needs to be updated to support this feature. Please contact support
          for assistance.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The residential courses management feature will be available once
            the backend is updated with the necessary API endpoints.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
