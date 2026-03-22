import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Info } from "lucide-react";

export default function BrandCustomizationAdmin() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Brand Customization</CardTitle>
          <CardDescription>
            Customize logo, colors, and typography
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Brand customization with real-time preview requires additional
              backend support for storing and applying theme settings.
              Currently, branding is managed through the application's design
              system (index.css and tailwind.config.js). Contact support to
              enable dynamic branding features.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
