import { Badge } from "@/components/ui/badge";
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
import { Calendar, Gift, Play, Video } from "lucide-react";
import { useGetVideoCourses } from "../hooks/useQueries";

export default function VideoCoursesPage() {
  const navigate = useNavigate();
  const { data: videoCourses, isLoading } = useGetVideoCourses();

  const sliderImages = [
    "/assets/generated/meditation-space.dim_1024x768.jpg",
    "/assets/generated/yoga-healing-session.dim_1200x600.jpg",
    "/assets/generated/meditation-breathwork-class.dim_1200x600.jpg",
  ];

  // Placeholder online classes data
  const onlineClasses = [
    {
      id: "monthly-morning",
      title: "Monthly Morning Yoga",
      description:
        "Start your day with energizing yoga sessions. Join our live morning classes every weekday at 7:00 AM IST. Perfect for building a consistent practice and connecting with our global community.",
      schedule: "Monday - Friday, 7:00 AM IST",
      isFree: false,
      zoomLink: null, // Admin configurable
    },
    {
      id: "yoga-therapy",
      title: "Online Yoga Therapy",
      description:
        "Personalized therapeutic yoga sessions designed to address specific health concerns. Work one-on-one with our experienced therapists to create a healing practice tailored to your needs.",
      schedule: "By Appointment",
      isFree: false,
      zoomLink: null, // Admin configurable
    },
    {
      id: "free-monday",
      title: "Free Online Class Every Monday",
      description:
        "Experience the OLO Yoga difference with our complimentary Monday evening class. Open to all levels, this is a wonderful opportunity to try our teaching style and connect with our community.",
      schedule: "Every Monday, 6:00 PM IST",
      isFree: true,
      zoomLink: null, // Admin configurable
    },
  ];

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
                    alt={`Online Yoga ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 font-heading animate-in fade-in slide-in-from-bottom-4 duration-700">
                      Online Yoga Classes
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                      Practice with us from anywhere in the world through live
                      online sessions
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

      {/* Online Course Listings */}
      <section className="py-20 px-4 bg-[oklch(0.98_0.02_85)]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-primary font-heading mb-4">
              Live Online Classes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our interactive online yoga sessions from the comfort of your
              home
            </p>
          </div>

          <div className="space-y-8">
            {onlineClasses.map((course, index) => (
              <Card
                key={course.id}
                className={`overflow-hidden bg-white border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom ${
                  course.isFree ? "border-accent/50 border-2" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="grid md:grid-cols-[1fr_auto] gap-6 p-8">
                  {/* Course Details */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CardTitle className="text-3xl font-heading text-primary">
                        {course.title}
                      </CardTitle>
                      {course.isFree && (
                        <Badge className="bg-accent text-accent-foreground shrink-0">
                          <Gift className="h-3 w-3 mr-1" />
                          FREE
                        </Badge>
                      )}
                    </div>

                    <CardDescription className="text-base leading-relaxed text-foreground/80">
                      {course.description}
                    </CardDescription>

                    <div className="flex items-center gap-2 text-primary font-medium pt-2">
                      <Calendar className="h-5 w-5" />
                      <span className="text-base">{course.schedule}</span>
                    </div>

                    {/* Placeholder for Zoom/Google Meet link */}
                    {course.zoomLink ? (
                      <div className="flex items-center gap-2 text-muted-foreground pt-2">
                        <Video className="h-5 w-5" />
                        <span className="text-sm">
                          Meeting link will be provided upon enrollment
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-muted-foreground pt-2">
                        <Video className="h-5 w-5" />
                        <span className="text-sm">
                          Meeting link will be provided upon enrollment
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="flex flex-col items-end justify-center gap-4 md:min-w-[200px]">
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
        </div>
      </section>

      {/* Recorded Video Courses Section */}
      {videoCourses && videoCourses.length > 0 && (
        <section className="py-20 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-primary font-heading mb-4">
                Recorded Video Courses
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Learn at your own pace with our comprehensive on-demand video
                courses
              </p>
            </div>

            {isLoading ? (
              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {videoCourses.map((course, index) => (
                  <Card
                    key={course.id}
                    className="overflow-hidden bg-white border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300 group animate-in fade-in slide-in-from-bottom"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={course.image.getDirectURL()}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="h-16 w-16 text-white" />
                      </div>
                      <Badge className="absolute top-3 right-3 bg-white/90 text-primary">
                        <Video className="h-3 w-3 mr-1" />
                        {course.videoFiles.length} videos
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="font-heading text-xl text-primary">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Course Price
                          </p>
                          <p className="text-2xl font-bold text-accent font-heading">
                            {course.currency} {Number(course.price)}
                          </p>
                        </div>
                        <Button
                          onClick={() => navigate({ to: "/contact" })}
                          className="rounded-full font-heading"
                        >
                          Purchase
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-[oklch(0.98_0.02_85)]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary font-heading mb-4">
              Why Practice Online With Us?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience authentic yoga from anywhere in the world
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6 rounded-2xl bg-white border border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                <Video className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-primary font-heading">
                Live Interactive Sessions
              </h3>
              <p className="text-muted-foreground">
                Real-time guidance and personalized corrections from experienced
                instructors
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl bg-white border border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-primary font-heading">
                Flexible Scheduling
              </h3>
              <p className="text-muted-foreground">
                Multiple time slots to accommodate different time zones and
                schedules
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl bg-white border border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                <Gift className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-primary font-heading">
                Try Before You Commit
              </h3>
              <p className="text-muted-foreground">
                Join our free Monday class to experience our teaching style and
                community
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
