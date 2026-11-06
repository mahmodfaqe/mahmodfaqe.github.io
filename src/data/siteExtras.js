import { STATIC_PROJECTS } from "./profile";

/** Honest highlights derived from shipped portfolio data — not invented KPIs. */
export const HIGHLIGHTS = [
  {
    id: "projects",
    value: String(STATIC_PROJECTS.length),
    labelEn: "Selected projects",
    labelKu: "پڕۆژەی هەڵبژێردراو",
  },
  {
    id: "stores",
    value: String(
      STATIC_PROJECTS.filter((p) => p.app_store_url || p.play_store_url).length
    ),
    labelEn: "Apps on App Store / Play",
    labelKu: "ئەپ لە App Store / Play",
  },
  {
    id: "langs",
    value: "3",
    labelEn: "Interface languages (KU · EN · AR)",
    labelKu: "زمانی ڕووکار (کوردی · ئینگلیزی · عەرەبی)",
  },
  {
    id: "completed",
    value: String(STATIC_PROJECTS.filter((p) => p.status === "completed").length),
    labelEn: "Completed deliveries",
    labelKu: "گەیاندنی تەواوکراو",
  },
];

/**
 * Short case studies for flagship projects only.
 * Kept factual from public descriptions — no invented client quotes.
 */
export const CASE_STUDIES = {
  1: {
    challengeEn:
      "Dormitory admissions, room allocation and reporting needed one reliable system for staff and students, including mobile access.",
    challengeKu:
      "پێویست بوو وەرگرتن، دابەشکردنی ژوور و ڕاپۆرتکردن لە یەک سیستەمی متمانەپێکراودا بۆ ستاف و خوێندکار کۆ بکرێتەوە، لەگەڵ دەستگەیشتنی مۆبایل.",
    approachEn:
      "Built a Flask backend with PostgreSQL/Redis, PDF reporting and Flutter clients with push notifications; published web plus TestFlight and Play Store builds.",
    approachKu:
      "باکئێندی Flask لەگەڵ PostgreSQL/Redis، ڕاپۆرتی PDF و کڕیاری Flutter لەگەڵ ئاگاداریی پوش دروست کرا؛ وێب و بڵاوکراوەی TestFlight و Play Store.",
    outcomeEn:
      "Live at dorm.uor.edu.krd with iOS (TestFlight) and Android distribution for the University of Raparin dormitories.",
    outcomeKu:
      "لە dorm.uor.edu.krd بەردەستە لەگەڵ دابەشکردنی iOS (TestFlight) و ئەندرۆید بۆ بەشەناوخۆییەکانی زانکۆی ڕاپەڕین.",
  },
  2: {
    challengeEn:
      "Regional air-quality monitoring needed a public web view and native apps people could install from the stores.",
    challengeKu:
      "چاودێریی کوالێتیی هەوای ناوچەکە پێویستی بە بینینی گشتی لە وێب و ئەپی نەیتیڤ هەبوو کە لە ستۆرەکان دابەزێنرێت.",
    approachEn:
      "Delivered a Django service with Flutter mobile clients and Docker-based deployment, published to the App Store and Google Play.",
    approachKu:
      "خزمەتگوزاریی Django لەگەڵ کڕیاری Flutter و دیپلۆی Docker؛ بڵاوکرایەوە بۆ App Store و Google Play.",
    outcomeEn:
      "Website and store listings are live for UOR Air Quality (App Store and Play).",
    outcomeKu:
      "وێبسایت و لیستی ستۆر بۆ UOR Air Quality بەردەستن (App Store و Play).",
  },
  3: {
    challengeEn:
      "The Global Warming Research Center needed an official trilingual presence plus interactive Earth Engine tools.",
    challengeKu:
      "سەنتەری توێژینەوەی گەرمبوونی جیهانی پێویستی بە ماڵپەڕێکی فەرمیی سێ زمانە و ئامرازی Earth Engine هەبوو.",
    approachEn:
      "Implemented a Wagtail/Django site in Kurdish, English and Arabic, including GeoLab with 24 Google Earth Engine applications.",
    approachKu:
      "ماڵپەڕی Wagtail/Django بە کوردی، ئینگلیزی و عەرەبی، لەگەڵ GeoLab و ٢٤ ئەپڵیکەیشنی Google Earth Engine.",
    outcomeEn:
      "Official GWRC site is live at gwrc.uor.edu.krd with GeoLab and open-data resources.",
    outcomeKu:
      "ماڵپەڕی فەرمیی GWRC لە gwrc.uor.edu.krd بەردەستە لەگەڵ GeoLab و سەرچاوەی داتای کراوە.",
  },
};

/** Optional changelog notes for in-progress / active work. */
export const PROJECT_UPDATES = {
  9: { date: "2026-11", noteEn: "Survey charts and PDF export in active development.", noteKu: "چارتی ڕاپرسی و هەناردەی PDF لە گەشەپێداندایە." },
  10: { date: "2026-11", noteEn: "Map reporting workflows under construction.", noteKu: "ڕێڕەوی ڕاپۆرتی نەخشە لە دروستکردندایە." },
  11: { date: "2026-10", noteEn: "POS and inventory modules being assembled.", noteKu: "مۆدیوولی POS و کۆگا کۆ دەکرێنەوە." },
  12: { date: "2026-10", noteEn: "Tourism content structure in progress.", noteKu: "پێکهاتەی ناوەڕۆکی گەشتیاری لە پێشکەوتندایە." },
  13: { date: "2026-11", noteEn: "Sequence analysis endpoints expanding.", noteKu: "ئەندپۆینتەکانی شیکاریی زنجیرە فراوان دەبن." },
  15: { date: "2026-11", noteEn: "Flutter app and agency roles in progress; store links pending release.", noteKu: "ئەپی Flutter و ڕۆڵی دەزگا لە پێشکەوتندایە؛ لینکی ستۆر چاوەڕوانی بڵاوکردنەوەیە." },
};

export function getCaseStudy(projectId) {
  return CASE_STUDIES[projectId] ?? null;
}

export function getProjectUpdate(projectId) {
  return PROJECT_UPDATES[projectId] ?? null;
}
