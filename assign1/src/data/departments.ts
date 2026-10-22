import { Department } from "@/types";

/**
 * Local Dummy Departments Dataset
 * 
 * WHY USE DUMMY DATA IN SEPARATE DATA FILES?
 * - All faculties, descriptions, metrics, and specializations are defined here once.
 * - This mirrors a database table or CMS collection.
 * - Components consume this data strictly via helper functions in `src/lib/helpers.ts`.
 */
export const DEPARTMENTS: Department[] = [
  {
    slug: "computer-science",
    name: "Computer Science",
    description:
      "Software engineering, artificial intelligence, algorithms, and systems infrastructure.",
    specializationsCount: 4,
    enrolledStudents: 320,
    iconType: "code",
    specializations: [
      {
        slug: "web-development",
        name: "Web Development",
        trackCode: "CS-SPEC-04",
        academicLead: "Prof. Elena Vance",
        lab: "Turing Hall 408",
        curriculumCycle: "2024–2025 Revised",
        enrolledCount: 4,
        description:
          "Focusing on modern frontend architectures, full-stack frameworks, reactive interfaces, and distributed web APIs.",
      },
      {
        slug: "ai-and-ml",
        name: "Artificial Intelligence & Machine Learning",
        trackCode: "CS-SPEC-01",
        academicLead: "Dr. Alan Turing",
        lab: "Lovelace Center 201",
        curriculumCycle: "2024–2025 Revised",
        enrolledCount: 120,
        description:
          "Deep learning, neural architectures, computer vision, and autonomous decision systems.",
      },
      {
        slug: "cybersecurity",
        name: "Cybersecurity & Systems",
        trackCode: "CS-SPEC-02",
        academicLead: "Prof. Marcus Ward",
        lab: "Shannon Vault 102",
        curriculumCycle: "2024–2025 Revised",
        enrolledCount: 95,
        description:
          "Network security, cryptography, penetration testing, and secure runtime environments.",
      },
      {
        slug: "cloud-computing",
        name: "Cloud & Distributed Computing",
        trackCode: "CS-SPEC-03",
        academicLead: "Dr. Sarah Jenkins",
        lab: "Cerf Wing 305",
        curriculumCycle: "2024–2025 Revised",
        enrolledCount: 101,
        description:
          "Microservices orchestration, serverless platforms, edge data meshes, and high availability systems.",
      },
    ],
  },
  {
    slug: "design",
    name: "Design",
    description:
      "User experience research, visual communication, interaction design, and product prototyping.",
    specializationsCount: 3,
    enrolledStudents: 185,
    iconType: "design",
    specializations: [
      {
        slug: "interaction-design",
        name: "Interaction Design",
        trackCode: "DES-SPEC-01",
        academicLead: "Prof. Dieter Rams",
        lab: "Bauhaus Studio 104",
        curriculumCycle: "2024–2025 Revised",
        enrolledCount: 65,
        description:
          "Interface architectures, design systems, ergonomic interaction flows, and multimodal UI.",
      },
      {
        slug: "product-prototyping",
        name: "Product Prototyping",
        trackCode: "DES-SPEC-02",
        academicLead: "Dr. Jony Ive",
        lab: "Edison FabLab 206",
        curriculumCycle: "2024–2025 Revised",
        enrolledCount: 58,
        description:
          "Rapid fabrication, physical computing, tactile user feedback, and CAD modeling.",
      },
      {
        slug: "visual-communication",
        name: "Visual Communication & Branding",
        trackCode: "DES-SPEC-03",
        academicLead: "Prof. Paula Scher",
        lab: "Gutenberg Atelier 310",
        curriculumCycle: "2024–2025 Revised",
        enrolledCount: 62,
        description:
          "Typography, spatial information design, brand identity systems, and motion graphics.",
      },
    ],
  },
  {
    slug: "business",
    name: "Business",
    description:
      "Strategic management, financial technology, international entrepreneurship, and analytics.",
    specializationsCount: 3,
    enrolledStudents: 240,
    iconType: "business",
    specializations: [
      {
        slug: "financial-technology",
        name: "Financial Technology",
        trackCode: "BUS-SPEC-01",
        academicLead: "Dr. Satoshi Nakamoto",
        lab: "Wall Street Simulation Hub",
        curriculumCycle: "2024–2025 Revised",
        enrolledCount: 88,
        description:
          "Algorithmic trading mechanisms, digital currencies, decentralized finance, and quantitative risk modeling.",
      },
      {
        slug: "strategic-management",
        name: "Strategic Management",
        trackCode: "BUS-SPEC-02",
        academicLead: "Prof. Michael Porter",
        lab: "Strategy Suite 501",
        curriculumCycle: "2024–2025 Revised",
        enrolledCount: 76,
        description:
          "Corporate competitive advantage, organizational scaling, mergers, and global venture strategy.",
      },
      {
        slug: "business-analytics",
        name: "Business Analytics & Data Science",
        trackCode: "BUS-SPEC-03",
        academicLead: "Dr. Florence Nightingale",
        lab: "Predictive Insights Lab 402",
        curriculumCycle: "2024–2025 Revised",
        enrolledCount: 76,
        description:
          "Predictive analytics, data-driven decision frameworks, econometrics, and customer intelligence.",
      },
    ],
  },
];
