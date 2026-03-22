import { MessageCircle } from "lucide-react";
import { useGetContactInfo } from "../hooks/useQueries";

export default function FloatingWhatsApp() {
  const { data: contactInfo } = useGetContactInfo();

  const defaultWhatsApp = "+917055000308";
  const whatsappNumber = contactInfo?.whatsapp || defaultWhatsApp;
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
  const message = encodeURIComponent(
    "Hello OLO Yoga! I would like to inquire about your services.",
  );

  const handleClick = () => {
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 group-hover:scale-110 transition-transform" />
      <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with us!
      </span>
    </button>
  );
}
