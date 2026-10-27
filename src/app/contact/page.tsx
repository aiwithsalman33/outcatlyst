import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { GeneralEnquiryForm } from "@/components/forms/GeneralEnquiryForm";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { SocialConnect } from "@/components/sections/SocialConnect";
import { Icon } from "@/components/ui/Icon";

export const metadata = pageMetadata({
  title: "Contact OunCatalyst | Let's Start a Conversation",
  description:
    "Contact OunCatalyst about student consultations, college partnerships or general enquiries. Send us a message and our team will get back to you.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", path: "/contact" }]}
        eyebrow="Contact"
        title="Let's start a conversation."
        intro="Whether you're a student planning your next step, a college exploring a partnership, or simply curious about what we do — we'd be glad to hear from you."
      />

      <section className="pb-12" aria-labelledby="direct-contact-title">
        <div className="container-site">
          <h2 id="direct-contact-title" className="sr-only">Contact details</h2>
          <ContactDetails />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <aside className="space-y-5 lg:col-span-4">
            <div className="card p-7">
              <Icon name="users" className="size-7 text-bright" />
              <h2 className="mt-4 text-xl font-semibold">Student enquiries</h2>
              <p className="mt-2 text-[0.95rem] text-muted">Questions about programs or your career plans? Book a consultation.</p>
              <ConsultationButton source="Contact page student card" className="btn-primary mt-5 min-h-11 w-full text-sm">
                Book a Consultation
              </ConsultationButton>
            </div>
            <div className="card p-7">
              <Icon name="building" className="size-7 text-bright" />
              <h2 className="mt-4 text-xl font-semibold">College partnerships</h2>
              <p className="mt-2 text-[0.95rem] text-muted">Representing an institution? Use our dedicated partnership form.</p>
              <Link href="/for-colleges#partner-form" className="btn-secondary mt-5 min-h-11 w-full text-sm">Partnership Enquiry</Link>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <div className="card p-6 sm:p-10">
              <h2 className="text-2xl font-bold">Send us a message</h2>
              <p className="mt-2 mb-8 text-muted">All fields marked * are required. We&apos;ll use your details only to respond.</p>
              <GeneralEnquiryForm />
            </div>
            <p className="mt-6 text-sm text-muted">
              Read how we handle your information in our{" "}
              <Link href="/privacy-policy" className="font-medium text-brand underline underline-offset-2">Privacy Policy</Link> and the{" "}
              <Link href="/terms" className="font-medium text-brand underline underline-offset-2">Terms of Use</Link>.
            </p>
          </div>
        </div>
      </section>

      <SocialConnect />
    </>
  );
}
