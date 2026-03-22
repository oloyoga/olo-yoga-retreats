import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface RazorpayConfig {
    testMode: boolean;
    enabled: boolean;
    apiKey: string;
    apiSecret: string;
    callbackUrl: string;
}
export interface VideoCourse {
    id: string;
    title: string;
    description: string;
    currency: string;
    image: ExternalBlob;
    price: bigint;
    videoFiles: Array<ExternalBlob>;
}
export interface Product {
    id: string;
    inventory: bigint;
    name: string;
    description: string;
    currency: string;
    image: ExternalBlob;
    price: bigint;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface PayPalPaymentResponse {
    error?: string;
    paymentId?: string;
    success: boolean;
}
export interface UserProfile {
    name: string;
    purchaseHistory: Array<string>;
    email: string;
}
export interface RetreatWithPackages {
    id: string;
    title: string;
    duration: string;
    ctaWhatsapp: string;
    endDate: bigint;
    packages: Array<RetreatPackage>;
    isCustomizable: boolean;
    hasRecurringDates: boolean;
    overview: string;
    description: string;
    inclusions: string;
    ctaBook: string;
    image: ExternalBlob;
    location: string;
    itinerary: string;
    startDate: bigint;
}
export interface Testimonial {
    id: string;
    date: bigint;
    author: string;
    message: string;
    rating: bigint;
}
export interface DropInClass {
    id: string;
    instructor: string;
    name: string;
    time: bigint;
    level: string;
    durationMinutes: bigint;
    currency: string;
    price: bigint;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface Booking {
    id: string;
    status: string;
    itemId: string;
    userId: Principal;
    bookingDate: bigint;
    currency: string;
    itemType: string;
    amount: bigint;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface ContactInfo {
    googleBusinessLink: string;
    socialLinks: {
        instagram: string;
        facebook: string;
        youtube: string;
    };
    whatsapp: string;
    googleMapsLink: string;
    email: string;
    address: string;
    phone: string;
}
export interface Content {
    id: string;
    media: ExternalBlob;
    contentType: string;
    value: string;
    page: string;
}
export interface Retreat {
    id: string;
    title: string;
    endDate: bigint;
    description: string;
    availability: bigint;
    currency: string;
    image: ExternalBlob;
    price: bigint;
    startDate: bigint;
}
export interface RazorpayPaymentRequest {
    receipt: string;
    currency: string;
    amount: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface RetreatPackage {
    description: string;
    currency: string;
    price: bigint;
    roomType: string;
}
export interface PayPalConfig {
    clientId: string;
    testMode: boolean;
    enabled: boolean;
    callbackUrl: string;
    clientSecret: string;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface PayPalVerificationResponse {
    error?: string;
    success: boolean;
    transactionId?: string;
}
export interface ResidentialCourse {
    id: string;
    isPrivateAvailable: boolean;
    name: string;
    description: string;
    currency: string;
    monthlyDates: Array<string>;
    image: ExternalBlob;
    price: bigint;
}
export interface RazorpayVerificationResponse {
    error?: string;
    paymentId?: string;
    success: boolean;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addContent(contentItem: Content): Promise<void>;
    addDropInClass(dropInClass: DropInClass): Promise<void>;
    addProduct(product: Product): Promise<void>;
    addResidentialCourse(course: ResidentialCourse): Promise<void>;
    addRetreat(retreat: Retreat): Promise<void>;
    addRetreatPackage(retreatId: string, packages: Array<RetreatPackage>): Promise<void>;
    addRetreatWithPackages(retreatWithPackagesData: RetreatWithPackages): Promise<void>;
    addTestimonial(testimonial: Testimonial): Promise<void>;
    addVideoCourse(videoCourse: VideoCourse): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    bookDropInClass(booking: Booking): Promise<void>;
    bookRetreat(booking: Booking): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createPayPalPaymentRequest(_items: Array<string>, amount: bigint, returnUrl: string): Promise<PayPalPaymentResponse>;
    createRazorpayPaymentRequest(_items: Array<string>, amount: bigint, currency: string, returnUrl: string): Promise<RazorpayPaymentRequest>;
    deleteContent(contentId: string): Promise<void>;
    deleteDropInClass(dropInClassId: string): Promise<void>;
    deleteProduct(productId: string): Promise<void>;
    deleteResidentialCourse(courseId: string): Promise<void>;
    deleteRetreat(retreatId: string): Promise<void>;
    deleteRetreatPackage(retreatId: string): Promise<void>;
    deleteRetreatWithPackages(retreatId: string): Promise<void>;
    deleteTestimonial(id: string): Promise<void>;
    deleteVideoCourse(videoCourseId: string): Promise<void>;
    getAllBookings(): Promise<Array<Booking>>;
    getAllRetreatsWithPackages(): Promise<Array<RetreatWithPackages>>;
    getBookingsByUser(userId: Principal): Promise<Array<Booking>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactInfo(): Promise<ContactInfo | null>;
    getContentByPage(page: string): Promise<Array<Content>>;
    getDropInClasses(): Promise<Array<DropInClass>>;
    getHomePageFeaturedRetreats(): Promise<Array<Retreat>>;
    getPayPalConfig(): Promise<PayPalConfig | null>;
    getProducts(): Promise<Array<Product>>;
    getRazorpayConfig(): Promise<RazorpayConfig | null>;
    getResidentialCourses(): Promise<Array<ResidentialCourse>>;
    getRetreatPackages(): Promise<Array<[string, Array<RetreatPackage>]>>;
    getRetreatWithPackages(id: string): Promise<RetreatWithPackages | null>;
    getRetreats(): Promise<Array<Retreat>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getTestimonials(): Promise<Array<Testimonial>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getVideoCourses(): Promise<Array<VideoCourse>>;
    isCallerAdmin(): Promise<boolean>;
    isPayPalEnabled(): Promise<boolean>;
    isRazorpayEnabled(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    purchaseProduct(booking: Booking): Promise<void>;
    purchaseVideoCourse(booking: Booking): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setFeaturedRetreats(retreatIds: Array<string>): Promise<void>;
    setPayPalConfig(clientId: string, clientSecret: string, callbackUrl: string, enabled: boolean, testMode: boolean): Promise<void>;
    setRazorpayConfig(apiKey: string, apiSecret: string, callbackUrl: string, enabled: boolean, testMode: boolean): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateBookingStatus(bookingId: string, status: string): Promise<void>;
    updateContactInfo(info: ContactInfo): Promise<void>;
    updateContent(contentItem: Content): Promise<void>;
    updateDropInClass(dropInClass: DropInClass): Promise<void>;
    updateProduct(product: Product): Promise<void>;
    updateResidentialCourse(course: ResidentialCourse): Promise<void>;
    updateRetreat(retreat: Retreat): Promise<void>;
    updateRetreatPackage(retreatId: string, packages: Array<RetreatPackage>): Promise<void>;
    updateRetreatWithPackages(retreatWithPackagesData: RetreatWithPackages): Promise<void>;
    updateTestimonial(testimonial: Testimonial): Promise<void>;
    updateVideoCourse(videoCourse: VideoCourse): Promise<void>;
    verifyPayPalPayment(paymentId: string): Promise<PayPalVerificationResponse>;
    verifyRazorpayPayment(paymentId: string, signature: string): Promise<RazorpayVerificationResponse>;
}
