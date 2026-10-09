export const PROFILE = {
  name: "Ngceba Esethu",
  title: "Accounting Graduate | Aspiring Internal Auditor",
  location: "Cape Town, South Africa",
  email: "esethungceba01@gmail.com",
  // Add real URLs when available; empty values are hidden on the site.
  linkedin: "",
  cvUrl: "",
};

export const EDUCATION = [
  { school: "Cape Peninsula University of Technology (CPUT)", qualification: "Advanced Diploma in Internal Auditing", status: "Currently studying", current: true },
  { school: "Cape Peninsula University of Technology (CPUT)", qualification: "Diploma in Accountancy", status: "Completed 2025", current: false },
  { school: "Alafang High School", qualification: "National Senior Certificate (Matric)", status: "Completed 2022", current: false },
];

export const SKILLS = {
  "Accounting & Business": ["Accounting knowledge", "Budgeting", "Financial information interpretation"],
  "Internal Audit & Analysis": ["Analytical skills", "Research", "Risk management", "Operational efficiency", "Internal audit competency development"],
  "Professional Skills": ["Written and verbal communication", "Teamwork", "Leadership", "Problem-solving", "Adaptability", "Ability to learn new systems"],
  "Software & Digital Tools": ["Microsoft Excel", "Microsoft Word", "Microsoft PowerPoint", "Microsoft Outlook", "SAP", "Sage Accounting"],
} as const;

export const EXPERIENCE = {
  organisation: "Youth Leader Visionary Movement Academy",
  role: "Assistant Tutor",
  period: "May 2023 – November 2025",
  duties: [
    "Assisted Grade 10–12 learners with Mathematics, Accounting and Economics during Saturday classes.",
    "Supported learners with applications for learnerships, bursaries and university opportunities.",
    "Helped learners understand academic content and navigate educational opportunities.",
  ],
  transferable: ["Communication", "Patience", "Leadership", "Organisation", "Mentoring", "Problem-solving"],
};

export type Project = {
  title: string; category: string; objective: string; approach: string; tools: string; outcomes: string;
};

const PENDING = "To be added once the project evidence is supplied.";

export const PROJECTS: Project[] = [
  { title: "Financial Analysis", category: "Academic exercise", objective: "Present a structured analysis of financial statements, financial performance and relevant accounting ratios.", approach: PENDING, tools: "Microsoft Excel", outcomes: PENDING },
  { title: "Internal Audit Case Study", category: "Hypothetical case study", objective: "Demonstrate how audit objectives, criteria, findings, risks and recommendations can be organised in a professional audit report.", approach: PENDING, tools: "Microsoft Word, Microsoft Excel", outcomes: PENDING },
  { title: "Risk Assessment & Internal Controls", category: "Hypothetical case study", objective: "Document a hypothetical business process, identify potential risks, assess existing controls and propose practical improvements.", approach: PENDING, tools: "Microsoft Excel, Microsoft Word", outcomes: PENDING },
  { title: "Accounting Systems & Data Analysis", category: "Academic exercise", objective: "Showcase academic exercises involving SAP, Sage Accounting, spreadsheet analysis or accounting information systems.", approach: PENDING, tools: "SAP, Sage Accounting, Microsoft Excel", outcomes: PENDING },
];

export const DEVELOPMENT = ["Additional courses", "Professional certifications", "Academic achievements", "Workshops & training", "Professional memberships"];
