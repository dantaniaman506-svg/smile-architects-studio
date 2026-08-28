import { createContext, createElement, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  treatments as seedTreatments,
  galleryItems as seedGallery,
  reviews as seedReviews,
  stats as seedStats,
  features as seedFeatures,
  processSteps as seedProcess,
  galleryCategories,
  type Treatment,
  type GalleryItem,
  type Review,
} from "./data";
import {
  address as seedAddress,
  city as seedCity,
  clinicName as seedClinicName,
  clinicShort as seedClinicShort,
  doctorCredentials as seedDoctorCredentials,
  doctorName as seedDoctorName,
  hours as seedHours,
  mapDirectionsUrl as seedMapDirectionsUrl,
  mapEmbedUrl as seedMapEmbedUrl,
  phone as seedPhone,
  phoneDisplay as seedPhoneDisplay,
  region as seedRegion,
  tagline as seedTagline,
  whatsapp as seedWhatsapp,
} from "./site";

export type EditableTreatment = Omit<Treatment, "icon"> & { iconKey?: string };
export type EditableGalleryItem = GalleryItem;
export type EditableFeature = { iconKey?: string; title: string; desc: string };
export type EditableProcessStep = { n: string; title: string; desc: string };
export type EditableHour = { day: string; time: string; closed: boolean };

export interface SiteContent {
  settings: {
    clinicName: string;
    clinicShort: string;
    tagline: string;
    doctorName: string;
    doctorCredentials: string;
    phone: string;
    phoneDisplay: string;
    whatsapp: string;
    address: string;
    city: string;
    region: string;
    mapEmbedUrl: string;
    mapDirectionsUrl: string;
    hours: EditableHour[];
  };
  home: {
    heroEyebrow: string;
    heroTitle: string;
    heroAccent: string;
    heroDescription: string;
    whyTitle: string;
    whyAccent: string;
    treatmentTitle: string;
    treatmentAccent: string;
    galleryTitle: string;
    galleryAccent: string;
    reviewsTitle: string;
    reviewsAccent: string;
    journeyTitle: string;
    journeyAccent: string;
    ctaTitle: string;
    ctaAccent: string;
    ctaDescription: string;
  };
  about: {
    intro: string;
    philosophy: string;
    philosophyDetail: string;
    specializations: string[];
  };
  treatments: EditableTreatment[];
  gallery: EditableGalleryItem[];
  reviews: Review[];
  stats: { value: string; label: string }[];
  features: EditableFeature[];
  process: EditableProcessStep[];
}

export interface PublicContent extends SiteContent {
  treatments: Treatment[];
  features: (EditableFeature & { icon: typeof seedFeatures[number]["icon"] })[];
}

const STORAGE_KEY = "tooth-wellness-cms:v1";
const SESSION_KEY = "tooth-wellness-cms:session";

const defaultContent: SiteContent = {
  settings: {
    clinicName: seedClinicName,
    clinicShort: seedClinicShort,
    tagline: seedTagline,
    doctorName: seedDoctorName,
    doctorCredentials: seedDoctorCredentials,
    phone: seedPhone,
    phoneDisplay: seedPhoneDisplay,
    whatsapp: seedWhatsapp,
    address: seedAddress,
    city: seedCity,
    region: seedRegion,
    mapEmbedUrl: seedMapEmbedUrl,
    mapDirectionsUrl: seedMapDirectionsUrl,
    hours: seedHours.map((hour) => ({ ...hour })),
  },
  home: {
    heroEyebrow: "Where Dentistry Meets Care",
    heroTitle: "Premium dental care,",
    heroAccent: "where your smile begins.",
    heroDescription:
      "a 5-star rated clinic for painless treatments, modern equipment and warm, welcoming care for every smile in the family.",
    whyTitle: "Care that's gentle,",
    whyAccent: "expertise that's modern.",
    treatmentTitle: "Complete care for",
    treatmentAccent: "every smile.",
    galleryTitle: "A space designed for",
    galleryAccent: "comfort & care.",
    reviewsTitle: "Loved by our",
    reviewsAccent: "patients.",
    journeyTitle: "Simple steps to a",
    journeyAccent: "healthier smile.",
    ctaTitle: "Ready to begin your",
    ctaAccent: "smile journey?",
    ctaDescription: "Same-week appointments available. Call or WhatsApp us for a quick consultation.",
  },
  about: {
    intro:
      "Our practice is built around three values: clinical precision, patient comfort and complete transparency. Every patient is treated like family — from the first consultation to the final follow-up.",
    philosophy: "Every patient deserves dentistry that is gentle, honest and built around them.",
    philosophyDetail:
      "From your first visit to long-term follow-ups, our team focuses on listening, explaining options clearly and treating you the way we'd treat our own family.",
    specializations: [
      "Painless Root Canal",
      "Smile Makeover",
      "Dental Implants",
      "Clear Aligners",
      "Pediatric Dentistry",
      "Cosmetic Dentistry",
      "Crowns & Bridges",
      "Teeth Whitening",
    ],
  },
  treatments: seedTreatments.map(({ icon: _icon, ...treatment }) => ({ ...treatment })),
  gallery: seedGallery.map((item) => ({ ...item })),
  reviews: seedReviews.map((review) => ({ ...review })),
  stats: seedStats.map((stat) => ({ ...stat })),
  features: seedFeatures.map(({ icon: _icon, ...feature }) => ({ ...feature })),
  process: seedProcess.map((step) => ({ ...step })),
};

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function normalizeContent(value: Partial<SiteContent> | null | undefined): SiteContent {
  const merged = {
    ...clone(defaultContent),
    ...value,
    settings: { ...clone(defaultContent.settings), ...(value?.settings ?? {}) },
    home: { ...clone(defaultContent.home), ...(value?.home ?? {}) },
    about: { ...clone(defaultContent.about), ...(value?.about ?? {}) },
    treatments: value?.treatments?.length ? value.treatments : clone(defaultContent.treatments),
    gallery: value?.gallery?.length ? value.gallery : clone(defaultContent.gallery),
    reviews: value?.reviews?.length ? value.reviews : clone(defaultContent.reviews),
    stats: value?.stats?.length ? value.stats : clone(defaultContent.stats),
    features: value?.features?.length ? value.features : clone(defaultContent.features),
    process: value?.process?.length ? value.process : clone(defaultContent.process),
  };
  return merged as SiteContent;
}

