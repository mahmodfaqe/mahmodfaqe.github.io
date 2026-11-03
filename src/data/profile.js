export const PROFILE = {
  firstName: "Mahmood",
  lastName: "Khdir",
  fullName: "Mahmood Khdir Faqe Rasul",
  role: "Biology Student and Web & Mobile Developer",
  splashRole: "Biology Student · Developer",
  affiliation: "Department of Biology, College of Science, University of Raparin",
  location: "Ranya, Kurdistan Region – Iraq",
  email: "mahmodfaqe2@gmail.com",
  phoneDisplay: "+964 770 469 2000",
  whatsapp: "https://wa.me/9647704692000",
  github: "https://github.com/mahmodfaqe",
  facebook: "https://www.facebook.com/mahmod.faqe",
  messenger: "https://m.me/mahmod.faqe",
  telegram: "https://t.me/+9647507087901",
  snapchat: "https://www.snapchat.com/add/mahmod.faqe",
  siteUrl: "https://mahmodfaqe.github.io/",
  about: `I am an undergraduate student in the Department of Biology, College of Science, University of Raparin. Alongside my studies, I design and develop web platforms and mobile applications for the university, its research centres and the life sciences. My work covers system design, backend development, mobile applications and server administration, with a particular focus on multilingual platforms in Kurdish, English and Arabic. I also provide server and VPS provisioning and management, and website security, for other clients.`,
  homeLead: `Undergraduate biologist building web platforms and mobile applications for the University of Raparin, its research centres and the life sciences — with multilingual Kurdish, English and Arabic interfaces.`,
  skillsLead:
    "Technologies I use to design, build and deploy web platforms, mobile apps and scientific tools.",
  projectsLead:
    "Selected software I designed and developed, from requirements to deployment.",
  journeyLead:
    "Education and research that shape my work across biology and software.",
  servicesLead:
    "Web, mobile and infrastructure solutions for universities, research centres and clients.",
  footerNote: "Open for academic collaboration and project enquiries",
};

export const STATIC_SKILLS = [
  { id: 1, nama: "Python", icon: "bi bi-filetype-py", color: "#3776AB" },
  { id: 2, nama: "Django", icon: "bi bi-server", color: "#092E20" },
  { id: 3, nama: "Flask", icon: "bi bi-code-slash", color: "#000000" },
  { id: 4, nama: "FastAPI", icon: "bi bi-lightning-charge-fill", color: "#009688" },
  { id: 5, nama: "Laravel", icon: "bi bi-layers-fill", color: "#FF2D20" },
  { id: 6, nama: "PostgreSQL", icon: "bi bi-database-fill", color: "#336791" },
  { id: 7, nama: "Redis", icon: "bi bi-hdd-stack-fill", color: "#DC382D" },
  { id: 8, nama: "React", icon: "bi bi-filetype-jsx", color: "#61DAFB" },
  { id: 9, nama: "Vue.js", icon: "bi bi-braces", color: "#42B883" },
  { id: 10, nama: "JavaScript", icon: "bi bi-filetype-js", color: "#F7DF1E" },
  { id: 11, nama: "Flutter", icon: "bi bi-phone-fill", color: "#02569B" },
  { id: 12, nama: "Firebase", icon: "bi bi-fire", color: "#FFCA28" },
  { id: 13, nama: "Docker", icon: "bi bi-box-seam-fill", color: "#2496ED" },
  { id: 14, nama: "Nginx", icon: "bi bi-hdd-network-fill", color: "#009639" },
  { id: 15, nama: "Linux", icon: "bi bi-terminal-fill", color: "#FCC624" },
  { id: 16, nama: "Biopython", icon: "bi bi-virus", color: "#2E7D32" },
  { id: 17, nama: "Earth Engine", icon: "bi bi-globe2", color: "#4285F4" },
  { id: 18, nama: "Supabase", icon: "bi bi-cloud-fill", color: "#3ECF8E" },
];

