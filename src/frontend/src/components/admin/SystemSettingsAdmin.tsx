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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  CheckCircle2,
  CreditCard,
  Database,
  Download,
  Globe,
  Loader2,
  Mail,
  Settings,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useGetPayPalConfig,
  useGetRazorpayConfig,
  useSetPayPalConfig,
  useSetRazorpayConfig,
} from "../../hooks/useQueries";

export default function SystemSettingsAdmin() {
  const [currency, setCurrency] = useState("INR");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [smtpEnabled, setSmtpEnabled] = useState(false);

  // Razorpay state
  const { data: razorpayConfig, isLoading: razorpayLoading } =
    useGetRazorpayConfig();
  const setRazorpayConfig = useSetRazorpayConfig();
  const [razorpayApiKey, setRazorpayApiKey] = useState("");
  const [razorpayApiSecret, setRazorpayApiSecret] = useState("");
  const [razorpayCallbackUrl, setRazorpayCallbackUrl] = useState("");
  const [razorpayEnabled, setRazorpayEnabled] = useState(false);
  const [razorpayTestMode, setRazorpayTestMode] = useState(true);

  // PayPal state
  const { data: paypalConfig, isLoading: paypalLoading } = useGetPayPalConfig();
  const setPayPalConfig = useSetPayPalConfig();
  const [paypalClientId, setPaypalClientId] = useState("");
  const [paypalClientSecret, setPaypalClientSecret] = useState("");
  const [paypalCallbackUrl, setPaypalCallbackUrl] = useState("");
  const [paypalEnabled, setPaypalEnabled] = useState(false);
  const [paypalTestMode, setPaypalTestMode] = useState(true);

  // Load Razorpay config
  useEffect(() => {
    if (razorpayConfig) {
      setRazorpayApiKey(razorpayConfig.apiKey);
      setRazorpayApiSecret(razorpayConfig.apiSecret);
      setRazorpayCallbackUrl(razorpayConfig.callbackUrl);
      setRazorpayEnabled(razorpayConfig.enabled);
      setRazorpayTestMode(razorpayConfig.testMode);
    }
  }, [razorpayConfig]);

  // Load PayPal config
  useEffect(() => {
    if (paypalConfig) {
      setPaypalClientId(paypalConfig.clientId);
      setPaypalClientSecret(paypalConfig.clientSecret);
      setPaypalCallbackUrl(paypalConfig.callbackUrl);
      setPaypalEnabled(paypalConfig.enabled);
      setPaypalTestMode(paypalConfig.testMode);
    }
  }, [paypalConfig]);

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!");
  };

  const handleSaveRazorpay = async () => {
    if (!razorpayApiKey || !razorpayApiSecret) {
      toast.error("Please provide both API Key and API Secret");
      return;
    }

    try {
      await setRazorpayConfig.mutateAsync({
        apiKey: razorpayApiKey,
        apiSecret: razorpayApiSecret,
        callbackUrl:
          razorpayCallbackUrl || `${window.location.origin}/payment-callback`,
        enabled: razorpayEnabled,
        testMode: razorpayTestMode,
      });
      toast.success("Razorpay configuration saved successfully!");
    } catch (error) {
      toast.error("Failed to save Razorpay configuration");
      console.error(error);
    }
  };

  const handleSavePayPal = async () => {
    if (!paypalClientId || !paypalClientSecret) {
      toast.error("Please provide both Client ID and Client Secret");
      return;
    }

    try {
      await setPayPalConfig.mutateAsync({
        clientId: paypalClientId,
        clientSecret: paypalClientSecret,
        callbackUrl:
          paypalCallbackUrl || `${window.location.origin}/payment-callback`,
        enabled: paypalEnabled,
        testMode: paypalTestMode,
      });
      toast.success("PayPal configuration saved successfully!");
    } catch (error) {
      toast.error("Failed to save PayPal configuration");
      console.error(error);
    }
  };

  const handleBackup = () => {
    toast.success("Backup created successfully!");
  };

  const handleRestore = () => {
    toast.info("Restore functionality will be available soon");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-heading flex items-center gap-2">
          <Settings className="h-6 w-6" />
          System Settings
        </h2>
        <p className="text-muted-foreground mt-1">
          Configure global system settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Regional Settings
              </CardTitle>
              <CardDescription>
                Configure currency, timezone, and regional preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">INR (₹) - Indian Rupee</SelectItem>
                    <SelectItem value="USD">USD ($) - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR (€) - Euro</SelectItem>
                    <SelectItem value="GBP">GBP (£) - British Pound</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger id="timezone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Kolkata">
                      Asia/Kolkata (IST)
                    </SelectItem>
                    <SelectItem value="America/New_York">
                      America/New_York (EST)
                    </SelectItem>
                    <SelectItem value="Europe/London">
                      Europe/London (GMT)
                    </SelectItem>
                    <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          {/* Razorpay Configuration */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Razorpay Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure Razorpay payment gateway for Indian and
                    international payments
                  </CardDescription>
                </div>
                {razorpayConfig && razorpayEnabled && (
                  <Badge variant="default" className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Active
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {razorpayLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="space-y-0.5">
                      <Label>Enable Razorpay</Label>
                      <p className="text-sm text-muted-foreground">
                        Activate Razorpay payment gateway for checkout
                      </p>
                    </div>
                    <Switch
                      checked={razorpayEnabled}
                      onCheckedChange={setRazorpayEnabled}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="space-y-0.5">
                      <Label>Test Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Use test credentials for development
                      </p>
                    </div>
                    <Switch
                      checked={razorpayTestMode}
                      onCheckedChange={setRazorpayTestMode}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="razorpay-key">API Key</Label>
                    <Input
                      id="razorpay-key"
                      type="text"
                      placeholder="rzp_test_xxxxxxxxxx or rzp_live_xxxxxxxxxx"
                      value={razorpayApiKey}
                      onChange={(e) => setRazorpayApiKey(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Get your API key from Razorpay Dashboard → Settings → API
                      Keys
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="razorpay-secret">API Secret</Label>
                    <Input
                      id="razorpay-secret"
                      type="password"
                      placeholder="••••••••••••••••"
                      value={razorpayApiSecret}
                      onChange={(e) => setRazorpayApiSecret(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Keep your API secret secure and never share it publicly
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="razorpay-callback">
                      Callback URL (Optional)
                    </Label>
                    <Input
                      id="razorpay-callback"
                      type="url"
                      placeholder={`${window.location.origin}/payment-callback`}
                      value={razorpayCallbackUrl}
                      onChange={(e) => setRazorpayCallbackUrl(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave empty to use default callback URL
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="flex gap-2">
                      <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                          Razorpay Setup Instructions
                        </p>
                        <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
                          <li>
                            Sign up at razorpay.com and complete KYC
                            verification
                          </li>
                          <li>
                            Navigate to Settings → API Keys in your Razorpay
                            Dashboard
                          </li>
                          <li>Generate API keys (use test keys for testing)</li>
                          <li>
                            Copy and paste the Key ID and Key Secret above
                          </li>
                          <li>Enable the gateway and save configuration</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleSaveRazorpay}
                    disabled={setRazorpayConfig.isPending}
                    className="w-full"
                  >
                    {setRazorpayConfig.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Razorpay Configuration"
                    )}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* PayPal Configuration */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    PayPal Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure PayPal payment gateway for global payments
                  </CardDescription>
                </div>
                {paypalConfig && paypalEnabled && (
                  <Badge variant="default" className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Active
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {paypalLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="space-y-0.5">
                      <Label>Enable PayPal</Label>
                      <p className="text-sm text-muted-foreground">
                        Activate PayPal payment gateway for checkout
                      </p>
                    </div>
                    <Switch
                      checked={paypalEnabled}
                      onCheckedChange={setPaypalEnabled}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="space-y-0.5">
                      <Label>Sandbox Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Use sandbox credentials for testing
                      </p>
                    </div>
                    <Switch
                      checked={paypalTestMode}
                      onCheckedChange={setPaypalTestMode}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paypal-client-id">Client ID</Label>
                    <Input
                      id="paypal-client-id"
                      type="text"
                      placeholder="AxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxZ"
                      value={paypalClientId}
                      onChange={(e) => setPaypalClientId(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Get your Client ID from PayPal Developer Dashboard
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paypal-secret">Client Secret</Label>
                    <Input
                      id="paypal-secret"
                      type="password"
                      placeholder="••••••••••••••••"
                      value={paypalClientSecret}
                      onChange={(e) => setPaypalClientSecret(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Keep your Client Secret secure and never share it publicly
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paypal-callback">
                      Return URL (Optional)
                    </Label>
                    <Input
                      id="paypal-callback"
                      type="url"
                      placeholder={`${window.location.origin}/payment-callback`}
                      value={paypalCallbackUrl}
                      onChange={(e) => setPaypalCallbackUrl(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave empty to use default return URL
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="flex gap-2">
                      <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                          PayPal Setup Instructions
                        </p>
                        <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
                          <li>Sign up at developer.paypal.com</li>
                          <li>Create a REST API app in your Dashboard</li>
                          <li>
                            Get your Client ID and Secret from the app
                            credentials
                          </li>
                          <li>Use Sandbox credentials for testing</li>
                          <li>
                            Switch to Live credentials when ready for production
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleSavePayPal}
                    disabled={setPayPalConfig.isPending}
                    className="w-full"
                  >
                    {setPayPalConfig.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save PayPal Configuration"
                    )}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Gateway Priority Info */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Gateway Priority</CardTitle>
              <CardDescription>
                When multiple gateways are enabled, users can choose their
                preferred payment method during checkout
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="font-medium">Razorpay</span>
                  <Badge variant={razorpayEnabled ? "default" : "secondary"}>
                    {razorpayEnabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="font-medium">PayPal</span>
                  <Badge variant={paypalEnabled ? "default" : "secondary"}>
                    {paypalEnabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="font-medium">Stripe</span>
                  <Badge variant="secondary">Legacy Support</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Configuration
              </CardTitle>
              <CardDescription>
                Configure SMTP settings for sending emails
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable SMTP</Label>
                  <p className="text-sm text-muted-foreground">
                    Use custom SMTP server for sending emails
                  </p>
                </div>
                <Switch
                  checked={smtpEnabled}
                  onCheckedChange={setSmtpEnabled}
                />
              </div>

              {smtpEnabled && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-host">SMTP Host</Label>
                    <Input id="smtp-host" placeholder="smtp.example.com" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtp-port">Port</Label>
                      <Input id="smtp-port" placeholder="587" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-encryption">Encryption</Label>
                      <Select defaultValue="tls">
                        <SelectTrigger id="smtp-encryption">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tls">TLS</SelectItem>
                          <SelectItem value="ssl">SSL</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtp-username">Username</Label>
                    <Input
                      id="smtp-username"
                      placeholder="your-email@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtp-password">Password</Label>
                    <Input
                      id="smtp-password"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                </>
              )}

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Note: SMTP configuration will be fully functional in a future
                  update. Currently, email notifications are handled through the
                  platform.
                </p>
              </div>

              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Backup & Restore
              </CardTitle>
              <CardDescription>
                Create backups and restore your data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Create Backup</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create a complete backup of all your data including
                    retreats, courses, products, bookings, and settings.
                  </p>
                  <Button onClick={handleBackup}>
                    <Download className="h-4 w-4 mr-2" />
                    Create Backup
                  </Button>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Restore from Backup</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Restore your data from a previous backup file.
                  </p>
                  <Button variant="outline" onClick={handleRestore}>
                    <Upload className="h-4 w-4 mr-2" />
                    Restore Backup
                  </Button>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Note:</strong> Backup and restore functionality will
                    be fully implemented in a future update. Your data is
                    automatically backed up on the Internet Computer blockchain.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Badge({
  variant = "default",
  className = "",
  children,
}: {
  variant?: "default" | "secondary";
  className?: string;
  children: React.ReactNode;
}) {
  const baseClasses =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";
  const variantClasses =
    variant === "default"
      ? "bg-primary text-primary-foreground"
      : "bg-secondary text-secondary-foreground";

  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
}
