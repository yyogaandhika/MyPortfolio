export interface SocialLink {
  id: "github" | "linkedin" | "whatsapp" | "email";
  label: string;
  value: string;
  href: string;
}

export const contactDetails = {
  name: "Mhd. Yoga Andhika",
  role: "Full-Stack & Creative Developer",
  location: "Pekanbaru, Riau, Indonesia",
  email: "yogaandika395@gmail.com",
  whatsappNumber: "+62 851-2111-4148",
  whatsappUrl: "https://wa.me/6285121114148",
  cvUrl: "/CV_Mhd_Yoga_Andhika.pdf",
  availability: "Open for Internship & Freelance",
  education: {
    degree: "B.A.Sc (D4) in Informatics Engineering",
    institution: "Politeknik Caltex Riau (PCR)",
    gpa: "3.21 / 4.00",
    expectedGraduation: "2027",
  },
  socials: [
    {
      id: "github" as const,
      label: "GitHub",
      value: "yyogaandhika",
      href: "https://github.com/yyogaandhika",
    },
    {
      id: "linkedin" as const,
      label: "LinkedIn",
      value: "Mhd. Yoga Andhika",
      href: "https://www.linkedin.com/in/mhd-yoga-andhika-87729b28b/",
    },
    {
      id: "whatsapp" as const,
      label: "WhatsApp",
      value: "+62 851-2111-4148",
      href: "https://wa.me/6285121114148",
    },
    {
      id: "email" as const,
      label: "Email",
      value: "yogaandika395@gmail.com",
      href: "mailto:yogaandika395@gmail.com",
    },
  ],
};
