/**
 * Program catalogue. Each entry renders through the reusable <ProgramDetail /> template,
 * so a new program only needs a new object here.
 *
 * Content rules: describe intended design and possible activities only. Do not add fees,
 * durations, certifications, schedules or guaranteed outcomes until the team confirms them.
 */
export type Accent = "blue" | "teal" | "magenta" | "sun" | "navy";

export type Program = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  overview: string;
  audience: string[];
  objectives: string[];
  expect: string[];
  activities: string[];
  outcomes: string[];
  accent: Accent;
  icon: "classroom" | "mentor" | "globe" | "compass" | "spark";
  /** Optional dedicated page with more depth. */
  learnMoreHref?: string;
  interest: string;
};

export const programs: Program[] = [
  {
    id: "live-classes",
    number: "01",
    title: "Live Classes with Real Scenarios",
    shortTitle: "Live Classes",
    summary:
      "Practical classes built around real-world examples, workplace challenges and industry-based problem-solving — not theory alone.",
    overview:
      "Each session starts from a situation a professional might actually face — a brief from a client, a problem in a project, a decision with incomplete information — and works backwards to the knowledge and skills needed to handle it. Students learn concepts in the context where they will use them.",
    audience: [
      "College students who want to apply what they study",
      "Final-year students preparing for their first role",
      "Early-career learners who want structured, practical practice",
    ],
    objectives: [
      "Connect academic concepts to how work is actually done",
      "Practise structured problem-solving on realistic scenarios",
      "Build confidence in communicating ideas and decisions",
    ],
    expect: [
      "Interactive, live sessions rather than pre-recorded lectures",
      "Scenario-based discussion and guided group work",
      "Feedback on your thinking, not only your final answer",
    ],
    activities: ["Case walk-throughs", "Role-based simulations", "Small-group problem solving", "Short presentations and peer review"],
    outcomes: [
      "A clearer picture of how classroom knowledge is applied at work",
      "Practice with the kind of problems employers discuss in interviews",
      "Examples of your own thinking you can reflect on and talk about",
    ],
    accent: "blue",
    icon: "classroom",
    interest: "Live Classes with Real Scenarios",
  },
  {
    id: "industry-expert-connect",
    number: "02",
    title: "Industry Expert Connect",
    shortTitle: "Industry Connect",
    summary:
      "Direct interaction with experienced professionals for industry insight, mentorship and practical career guidance.",
    overview:
      "Students hear first-hand how industries operate, what professionals look for and how careers really develop. Sessions are designed to be conversational, so students can ask the questions that rarely get answered in a classroom.",
    audience: [
      "Students exploring which industry or role suits them",
      "Students who want feedback and perspective from practitioners",
      "Colleges looking to bring industry voices to campus",
    ],
    objectives: [
      "Understand workplace expectations and industry realities",
      "Learn how professionals approach decisions and challenges",
      "Start building a professional network with intention",
    ],
    expect: [
      "Expert-led sessions and open Q&A",
      "Discussion of real problems professionals have worked on",
      "Guidance on career paths, skills and next steps",
    ],
    activities: ["Expert talks and fireside conversations", "Problem discussions", "Mentoring conversations", "Career-path Q&A"],
    outcomes: [
      "Informed questions to ask about roles and industries",
      "A grounded view of what different careers involve day to day",
      "Practical advice you can apply to your own plans",
    ],
    accent: "teal",
    icon: "mentor",
    learnMoreHref: "/industry-connect",
    interest: "Industry Expert Connect",
  },
  {
    id: "global-career-coaching",
    number: "03",
    title: "Global Career Coaching",
    shortTitle: "Global Coaching",
    summary:
      "Country-specific career guidance, job-market awareness and coaching for students exploring international career opportunities.",
    overview:
      "Working abroad means understanding a different job market, different hiring norms and different workplace culture. Coaching is shaped around each student's goals and the countries they are considering, so the guidance stays relevant to their situation.",
    audience: [
      "Students considering careers outside their home country",
      "Students planning further study abroad with a career goal in mind",
      "Graduates comparing international pathways",
    ],
    objectives: [
      "Understand how job markets and hiring work in target countries",
      "Identify the skills and experience those markets value",
      "Make informed, realistic decisions about international pathways",
    ],
    expect: [
      "Guidance tailored to your goals and destination country",
      "Honest discussion of opportunities and trade-offs",
      "Help structuring a personal career plan",
    ],
    activities: ["Goal-setting conversations", "Market and role research", "Profile and application review", "Workplace-culture discussions"],
    outcomes: [
      "A clearer understanding of your target market",
      "A realistic plan with next steps you control",
      "Better-informed decisions about where and how to apply",
    ],
    accent: "magenta",
    icon: "globe",
    learnMoreHref: "/global-career-coaching",
    interest: "Global Career Coaching",
  },
  {
    id: "beyond-employability",
    number: "04",
    title: "Beyond Employability",
    shortTitle: "Beyond Employability",
    summary:
      "Support to identify opportunities, upgrade skills, make informed career decisions and take ownership of professional growth.",
    overview:
      "Getting a first job is one milestone, not the destination. This program focuses on the habits that sustain a career: spotting opportunities, learning continuously, evaluating options and making deliberate choices about what comes next.",
    audience: [
      "Students who want to plan beyond their first role",
      "Recent graduates navigating early career decisions",
      "Anyone who wants to take more ownership of their growth",
    ],
    objectives: [
      "Develop a habit of continuous skill development",
      "Learn frameworks for evaluating career opportunities",
      "Build self-direction and long-term career thinking",
    ],
    expect: [
      "Reflective, practical sessions focused on your own path",
      "Tools for self-assessment and planning",
      "Encouragement to act, review and adjust",
    ],
    activities: ["Skills self-assessment", "Opportunity mapping", "Personal development planning", "Decision-making exercises"],
    outcomes: [
      "A personal development plan you can keep updating",
      "Greater clarity on which skills to build next",
      "More confidence making independent career decisions",
    ],
    accent: "sun",
    icon: "compass",
    interest: "Beyond Employability",
  },
  {
    id: "experiential-programs",
    number: "05",
    title: "Experiential Programs",
    shortTitle: "Experiential Programs",
    summary:
      "Initiatives such as The Years Exchange that give students direct industry exposure and practical career skills.",
    overview:
      "Some things can only be learned by doing. Experiential programs place students in contact with real work so they can observe, contribute, reflect and build professional confidence — complementing what they learn in class.",
    audience: [
      "Students who want hands-on exposure to real work",
      "Colleges looking to add experiential components to their programs",
    ],
    objectives: [
      "Gain direct exposure to professional environments",
      "Apply skills in practical settings",
      "Reflect on experiences to understand strengths and interests",
    ],
    expect: [
      "Structured exposure to real work contexts",
      "Guided reflection before, during and after the experience",
      "Support from the OunCatalyst team throughout",
    ],
    activities: ["Workplace-based learning", "Project contributions", "Structured reflection", "Skill and confidence building"],
    outcomes: [
      "Experience you can reflect on and describe",
      "A better sense of the environments you work best in",
      "Practical skills developed through real tasks",
    ],
    accent: "navy",
    icon: "spark",
    learnMoreHref: "/experiential-learning",
    interest: "Experiential Programs (incl. The Years Exchange)",
  },
];

