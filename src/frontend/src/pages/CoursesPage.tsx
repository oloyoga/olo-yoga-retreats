import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AlertCircle } from "lucide-react";

export default function CoursesPage() {
  const sliderImages = [
    "/assets/generated/yoga-healing-session.dim_1200x600.jpg",
    "/assets/generated/teacher-training.dim_800x600.jpg",
    "/assets/generated/residential-accommodation.dim_1200x600.jpg",
  ];

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
                    alt={`Course ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-heading animate-in fade-in slide-in-from-bottom-4 duration-700">
                      Residential Yoga & Healing Courses
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                      Residential – stay + food included
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

      {/* Courses Section */}
      <section className="py-16 bg-[oklch(0.98_0.02_85)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
              <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading mb-4">
                Our Residential Courses
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Immerse yourself in transformative yoga and healing experiences
                with accommodation and meals included.
              </p>
            </div>

            <Alert className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Course listings are currently being updated. Please contact us
                directly for information about our residential programs.
              </AlertDescription>
            </Alert>

            <Card className="bg-secondary/20 border-secondary/30 shadow-soft">
              <CardHeader>
                <CardTitle className="font-heading text-2xl text-primary">
                  Coming Soon
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 leading-relaxed mb-4">
                  We are currently updating our residential course offerings.
                  Our comprehensive programs include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80">
                  <li>200-Hour Yoga Teacher Training</li>
                  <li>Yoga Therapy Certification</li>
                  <li>Meditation & Mindfulness Retreats</li>
                  <li>Ayurveda & Wellness Programs</li>
                  <li>Advanced Asana Practice Intensives</li>
                </ul>
                <p className="text-foreground/80 leading-relaxed mt-4">
                  All courses include comfortable accommodation, nutritious
                  vegetarian meals, and expert instruction in the heart of
                  Rishikesh.
                </p>
                <p className="text-foreground/80 leading-relaxed mt-4">
                  For more information and booking, please contact us via
                  WhatsApp or email.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
