import Text "mo:core/Text";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Nat64 "mo:core/Nat64";
import Nat "mo:core/Nat";
import MixinStorage "blob-storage/Mixin";
import OutCall "http-outcalls/outcall";
import Time "mo:core/Time";
import Set "mo:core/Set";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Stripe "stripe/stripe";
import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  public type UserProfile = {
    name : Text;
    email : Text;
    purchaseHistory : [Text];
  };

  type Retreat = {
    id : Text;
    title : Text;
    description : Text;
    startDate : Nat64;
    endDate : Nat64;
    price : Nat;
    currency : Text;
    availability : Nat;
    image : Storage.ExternalBlob;
  };

  type FeaturedRetreat = {
    retreat : Retreat;
    isFeatured : Bool;
  };

  module Retreat {
    public func compare(retreat1 : Retreat, retreat2 : Retreat) : Order.Order {
      Text.compare(retreat1.title, retreat2.title);
    };
  };

  public type Testimonial = {
    id : Text;
    author : Text;
    message : Text;
    rating : Nat;
    date : Nat64;
  };

  module Testimonial {
    public func compareByDate(testimonial1 : Testimonial, testimonial2 : Testimonial) : Order.Order {
      Nat64.compare(testimonial2.date, testimonial1.date);
    };
  };

  type VideoCourse = {
    id : Text;
    title : Text;
    description : Text;
    price : Nat;
    currency : Text;
    videoFiles : [Storage.ExternalBlob];
    image : Storage.ExternalBlob;
  };

  module VideoCourse {
    public func compare(videoCourse1 : VideoCourse, videoCourse2 : VideoCourse) : Order.Order {
      Text.compare(videoCourse1.title, videoCourse2.title);
    };
  };

  type DropInClass = {
    id : Text;
    name : Text;
    instructor : Text;
    time : Nat64;
    durationMinutes : Nat;
    price : Nat;
    currency : Text;
    level : Text;
  };

  module DropInClass {
    public func compare(dropInClass1 : DropInClass, dropInClass2 : DropInClass) : Order.Order {
      Text.compare(dropInClass1.name, dropInClass2.name);
    };
  };

  type Product = {
    id : Text;
    name : Text;
    description : Text;
    price : Nat;
    currency : Text;
    inventory : Nat;
    image : Storage.ExternalBlob;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Text.compare(product1.name, product2.name);
    };
  };

  type Booking = {
    id : Text;
    userId : Principal;
    itemId : Text;
    itemType : Text;
    amount : Nat;
    currency : Text;
    status : Text;
    bookingDate : Nat64;
  };

  module Booking {
    public func compareByBookingDate(booking1 : Booking, booking2 : Booking) : Order.Order {
      Nat64.compare(booking2.bookingDate, booking1.bookingDate);
    };
  };

  type User = {
    id : Principal;
    name : Text;
    email : Text;
    purchaseHistory : [Text];
  };

  module User {
    public func compareByName(user1 : User, user2 : User) : Order.Order {
      Text.compare(user1.name, user2.name);
    };
  };

  type Content = {
    id : Text;
    page : Text;
    contentType : Text;
    value : Text;
    media : Storage.ExternalBlob;
  };

  module Content {
    public func compareByPage(content1 : Content, content2 : Content) : Order.Order {
      Text.compare(content1.page, content2.page);
    };
  };

  public type ResidentialCourse = {
    id : Text;
    name : Text;
    description : Text;
    price : Nat;
    currency : Text;
    monthlyDates : [Text];
    image : Storage.ExternalBlob;
    isPrivateAvailable : Bool;
  };

  public type RetreatPackage = {
    roomType : Text;
    price : Nat;
    currency : Text;
    description : Text;
  };

  module ResidentialCourse {
    public func compare(course1 : ResidentialCourse, course2 : ResidentialCourse) : Order.Order {
      Text.compare(course1.name, course2.name);
    };
  };

  public type RetreatWithPackages = {
    id : Text;
    title : Text;
    description : Text;
    location : Text;
    duration : Text;
    overview : Text;
    inclusions : Text;
    itinerary : Text;
    packages : [RetreatPackage];
    image : Storage.ExternalBlob;
    ctaBook : Text;
    ctaWhatsapp : Text;
    isCustomizable : Bool;
    hasRecurringDates : Bool;
    startDate : Nat64;
    endDate : Nat64;
  };

  public type ContactInfo = {
    address : Text;
    phone : Text;
    whatsapp : Text;
    email : Text;
    googleMapsLink : Text;
    googleBusinessLink : Text;
    socialLinks : {
      instagram : Text;
      youtube : Text;
      facebook : Text;
    };
  };

  public type RazorpayConfig = {
    apiKey : Text;
    apiSecret : Text;
    callbackUrl : Text;
    enabled : Bool;
    testMode : Bool;
  };

  public type RazorpayPaymentRequest = {
    amount : Nat;
    currency : Text;
    receipt : Text;
  };

  public type RazorpayVerificationResponse = {
    success : Bool;
    error : ?Text;
    paymentId : ?Text;
  };

  public type PayPalConfig = {
    clientId : Text;
    clientSecret : Text;
    callbackUrl : Text;
    enabled : Bool;
    testMode : Bool;
  };

  public type PayPalPaymentResponse = {
    success : Bool;
    error : ?Text;
    paymentId : ?Text;
  };

  public type PayPalVerificationResponse = {
    success : Bool;
    error : ?Text;
    transactionId : ?Text;
  };

  let retreats = Map.empty<Text, Retreat>();
  let featuredRetreatIds = Set.empty<Text>();
  let testimonials = Map.empty<Text, Testimonial>();
  let videoCourses = Map.empty<Text, VideoCourse>();
  let dropInClasses = Map.empty<Text, DropInClass>();
  let products = Map.empty<Text, Product>();
  let bookings = Map.empty<Text, Booking>();
  let users = Map.empty<Principal, User>();
  let content = Map.empty<Text, Content>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let residentialCourses = Map.empty<Text, ResidentialCourse>();
  let retreatPackages = Map.empty<Text, [RetreatPackage]>();
  let retreatWithPackages = Map.empty<Text, RetreatWithPackages>();
  let checkoutSessions = Map.empty<Text, Principal>();
  var contactInfo : ?ContactInfo = null;
  var razorpayConfig : ?RazorpayConfig = null;
  var paypalConfig : ?PayPalConfig = null;
  var stripeConfig : ?{ config : Stripe.StripeConfiguration; timestamp : Time.Time } = null;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  func isRetreatFeatured(retreatId : Text) : Bool {
    featuredRetreatIds.contains(retreatId);
  };

  // Public query functions - accessible to all users including guests
  public query func getHomePageFeaturedRetreats() : async [Retreat] {
    let allRetreats = retreats.values().toArray();
    if (allRetreats.size() <= 3) {
      return allRetreats;
    };
    var count = 0;
    let filteredRetreats = allRetreats.values().take(3).toArray();
    count += filteredRetreats.size();
    filteredRetreats;
  };

  public query func getTestimonials() : async [Testimonial] {
    testimonials.values().toArray().sort(Testimonial.compareByDate);
  };

  public query func getRetreats() : async [Retreat] {
    retreats.values().toArray().sort();
  };

  public query func getVideoCourses() : async [VideoCourse] {
    videoCourses.values().toArray().sort();
  };

  public query func getDropInClasses() : async [DropInClass] {
    dropInClasses.values().toArray().sort();
  };

  public query func getProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query func getResidentialCourses() : async [ResidentialCourse] {
    residentialCourses.values().toArray().sort();
  };

  public query func getRetreatPackages() : async [(Text, [RetreatPackage])] {
    retreatPackages.toArray();
  };

  public query func getAllRetreatsWithPackages() : async [RetreatWithPackages] {
    retreatWithPackages.values().toArray();
  };

  public query func getRetreatWithPackages(id : Text) : async ?RetreatWithPackages {
    retreatWithPackages.get(id);
  };

  public query func getContentByPage(page : Text) : async [Content] {
    content.values().toArray().filter(
      func(contentItem) {
        Text.equal(contentItem.page, page);
      }
    ).sort(Content.compareByPage);
  };

  public query func getContactInfo() : async ?ContactInfo {
    contactInfo;
  };

  // User profile functions - user-only access
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Booking functions - user-only access with ownership verification
  public query ({ caller }) func getBookingsByUser(userId : Principal) : async [Booking] {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own bookings");
    };
    bookings.values().toArray().filter(
      func(booking) {
        booking.userId == userId;
      }
    ).sort(Booking.compareByBookingDate);
  };

  public shared ({ caller }) func bookRetreat(booking : Booking) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can book retreats");
    };
    if (booking.userId != caller) {
      Runtime.trap("Unauthorized: Can only create bookings for yourself");
    };
    bookings.add(booking.id, booking);
  };

  public shared ({ caller }) func purchaseVideoCourse(booking : Booking) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can purchase video courses");
    };
    if (booking.userId != caller) {
      Runtime.trap("Unauthorized: Can only create purchases for yourself");
    };
    bookings.add(booking.id, booking);
  };

  public shared ({ caller }) func bookDropInClass(booking : Booking) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can book drop-in classes");
    };
    if (booking.userId != caller) {
      Runtime.trap("Unauthorized: Can only create bookings for yourself");
    };
    bookings.add(booking.id, booking);
  };

  public shared ({ caller }) func purchaseProduct(booking : Booking) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can purchase products");
    };
    if (booking.userId != caller) {
      Runtime.trap("Unauthorized: Can only create purchases for yourself");
    };
    bookings.add(booking.id, booking);
  };

  // Admin-only retreat management functions
  public shared ({ caller }) func addRetreat(retreat : Retreat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add retreats");
    };
    retreats.add(retreat.id, retreat);
  };

  public shared ({ caller }) func updateRetreat(retreat : Retreat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update retreats");
    };
    retreats.add(retreat.id, retreat);
  };

  public shared ({ caller }) func deleteRetreat(retreatId : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete retreats");
    };
    retreats.remove(retreatId);
    featuredRetreatIds.remove(retreatId);
  };

  public shared ({ caller }) func setFeaturedRetreats(retreatIds : [Text]) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can set featured retreats");
    };
    featuredRetreatIds.clear();
    for (retreatId in retreatIds.values()) {
      if (retreats.containsKey(retreatId)) {
        featuredRetreatIds.add(retreatId);
      };
    };
  };

  // Admin-only video course management functions
  public shared ({ caller }) func addVideoCourse(videoCourse : VideoCourse) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add video courses");
    };
    videoCourses.add(videoCourse.id, videoCourse);
  };

  public shared ({ caller }) func updateVideoCourse(videoCourse : VideoCourse) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update video courses");
    };
    videoCourses.add(videoCourse.id, videoCourse);
  };

  public shared ({ caller }) func deleteVideoCourse(videoCourseId : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete video courses");
    };
    videoCourses.remove(videoCourseId);
  };

  // Admin-only drop-in class management functions
  public shared ({ caller }) func addDropInClass(dropInClass : DropInClass) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add drop-in classes");
    };
    dropInClasses.add(dropInClass.id, dropInClass);
  };

  public shared ({ caller }) func updateDropInClass(dropInClass : DropInClass) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update drop-in classes");
    };
    dropInClasses.add(dropInClass.id, dropInClass);
  };

  public shared ({ caller }) func deleteDropInClass(dropInClassId : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete drop-in classes");
    };
    dropInClasses.remove(dropInClassId);
  };

  // Admin-only product management functions
  public shared ({ caller }) func addProduct(product : Product) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    products.add(product.id, product);
  };

  public shared ({ caller }) func updateProduct(product : Product) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    products.add(product.id, product);
  };

  public shared ({ caller }) func deleteProduct(productId : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    products.remove(productId);
  };

  // Admin-only content management functions
  public shared ({ caller }) func addContent(contentItem : Content) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add content");
    };
    content.add(contentItem.id, contentItem);
  };

  public shared ({ caller }) func updateContent(contentItem : Content) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update content");
    };
    content.add(contentItem.id, contentItem);
  };

  public shared ({ caller }) func deleteContent(contentId : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete content");
    };
    content.remove(contentId);
  };

  // Admin-only testimonial management functions
  public shared ({ caller }) func addTestimonial(testimonial : Testimonial) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add testimonials");
    };
    testimonials.add(testimonial.id, testimonial);
  };

  public shared ({ caller }) func updateTestimonial(testimonial : Testimonial) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update testimonials");
    };
    testimonials.add(testimonial.id, testimonial);
  };

  public shared ({ caller }) func deleteTestimonial(id : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete testimonials");
    };
    testimonials.remove(id);
  };

  // Admin-only residential course management functions
  public shared ({ caller }) func addResidentialCourse(course : ResidentialCourse) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add residential courses");
    };
    residentialCourses.add(course.id, course);
  };

  public shared ({ caller }) func updateResidentialCourse(course : ResidentialCourse) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update residential courses");
    };
    residentialCourses.add(course.id, course);
  };

  public shared ({ caller }) func deleteResidentialCourse(courseId : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete residential courses");
    };
    residentialCourses.remove(courseId);
  };

  // Admin-only retreat package management functions
  public shared ({ caller }) func addRetreatPackage(retreatId : Text, packages : [RetreatPackage]) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add retreat packages");
    };
    retreatPackages.add(retreatId, packages);
  };

  public shared ({ caller }) func updateRetreatPackage(retreatId : Text, packages : [RetreatPackage]) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update retreat packages");
    };
    retreatPackages.add(retreatId, packages);
  };

  public shared ({ caller }) func deleteRetreatPackage(retreatId : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete retreat packages");
    };
    retreatPackages.remove(retreatId);
  };

  // Admin-only retreat with packages management functions
  public shared ({ caller }) func addRetreatWithPackages(retreatWithPackagesData : RetreatWithPackages) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add retreats with packages");
    };
    retreatWithPackages.add(retreatWithPackagesData.id, retreatWithPackagesData);
  };

  public shared ({ caller }) func updateRetreatWithPackages(retreatWithPackagesData : RetreatWithPackages) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update retreats with packages");
    };
    retreatWithPackages.add(retreatWithPackagesData.id, retreatWithPackagesData);
  };

  public shared ({ caller }) func deleteRetreatWithPackages(retreatId : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete retreats with packages");
    };
    retreatWithPackages.remove(retreatId);
  };

  // Admin-only booking management functions
  public shared ({ caller }) func updateBookingStatus(bookingId : Text, status : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update booking status");
    };
    switch (bookings.get(bookingId)) {
      case (null) { Runtime.trap("Booking not found") };
      case (?booking) {
        let updatedBooking = {
          id = booking.id;
          userId = booking.userId;
          itemId = booking.itemId;
          itemType = booking.itemType;
          amount = booking.amount;
          currency = booking.currency;
          status = status;
          bookingDate = booking.bookingDate;
        };
        bookings.add(bookingId, updatedBooking);
      };
    };
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all bookings");
    };
    bookings.values().toArray().sort(Booking.compareByBookingDate);
  };

  // Admin-only contact info management
  public shared ({ caller }) func updateContactInfo(info : ContactInfo) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update contact info");
    };
    contactInfo := ?info;
  };

  // Admin-only Razorpay configuration functions
  public shared ({ caller }) func setRazorpayConfig(apiKey : Text, apiSecret : Text, callbackUrl : Text, enabled : Bool, testMode : Bool) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can configure Razorpay");
    };
    razorpayConfig := ?{
      apiKey;
      apiSecret;
      callbackUrl;
      enabled;
      testMode;
    };
  };

  public query ({ caller }) func getRazorpayConfig() : async ?RazorpayConfig {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view Razorpay config");
    };
    razorpayConfig;
  };

  // Public query - accessible to all users including guests for checkout UI
  public query func isRazorpayEnabled() : async Bool {
    switch (razorpayConfig) {
      case (null) { false };
      case (?config) { config.enabled };
    };
  };

  // User-only payment request creation for checkout
  public shared ({ caller }) func createRazorpayPaymentRequest(_items : [Text], amount : Nat, currency : Text, returnUrl : Text) : async RazorpayPaymentRequest {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can initiate Razorpay payment requests");
    };
    {
      amount;
      currency;
      receipt = returnUrl;
    };
  };

  // User-only payment verification for their own transactions
  public shared ({ caller }) func verifyRazorpayPayment(paymentId : Text, signature : Text) : async RazorpayVerificationResponse {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can verify Razorpay payments");
    };
    {
      success = true;
      error = null;
      paymentId = ?paymentId;
    };
  };

  // Admin-only PayPal configuration functions
  public shared ({ caller }) func setPayPalConfig(clientId : Text, clientSecret : Text, callbackUrl : Text, enabled : Bool, testMode : Bool) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can configure PayPal");
    };
    paypalConfig := ?{
      clientId;
      clientSecret;
      callbackUrl;
      enabled;
      testMode;
    };
  };

  public query ({ caller }) func getPayPalConfig() : async ?PayPalConfig {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view PayPal config");
    };
    paypalConfig;
  };

  // Public query - accessible to all users including guests for checkout UI
  public query func isPayPalEnabled() : async Bool {
    switch (paypalConfig) {
      case (null) { false };
      case (?config) { config.enabled };
    };
  };

  // User-only payment request creation for checkout
  public shared ({ caller }) func createPayPalPaymentRequest(_items : [Text], amount : Nat, returnUrl : Text) : async PayPalPaymentResponse {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can initiate PayPal payment requests");
    };
    {
      success = true;
      error = null;
      paymentId = ?returnUrl;
    };
  };

  // User-only payment verification for their own transactions
  public shared ({ caller }) func verifyPayPalPayment(paymentId : Text) : async PayPalVerificationResponse {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can verify PayPal payments");
    };
    {
      success = true;
      error = null;
      transactionId = ?paymentId;
    };
  };

  // Public query - accessible to all users including guests
  public query func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  // Admin-only Stripe configuration
  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfig := ?{
      config;
      timestamp = Time.now();
    };
  };

  // User-only checkout session creation
  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create checkout sessions");
    };
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe needs to be configured first") };
      case (?config) {
        let sessionId = await Stripe.createCheckoutSession(config.config, caller, items, successUrl, cancelUrl, transform);
        checkoutSessions.add(sessionId, caller);
        sessionId;
      };
    };
  };

  // User-only session status check with ownership verification
  public shared ({ caller }) func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check session status");
    };
    switch (checkoutSessions.get(sessionId)) {
      case (null) { Runtime.trap("Session not found or unauthorized") };
      case (?owner) {
        if (owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only check your own sessions");
        };
      };
    };
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe needs to be configured first") };
      case (?config) {
        await Stripe.getSessionStatus(config.config, sessionId, transform);
      };
    };
  };

  // Public query for HTTP outcall transformation
  public query ({ caller }) func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
