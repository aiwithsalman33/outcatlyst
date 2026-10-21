import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { LegalLayout, TBC } from "@/components/sections/LegalLayout";

export const metadata = pageMetadata({
  title: "Terms of Use (Draft) | OunCatalyst",
  description: "The terms that apply to using the OunCatalyst website, its educational information and consultation enquiries.",
  path: "/terms",
});

const toc = [
  { id: "acceptance", label: "Acceptance" },
  { id: "use", label: "Using this website" },
  { id: "information", label: "Educational information" },
  { id: "enquiries", label: "Consultation enquiries" },
  { id: "no-guarantee", label: "No guarantees" },
  { id: "ip", label: "Intellectual property" },
  { id: "links", label: "Third-party links" },
  { id: "liability", label: "Disclaimers & liability" },
  { id: "law", label: "Governing law" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
];

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Use" path="/terms" toc={toc}>
      <p>
        These Terms of Use govern your use of the OunCatalyst website. Operator legal entity name: <TBC />. Registered
        address: <TBC />.
      </p>

      <h2 id="acceptance">1. Acceptance of these terms</h2>
      <p>By using this website, you agree to these terms. If you do not agree, please do not use the website.</p>

      <h2 id="use">2. Using this website</h2>
      <ul>
        <li>Use the website lawfully and only for its intended purpose of learning about and contacting OunCatalyst.</li>
        <li>Do not attempt to disrupt, overload, probe or gain unauthorised access to the website or its systems.</li>
        <li>Do not submit false information, other people&apos;s personal details without permission, or automated (bot) submissions.</li>
      </ul>

      <h2 id="information">3. Educational information</h2>
      <p>
        Content on this website describes our programs and approach for general information. It is not professional,
        legal, financial, immigration or visa advice. Program details, formats and availability may change and are
        confirmed only through direct communication with our team.
      </p>

      <h2 id="enquiries">4. Consultation and enquiry submissions</h2>
      <p>
        Submitting a form is a request for us to contact you; it does not create an enrolment, contract or commitment on
        either side. We handle the information you submit as described in our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>

      <h2 id="no-guarantee">5. No guarantee of outcomes</h2>
      <p>
        OunCatalyst does not guarantee employment, job offers, salaries, admissions, overseas placements, visas or
        immigration outcomes. Results depend on many factors outside our control, including each participant&apos;s
        effort, circumstances and decisions made by third parties.
      </p>

      <h2 id="ip">6. Intellectual property</h2>
      <p>
        The OunCatalyst name, logo, website design and original content belong to OunCatalyst or its licensors.
        Photographs are used under their respective licences. You may view and share links to our pages for personal,
        non-commercial purposes, but may not copy, modify or reuse our branding or content without written permission.
      </p>

      <h2 id="links">7. Third-party links</h2>
      <p>
        The website may link to external sites we do not control. We are not responsible for their content, availability
        or privacy practices.
      </p>

      <h2 id="liability">8. Disclaimers and limitation of liability</h2>
      <p>
        The website is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. To the extent permitted by law, we
        make no warranties about its accuracy, completeness or uninterrupted availability, and are not liable for losses
        arising from your use of it. <TBC>Liability wording to be finalised by legal counsel</TBC>
      </p>

      <h2 id="law">9. Governing law</h2>
      <p>These terms are governed by the laws of <TBC />, and disputes are subject to the courts of <TBC />.</p>

      <h2 id="changes">10. Changes to these terms</h2>
      <p>We may update these terms. Continued use of the website after changes means you accept the updated terms.</p>

      <h2 id="contact">11. Contact</h2>
      <p>
        Questions about these terms: <TBC>Email to be confirmed</TBC> or our <Link href="/contact">contact form</Link>.
      </p>
    </LegalLayout>
  );
}
