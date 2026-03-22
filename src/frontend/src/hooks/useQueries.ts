import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Booking,
  ContactInfo,
  Content,
  DropInClass,
  PayPalConfig,
  PayPalPaymentResponse,
  PayPalVerificationResponse,
  Product,
  RazorpayConfig,
  RazorpayPaymentRequest,
  RazorpayVerificationResponse,
  ResidentialCourse,
  Retreat,
  RetreatPackage,
  RetreatWithPackages,
  ShoppingItem,
  StripeConfiguration,
  Testimonial,
  UserProfile,
  VideoCourse,
} from "../backend";
import { useActor } from "./useActor";

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

// Featured Retreats (Home Page)
export function useGetFeaturedRetreats() {
  const { actor, isFetching } = useActor();

  return useQuery<Retreat[]>({
    queryKey: ["featuredRetreats"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHomePageFeaturedRetreats();
    },
    enabled: !!actor && !isFetching,
  });
}

// Testimonials
export function useGetTestimonials() {
  const { actor, isFetching } = useActor();

  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (testimonial: Testimonial) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addTestimonial(testimonial);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
}

export function useUpdateTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (testimonial: Testimonial) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateTestimonial(testimonial);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
}

export function useDeleteTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteTestimonial(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
}

// Retreats (Old Type - kept for backward compatibility)
export function useGetRetreats() {
  const { actor, isFetching } = useActor();

  return useQuery<Retreat[]>({
    queryKey: ["retreats"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRetreats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddRetreat() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (retreat: Retreat) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addRetreat(retreat);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["retreats"] });
      queryClient.invalidateQueries({ queryKey: ["featuredRetreats"] });
    },
  });
}

export function useUpdateRetreat() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (retreat: Retreat) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateRetreat(retreat);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["retreats"] });
      queryClient.invalidateQueries({ queryKey: ["featuredRetreats"] });
    },
  });
}

export function useDeleteRetreat() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (retreatId: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteRetreat(retreatId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["retreats"] });
      queryClient.invalidateQueries({ queryKey: ["featuredRetreats"] });
    },
  });
}

// Retreats with Packages (New Type)
export function useGetAllRetreatsWithPackages() {
  const { actor, isFetching } = useActor();

  return useQuery<RetreatWithPackages[]>({
    queryKey: ["retreatsWithPackages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRetreatsWithPackages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetRetreatWithPackages() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.getRetreatWithPackages(id);
    },
  });
}

export function useAddRetreatWithPackages() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (retreat: RetreatWithPackages) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addRetreatWithPackages(retreat);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["retreatsWithPackages"] });
    },
  });
}

export function useUpdateRetreatWithPackages() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (retreat: RetreatWithPackages) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateRetreatWithPackages(retreat);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["retreatsWithPackages"] });
    },
  });
}

export function useDeleteRetreatWithPackages() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (retreatId: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteRetreatWithPackages(retreatId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["retreatsWithPackages"] });
    },
  });
}

// Residential Courses
export function useGetResidentialCourses() {
  const { actor, isFetching } = useActor();

  return useQuery<ResidentialCourse[]>({
    queryKey: ["residentialCourses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getResidentialCourses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddResidentialCourse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (course: ResidentialCourse) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addResidentialCourse(course);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["residentialCourses"] });
    },
  });
}

export function useUpdateResidentialCourse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (course: ResidentialCourse) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateResidentialCourse(course);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["residentialCourses"] });
    },
  });
}

export function useDeleteResidentialCourse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseId: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteResidentialCourse(courseId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["residentialCourses"] });
    },
  });
}

// Video Courses
export function useGetVideoCourses() {
  const { actor, isFetching } = useActor();

  return useQuery<VideoCourse[]>({
    queryKey: ["videoCourses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVideoCourses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddVideoCourse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (videoCourse: VideoCourse) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addVideoCourse(videoCourse);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videoCourses"] });
    },
  });
}

export function useUpdateVideoCourse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (videoCourse: VideoCourse) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateVideoCourse(videoCourse);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videoCourses"] });
    },
  });
}

export function useDeleteVideoCourse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (videoCourseId: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteVideoCourse(videoCourseId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videoCourses"] });
    },
  });
}

// Drop-in Classes
export function useGetDropInClasses() {
  const { actor, isFetching } = useActor();

  return useQuery<DropInClass[]>({
    queryKey: ["dropInClasses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDropInClasses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddDropInClass() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dropInClass: DropInClass) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addDropInClass(dropInClass);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dropInClasses"] });
    },
  });
}

