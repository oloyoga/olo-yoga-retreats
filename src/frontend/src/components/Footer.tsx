import { Link, useNavigate } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetContactInfo } from "../hooks/useQueries";

export default function Footer() {
  const { data: contactInfo } = useGetContactInfo();
  const { identity, login, loginStatus } = useInternetIdentity();
  const navigate = useNavigate();

  const defaultSocialLinks = {
    instagram:
      "https://www.instagram.com/olo_yoga?igsh=MWJ4anpmYXVnY24zaw%3D%3D&utm_source=qr",
    youtube: "https://youtube.com/@oloyoga?si=2YbqxijsUD9rPrmN",
    facebook: "https://www.facebook.com/share/15eqc2hAVFy/?mibextid=wwXIfr",
  };

  const socialLinks = contactInfo?.socialLinks || defaultSocialLinks;

  const handleAdminClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (identity) {
      navigate({ to: "/admin" });
      return;
    }

    try {
      await login();
      navigate({ to: "/admin" });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const isLoggingIn = loginStatus === "logging-in";

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/assets/uploads/IMG-20260129-WA0001-1.jpg"
                alt="OLO Yoga & Retreats"
                className="h-16 w-auto object-contain rounded-md"
              />
            </div>
            <p className="text-sm text-primary-foreground/80">
              Experience transformative yoga and wellness in the heart of
              Rishikesh, India.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-heading">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/retreats"
                  className="hover:text-primary-foreground/80 transition-colors"
                >
                  Retreats
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="hover:text-primary-foreground/80 transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/online-courses"
                  className="hover:text-primary-foreground/80 transition-colors"
                >
                  Online Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/drop-in-classes"
                  className="hover:text-primary-foreground/80 transition-colors"
                >
                  Drop-In Classes
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-primary-foreground/80 transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary-foreground/80 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleAdminClick}
                disabled={isLoggingIn}
                data-ocid="footer.button"
                className="inline-block px-6 py-2.5 bg-[#37381B] text-white rounded-full text-sm font-medium font-heading hover:bg-[#37381B]/90 transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingIn ? "Logging in..." : "Admin Panel"}
              </button>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-heading">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-foreground/80 transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="h-6 w-6" />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-foreground/80 transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="h-6 w-6" />
              </a>
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-foreground/80 transition-colors"
                aria-label="YouTube"
              >
                <SiYoutube className="h-6 w-6" />
              </a>
            </div>
            {contactInfo && (
              <p className="text-sm text-primary-foreground/80">
                {contactInfo.address}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/80">
          <p className="flex items-center justify-center gap-1">
            &copy; {new Date().getFullYear()}. Built with{" "}
            <Heart className="h-4 w-4 fill-current" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-foreground transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
