import {
  Stethoscope,
  Radiation,
  Sparkles,
  Brush,
  ShieldCheck,
  Scissors,
  Activity,
  Crown,
  Smile,
  Sun,
  AlignJustify,
  Layers,
  Baby,
  Wand2,
  type LucideIcon,
} from "lucide-react";

const doctorImg = "/images/doctor.jpg";
const clinicExteriorImg = "/images/clinic-exterior.jpg";
const treatment1Img = "/images/treatment-room-1.jpg";
const treatment2Img = "/images/treatment-room-2.jpg";
const treatment3Img = "/images/treatment-room-3.jpg";
const consultation1Img = "/images/consultation-1.jpg";
const consultation2Img = "/images/consultation-2.jpg";
const toothPenImg = "/images/tooth-pen.jpg";

export { doctorImg, clinicExteriorImg, treatment1Img, treatment2Img, treatment3Img };

export interface Treatment {
  slug: string;
  icon: LucideIcon;
  title: string;
  short: string;
  image: string;
  benefits: string[];
  process: string[];
  faqs: { q: string; a: string }[];
}

export const treatments: Treatment[] = [
  {
    slug: "dental-implants",
    icon: Layers,
    title: "Dental Implants",
    short:
      "Permanent, natural-looking replacements for missing teeth using modern implant technology — designed to restore both function and confidence.",
    image: "",
    benefits: [
      "Looks and feels like a natural tooth",
      "Preserves jawbone and facial structure",
      "Long-lasting solution with proper care",
      "Restores full chewing power",
    ],
    process: [
      "Detailed consultation and digital X-ray",
      "Precise placement of the implant",
      "Healing period with temporary crown",
      "Final custom crown fitted on top",
    ],
    faqs: [
      { q: "Is the implant procedure painful?", a: "The procedure is performed under local anaesthesia, so you won't feel pain during placement. Mild soreness after is easily managed with medication." },
      { q: "How long do dental implants last?", a: "With good oral hygiene and regular check-ups, implants can last for decades and often a lifetime." },
    ],
  },
  {
    slug: "root-canal",
    icon: Activity,
    title: "Root Canal Treatment (RCT)",
    short:
      "Painless single-sitting and multi-sitting root canals to save infected teeth, relieve pain and restore healthy function.",
    image: "",
    benefits: [
      "Saves your natural tooth",
      "Eliminates infection and pain",
      "Performed with modern, painless techniques",
      "Quick recovery, often same-day relief",
    ],
    process: [
      "Digital X-ray and diagnosis",
      "Local anaesthesia for a pain-free experience",
      "Cleaning and shaping of the canals",
      "Sealing and final crown protection",
    ],
    faqs: [
      { q: "Is RCT really painless?", a: "Yes — modern anaesthesia and gentle techniques make root canals as comfortable as a regular filling." },
      { q: "How many visits will I need?", a: "Most cases are completed in 1–2 visits depending on the tooth and infection level." },
    ],
  },
  {
    slug: "orthodontic-treatment",
    icon: AlignJustify,
    title: "Braces & Clear Aligners",
    short:
      "Straighten teeth and correct bite issues with traditional braces or near-invisible clear aligners — for kids, teens and adults.",
    image: "",
    benefits: [
      "Straighter, more confident smile",
      "Better bite and easier cleaning",
      "Discreet aligner options available",
      "Personalised treatment planning",
    ],
    process: [
      "Smile assessment and digital records",
      "Custom treatment plan",
      "Fitting of braces or aligners",
      "Regular follow-ups till final result",
    ],
    faqs: [
      { q: "How long does treatment take?", a: "Most cases complete in 12–24 months, depending on the complexity." },
      { q: "Are clear aligners as effective as braces?", a: "For most cases, yes — aligners are a great discreet alternative and we'll recommend the best option after evaluation." },
    ],
  },
  {
    slug: "crowns-and-bridges",
    icon: Crown,
    title: "Crowns & Bridges",
    short:
      "High-quality crowns and bridges to restore damaged or missing teeth — comfortable, natural-looking and built to last.",
    image: "",
    benefits: [
      "Restores strength and shape",
      "Natural tooth-coloured finish",
      "Protects weakened teeth",
      "Fills the gap of missing teeth",
    ],
    process: [
      "Examination and tooth preparation",
      "Precise digital impressions",
      "Lab-crafted custom crown / bridge",
      "Final fitting and bite check",
    ],
    faqs: [
      { q: "How long do crowns last?", a: "Quality crowns typically last 10–15 years or longer with good care." },
      { q: "Will my crown look natural?", a: "Yes — modern ceramic crowns are matched to your tooth shade for a seamless smile." },
    ],
  },
  {
    slug: "teeth-whitening",
    icon: Sparkles,
    title: "Teeth Whitening",
    short:
      "Professional in-office whitening for a noticeably brighter, more confident smile — safe, fast and effective.",
    image: "",
    benefits: [
      "Visibly whiter teeth in one sitting",
      "Safe, dentist-supervised procedure",
      "Removes years of stains",
      "Boosts confidence instantly",
    ],
    process: [
      "Oral health check and cleaning",
      "Gum protection applied",
      "Whitening gel + light activation",
      "Post-care guidance for lasting results",
    ],
    faqs: [
      { q: "Is whitening safe for enamel?", a: "Yes — professional whitening is enamel-safe when performed by a qualified dentist." },
      { q: "How long do results last?", a: "Results typically last 6–12 months and longer with good oral care and avoiding staining foods." },
    ],
  },
  {
    slug: "scaling-polishing",
    icon: Brush,
    title: "Scaling & Polishing",
    short:
      "Professional ultrasonic cleaning to remove plaque, tartar and stains — keeping gums healthy and breath fresh.",
    image: "",
    benefits: [
      "Removes hardened tartar safely",
      "Prevents gum disease and cavities",
      "Brighter, fresher smile",
      "Recommended every 6 months",
    ],
    process: [
      "Gum and oral health assessment",
      "Ultrasonic scaling",
      "Polishing for a smooth finish",
      "Personalised home-care tips",
    ],
    faqs: [
      { q: "Does scaling weaken teeth?", a: "No — scaling only removes deposits. It actually protects enamel and gums from disease." },
      { q: "How often should I get it done?", a: "We recommend a professional cleaning every 6 months." },
    ],
  },
  {
    slug: "dental-filling",
    icon: ShieldCheck,
    title: "Tooth-Coloured Fillings",
    short:
      "Aesthetic, mercury-free composite fillings for cavities and chipped teeth — natural-looking and durable.",
    image: "",
    benefits: [
      "Matches your natural tooth colour",
      "Restores tooth strength",
      "Single-sitting procedure",
      "Mercury-free, biocompatible",
    ],
    process: [
      "Cavity detection and X-ray if needed",
      "Gentle removal of decay",
      "Layered composite filling",
      "Polishing and bite check",
    ],
    faqs: [
      { q: "How long do composite fillings last?", a: "With good care, 7–10 years on average." },
      { q: "Is the procedure painful?", a: "Most fillings are quick and painless — local anaesthesia is used if needed." },
    ],
  },
  {
    slug: "tooth-extraction",
    icon: Scissors,
    title: "Tooth Extraction",
    short:
      "Safe, comfortable removal of damaged, loose or problematic teeth — including simple and surgical extractions.",
    image: "",
    benefits: [
      "Relieves pain quickly",
      "Prevents further infection",
      "Gentle, painless procedure",
      "Clear post-care guidance",
    ],
    process: [
      "Evaluation and X-ray",
      "Local anaesthesia",
      "Gentle extraction",
      "Aftercare instructions",
    ],
    faqs: [
      { q: "Will the extraction hurt?", a: "You'll feel only pressure during the procedure — not pain — thanks to anaesthesia." },
      { q: "How long is recovery?", a: "Most patients feel normal within 2–3 days with proper aftercare." },
    ],
  },
  {
    slug: "dentures",
    icon: Smile,
    title: "Dentures",
    short:
      "Complete and partial dentures crafted for comfort, function and a natural appearance — restoring your smile and confidence.",
    image: "",
    benefits: [
      "Comfortable, well-fitted design",
      "Restores chewing and speech",
      "Natural-looking aesthetics",
      "Affordable tooth replacement",
    ],
    process: [
      "Detailed impressions",
      "Custom fabrication in lab",
      "Trial fitting and adjustments",
      "Final delivery and care guidance",
    ],
    faqs: [
      { q: "Are dentures uncomfortable?", a: "Modern dentures are designed for a snug, comfortable fit and feel natural after a short adjustment period." },
      { q: "How do I care for dentures?", a: "Clean them daily with a denture brush and soak overnight in a recommended solution." },
    ],
  },
  {
    slug: "pediatric-dentistry",
    icon: Baby,
    title: "Pediatric Dentistry",
    short:
      "Gentle, child-friendly dental care for infants, kids and teens — building positive dental habits from the start.",
    image: "",
    benefits: [
      "Friendly, fear-free environment",
      "Preventive care and education",
      "Cavity treatment and fluoride therapy",
      "Habit counselling for parents",
    ],
    process: [
      "Easy-going first visit",
      "Gentle examination",
      "Preventive cleaning / treatment",
      "Parent guidance for home care",
    ],
    faqs: [
      { q: "When should my child first visit?", a: "By age 1 or within 6 months of the first tooth appearing." },
      { q: "How do you make kids comfortable?", a: "We use a calm, friendly approach with simple language and gentle handling." },
    ],
  },
  {
    slug: "cosmetic-dentistry",
    icon: Wand2,
    title: "Cosmetic Dentistry",
    short:
      "Smile makeovers including veneers, bonding, whitening and aesthetic re-shaping — designed around your features.",
    image: "",
    benefits: [
      "Custom smile design",
      "Long-lasting, natural finish",
      "Boosts confidence dramatically",
      "Combines multiple treatments seamlessly",
    ],
    process: [
      "Smile consultation and photos",
      "Digital smile preview",
      "Treatment plan and timeline",
      "Step-by-step transformation",
    ],
    faqs: [
      { q: "Will it look natural?", a: "Absolutely — every smile is custom-designed to match your features and complexion." },
      { q: "How long does a makeover take?", a: "Anywhere from 1 week to a few months, depending on procedures chosen." },
    ],
  },
  {
    slug: "digital-x-ray",
    icon: Radiation,
    title: "Digital X-Ray",
    short:
      "Instant, high-resolution digital X-rays for accurate diagnosis with up to 80% less radiation than traditional X-rays.",
    image: "",
    benefits: [
      "Up to 80% lower radiation",
      "Instant on-screen results",
      "Highly accurate diagnosis",
      "Eco-friendly, film-free process",
    ],
    process: [
      "Quick positioning",
      "Single-click capture",
      "Image reviewed instantly with you",
      "Clear treatment recommendations",
    ],
    faqs: [
      { q: "Is digital X-ray safe?", a: "Yes — it uses significantly less radiation than conventional X-rays and is considered very safe." },
      { q: "How long does it take?", a: "The X-ray itself takes only a few seconds." },
    ],
  },
  {
    slug: "consultation",
    icon: Stethoscope,
    title: "Dental Consultation",
    short:
      "A detailed oral evaluation and personalised treatment plan, so you know exactly what your smile needs.",
    image: "",
    benefits: [
      "Detailed oral health check",
      "Personalised treatment plan",
      "Transparent cost discussion",
      "All your questions answered",
    ],
    process: [
      "Medical and dental history",
      "Thorough oral examination",
      "Digital X-ray if needed",
      "Clear plan with options",
    ],
    faqs: [
      { q: "Is consultation needed even without pain?", a: "Yes — regular check-ups catch issues early and save you bigger treatments later." },
      { q: "Will I be pressured into treatment?", a: "Never. We share honest advice and respect your decision." },
    ],
  },
  {
    slug: "smile-makeover",
    icon: Sun,
    title: "Smile Makeover",
    short:
      "A complete transformation combining whitening, veneers, alignment and shaping — for the smile you've always wanted.",
    image: "",
    benefits: [
      "Tailored to your face and personality",
      "Combines multiple treatments",
      "Dramatic, lasting results",
      "Boosts overall confidence",
    ],
    process: [
      "Smile consultation",
      "Digital smile design preview",
      "Phased treatment plan",
      "Reveal of your new smile",
    ],
    faqs: [
      { q: "Will my new smile look fake?", a: "No — we design every smile to look naturally yours, only better." },
      { q: "Can I see the result before starting?", a: "Yes, we can show you a digital preview before any treatment begins." },
    ],
  },
];

