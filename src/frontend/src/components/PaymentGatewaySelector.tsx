import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";
import { SiPaypal, SiRazorpay, SiStripe } from "react-icons/si";

export type PaymentGateway = "razorpay" | "paypal" | "stripe";

interface PaymentGatewaySelectorProps {
  availableGateways: {
    razorpay: boolean;
    paypal: boolean;
    stripe: boolean;
  };
  onSelect: (gateway: PaymentGateway) => void;
  isProcessing?: boolean;
  amount: number;
  currency: string;
}

export default function PaymentGatewaySelector({
  availableGateways,
  onSelect,
  isProcessing = false,
  amount,
  currency,
}: PaymentGatewaySelectorProps) {
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway | null>(
    null,
  );

  const handleProceed = () => {
    if (selectedGateway) {
      onSelect(selectedGateway);
    }
  };

  const enabledGateways = Object.entries(availableGateways)
    .filter(([_, enabled]) => enabled)
    .map(([gateway]) => gateway as PaymentGateway);

  if (enabledGateways.length === 0) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">
            Payment Unavailable
          </CardTitle>
          <CardDescription>
            No payment gateways are currently configured. Please contact
            support.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Select Payment Method
        </CardTitle>
        <CardDescription>
          Choose your preferred payment gateway to complete the transaction
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Amount:</span>
            <span className="text-2xl font-bold text-primary">
              {currency} {amount.toLocaleString()}
            </span>
          </div>
        </div>

        <RadioGroup
          value={selectedGateway || ""}
          onValueChange={(value) => setSelectedGateway(value as PaymentGateway)}
        >
          <div className="space-y-3">
            {availableGateways.razorpay && (
              <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-primary transition-colors cursor-pointer">
                <RadioGroupItem value="razorpay" id="razorpay" />
                <Label
                  htmlFor="razorpay"
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <SiRazorpay className="h-8 w-8 text-[#0C2451]" />
                  <div className="flex-1">
                    <p className="font-medium">Razorpay</p>
                    <p className="text-xs text-muted-foreground">
                      Credit/Debit Cards, UPI, Net Banking, Wallets
                    </p>
                  </div>
                </Label>
              </div>
            )}

            {availableGateways.paypal && (
              <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-primary transition-colors cursor-pointer">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label
                  htmlFor="paypal"
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <SiPaypal className="h-8 w-8 text-[#00457C]" />
                  <div className="flex-1">
                    <p className="font-medium">PayPal</p>
                    <p className="text-xs text-muted-foreground">
                      PayPal Balance, Credit/Debit Cards
                    </p>
                  </div>
                </Label>
              </div>
            )}

            {availableGateways.stripe && (
              <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-primary transition-colors cursor-pointer">
                <RadioGroupItem value="stripe" id="stripe" />
                <Label
                  htmlFor="stripe"
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <SiStripe className="h-8 w-8 text-[#635BFF]" />
                  <div className="flex-1">
                    <p className="font-medium">Stripe</p>
                    <p className="text-xs text-muted-foreground">
                      Credit/Debit Cards (Legacy Support)
                    </p>
                  </div>
                </Label>
              </div>
            )}
          </div>
        </RadioGroup>

        <Button
          onClick={handleProceed}
          disabled={!selectedGateway || isProcessing}
          className="w-full"
          size="lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Proceed to Payment"
          )}
        </Button>

        <div className="text-xs text-center text-muted-foreground">
          <p>🔒 Your payment information is secure and encrypted</p>
        </div>
      </CardContent>
    </Card>
  );
}
