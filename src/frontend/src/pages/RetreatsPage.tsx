import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  Heart,
  Home,
  Loader2,
  MapPin,
  MessageCircle,
  Users,
  Utensils,
} from "lucide-react";
import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";
import type { RetreatPackage, RetreatWithPackages } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetAllRetreatsWithPackages } from "../hooks/useQueries";
import { useCreateCheckoutSession } from "../hooks/useQueries";

export default function RetreatsPage() {
  const { data: retreats = [], isLoading } = useGetAllRetreatsWithPackages();
  const { identity } = useInternetIdentity();
  const createCheckout = useCreateCheckoutSession();
  const [bookingId, setBookingId] = useState<string | null>(null);

  const handleBookRetreat = async (
    retreat: RetreatWithPackages,
    pkg: RetreatPackage,
  ) => {
    if (!identity) {
      toast.error("Please login to book a retreat");
      return;
    }

    setBookingId(retreat.id);
    try {
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const session = await createCheckout.mutateAsync({
        items: [
          {
            productName: `${retreat.title} - ${pkg.roomType}`,
            productDescription: `${retreat.duration} retreat in ${retreat.location}`,
            priceInCents: BigInt(Number(pkg.price) * 100),
            currency: pkg.currency.toLowerCase(),
            quantity: BigInt(1),
          },
        ],
        successUrl: `${baseUrl}/payment-success`,
        cancelUrl: `${baseUrl}/payment-failure`,
      });
      window.location.href = session.url;
    } catch (error) {
      toast.error("Failed to create checkout session");
      console.error("Checkout error:", error);
    } finally {
      setBookingId(null);
    }
  };

  const handleWhatsAppInquiry = (retreat: RetreatWithPackages) => {
    const message = encodeURIComponent(
      `Hi! I'm interested in the ${retreat.title}. Can you provide more information?`,
    );
    window.open(`https://wa.me/917055000308?text=${message}`, "_blank");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/rishikesh-landscape.dim_1200x600.jpg"
            alt="Rishikesh Landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/50" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 font-heading">
            Yoga Retreats in Rishikesh
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Immerse yourself in transformative experiences in the yoga capital
            of the world
          </p>
        </div>
      </section>

      {/* Retreats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {retreats.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No retreats available at the moment. Please check back soon!
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {retreats.map((retreat) => (
                <Card
                  key={retreat.id}
                  className="overflow-hidden border-2 hover:shadow-2xl transition-all duration-300"
                >
                  {/* Retreat Header with Image */}
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                      <img
                        src={retreat.image.getDirectURL()}
                        alt={retreat.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-8 md:p-10 bg-muted/30 flex flex-col justify-center">
                      <CardTitle className="text-3xl md:text-4xl font-heading text-primary mb-4">
                        {retreat.title}
                      </CardTitle>
                      <div className="space-y-3 text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-primary shrink-0" />
                          <span className="text-base">{retreat.location}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-primary shrink-0" />
                          <span className="text-base">{retreat.duration}</span>
                        </div>
                        {retreat.hasRecurringDates && (
                          <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-primary shrink-0" />
                            <span className="text-base">
                              Year-round availability
                            </span>
                          </div>
                        )}
                      </div>
                      {retreat.isCustomizable && (
                        <Badge variant="secondary" className="mt-4 w-fit">
                          Customizable Dates Available
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-8 md:p-10 space-y-8">
                    {/* Accordion for Retreat Details */}
                    <Accordion
                      type="multiple"
                      defaultValue={["overview", "pricing"]}
                      className="w-full"
                    >
                      {/* Overview Section */}
                      <AccordionItem value="overview">
                        <AccordionTrigger className="text-2xl font-heading text-primary hover:no-underline">
                          Overview
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pt-4 space-y-4">
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                              {retreat.overview}
                            </p>
                            {retreat.description && (
                              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                {retreat.description}
                              </p>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Who This Retreat Is For */}
                      {retreat.description && (
                        <AccordionItem value="target-audience">
                          <AccordionTrigger className="text-2xl font-heading text-primary hover:no-underline">
                            <div className="flex items-center gap-2">
                              <Users className="h-5 w-5" />
                              Who This Retreat Is For
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pt-4">
                              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                This retreat is perfect for anyone seeking
                                transformation, healing, and spiritual growth.
                                Whether you're a beginner or experienced
                                practitioner, our programs are designed to meet
                                you where you are and guide you on your journey
                                to wellness and self-discovery.
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      )}

                      {/* Daily Itinerary */}
                      <AccordionItem value="itinerary">
                        <AccordionTrigger className="text-2xl font-heading text-primary hover:no-underline">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Daily Itinerary
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pt-4">
                            <div className="prose prose-sm max-w-none">
                              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                                {retreat.itinerary}
                              </p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Accommodation & Inclusions */}
                      <AccordionItem value="inclusions">
                        <AccordionTrigger className="text-2xl font-heading text-primary hover:no-underline">
                          <div className="flex items-center gap-2">
                            <Home className="h-5 w-5" />
                            Accommodation & Inclusions
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pt-4">
                            <div className="prose prose-sm max-w-none">
                              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                                {retreat.inclusions}
                              </p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Pricing Packages */}
                      <AccordionItem value="pricing">
                        <AccordionTrigger className="text-2xl font-heading text-primary hover:no-underline">
                          Pricing & Packages
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pt-6">
                            <div className="grid md:grid-cols-3 gap-6">
                              {retreat.packages.map((pkg) => (
                                <Card
                                  key={pkg.roomType}
                                  className="relative overflow-hidden transition-all duration-300 hover:shadow-lg border-2"
                                >
                                  <CardHeader className="pb-4 bg-muted/30">
                                    <CardTitle className="text-xl font-heading capitalize text-center">
                                      {pkg.roomType}
                                    </CardTitle>
                                    {pkg.description && (
                                      <p className="text-sm text-muted-foreground text-center">
                                        {pkg.description}
                                      </p>
                                    )}
                                  </CardHeader>
                                  <CardContent className="space-y-4 pt-6">
                                    <div className="text-center py-4 bg-primary/5 rounded-lg border border-primary/20">
                                      <p className="text-sm text-muted-foreground mb-1">
                                        Price per person
                                      </p>
                                      <p className="text-3xl font-bold text-primary">
                                        {pkg.currency}{" "}
                                        {Number(pkg.price).toLocaleString()}
                                      </p>
                                    </div>
                                    <Button
                                      className="w-full"
                                      onClick={() =>
                                        handleBookRetreat(retreat, pkg)
                                      }
                                      disabled={bookingId === retreat.id}
                                    >
                                      {bookingId === retreat.id ? (
                                        <>
                                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                          Processing...
                                        </>
                                      ) : (
                                        retreat.ctaBook || "Book Now"
                                      )}
                                    </Button>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Custom Retreat Options */}
                      {retreat.isCustomizable && (
                        <AccordionItem value="custom">
                          <AccordionTrigger className="text-2xl font-heading text-primary hover:no-underline">
                            <div className="flex items-center gap-2">
                              <Heart className="h-5 w-5" />
                              Custom & Private Retreats
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pt-4">
                              <div className="bg-muted/30 rounded-lg p-6 border-2 border-dashed border-primary/30">
                                <h4 className="text-lg font-heading text-primary mb-2">
                                  Looking for a Private or Custom Retreat?
                                </h4>
                                <p className="text-muted-foreground mb-4">
                                  We can customize this retreat to your specific
                                  needs, including private sessions,
                                  personalized schedules, flexible dates, and
                                  tailored programs. Whether you're planning a
                                  solo retreat, couples experience, or group
                                  booking, we'll create the perfect experience
                                  for you.
                                </p>
                                <Button
                                  variant="outline"
                                  onClick={() => handleWhatsAppInquiry(retreat)}
                                  className="gap-2"
                                >
                                  <SiWhatsapp className="h-4 w-4" />
                                  {retreat.ctaWhatsapp || "WhatsApp Inquiry"}
                                </Button>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      )}

                      {/* Booking Information */}
                      <AccordionItem value="booking-info">
                        <AccordionTrigger className="text-2xl font-heading text-primary hover:no-underline">
                          Booking Information
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pt-4 space-y-4">
                            <div className="bg-muted/30 rounded-lg p-6">
                              <h4 className="font-heading text-primary mb-3">
                                How to Book
                              </h4>
                              <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2">
                                  <span className="text-primary mt-1">•</span>
                                  <span>
                                    Select your preferred room type and click
                                    "Book Now" to proceed with secure online
                                    payment
                                  </span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-primary mt-1">•</span>
                                  <span>
                                    For custom dates, group bookings, or special
                                    requests, contact us via WhatsApp
                                  </span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-primary mt-1">•</span>
                                  <span>
                                    Availability is subject to confirmation - we
                                    recommend booking in advance
                                  </span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-primary mt-1">•</span>
                                  <span>
                                    Full payment is required to secure your
                                    booking
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                              <h4 className="font-heading text-primary mb-3">
                                Important Notes
                              </h4>
                              <ul className="space-y-2 text-muted-foreground text-sm">
                                <li className="flex items-start gap-2">
                                  <span className="text-primary mt-1">•</span>
                                  <span>
                                    Please arrive one day before the retreat
                                    start date
                                  </span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-primary mt-1">•</span>
                                  <span>
                                    Vegetarian meals are included in all
                                    packages
                                  </span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-primary mt-1">•</span>
                                  <span>
                                    Airport pickup can be arranged at additional
                                    cost
                                  </span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-primary mt-1">•</span>
                                  <span>
                                    Cancellation policy applies - please contact
                                    us for details
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    {/* WhatsApp CTA */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t">
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() => handleWhatsAppInquiry(retreat)}
                        className="gap-2"
                      >
                        <MessageCircle className="h-5 w-5" />
                        Have Questions? Contact Us
                      </Button>
                      <Button
                        size="lg"
                        onClick={() => handleWhatsAppInquiry(retreat)}
                        className="gap-2"
                      >
                        <SiWhatsapp className="h-5 w-5" />
                        WhatsApp Inquiry
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