export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: "clinic" | "treatment-room" | "equipment" | "branding";
  aspect: "square" | "portrait" | "wide";
}

export const galleryItems: GalleryItem[] = [
  { id: 1, src: clinicExteriorImg, alt: "The Tooth Wellness Dental Clinic exterior in Kharar", category: "clinic", aspect: "portrait" },
  { id: 2, src: treatment1Img, alt: "Modern dental treatment room — wide view with mirror", category: "treatment-room", aspect: "portrait" },
  { id: 3, src: doctorImg, alt: "Dr. Manisha, BDS — Dental Surgeon", category: "clinic", aspect: "portrait" },
  { id: 4, src: treatment3Img, alt: "Dental chair and equipment setup", category: "equipment", aspect: "portrait" },
  { id: 5, src: consultation2Img, alt: "Consultation desk with framed certifications", category: "clinic", aspect: "portrait" },
  { id: 6, src: treatment2Img, alt: "Treatment room with dental chair and overhead monitor", category: "treatment-room", aspect: "portrait" },
  { id: 7, src: consultation1Img, alt: "Doctor's consultation seating area", category: "clinic", aspect: "portrait" },
  { id: 8, src: toothPenImg, alt: "Branded Dr. Manisha tooth-shaped desk accessory", category: "branding", aspect: "portrait" },
];