export function getEditableContent(): SiteContent {
  if (typeof window === "undefined") return clone(defaultContent);
  try {
    return normalizeContent(JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null"));
  } catch {
    return clone(defaultContent);
  }
}

export function getPublicContent(): PublicContent {
  const editable = getEditableContent();
  const iconBySlug = new Map(seedTreatments.map((treatment) => [treatment.slug, treatment.icon]));
  return {
    ...editable,
    treatments: editable.treatments.map((treatment, index) => ({
      ...treatment,
      icon: iconBySlug.get(treatment.slug) ?? seedTreatments[index % seedTreatments.length]?.icon ?? seedTreatments[0].icon,
    })),
    features: editable.features.map((feature, index) => ({
      ...feature,
      icon: seedFeatures[index % seedFeatures.length]?.icon ?? seedFeatures[0].icon,
    })),
  };
}

export function saveEditableContent(next: SiteContent): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeContent(next)));
  window.localStorage.setItem(`${STORAGE_KEY}:updated-at`, new Date().toISOString());
  window.dispatchEvent(new CustomEvent("tooth-wellness-content-updated"));
}

export function resetEditableContent(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("tooth-wellness-content-updated"));
}

export function isAdminSession(): boolean {
  return typeof window !== "undefined" && window.localStorage.getItem(SESSION_KEY) === "active";
}

export function setAdminSession(active: boolean): void {
  if (typeof window === "undefined") return;
  if (active) window.localStorage.setItem(SESSION_KEY, "active");
  else window.localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new CustomEvent("tooth-wellness-session-updated"));
}

export function getContentUpdatedAt(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(`${STORAGE_KEY}:updated-at`);
}

const ContentContext = createContext<{
  content: SiteContent;
  publicContent: PublicContent;
  lastSaved: string | null;
  save: (next: SiteContent) => void;
  reset: () => void;
}>({
  content: defaultContent,
  publicContent: getPublicContent(),
  lastSaved: null,
  save: () => undefined,
  reset: () => undefined,
});

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => getEditableContent());
  const [lastSaved, setLastSaved] = useState<string | null>(() => getContentUpdatedAt());

  useEffect(() => {
    const sync = () => {
      setContent(getEditableContent());
      setLastSaved(getContentUpdatedAt());
    };
    window.addEventListener("tooth-wellness-content-updated", sync);
    window.addEventListener("storage", sync);

    fetch("/api/content", { credentials: "include" })
      .then(async (response) => (response.ok ? response.json() : null))
      .then((remote) => {
        if (!remote) return;
        const next = normalizeContent(remote);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        window.localStorage.setItem(`${STORAGE_KEY}:updated-at`, new Date().toISOString());
        setContent(next);
        setLastSaved(new Date().toISOString());
      })
      .catch(() => undefined);

    return () => {
      window.removeEventListener("tooth-wellness-content-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const value = useMemo(
    () => ({
      content,
      publicContent: {
        ...content,
        treatments: content.treatments.map((treatment, index) => ({
          ...treatment,
          icon: new Map(seedTreatments.map((item) => [item.slug, item.icon])).get(treatment.slug) ??
            seedTreatments[index % seedTreatments.length]?.icon ?? seedTreatments[0].icon,
        })),
        features: content.features.map((feature, index) => ({
          ...feature,
          icon: seedFeatures[index % seedFeatures.length]?.icon ?? seedFeatures[0].icon,
        })),
      },
      lastSaved,
      save: (next: SiteContent) => {
        const timestamp = new Date().toISOString();
        const normalized = normalizeContent(next);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
        window.localStorage.setItem(`${STORAGE_KEY}:updated-at`, timestamp);
        setContent(normalized);
        setLastSaved(timestamp);
        window.dispatchEvent(new CustomEvent("tooth-wellness-content-updated"));
      },
      reset: () => {
        resetEditableContent();
        setContent(getEditableContent());
        setLastSaved(null);
      },
    }),
    [content, lastSaved],
  );

  return createElement(ContentContext.Provider, { value }, children);
}

export function useContent() {
  return useContext(ContentContext);
}

export { defaultContent, galleryCategories, STORAGE_KEY, SESSION_KEY };