export const STATIC_PROJECTS = [
  {
    id: 1,
    nama: "University of Raparin Dormitory System",
    deskripsi:
      "Management system for the university dormitories: student admission, room allocation, PDF reporting and push notifications. Web application with iOS and Android apps.",
    kategori: "web-app",
    status: "completed",
    tools: ["Flask", "PostgreSQL", "Redis", "Flutter", "Firebase"],
    fitur: ["Student admission", "Room allocation", "PDF reports", "Push notifications", "iOS & Android apps"],
    preview_url: "https://dorm.uor.edu.krd",
    github_url: "",
    app_store_url: "https://testflight.apple.com/join/W3uZxt6a",
    play_store_url: "https://play.google.com/store/apps/details?id=krd.uor.dormitory",
    file: "/projects/dormitory.jpg",
  },
  {
    id: 2,
    nama: "UOR Air Quality",
    deskripsi:
      "Air-quality monitoring platform for the region, comprising a website and a mobile application on the App Store and Google Play.",
    kategori: "web-app",
    status: "completed",
    tools: ["Django", "Flutter", "Docker"],
    fitur: ["Live monitoring", "Mobile apps", "Regional coverage"],
    preview_url: "https://gwrc-airstation.uor.edu.krd",
    github_url: "",
    app_store_url: "https://apps.apple.com/us/app/uor-air-quality/id6821161186",
    play_store_url: "https://play.google.com/store/apps/details?id=edu.uor.aqkr_mobile",
    file: "/projects/air-quality.jpg",
  },
  {
    id: 3,
    nama: "Global Warming Research Center Website",
    deskripsi:
      "Official GWRC website at the University of Raparin, in Kurdish, English and Arabic, including GeoLab with 24 Google Earth Engine applications.",
    kategori: "landing-page",
    status: "completed",
    tools: ["Wagtail", "Django", "Earth Engine"],
    fitur: ["Trilingual site", "GeoLab", "24 Earth Engine apps"],
    preview_url: "https://gwrc.uor.edu.krd",
    github_url: "",
    file: "/projects/gwrc.jpg",
  },
  {
    id: 4,
    nama: "University of Raparin Research Center Website",
    deskripsi:
      "Website of the General Directorate of Research Center at the University of Raparin, in Kurdish, English and Arabic.",
    kategori: "landing-page",
    status: "completed",
    tools: ["Wagtail", "Django", "PostgreSQL"],
    fitur: ["Trilingual CMS", "Research publishing"],
    preview_url: "https://research.dormitory-uor.online",
    github_url: "",
    file: "/projects/research-center.jpg",
  },
  {
    id: 5,
    nama: "College of Science Electronic Library",
    deskripsi:
      "Digital library of the College of Science (opened 2025): public catalogue in eight languages, QR access, and an administration panel for library staff.",
    kategori: "web-app",
    status: "completed",
    tools: ["Laravel", "React", "Tailwind CSS", "SQLite"],
    fitur: ["Eight languages", "QR catalogue", "Staff admin panel"],
    preview_url: "https://scence-bio.github.io/library/",
    github_url: "",
    file: "/projects/e-library.jpg",
  },
  {
    id: 6,
    nama: "BioGuide",
    deskripsi:
      "Bilingual Kurdish–English guide to biology and medical science across ten chapters, from histology and embryology to microbiology, immunology and parasitology.",
    kategori: "landing-page",
    status: "completed",
    tools: ["HTML", "CSS", "JavaScript", "Flask"],
    fitur: ["Ten chapters", "Kurdish & English", "Microscopic structures"],
    preview_url: "https://scence-bio.github.io/Biology/",
    github_url: "",
    file: "/projects/bioguide.jpg",
  },
  {
    id: 7,
    nama: "Atlas of Entomology",
    deskripsi:
      "Open educational resource on entomology in Kurdish, Arabic and English, with interactive quizzes and a leaderboard.",
    kategori: "web-app",
    status: "completed",
    tools: ["JavaScript", "Supabase", "GitHub Actions"],
    fitur: ["Three languages", "Quizzes", "Leaderboard"],
    preview_url: "https://www.entomo.online",
    github_url: "",
    file: "/projects/entomology.jpg",
  },
  {
    id: 8,
    nama: "QR Studio Pro",
    deskripsi:
      "Kurdish-language tool for creating and scanning QR codes for text, links, Wi-Fi, contacts, locations, email, SMS and phone numbers.",
    kategori: "web-app",
    status: "completed",
    tools: ["Vue.js", "jsQR", "JavaScript"],
    fitur: ["Create & scan", "Custom colours", "Multiple payloads"],
    preview_url: "https://scence-bio.github.io/Qr-Code/",
    github_url: "",
    file: "/projects/qr-studio.jpg",
  },
  {
    id: 9,
    nama: "Quality Assurance System",
    deskripsi:
      "University quality-assurance system: surveys, evaluations and reports with charts and PDF export, in Kurdish, English and Arabic.",
    kategori: "web-app",
    status: "on going",
    tools: ["Django", "PostgreSQL", "Chart.js", "WeasyPrint"],
    fitur: ["Surveys", "Charts", "PDF export", "Trilingual"],
    preview_url: "",
    github_url: "",
    file: "/projects/quality-assurance.jpg",
  },
  {
    id: 10,
    nama: "Geospatial Reporting Platform",
    deskripsi: "Platform for collecting and mapping location-based reports.",
    kategori: "web-app",
    status: "on going",
    tools: ["Django", "Laravel", "SQLite"],
    fitur: ["Map reports", "Location collection"],
    preview_url: "",
    github_url: "",
    file: "/projects/geospatial.jpg",
  },
  {
    id: 11,
    nama: "ERP and Point-of-Sale System",
    deskripsi:
      "Business management system covering customers, products, stock, sales, invoices and returns.",
    kategori: "web-app",
    status: "on going",
    tools: ["Flask", "SQLAlchemy", "Vue.js"],
    fitur: ["POS", "Inventory", "Invoices"],
    preview_url: "",
    github_url: "",
    file: "/projects/erp-pos.jpg",
  },
  {
    id: 12,
    nama: "BoKwe Website",
    deskripsi: "Tourism services website.",
    kategori: "landing-page",
    status: "on going",
    tools: ["Flask", "SQLite"],
    fitur: ["Tourism services"],
    preview_url: "",
    github_url: "",
    file: "/projects/bokwe.jpg",
  },
  {
    id: 13,
    nama: "DNA Analytics",
    deskripsi:
      "Sequence-analysis tool for teaching and research: base composition, GC content, ORFs, codon usage and aligned FASTA comparison.",
    kategori: "web-app",
    status: "on going",
    tools: ["Python", "FastAPI", "Biopython"],
    fitur: ["GC content", "ORF detection", "FASTA comparison"],
    preview_url: "",
    github_url: "",
    file: "/projects/dna-analytics.jpg",
  },
  {
    id: 14,
    nama: "Ranya Annual Temperature Dataset (1950–2025)",
    deskripsi:
      "Open dataset of annual mean air temperature over Ranya from 1950 to 2025 (ERA5-Land), the data behind the GWRC warming stripes.",
    kategori: "landing-page",
    status: "completed",
    tools: ["ERA5-Land", "Open data", "CSV"],
    fitur: ["1950–2025 series", "Open data", "Warming stripes source"],
    preview_url: "https://gwrc.uor.edu.krd/open-data/",
    github_url: "",
    file: "/projects/temperature-dataset.jpg",
  },
  {
    id: 15,
    nama: "aqar Real-Estate Platform",
    deskripsi:
      "Real-estate platform with agency subscriptions, role-based access and interactive maps, with a Flutter mobile application.",
    kategori: "web-app",
    status: "on progress",
    tools: ["Django REST", "Flutter", "Redis"],
    fitur: ["Agency subscriptions", "Role-based access", "Maps", "Flutter app"],
    preview_url: "",
    github_url: "",
    file: "/projects/aqar.jpg",
  },
];

