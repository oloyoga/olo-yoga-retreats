import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import PaymentGatewaySelector, {
  type PaymentGateway,
} from "../components/PaymentGatewaySelector";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useCreateCheckoutSession,
  useCreatePayPalPayment,
  useCreateRazorpayPayment,
  useIsPayPalEnabled,
  useIsRazorpayEnabled,
  useIsStripeConfigured,
} from "../hooks/useQueries";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const search = useSearch({ from: "/checkout" });

  const { data: razorpayEnabled, isLoading: razorpayLoading } =
    useIsRazorpayEnabled();
  const { data: paypalEnabled, isLoading: paypalLoading } =
    useIsPayPalEnabled();
  const { data: stripeEnabled, isLoading: stripeLoading } =
    useIsStripeConfigured();

  const createStripeCheckout = useCreateCheckoutSession();
  const createRazorpayPayment = useCreateRazorpayPayment();
  const createPayPalPayment = useCreatePayPalPayment();

  const [isProcessing, setIsProcessing] = useState(false);
  const [items, setItems] = useState<string[]>([]);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("INR");
  const [itemType, setItemType] = useState("");

  useEffect(() => {
    if (!identity) {
      toast.error("Please login to proceed with checkout");
      navigate({ to: "/" });
      return;
    }

    // Parse search params
    const searchParams = search as Record<string, string | undefined>;

    if (searchParams.items) {
      try {
        setItems(JSON.parse(decodeURIComponent(searchParams.items)));
      } catch (_e) {
        setItems([searchParams.items]);
      }
    }

    if (searchParams.amount) {
      setAmount(Number.parseFloat(searchParams.amount));
    }

    if (searchParams.currency) {
      setCurrency(searchParams.currency);
    }

    if (searchParams.type) {
      setItemType(searchParams.type);
    }
  }, [identity, search, navigate]);

  const handleGatewaySelect = async (gateway: PaymentGateway) => {
    setIsProcessing(true);

    try {
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const successUrl = `${baseUrl}/payment-success`;
      const cancelUrl = `${baseUrl}/payment-failure`;

      if (gateway === "stripe") {
        const session = await createStripeCheckout.mutateAsync({
          items: items.map((item) => ({
            productName: item,
            productDescription: itemType || "Purchase",
            priceInCents: BigInt(Math.round(amount * 100)),
            currency: currency.toLowerCase(),
            quantity: BigInt(1),
          })),
          successUrl,
          cancelUrl,
        });
        window.location.href = session.url;
      } else if (gateway === "razorpay") {
        const payment = await createRazorpayPayment.mutateAsync({
          items,
          amount: Math.round(amount * 100),
          currency,
          returnUrl: successUrl,
        });
        toast.info("Razorpay payment integration coming soon");
        console.log("Razorpay payment:", payment);
      } else if (gateway === "paypal") {
        const payment = await createPayPalPayment.mutateAsync({
          items,
          amount: Math.round(amount * 100),
          returnUrl: successUrl,
        });
        toast.info("PayPal payment integration coming soon");
        console.log("PayPal payment:", payment);
      }
    } catch (error) {
      toast.error("Failed to initiate payment");
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const isLoading = razorpayLoading || paypalLoading || stripeLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto max-w-2xl space-y-6">
          <Skeleton className="h-12 w-48" />
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-64" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-2xl space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: "/" })}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div>
          <h1 className="text-3xl font-bold font-heading text-primary mb-2">
            Checkout
          </h1>
          <p className="text-muted-foreground">
            Complete your purchase securely
          </p>
        </div>

        {items.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item}
                    className="flex justify-between py-2 border-b last:border-0"
                  >
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <PaymentGatewaySelector
          availableGateways={{
            razorpay: razorpayEnabled || false,
            paypal: paypalEnabled || false,
            stripe: stripeEnabled || false,
          }}
          onSelect={handleGatewaySelect}
          isProcessing={isProcessing}
          amount={amount}
          currency={currency}
        />
      </div>
    </div>
  );
}
