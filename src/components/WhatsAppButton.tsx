import { FaWhatsapp } from "react-icons/fa6";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/94775917528"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Prasanna on WhatsApp"
      data-cursor-hover
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 hover:scale-105 transition-transform"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}
