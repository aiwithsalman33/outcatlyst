import hero from "../../public/images/hero.jpg";
import about from "../../public/images/about.jpg";
import mentorship from "../../public/images/mentorship.jpg";
import liveClass from "../../public/images/live-class.jpg";
import global from "../../public/images/global.jpg";
import experiential from "../../public/images/experiential.jpg";
import colleges from "../../public/images/colleges.jpg";
import students from "../../public/images/students.jpg";
import contact from "../../public/images/contact.jpg";

/** Photography from Unsplash (Unsplash License). Credits: public/images/CREDITS.md */
export const images = {
  hero: { src: hero, alt: "A diverse group of university students gathered around a laptop, smiling and collaborating" },
  about: { src: about, alt: "Students sitting together at lecture-hall desks, talking and studying in small groups" },
  mentorship: { src: mentorship, alt: "An experienced professional guiding a young man through work on a laptop" },
  liveClass: { src: liveClass, alt: "Young professionals around a conference table listening to a presenter during a workshop" },
  global: { src: global, alt: "An international team of young people smiling and working together around a laptop" },
  experiential: { src: experiential, alt: "Young professionals applauding a colleague presenting during a meeting in a modern office" },
  colleges: { src: colleges, alt: "A modern tiered university lecture hall with curved wooden desks" },
  students: { src: students, alt: "A smiling young student sitting on campus steps with a laptop" },
  contact: { src: contact, alt: "Three young people having a friendly conversation around a table with a laptop" },
} as const;

export type ImageKey = keyof typeof images;
