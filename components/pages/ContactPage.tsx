import { ContactSection, FaqPreviewSection } from "@/components/external";

export function ContactPage() {
  return (
    <div className="w-full flex flex-col pb-24 overflow-hidden">
      <ContactSection />
      <div className="py-16 sm:py-24">
        <FaqPreviewSection />
      </div>
    </div>
  );
}

export default ContactPage;