export const JOURNEY_CONTENT = {
  education: [
    {
      period: "In progress",
      title: "Bachelor of Science in Biology",
      place: "Department of Biology, College of Science, University of Raparin, Ranya",
      description:
        "Undergraduate studies in biology alongside applied software work for the university, research centres and life-science education.",
      icon: "bi-mortarboard-fill",
    },
  ],
  experience: [
    {
      period: "Ongoing",
      title: "Web & Mobile Developer",
      place: "University of Raparin · Research centres · Independent clients",
      description:
        "Design and develop multilingual web platforms and mobile applications, with backend systems, deployment, VPS management and website security.",
      icon: "bi-briefcase-fill",
      projects: [
        {
          name: "University platforms",
          description:
            "Dormitory system, air-quality platform, research-centre websites and college library.",
        },
        {
          name: "Life-science tools",
          description:
            "BioGuide, Atlas of Entomology, DNA Analytics and open climate datasets.",
        },
      ],
    },
    {
      period: "Graduation research",
      title: "Green Synthesis of a MgO–ZnO–CuO Ternary Nanocomposite",
      place: "Mediated by Astragalus gummifer — Department of Biology, University of Raparin",
      description:
        "Evaluation of antibacterial and antibiofilm activities (graduation research project, in progress).",
      icon: "bi-eyedropper",
      projects: [],
    },
  ],
};

export const SERVICES = [
  {
    icon: "bi-window-stack",
    title: "Website Development",
    description:
      "Modern, fast and responsive websites for universities, research centres and clients, including multilingual Kurdish, English and Arabic.",
    points: ["Institutional websites", "CMS platforms", "Responsive layout"],
  },
  {
    icon: "bi-phone",
    title: "Mobile Applications",
    description:
      "Cross-platform mobile apps with Flutter, published to the App Store and Google Play when required.",
    points: ["Flutter apps", "App Store & Play", "Push notifications"],
  },
  {
    icon: "bi-hdd-network",
    title: "Backend & Infrastructure",
    description:
      "System design, APIs, databases, Docker deployment, VPS provisioning and website security hardening.",
    points: ["Django / Flask / Laravel", "PostgreSQL & Redis", "Servers & security"],
  },
];
