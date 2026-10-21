/**
 * FAQ content. Answers marked `pending: true` describe areas where the OunCatalyst team must
 * confirm operational details before launch; the page flags them visibly.
 */
export type Faq = { q: string; a: string; pending?: boolean };
export type FaqGroup = { id: string; title: string; items: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    id: "about",
    title: "About OunCatalyst",
    items: [
      {
        q: "What does OunCatalyst do?",
        a: "OunCatalyst is an emerging EdTech startup that helps students become independent, career-ready individuals. We do this through practical live classes built on real scenarios, interaction with industry professionals, global career coaching, support for long-term career ownership, and experiential programs such as The Years Exchange.",
      },
      {
        q: "Who are your programs designed for?",
        a: "Our programs are designed primarily for college students and recent graduates who want practical skills and a clearer view of their career options. We also work with colleges and institutions that want to offer career-development initiatives to their students. Parents and working professionals are welcome to contact us to discuss their situation.",
      },
    ],
  },
  {
    id: "programs",
    title: "Programs & learning",
    items: [
      {
        q: "How does practical learning work?",
        a: "Our live classes start from realistic situations — workplace challenges, industry problems and decisions professionals face — and build the concepts and skills needed to handle them. Sessions are interactive, with discussion, group work and feedback rather than lectures alone.",
      },
      {
        q: "How do industry expert sessions work?",
        a: "Industry Expert Connect sessions are designed around conversation: an experienced professional shares insights from their field, discusses real problems and answers students' questions. Formats can include talks, problem discussions and mentoring conversations. Specific experts and schedules are confirmed per program.",
        pending: true,
      },
      {
        q: "What does global career coaching cover?",
        a: "Global Career Coaching covers understanding international job markets, country-specific career exploration, workplace expectations in other countries, career planning and the general pathways students explore. Guidance depends on each student's goals and destination country. Visa and immigration questions should be confirmed with official sources or a licensed adviser.",
      },
      {
        q: "How long are programs, and what do they cost?",
        a: "Program formats, durations and any fees vary depending on the program and whether it is delivered to an individual or through an institution. These details are shared during a consultation.",
        pending: true,
      },
    ],
  },
  {
    id: "colleges",
    title: "For colleges",
    items: [
      {
        q: "How can colleges explore a collaboration?",
        a: "Colleges can submit the partnership enquiry form on our For Colleges page. Our team would then arrange a conversation to understand your requirements and your students' needs, and propose an engagement that suits your institution.",
      },
      {
        q: "Can programs be customised for our institution?",
        a: "Yes — we aim to tailor engagements to each institution's student cohort, academic calendar and learning objectives. The scope of customisation is agreed during the proposal stage.",
      },
    ],
  },
  {
    id: "getting-started",
    title: "Getting started",
    items: [
      {
        q: "How do I request a consultation?",
        a: "Select any “Book a Consultation” button on the site and complete the short form, or use the form on our Contact page. Once your request is saved, a member of our team can get in touch using the details you provided.",
      },
      {
        q: "Do you guarantee jobs or overseas placements?",
        a: "No. OunCatalyst does not guarantee jobs, job offers, salaries, overseas placements, work visas or immigration outcomes. Our programs are designed to build skills, understanding and confidence; outcomes depend on many factors, including each student's effort and circumstances.",
      },
      {
        q: "How is my personal information handled?",
        a: "Information you submit through our forms is used to respond to your enquiry and to discuss relevant programs. It is stored securely in our enquiry management system and is not sold. Our Privacy Policy explains what we collect, why, and how to contact us about your information.",
      },
    ],
  },
];

export const collegeFaqs: Faq[] = [
  faqGroups[2].items[0],
  faqGroups[2].items[1],
  {
    q: "What kinds of engagements are possible?",
    a: "Possible engagements include practical live classes, industry expert sessions, mentorship initiatives, global career coaching for students and experiential learning components. These can be combined based on your goals.",
  },
  {
    q: "Is there a minimum cohort size?",
    a: "Cohort requirements depend on the type of engagement. Share an approximate size in the enquiry form and we'll discuss what's practical.",
    pending: true,
  },
  faqGroups[3].items[1],
];