export const accentStyles: Record<Accent, { chip: string; bar: string; soft: string; text: string }> = {
  blue: { chip: "bg-bright/10 text-bright", bar: "bg-bright", soft: "bg-bright/5", text: "text-bright" },
  teal: { chip: "bg-teal/15 text-[#067a64]", bar: "bg-teal", soft: "bg-teal/5", text: "text-[#067a64]" },
  magenta: { chip: "bg-magenta/10 text-[#b5145f]", bar: "bg-magenta", soft: "bg-magenta/5", text: "text-[#b5145f]" },
  sun: { chip: "bg-sun/20 text-[#7a5300]", bar: "bg-sun", soft: "bg-sun/10", text: "text-[#7a5300]" },
  navy: { chip: "bg-navy/10 text-navy", bar: "bg-navy", soft: "bg-navy/5", text: "text-navy" },
};

/**
 * Bookable session programs (e.g. the weekly bootcamp). Rendered by <FeaturedProgram />,
 * <ProgramTopics /> and the "How it works" steps on /programs.
 *
 * Content rules: only set `duration`, `deliveryMode` and `nextSessionDate` once the team has
 * confirmed them — unset values display as "To be announced". The price is per session, not a
 * recurring subscription. Set `status: "draft"` to hide a program without deleting it.
 */
export type SessionProgram = {
  id: string;
  title: string;
  description: string;
  price: { amount: number; currency: "INR"; unit: "session" };
  frequency: "weekly" | "fortnightly" | "monthly";
  format: string;
  audience: string;
  topics: { title: string; body: string; icon: "compass" | "route" | "briefcase" | "target" }[];
  /** Interest value preselected in the consultation form. Must exist in INTEREST_AREAS. */
  registrationInterest: string;
  duration?: string;
  deliveryMode?: string;
  /** ISO date (YYYY-MM-DD) once confirmed. */
  nextSessionDate?: string;
  status: "published" | "draft";
};

export const sessionPrograms: SessionProgram[] = [
  {
    id: "bootcamp",
    title: "Career Consultation Bootcamp",
    description:
      "A guided career consultation experience designed to help participants explore career pathways, identify learning priorities, and create a practical action plan.",
    price: { amount: 500, currency: "INR", unit: "session" },
    frequency: "weekly",
    format: "Career consultation and bootcamp session",
    audience: "Students, freshers and early-career professionals",
    topics: [
      { title: "Career Direction", body: "Explore career options based on your interests, current skills, and goals.", icon: "compass" },
      { title: "Skills and Learning Roadmap", body: "Identify relevant skills and prioritize what to learn next.", icon: "route" },
      {
        title: "Career Preparation",
        body: "Discuss practical next steps for building a portfolio, improving your profile, and preparing for opportunities.",
        icon: "briefcase",
      },
      { title: "Personal Action Plan", body: "Create a realistic roadmap with clear next steps after the consultation.", icon: "target" },
    ],
    registrationInterest: "Career Consultation Bootcamp",
    status: "published",
  },
];

export const publishedSessionPrograms = sessionPrograms.filter((p) => p.status === "published");

export const frequencyLabels: Record<SessionProgram["frequency"], string> = {
  weekly: "Weekly sessions",
  fortnightly: "Fortnightly sessions",
  monthly: "Monthly sessions",
};

export function formatPrice(price: SessionProgram["price"]) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: price.currency, maximumFractionDigits: 0 }).format(price.amount);
}