export interface Review {
  name: string;
  date: string;
  rating: number;
  text: string;
}

export const reviews: Review[] = [
  { name: "Prachi Ramgarhia", date: "Recent", rating: 5, text: "It was good experience to take dental care from Dr Manisha. I was fully satisfied. Best dental clinic and very painless treatment. I am very happy." },
  { name: "Tushar Dhiman", date: "Recent", rating: 5, text: "Had a great experience at The Tooth Wellness. The doctor is very polite and professional. The treatment was done carefully." },
  { name: "Aastha Rana", date: "Recent", rating: 5, text: "A clinic with modern equipment and great patient care. Very hygienic environment and professional service." },
  { name: "Ravish Bishnoi", date: "Recent", rating: 5, text: "I was having a lot of pain in my teeth and after visiting here I got relief. Highly recommended." },
  { name: "Rahul Patyal", date: "Recent", rating: 5, text: "Great experience from start to finish. Friendly, professional and reliable." },
  { name: "Rohan Kumar", date: "Recent", rating: 5, text: "Doctor and receptionist both are very cooperative. I felt comfortable during my treatment." },
  { name: "Thaman Bahadur", date: "Recent", rating: 5, text: "Excellent capping treatment by Dr. Manisha. Comfortable procedure and perfect fit for my tooth." },
  { name: "Shubham Tyagi", date: "Recent", rating: 5, text: "An excellent dentist with great knowledge and experience in teeth treatment." },
  { name: "Hari Chand", date: "Recent", rating: 5, text: "One of the best experiences with professional procedures." },
  { name: "Evan Bhandari", date: "Recent", rating: 5, text: "Good behaviour and very professional treatment." },
  { name: "Anjali Tanwar", date: "Recent", rating: 5, text: "Loved the experience here. Highly recommended for dental care." },
];

