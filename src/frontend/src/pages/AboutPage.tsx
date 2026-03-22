import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Award, Heart, Leaf, MapPin, Sun, Users } from "lucide-react";

export default function AboutPage() {
  const sliderImages = [
    "/assets/generated/rishikesh-landscape.dim_1200x600.jpg",
    "/assets/generated/meditation-space.dim_1024x768.jpg",
    "/assets/generated/retreat-accommodation.dim_800x600.jpg",
  ];

  const teachers = [
    {
      name: "Swami Ananda",
      title: "Founder & Lead Teacher",
      specialization: "Hatha Yoga & Meditation",
      image: "/assets/generated/yoga-instructor-demo.dim_600x800.jpg",
      bio: "With over 20 years of teaching experience, Swami Ananda brings authentic yogic wisdom to students worldwide.",
    },
    {
      name: "Priya Sharma",
      title: "Senior Instructor",
      specialization: "Vinyasa Flow & Pranayama",
      image: "/assets/generated/yoga-instructor-demo.dim_600x800.jpg",
      bio: "Priya combines traditional techniques with modern understanding to create transformative experiences.",
    },
    {
      name: "Ravi Kumar",
      title: "Yoga Therapist",
      specialization: "Therapeutic Yoga & Ayurveda",
      image: "/assets/generated/yoga-instructor-demo.dim_600x800.jpg",
      bio: "Ravi specializes in healing practices that address physical and emotional well-being.",
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
                    alt={`OLO Yoga ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 font-heading animate-in fade-in slide-in-from-bottom-4 duration-700">
                      About OLO Yoga & Retreats
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                      A sanctuary for transformation, healing, and spiritual
                      growth in the heart of Rishikesh
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

      {/* OLO Yoga Story Section */}
      <section className="py-20 px-4 bg-[oklch(0.98_0.02_85)]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
              <h2 className="text-4xl md:text-5xl font-bold text-primary font-heading">
                Our Story
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Founded in the spiritual capital of the world, OLO Yoga &
                Retreats was born from a vision to create a space where ancient
                yogic wisdom meets modern wellness practices. Nestled in the
                serene Himalayan foothills of Rishikesh, we offer authentic yoga
                experiences that honor tradition while embracing contemporary
                needs.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                For over a decade, we have welcomed students from across the
                globe, creating a vibrant community of seekers, healers, and
                practitioners. Our name "OLO" represents wholeness and unity -
                the integration of body, mind, and spirit that yoga brings to
                our lives.
              </p>
            </div>
            <div className="animate-in fade-in slide-in-from-right duration-700">
              <img
                src="/assets/generated/group-yoga-class.dim_1024x768.jpg"
                alt="OLO Yoga Community"
                className="w-full h-auto rounded-2xl shadow-soft"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 animate-in fade-in slide-in-from-left duration-700">
              <img
                src="/assets/generated/rishikesh-landscape.dim_1200x600.jpg"
                alt="Rishikesh Landscape"
                className="w-full h-auto rounded-2xl shadow-soft"
              />
            </div>
            <div className="order-1 md:order-2 space-y-6 animate-in fade-in slide-in-from-right duration-700">
              <h2 className="text-4xl md:text-5xl font-bold text-primary font-heading">
                Our Vision
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                We envision a world where yoga is accessible to all, where
                people from every background can experience the transformative
                power of this ancient practice. Our mission is to preserve and
                share authentic yogic teachings while adapting them to meet the
                needs of modern practitioners.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Through our retreats, courses, and classes, we aim to create
                lasting positive change in the lives of our students, empowering
                them to become ambassadors of peace, health, and consciousness
                in their own communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-4 bg-[oklch(0.98_0.02_85)]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-primary font-heading mb-4">
              Our Philosophy
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              className="text-center space-y-4 p-6 rounded-2xl bg-white border border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom"
              style={{ animationDelay: "0ms" }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-primary font-heading">
                Authenticity
              </h3>
              <p className="text-muted-foreground">
                Honoring traditional yoga practices while making them accessible
                to all
              </p>
            </div>

            <div
              className="text-center space-y-4 p-6 rounded-2xl bg-white border border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom"
              style={{ animationDelay: "100ms" }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-primary font-heading">
                Sustainability
              </h3>
              <p className="text-muted-foreground">
                Living in harmony with nature and supporting local communities
              </p>
            </div>

            <div
              className="text-center space-y-4 p-6 rounded-2xl bg-white border border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom"
              style={{ animationDelay: "200ms" }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                <Sun className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-primary font-heading">
                Transformation
              </h3>
              <p className="text-muted-foreground">
                Creating space for personal growth and spiritual awakening
              </p>
            </div>

            <div
              className="text-center space-y-4 p-6 rounded-2xl bg-white border border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom"
              style={{ animationDelay: "300ms" }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-primary font-heading">
                Community
              </h3>
              <p className="text-muted-foreground">
                Building a global family of conscious, compassionate individuals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Teacher Profiles Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-primary font-heading mb-4">
              Meet Our Teachers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn from experienced yogis with decades of practice and teaching
              expertise
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teachers.map((teacher, index) => (
              <Card
                key={teacher.name}
                className="overflow-hidden bg-white border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6 space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-primary font-heading">
                      {teacher.name}
                    </h3>
                    <p className="text-accent font-medium">{teacher.title}</p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Award className="h-4 w-4" />
                    <span className="text-sm">{teacher.specialization}</span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {teacher.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Retreat Approach Section */}
      <section className="py-20 px-4 bg-[oklch(0.98_0.02_85)]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-primary font-heading mb-4">
              Our Retreat Approach
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A holistic methodology designed for deep transformation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                  <Sun className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-primary font-heading">
                  Holistic Integration
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  We combine asana practice with pranayama, meditation,
                  philosophy, and Ayurvedic principles to create a comprehensive
                  healing experience that addresses body, mind, and spirit.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-primary font-heading">
                  Small Group Settings
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  We maintain intimate class sizes to ensure personalized
                  attention and create a supportive community atmosphere where
                  deep connections and learning can flourish.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-primary font-heading">
                  Sacred Location
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  Our center in Rishikesh provides the perfect environment for
                  spiritual practice, surrounded by the Himalayas and the sacred
                  Ganges River, amplifying the transformative power of your
                  experience.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-secondary/30 shadow-soft hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-primary font-heading">
                  Personalized Care
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  Each student receives individual attention and guidance
                  tailored to their unique needs, goals, and level of
                  experience, ensuring a safe and effective practice.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Rishikesh Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-primary font-heading mb-4">
              Why Rishikesh?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The yoga capital of the world
            </p>
          </div>

          <div className="space-y-8">
            <div className="aspect-[21/9] overflow-hidden rounded-2xl shadow-soft">
              <img
                src="/assets/generated/rishikesh-landscape.dim_1200x600.jpg"
                alt="Rishikesh Landscape"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="max-w-4xl mx-auto space-y-6 text-center">
              <p className="text-lg text-foreground/80 leading-relaxed">
                Known as the "Yoga Capital of the World," Rishikesh is a sacred
                city where the Ganges River flows from the Himalayas. For
                centuries, yogis and spiritual seekers have been drawn to this
                powerful energy vortex.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                The pristine natural beauty, ancient temples, and vibrant
                spiritual community make it the perfect setting for deep
                transformation and authentic yoga practice. Here, surrounded by
                the majestic Himalayas and the sacred river, you can truly
                disconnect from the modern world and reconnect with your inner
                self.
              </p>
              <Button
                size="lg"
                onClick={() => {
                  window.location.href = "/contact";
                }}
                className="font-heading text-lg px-8 py-6 rounded-full shadow-soft transition-all hover:scale-105 mt-6"
              >
                Visit Us in Rishikesh
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
