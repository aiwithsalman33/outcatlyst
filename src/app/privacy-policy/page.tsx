import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { LegalLayout, TBC } from "@/components/sections/LegalLayout";

export const metadata = pageMetadata({
  title: "Privacy Policy (Draft) | OunCatalyst",
  description: "How OunCatalyst collects, uses and protects information submitted through its website consultation and enquiry forms.",
  path: "/privacy-policy",
});

const toc = [
  { id: "who", label: "Who we are" },
  { id: "collect", label: "Information we collect" },
  { id: "use", label: "How we use it" },
  { id: "basis", label: "Legal basis" },
  { id: "providers", label: "Service providers" },
  { id: "retention", label: "Retention" },
  { id: "security", label: "Security" },
  { id: "rights", label: "Your choices & rights" },
  { id: "children", label: "Younger users" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" path="/privacy-policy" toc={toc}>
      <p>
        This Privacy Policy explains how OunCatalyst (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles personal information
        submitted through this website, including our consultation, college partnership and general enquiry forms.
      </p>

      <h2 id="who">1. Who we are</h2>
      <p>
        OunCatalyst is an EdTech startup providing career-development programs. Registered legal entity name: <TBC />.
        Registered address: <TBC />. Data protection contact: <TBC />.
      </p>

      <h2 id="collect">2. Information we collect</h2>
      <p>We collect only the information you choose to submit through our forms, which may include:</p>
      <ul>
        <li>Your name, email address and phone number</li>
        <li>Whether you are a student, college representative, working professional, parent or other</li>
        <li>Your college or organisation, designation and approximate student cohort size (for institutions)</li>
        <li>Your area of interest, preferred consultation or discussion date, and any message you write</li>
        <li>Your consent to be contacted, with the time it was given</li>
      </ul>
      <p>
        We also record limited technical context with each submission: the page you submitted from, which button or form
        you used, a submission reference and a timestamp. Our servers may briefly process your IP address to prevent spam
        and abuse; we do not store it alongside your enquiry.
      </p>
      <p>
        Analytics or advertising cookies: <TBC>To be confirmed — none are currently configured</TBC>. The site uses your
        browser&apos;s session storage only to remember that the consultation pop-up has already been shown during your visit.
      </p>

      <h2 id="use">3. How we use your information</h2>
      <ul>
        <li>To respond to your consultation request or enquiry</li>
        <li>To discuss programs or partnership opportunities relevant to what you asked about</li>
        <li>To keep a record of enquiries so our team can follow up consistently</li>
        <li>To protect our website and forms from spam and misuse</li>
      </ul>
      <p>
        We do not sell your personal information. We will not send you marketing communications unrelated to your enquiry
        without your separate consent. <TBC>Confirm whether any newsletter or marketing use is planned</TBC>
      </p>

      <h2 id="basis">4. Legal basis for processing</h2>
      <p>
        We process enquiry information on the basis of your consent, given when you submit a form, and our legitimate
        interest in responding to enquiries and operating our services. <TBC>Confirm the applicable legal basis and
        governing data protection law(s) with legal counsel</TBC>
      </p>

      <h2 id="providers">5. Service providers</h2>
      <p>We use trusted service providers to operate this website and manage enquiries:</p>
      <ul>
        <li><strong>Google (Google Workspace / Google Sheets)</strong> — storage and management of enquiry records</li>
        <li><strong>Website hosting provider</strong> — <TBC /></li>
      </ul>
      <p>
        These providers process information on our behalf and may store it in other countries. <TBC>Confirm data location
        and any cross-border transfer safeguards</TBC>
      </p>

      <h2 id="retention">6. How long we keep information</h2>
      <p>
        We keep enquiry records only for as long as needed to respond and follow up, and for any period required by law.
        Retention period: <TBC />.
      </p>

      <h2 id="security">7. Security</h2>
      <p>
        Form submissions are sent over encrypted connections (HTTPS) and processed by our server, which writes them to an
        access-restricted spreadsheet using credentials that are never exposed to your browser. Access is limited to team
        members who need it. No method of transmission or storage is completely secure, but we take reasonable measures to
        protect your information.
      </p>

      <h2 id="rights">8. Your choices and rights</h2>
      <p>
        You can ask us to access, correct or delete the personal information you submitted, or withdraw your consent to be
        contacted, by reaching out using the details below. Depending on where you live, you may have additional rights
        under local law. <TBC>Confirm rights and response timelines under applicable law</TBC>
      </p>

      <h2 id="children">9. Younger users</h2>
      <p>
        Our services are intended primarily for college students and adults. If you are under the age of majority in your
        country, please involve a parent or guardian before submitting your details. <TBC>Confirm minimum age policy</TBC>
      </p>

      <h2 id="changes">10. Changes to this policy</h2>
      <p>We may update this policy from time to time. The &ldquo;last updated&rdquo; date above will show when it last changed.</p>

      <h2 id="contact">11. Contact us about your information</h2>
      <p>
        Email: <TBC />. You can also use our <Link href="/contact">contact form</Link>.
      </p>
    </LegalLayout>
  );
}
