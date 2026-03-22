import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import { Calendar, Clock, User } from "lucide-react";
import { useGetDropInClasses } from "../hooks/useQueries";

export default function DropInClassesPage() {
  const navigate = useNavigate();
  const { data: classes, isLoading } = useGetDropInClasses();

  const sliderImages = [
    "/assets/generated/group-yoga-class.dim_1024x768.jpg",
    "/assets/generated/yoga-instructor-demo.dim_600x800.jpg",
    "/assets/generated/meditation-breathwork-class.dim_1200x600.jpg",
  ];

  const formatTime = (timestamp: bigint) => {
    return new Date(Number(timestamp)).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const _formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp)).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full">
      {/* Top Media Slider */}
      <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        <Carousel className="w-full h-full" opts={{ loop: true }}>
          <CarouselContent>
            {sliderImages.map((image, index) => (
              <CarouselItem key={image}>
                <div className="relative w-full h-[500px] md:h-[600px]">
                  <img
                    src={image}
                    alt={`Yoga Class ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 font-heading animate-in fade-in slide-in-from-bottom-4 duration-700">
                      Drop-In Yoga Classes
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                      Join us for daily yoga sessions - all levels welcome, no
                      commitment required
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

      {/* Class Schedule Section */}
      <section className="py-20 px-4 bg-[oklch(0.98_0.02_85)]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-primary font-heading mb-4">
              Class Schedule
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our variety of yoga styles and experience levels
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                </Card>
              ))}
            </div>
          ) : classes && classes.length > 0 ? (
            <div className="space-y-6">
              {classes.map((classItem, index) => (
                <Card
                  key={classItem.id}
                  className="overflow-hidden bg-white border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="grid md:grid-cols-[1fr_auto] gap-6 p-8">
                    {/* Class Details */}
                    <div className="space-y-4">
                      <div>
                        <CardTitle className="text-3xl font-heading text-primary mb-2">
                          {classItem.name}
                        </CardTitle>
                        <CardDescription className="text-base text-muted-foreground">
                          {classItem.level} Level
                        </CardDescription>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4 pt-2">
                        <div className="flex items-center gap-2 text-foreground/80">
                          <User className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Instructor
                            </p>
                            <p className="font-medium">
                              {classItem.instructor}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-foreground/80">
                          <Clock className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Duration
                            </p>
                            <p className="font-medium">
                              {Number(classItem.durationMinutes)} minutes
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-foreground/80">
                          <Calendar className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Time
                            </p>
                            <p className="font-medium">
                              {formatTime(classItem.time)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex flex-col items-end justify-between gap-4 md:min-w-[200px]">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground mb-1">
                          Per Class
                        </p>
                        <p className="text-3xl font-bold text-accent font-heading">
                          {classItem.currency} {Number(classItem.price)}
                        </p>
                      </div>

                      <Button
                        size="lg"
                        onClick={() => navigate({ to: "/contact" })}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading text-base px-8 py-6 rounded-full shadow-soft transition-all hover:scale-105 w-full md:w-auto"
                      >
                        Enrol Now
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                No classes scheduled at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Drop-In Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary font-heading mb-4">
              Why Choose Drop-In Classes?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Flexible yoga practice that fits your schedule
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6 rounded-2xl bg-secondary/20 border border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-primary font-heading">
                No Commitment
              </h3>
              <p className="text-muted-foreground">
                Pay per class with no membership required - perfect for
                travelers and flexible schedules
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl bg-secondary/20 border border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                <User className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-primary font-heading">
                All Levels Welcome
              </h3>
              <p className="text-muted-foreground">
                From beginners to advanced practitioners, our classes
                accommodate all experience levels
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl bg-secondary/20 border border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-primary font-heading">
                Daily Sessions
              </h3>
              <p className="text-muted-foreground">
                Multiple classes throughout the day to fit your schedule and
                preferred yoga style
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
