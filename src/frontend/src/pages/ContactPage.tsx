import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, MapPin, Phone, Star } from "lucide-react";
import {
  SiFacebook,
  SiGooglemaps,
  SiInstagram,
  SiYoutube,
} from "react-icons/si";
import { useGetContactInfo } from "../hooks/useQueries";

export default function ContactPage() {
  const { data: contactInfo, isLoading } = useGetContactInfo();

  const sliderImages = [
    "/assets/generated/contact-hero.dim_1200x600.jpg",
    "/assets/generated/contact-meditation-space.dim_800x600.jpg",
    "/assets/generated/meditation-space.dim_1024x768.jpg",
  ];

  const defaultContactInfo = {
    address: "OLO Yoga & Retreats, Tapovan, Rishikesh, Uttarakhand, India",
    phone: "+91 7055000308",
    whatsapp: "+91 7055000308",
    email: "oloyoga.in@gmail.com",
    googleMapsLink: "https://maps.app.goo.gl/AQv88jXxtkEfFvz19?g_st=ic",
    googleBusinessLink: "https://share.google/67CL3upxKfKwNfIzD",
    socialLinks: {
      instagram:
        "https://www.instagram.com/olo_yoga?igsh=MWJ4anpmYXVnY24zaw%3D%3D&utm_source=qr",
      youtube: "https://youtube.com/@oloyoga?si=2YbqxijsUD9rPrmN",
      facebook: "https://www.facebook.com/share/15eqc2hAVFy/?mibextid=wwXIfr",
    },
  };

  const info = contactInfo || defaultContactInfo;

  return (
    <div className="w-full">
      {/* Top Media Slider */}
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <Carousel className="w-full h-full" opts={{ loop: true }}>
          <CarouselContent>
            {sliderImages.map((image, index) => (
              <CarouselItem key={image}>
                <div className="relative w-full h-[400px] md:h-[500px]">
                  <img
                    src={image}
                    alt={`Contact ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-heading animate-in fade-in slide-in-from-bottom-4 duration-700">
                      Get in Touch
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                      We'd love to hear from you. Reach out with any questions
                      or inquiries.
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-[oklch(0.98_0.02_85)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
              <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading mb-4">
                Contact Information
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Visit us in the heart of Rishikesh or reach out through any of
                the channels below.
              </p>
            </div>

            {isLoading ? (
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="bg-secondary/20 border-secondary/30">
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {/* Address Card */}
                <Card className="bg-secondary/20 border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-heading text-xl text-primary">
                      Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80 leading-relaxed">
                      {info.address}
                    </p>
                  </CardContent>
                </Card>

                {/* Phone/WhatsApp Card */}
                <Card className="bg-secondary/20 border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom delay-150">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-heading text-xl text-primary">
                      Phone / WhatsApp
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={`tel:${info.phone}`}
                      className="text-foreground/80 hover:text-primary transition-colors block mb-2"
                    >
                      {info.phone}
                    </a>
                    <a
                      href={`https://wa.me/${info.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20OLO%20Yoga!%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      Message on WhatsApp →
                    </a>
                  </CardContent>
                </Card>

                {/* Email Card */}
                <Card className="bg-secondary/20 border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom delay-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-heading text-xl text-primary">
                      Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={`mailto:${info.email}`}
                      className="text-foreground/80 hover:text-primary transition-colors"
                    >
                      {info.email}
                    </a>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Google Business Profile & Review Button */}
            <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom delay-450">
              <Button
                size="lg"
                onClick={() => window.open(info.googleBusinessLink, "_blank")}
                className="font-heading text-lg px-8 py-6 rounded-full shadow-soft transition-all hover:scale-105"
              >
                <Star className="mr-2 h-5 w-5 fill-current" />
                View Our Google Reviews
              </Button>
            </div>

            {/* Social Media Links */}
            <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom delay-600">
              <h3 className="text-2xl font-bold text-primary font-heading mb-6">
                Follow Our Journey
              </h3>
              <div className="flex justify-center gap-6">
                <a
                  href={info.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <SiInstagram className="h-6 w-6" />
                </a>
                <a
                  href={info.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  aria-label="YouTube"
                >
                  <SiYoutube className="h-6 w-6" />
                </a>
                <a
                  href={info.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <SiFacebook className="h-6 w-6" />
                </a>
                <a
                  href={info.googleBusinessLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  aria-label="Google Business"
                >
                  <Star className="h-6 w-6" />
                </a>
                <a
                  href={info.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  aria-label="Google Maps"
                >
                  <SiGooglemaps className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom duration-700">
              <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading mb-4">
                Find Us
              </h2>
              <p className="text-lg text-muted-foreground">
                Located in the serene Tapovan area of Rishikesh
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-soft animate-in fade-in zoom-in duration-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3462.5!2d78.3!3d30.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDA2JzAwLjAiTiA3OMKwMTgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="OLO Yoga & Retreats Location"
              />
            </div>

            <div className="text-center mt-6">
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open(info.googleMapsLink, "_blank")}
                className="font-heading rounded-full"
              >
                <SiGooglemaps className="mr-2 h-5 w-5" />
                Open in Google Maps
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