export function useUpdateDropInClass() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dropInClass: DropInClass) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateDropInClass(dropInClass);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dropInClasses"] });
    },
  });
}

export function useDeleteDropInClass() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dropInClassId: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteDropInClass(dropInClassId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dropInClasses"] });
    },
  });
}

// Products
export function useGetProducts() {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: Product) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addProduct(product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: Product) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateProduct(product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteProduct(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

// Content Management
export function useGetContentByPage(page: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Content[]>({
    queryKey: ["content", page],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getContentByPage(page);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: Content) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addContent(content);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["content", variables.page] });
    },
  });
}

export function useUpdateContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: Content) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateContent(content);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["content", variables.page] });
    },
  });
}

export function useDeleteContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contentId: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteContent(contentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
    },
  });
}

// Bookings
export function useGetAllBookings() {
  const { actor, isFetching } = useActor();

  return useQuery<Booking[]>({
    queryKey: ["allBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateBookingStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookingId,
      status,
    }: { bookingId: string; status: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateBookingStatus(bookingId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBookings"] });
    },
  });
}

export function useBookRetreat() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (booking: Booking) => {
      if (!actor) throw new Error("Actor not available");
      return actor.bookRetreat(booking);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

// Contact Info
export function useGetContactInfo() {
  const { actor, isFetching } = useActor();

  return useQuery<ContactInfo | null>({
    queryKey: ["contactInfo"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getContactInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateContactInfo() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (info: ContactInfo) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateContactInfo(info);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contactInfo"] });
    },
  });
}

// Stripe
export function useIsStripeConfigured() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ["isStripeConfigured"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isStripeConfigured();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetStripeConfiguration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: StripeConfiguration) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setStripeConfiguration(config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isStripeConfigured"] });
    },
  });
}

export function useCreateCheckoutSession() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      items,
      successUrl,
      cancelUrl,
    }: { items: ShoppingItem[]; successUrl: string; cancelUrl: string }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.createCheckoutSession(
        items,
        successUrl,
        cancelUrl,
      );
      return JSON.parse(result) as { id: string; url: string };
    },
  });
}

// Razorpay
export function useIsRazorpayEnabled() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ["isRazorpayEnabled"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isRazorpayEnabled();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetRazorpayConfig() {
  const { actor, isFetching } = useActor();

  return useQuery<RazorpayConfig | null>({
    queryKey: ["razorpayConfig"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getRazorpayConfig();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetRazorpayConfig() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: {
      apiKey: string;
      apiSecret: string;
      callbackUrl: string;
      enabled: boolean;
      testMode: boolean;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setRazorpayConfig(
        config.apiKey,
        config.apiSecret,
        config.callbackUrl,
        config.enabled,
        config.testMode,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["razorpayConfig"] });
      queryClient.invalidateQueries({ queryKey: ["isRazorpayEnabled"] });
    },
  });
}

export function useCreateRazorpayPayment() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      items,
      amount,
      currency,
      returnUrl,
    }: {
      items: string[];
      amount: number;
      currency: string;
      returnUrl: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createRazorpayPaymentRequest(
        items,
        BigInt(amount),
        currency,
        returnUrl,
      );
    },
  });
}

export function useVerifyRazorpayPayment() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      paymentId,
      signature,
    }: { paymentId: string; signature: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.verifyRazorpayPayment(paymentId, signature);
    },
  });
}

// PayPal
export function useIsPayPalEnabled() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ["isPayPalEnabled"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isPayPalEnabled();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPayPalConfig() {
  const { actor, isFetching } = useActor();

  return useQuery<PayPalConfig | null>({
    queryKey: ["paypalConfig"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPayPalConfig();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetPayPalConfig() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: {
      clientId: string;
      clientSecret: string;
      callbackUrl: string;
      enabled: boolean;
      testMode: boolean;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setPayPalConfig(
        config.clientId,
        config.clientSecret,
        config.callbackUrl,
        config.enabled,
        config.testMode,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paypalConfig"] });
      queryClient.invalidateQueries({ queryKey: ["isPayPalEnabled"] });
    },
  });
}

export function useCreatePayPalPayment() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      items,
      amount,
      returnUrl,
    }: { items: string[]; amount: number; returnUrl: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createPayPalPaymentRequest(items, BigInt(amount), returnUrl);
    },
  });
}

export function useVerifyPayPalPayment() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (paymentId: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.verifyPayPalPayment(paymentId);
    },
  });
}
