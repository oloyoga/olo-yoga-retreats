import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {
  Globe,
  Heart,
  MessageCircle,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { SiInstagram } from "react-icons/si";
import {
  useGetFeaturedRetreats,
  useGetTestimonials,
} from "../hooks/useQueries";

export default function HomePage() {
  const navigate = useNavigate();
  const { data: featuredRetreats, isLoading: retreatsLoading } =
    useGetFeaturedRetreats();
  const { data: testimonials, isLoading: testimonialsLoading } =
    useGetTestimonials();

  const handleWhatsApp = () => {
    window.open("https://wa.me/", "_blank");
  };

  const heroImages = [
    "/assets/generated/hero-yoga-rishikesh.dim_1920x1080.jpg",
    "/assets/generated/rishikesh-landscape.dim_1200x600.jpg",
    "/assets/generated/meditation-space.dim_1024x768.jpg",
  ];

  const brandValues = [
    {
      icon: Sparkles,
      title: "Tranquility",
      description:
        "Find peace in our serene spaces designed for deep relaxation and meditation.",
    },
    {
      icon: Users,
      title: "Authentic Teachers",
      description:
        "Learn from experienced yogis with decades of practice and teaching expertise.",
    },
    {
      icon: Heart,
      title: "Sacred Spaces",
      description:
        "Practice in beautiful, energy-rich environments in the yoga capital of the world.",
    },
    {
      icon: Globe,
      title: "Global Trust",
      description:
        "Join thousands of students from around the world who have transformed with us.",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Slider Section */}
      <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
        <Carousel className="w-full h-full" opts={{ loop: true }}>
          <CarouselContent>
            {heroImages.map((image, index) => (
              <CarouselItem key={image}>
                <div className="relative w-full h-[600px] md:h-[700px]">
                  <img
                    src={image}
                    alt={`Hero ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-heading animate-in fade-in slide-in-from-bottom-4 duration-700">
                      Transform. Heal. Awaken.
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 mb-8 font-heading animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                      OLO Yoga & Retreats
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                      <Button
                        size="lg"
                        onClick={() => navigate({ to: "/retreats" })}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading text-lg px-8 py-6 rounded-full shadow-lg transition-all hover:scale-105"
                      >
                        Book a Retreat
                      </Button>
                      <Button
                        size="lg"
                        onClick={() => navigate({ to: "/contact" })}
                        variant="secondary"
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading text-lg px-8 py-6 rounded-full shadow-lg transition-all hover:scale-105"
                      >
                        Customize Your Retreat
                      </Button>
                      <Button
                        size="lg"
                        onClick={handleWhatsApp}
                        variant="outline"
                        className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-heading text-lg px-8 py-6 rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-105"
                      >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        WhatsApp Us
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* About OLO Yoga Section */}
      <section className="py-20 px-4 bg-[oklch(0.98_0.02_85)]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
              <h2 className="text-4xl md:text-5xl font-bold text-primary font-heading">
                Welcome to OLO Yoga
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Nestled in the spiritual heart of Rishikesh, India, OLO Yoga &
                Retreats offers transformative experiences that blend ancient
                wisdom with modern wellness practices. Our mission is to guide
                you on a journey of self-discovery, healing, and awakening.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Whether you're seeking a peaceful retreat, comprehensive teacher
                training, or daily drop-in classes, we provide authentic yoga
                experiences in one of the world's most sacred locations.
              </p>
              <Button
                size="lg"
                onClick={() => navigate({ to: "/about" })}
                className="font-heading text-lg px-8 py-6 rounded-full shadow-soft transition-all hover:scale-105"
              >
                Learn More About Us
              </Button>
            </div>
            <div className="animate-in fade-in slide-in-from-right duration-700">
              <img
                src="/assets/generated/group-yoga-class.dim_1024x768.jpg"
                alt="Group Yoga Class"
                className="w-full h-auto rounded-2xl shadow-soft"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Retreats Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-primary font-heading mb-4">
              Featured Retreats
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular yoga retreats designed to rejuvenate
              your mind, body, and spirit.
            </p>
          </div>

          {retreatsLoading ? (
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
              {featuredRetreats?.map((retreat, index) => (
                <Card
                  key={retreat.id}
                  className="overflow-hidden bg-secondary/20 border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={retreat.image.getDirectURL()}
                      alt={retreat.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="font-heading text-xl text-primary">
                      {retreat.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {retreat.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-accent font-heading">
                      {retreat.currency} {retreat.price}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(Number(retreat.startDate)).toLocaleDateString()}{" "}
                      - {new Date(Number(retreat.endDate)).toLocaleDateString()}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => navigate({ to: "/retreats" })}
                      className="w-full rounded-full font-heading"
                    >
                      Book Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {!retreatsLoading &&
            (!featuredRetreats || featuredRetreats.length === 0) && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No featured retreats available at the moment. Check back soon!
                </p>
              </div>
            )}
        </div>
      </section>

      {/* Courses & Drop-In Classes Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/assets/generated/teacher-training.dim_800x600.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-white space-y-6 animate-in fade-in slide-in-from-left duration-700">
              <h2 className="text-4xl md:text-5xl font-bold font-heading">
                Residential Yoga Courses
              </h2>
              <p className="text-lg text-white/90 leading-relaxed">
                Deepen your practice with our comprehensive residential teacher
                training programs. Immerse yourself in yogic philosophy, asana
                practice, and teaching methodology.
              </p>
              <Button
                size="lg"
                onClick={() => navigate({ to: "/courses" })}
                variant="secondary"
                className="font-heading text-lg px-8 py-6 rounded-full shadow-lg transition-all hover:scale-105"
              >
                Explore Courses
              </Button>
            </div>
            <div className="text-white space-y-6 animate-in fade-in slide-in-from-right duration-700">
              <h2 className="text-4xl md:text-5xl font-bold font-heading">
                Drop-In Classes
              </h2>
              <p className="text-lg text-white/90 leading-relaxed">
                Join our daily yoga classes suitable for all levels. Experience
                authentic Hatha, Vinyasa, and Ashtanga yoga taught by
                experienced instructors.
              </p>
              <Button
                size="lg"
                onClick={() => navigate({ to: "/drop-in-classes" })}
                variant="secondary"
                className="font-heading text-lg px-8 py-6 rounded-full shadow-lg transition-all hover:scale-105"
              >
                Enroll Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose OLO Yoga Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-primary font-heading mb-4">
              Why Choose OLO Yoga
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the difference that authentic yoga practice makes in
              your life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {brandValues.map((value, index) => (
              <div
                key={value.title}
                className="text-center space-y-4 p-6 rounded-2xl bg-secondary/20 border border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-primary font-heading">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-[oklch(0.98_0.02_85)]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-primary font-heading mb-4">
              What Our Students Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from those who have experienced transformation through our
              programs.
            </p>
          </div>

          {testimonialsLoading ? (
            <div className="max-w-4xl mx-auto">
              <Card className="bg-secondary/20 border-secondary/30">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            </div>
          ) : testimonials && testimonials.length > 0 ? (
            <Carousel className="max-w-4xl mx-auto" opts={{ loop: true }}>
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id}>
                    <Card className="bg-secondary/20 border-secondary/30 shadow-soft">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="font-heading text-xl text-primary">
                            {testimonial.author}
                          </CardTitle>
                          <div className="flex items-center gap-1">
                            {Array.from(
                              { length: Number(testimonial.rating) },
                              (_, i) => i + 1,
                            ).map((starNum) => (
                              <Star
                                key={starNum}
                                className="w-5 h-5 fill-accent text-accent"
                              />
                            ))}
                          </div>
                        </div>
                        <CardDescription>
                          {new Date(
                            Number(testimonial.date),
                          ).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg text-foreground/80 italic leading-relaxed">
                          "{testimonial.message}"
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No testimonials available yet. Be the first to share your
                experience!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-primary font-heading mb-4">
              Follow Our Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay connected with our community on Instagram for daily
              inspiration.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              "/assets/generated/yoga-products-collection.dim_800x800.jpg",
              "/assets/generated/wellness-products.dim_800x600.jpg",
              "/assets/generated/yoga-instructor-demo.dim_600x800.jpg",
              "/assets/generated/retreat-accommodation.dim_800x600.jpg",
            ].map((image, index) => (
              <div
                key={image}
                className="aspect-square overflow-hidden rounded-lg shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in fade-in zoom-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={image}
                  alt={`Instagram post ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={() => window.open("https://instagram.com", "_blank")}
              className="font-heading text-lg px-8 py-6 rounded-full shadow-soft transition-all hover:scale-105"
            >
              <SiInstagram className="mr-2 h-5 w-5" />
              Follow on Instagram
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
