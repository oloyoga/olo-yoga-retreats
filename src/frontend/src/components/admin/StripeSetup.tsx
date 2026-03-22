import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useIsStripeConfigured,
  useSetStripeConfiguration,
} from "../../hooks/useQueries";

export default function StripeSetup() {
  const [secretKey, setSecretKey] = useState("");
  const [countries, setCountries] = useState("IN,US,GB,CA,AU");
  const setStripeConfig = useSetStripeConfiguration();
  const { data: isConfigured } = useIsStripeConfigured();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!secretKey.trim()) {
      toast.error("Please enter your Stripe secret key");
      return;
    }

    try {
      await setStripeConfig.mutateAsync({
        secretKey: secretKey.trim(),
        allowedCountries: countries
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
      });
      toast.success("Stripe configuration saved successfully!");
      setSecretKey("");
    } catch (error) {
      toast.error("Failed to save Stripe configuration");
      console.error("Stripe config error:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <CreditCard className="h-6 w-6 text-primary" />
          <div>
            <CardTitle>Stripe Payment Configuration</CardTitle>
            <CardDescription>
              {isConfigured
                ? "Stripe is configured. You can update your settings below."
                : "Configure Stripe to accept payments for retreats, courses, and products."}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="secretKey">Stripe Secret Key</Label>
            <Input
              id="secretKey"
              type="password"
              placeholder="sk_test_..."
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              disabled={setStripeConfig.isPending}
            />
            <p className="text-xs text-muted-foreground">
              Get your secret key from the Stripe Dashboard
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="countries">
              Allowed Countries (comma-separated)
            </Label>
            <Input
              id="countries"
              type="text"
              placeholder="IN,US,GB,CA,AU"
              value={countries}
              onChange={(e) => setCountries(e.target.value)}
              disabled={setStripeConfig.isPending}
            />
            <p className="text-xs text-muted-foreground">
              Use ISO 3166-1 alpha-2 country codes (e.g., IN for India, US for
              United States)
            </p>
          </div>

          <Button type="submit" disabled={setStripeConfig.isPending}>
            {setStripeConfig.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Configuration"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
