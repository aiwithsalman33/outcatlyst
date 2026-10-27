const clean = (v: string | undefined) => (v ?? "").trim();

export const site = {
  name: "OunCatalyst",
  url: (clean(process.env.NEXT_PUBLIC_SITE_URL) || "http://localhost:3000").replace(/\/$/, ""),
  tagline: "Don't just find a career. Build your own.",
  brandMessage:
    "OunCatalyst doesn't just prepare students for jobs; we empower them to build careers of their own.",
  description:
    "OunCatalyst is an EdTech startup helping students become independent, career-ready individuals through practical learning, industry exposure, mentorship and career-development programs.",
  /** Official public contact details. Env vars can override them per deployment. */
  contact: {
    email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL) || "Ouncatalyst@gmail.com",
    phone: clean(process.env.NEXT_PUBLIC_CONTACT_PHONE) || "+91 86104 18890",
    location: "Chennai, Tamil Nadu, India",
  },
  social: [
    {
      label: "Instagram",
      handle: "OunCatalyst on Instagram",
      href: clean(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM) || "https://www.instagram.com/ouncatalyst?vrfl=MXJ1ajVrNjAxejFuag==",
    },
    {
      label: "LinkedIn",
      handle: "OunCatalyst on LinkedIn",
      href: clean(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN) || "https://www.linkedin.com/company/oun-catalyst/",
    },
    { label: "YouTube", handle: "OunCatalyst on YouTube", href: clean(process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE) },
    { label: "X", handle: "OunCatalyst on X", href: clean(process.env.NEXT_PUBLIC_SOCIAL_X) },
  ].filter((s) => s.href.startsWith("https://")),
} as const;

export type NavLink = { label: string; href: string; description?: string };

export const programNav: NavLink[] = [
  { label: "All Programs", href: "/programs", description: "Five ways to build practical, career-ready skills" },
  { label: "Career Consultation Bootcamp", href: "/programs#bootcamp", description: "Weekly guided career consultation sessions" },
  { label: "Industry Connect", href: "/industry-connect", description: "Learn from experienced professionals" },
  { label: "Global Career Coaching", href: "/global-career-coaching", description: "Guidance for international career goals" },
  { label: "Experiential Learning", href: "/experiential-learning", description: "The Years Exchange and real-world exposure" },
];

export const primaryNav: (NavLink & { children?: NavLink[] })[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Programs", href: "/programs", children: programNav },
  { label: "For Colleges", href: "/for-colleges" },
  { label: "For Students", href: "/for-students" },
  { label: "Contact", href: "/contact" },
];

/** Formats a display phone number as a tel: link. */
export const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;

export const footerNav = {
  programs: [
    { label: "All Programs", href: "/programs" },
    { label: "Career Consultation Bootcamp", href: "/programs#bootcamp" },
    { label: "Live Classes", href: "/programs#live-classes" },
    { label: "Industry Connect", href: "/industry-connect" },
    { label: "Global Career Coaching", href: "/global-career-coaching" },
    { label: "Experiential Learning", href: "/experiential-learning" },
  ],
  students: [
    { label: "For Students", href: "/for-students" },
    { label: "Beyond Employability", href: "/programs#beyond-employability" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  colleges: [
    { label: "For Colleges", href: "/for-colleges" },
    { label: "Partnership Process", href: "/for-colleges#process" },
    { label: "Partnership Enquiry", href: "/for-colleges#partner-form" },
    { label: "About OunCatalyst", href: "/about" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms" },
  ],
};