export const stats = [
  { value: "5.0", label: "Google Rating" },
  { value: "20+", label: "5-Star Reviews" },
  { value: "2000+", label: "Happy Smiles" },
  { value: "100%", label: "Painless Care" },
];

import {
  Award,
  HeartHandshake,
  ShieldCheck as Shield2,
  Clock,
  Users,
  Wand2 as Wand,
  Stars,
  Baby as BabyIcon,
  IndianRupee,
  Sparkles as SparklesIcon,
  Microscope,
  ThumbsUp,
} from "lucide-react";

export const features = [
  { icon: Award, title: "Experienced Dentist", desc: "Treatments led by Dr. Manisha (BDS) with years of clinical expertise." },
  { icon: Microscope, title: "Modern Equipment", desc: "Up-to-date dental chairs, digital X-ray and advanced sterilisation." },
  { icon: SparklesIcon, title: "Painless Treatment", desc: "Gentle techniques and modern anaesthesia for a stress-free visit." },
  { icon: Shield2, title: "Hygienic Environment", desc: "Strictly sterilised instruments and clean treatment rooms." },
  { icon: HeartHandshake, title: "Friendly Staff", desc: "Warm, patient-first approach for adults and kids alike." },
  { icon: IndianRupee, title: "Affordable Care", desc: "Transparent pricing with treatments planned around your budget." },
  { icon: BabyIcon, title: "Child Friendly", desc: "Specialised approach so kids feel safe and comfortable." },
  { icon: Stars, title: "5-Star Google Rated", desc: "20+ verified five-star reviews from happy patients." },
  { icon: Clock, title: "6 Days a Week", desc: "Open Monday to Saturday, 10 AM – 8 PM for your convenience." },
  { icon: ThumbsUp, title: "Personalised Plans", desc: "Every smile is unique — your treatment plan is too." },
  { icon: Wand, title: "Cosmetic Expertise", desc: "Smile makeovers, whitening and veneers tailored to your features." },
  { icon: Users, title: "High Patient Satisfaction", desc: "Loved by families across Kharar and Mohali." },
];

export const processSteps = [
  { n: "01", title: "Consultation", desc: "We listen, examine and understand your concerns in detail." },
  { n: "02", title: "Custom Plan", desc: "A clear, transparent plan with treatment options and pricing." },
  { n: "03", title: "Gentle Treatment", desc: "Painless procedures with modern equipment and care." },
  { n: "04", title: "Lasting Smile", desc: "Follow-up and home-care guidance to keep your smile healthy." },
];

export const galleryCategories = [
  { key: "all", label: "All" },
  { key: "clinic", label: "Clinic" },
  { key: "treatment-room", label: "Treatment Rooms" },
  { key: "equipment", label: "Equipment" },
  { key: "branding", label: "Branding" },
] as const;
