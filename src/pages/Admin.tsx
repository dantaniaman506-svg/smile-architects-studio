import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Activity, ArrowUpRight, BarChart3, Check, ChevronDown, ChevronLeft, CircleHelp, Clock3,
  Copy, Eye, FileText, Globe2, Image as ImageIcon, LayoutDashboard, LogOut, Menu,
  MessageSquareQuote, MoreHorizontal, Plus, Save, Search, Settings, ShieldCheck,
  Sparkles, Trash2, Upload, Users, X,
} from "lucide-react";
import { useContent, isAdminSession, setAdminSession, type SiteContent, type EditableTreatment } from "@/lib/content";

type Section = "dashboard" | "content" | "media" | "settings";
type Collection = "home" | "treatments" | "gallery" | "reviews" | "stats" | "features" | "process";

const ADMIN_PASSWORD = "SmileAdmin@2026";

const navSections: { id: Section; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "content", label: "Website content", icon: FileText },
  { id: "media", label: "Media library", icon: ImageIcon },
  { id: "settings", label: "Clinic settings", icon: Settings },
];

const collectionLabels: Record<Collection, string> = {
  home: "Homepage",
  treatments: "Treatments",
  gallery: "Gallery",
  reviews: "Reviews",
  stats: "Stats",
  features: "Features",
  process: "Patient journey",
};

const inputClass = "admin-input";
const buttonClass = "admin-button";

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(isAdminSession);
  useEffect(() => {
    const sync = () => setAuthenticated(isAdminSession());
    window.addEventListener("tooth-wellness-session-updated", sync);
    return () => window.removeEventListener("tooth-wellness-session-updated", sync);
  }, []);

  if (!authenticated) return <AdminLogin onSuccess={() => setAuthenticated(true)} />;
  return <AdminWorkspace onLogout={() => { setAdminSession(false); setAuthenticated(false); }} />;
}

function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });
      if (response.ok) {
        const payload = await response.json();
        if (payload?.ok) {
          setAdminSession(remember);
          onSuccess();
          navigate("/admin/dashboard");
          return;
        }
      }
      if (response.status === 401) {
        setError("That password doesn't match. Please try again.");
        return;
      }
    } catch {
      // Vite's local editor has no serverless API; use the local MVP password below.
    }
    if (password !== ADMIN_PASSWORD) {
      setError("That password doesn't match. Please try again.");
      return;
    }
    setAdminSession(remember);
    onSuccess();
    navigate("/admin/dashboard");
  };
  return (
    <main className="admin-login">
      <div className="admin-login-panel">
        <Link to="/" className="admin-back-link"><ChevronLeft size={16} /> Back to public site</Link>
        <div className="admin-login-mark"><span>TW</span><small>Website editor</small></div>
        <div className="admin-login-statement">
          <p className="admin-kicker">The Tooth Wellness</p>
          <h1>A calmer way to care for your clinic's front door.</h1>
          <p>Keep every word, image and treatment detail feeling as thoughtful as the care behind it.</p>
        </div>
        <div className="admin-tooth-line"><span>◌</span><i /><span>✦</span></div>
      </div>
      <div className="admin-login-form-wrap">
        <form className="admin-login-form" onSubmit={submit}>
          <div className="admin-form-heading">
            <span className="admin-eyebrow"><ShieldCheck size={14} /> Private workspace</span>
            <h2>Welcome back</h2>
            <p>Sign in to update your public website.</p>
          </div>
          <label className="admin-label">Admin password
            <div className="admin-password-wrap">
              <input data-testid="input-admin-password" autoComplete="current-password" className={inputClass} type={showPassword ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} autoFocus placeholder="Enter your password" />
              <button type="button" className="admin-password-toggle" onClick={() => setShowPassword((value) => !value)}>{showPassword ? "Hide" : "Show"}</button>
            </div>
          </label>
          {error && <p className="admin-error" data-testid="status-admin-login-error">{error}</p>}
          <label className="admin-check"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Keep me signed in on this browser</label>
          <button data-testid="button-admin-sign-in" className={`${buttonClass} admin-primary-button`} type="submit">Sign in <ArrowUpRight size={16} /></button>
          <p className="admin-local-note"><CircleHelp size={14} /> Local editor mode: changes stay in this browser until GitHub publishing is connected.</p>
        </form>
      </div>
    </main>
  );
}

function AdminWorkspace({ onLogout }: { onLogout: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { content, lastSaved, save, reset } = useContent();
  const [mobileNav, setMobileNav] = useState(false);
  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState(false);
  const routeSection: Section = location.pathname.includes("/content") ? "content" : location.pathname.includes("/media") ? "media" : location.pathname.includes("/settings") ? "settings" : "dashboard";
  const [section, setSection] = useState<Section>(routeSection);
  const [collection, setCollection] = useState<Collection>("home");

  useEffect(() => setSection(routeSection), [routeSection]);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const persist = (next: SiteContent, message = "Changes saved locally") => {
    setSaving(true);
    save(next);
    window.setTimeout(() => { setSaving(false); setToast(message); }, 220);
  };
  const publish = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(content),
      });
      const responseBody = await response.text();
      const isApiResponse = response.headers.get("content-type")?.includes("application/json");
      if (!response.ok || !isApiResponse) {
        setToast(response.status === 401 ? "Sign in again to publish" : "GitHub publishing is not configured yet");
      } else {
        setToast("Published to GitHub — Vercel will redeploy");
      }
    } catch {
      setToast("GitHub publishing is not configured yet");
    } finally {
      setSaving(false);
    }
  };

  const go = (next: Section) => {
    setMobileNav(false);
    setSection(next);
    navigate(`/admin/${next}`);
  };

  return (
    <div className="admin-app">
      <aside className={`admin-sidebar ${mobileNav ? "is-open" : ""}`}>
        <div className="admin-sidebar-head">
          <div className="admin-logo">TW</div>
          <div><strong>The Tooth Wellness</strong><span>Website editor</span></div>
          <button className="admin-mobile-close" onClick={() => setMobileNav(false)}><X size={18} /></button>
        </div>
        <div className="admin-sync-pill"><span className="admin-live-dot" /> Published · synced locally</div>
        <nav className="admin-nav">
          <p className="admin-nav-label">Workspace</p>
          {navSections.map(({ id, label, icon: Icon }) => (
            <button data-testid={`button-nav-${id}`} key={id} onClick={() => go(id)} className={`admin-nav-item ${section === id ? "is-active" : ""}`}><Icon size={17} />{label}{id === "content" && <span className="admin-nav-count">{content.treatments.length}</span>}</button>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <Link to="/" className="admin-view-link"><Eye size={16} /> View live site <ArrowUpRight size={14} /></Link>
          <button className="admin-logout" onClick={onLogout}><LogOut size={16} /> Sign out</button>
        </div>
      </aside>
      {mobileNav && <button className="admin-sidebar-scrim" aria-label="Close navigation" onClick={() => setMobileNav(false)} />}
      <div className="admin-main">
        <header className="admin-topbar">
          <button className="admin-menu-button" onClick={() => setMobileNav(true)}><Menu size={19} /></button>
          <div><p className="admin-topbar-kicker">The Tooth Wellness / Editor</p><h1>{section === "dashboard" ? "Good morning, Dr. Manisha" : section === "content" ? "Website content" : section === "media" ? "Media library" : "Clinic settings"}</h1></div>
          <div className="admin-topbar-actions">
            <span className={`admin-save-status ${saving ? "is-saving" : ""}`}><span className="admin-status-dot" />{saving ? "Saving locally…" : lastSaved ? `Saved ${formatRelative(lastSaved)}` : "No changes yet"}</span>
            <Link to="/" className="admin-preview-button"><Eye size={15} /> Preview</Link>
          </div>
        </header>
        <div className="admin-pulse-rule"><span /></div>
        <main className="admin-canvas">
          {section === "dashboard" && <Dashboard content={content} lastSaved={lastSaved} onNavigate={go} onPublish={publish} />}
          {section === "content" && <ContentWorkbench content={content} collection={collection} setCollection={setCollection} persist={persist} reset={reset} />}
          {section === "media" && <MediaLibrary content={content} persist={persist} />}
          {section === "settings" && <SettingsEditor content={content} persist={persist} onPublish={publish} />}
        </main>
      </div>
      {toast && <div className="admin-toast"><Check size={16} /> {toast}</div>}
    </div>
  );
}

function Dashboard({ content, lastSaved, onNavigate, onPublish }: { content: SiteContent; lastSaved: string | null; onNavigate: (section: Section) => void; onPublish: () => void }) {
  const health = [
    { label: "Clinic settings", count: "12 / 12 fields", value: 100, tone: "gold" },
    { label: "Homepage story", count: "17 / 17 fields", value: 100, tone: "sage" },
    { label: "Treatments", count: `${content.treatments.length} ready`, value: 100, tone: "brown" },
    { label: "Gallery", count: `${content.gallery.length} images`, value: 88, tone: "cocoa" },
  ];
  return (
    <div className="admin-page-entry">
      <section className="admin-welcome-band"><div><span className="admin-eyebrow"><Sparkles size={14} /> Your clinic workspace</span><h2>Your website is ready for its next small improvement.</h2><p>Keep your public presence as warm, clear and current as your clinic.</p></div><div className="admin-welcome-stamp"><Activity size={19} /><strong>Live editor</strong><span>Changes sync instantly</span></div></section>
      <div className="admin-dashboard-grid">
        <section className="admin-card admin-health-card"><CardHeading eyebrow="At a glance" title="Content health" action={<span className="admin-complete-badge"><Check size={13} /> 96% complete</span>} /><div className="admin-health-list">{health.map((item) => <div className="admin-health-row" key={item.label}><div className="admin-health-label"><span>{item.label}</span><small>{item.count}</small></div><div className="admin-progress"><span className={`tone-${item.tone}`} style={{ width: `${item.value}%` }} /></div></div>)}</div></section>
        <section className="admin-card admin-status-card"><CardHeading eyebrow="Publishing" title="Your workspace status" /><div className="admin-publishing-mark"><Globe2 size={22} /><div><strong>Synced locally</strong><span>{lastSaved ? `Last saved ${formatRelative(lastSaved)}` : "Ready for your first update"}</span></div></div><p className="admin-card-note">Your edits are safe in this browser. Publish to GitHub when the deployment connection is configured.</p><div className="admin-status-actions"><button className={`${buttonClass} admin-primary-button`} onClick={onPublish}><Globe2 size={14} /> Publish to GitHub</button><button className={buttonClass} onClick={() => onNavigate("settings")}>Settings <ArrowUpRight size={15} /></button></div></section>
      </div>
      <div className="admin-dashboard-lower"><section className="admin-card admin-updates-card"><CardHeading eyebrow="Activity" title="Recent updates" action={<span className="admin-muted-meta">Today</span>} /><div className="admin-timeline"><TimelineItem icon={<Settings size={15} />} title="Clinic settings are ready" detail={`${content.settings.city} · ${content.settings.phoneDisplay}`} /><TimelineItem icon={<ImageIcon size={15} />} title={`${content.gallery.length} images in your gallery`} detail="Media library is looking healthy" /><TimelineItem icon={<MessageSquareQuote size={15} />} title={`${content.reviews.length} patient reviews published`} detail="Social proof is up to date" /></div></section><section className="admin-card admin-quick-card"><CardHeading eyebrow="Shortcuts" title="Quick actions" /><QuickAction icon={<FileText size={17} />} title="Edit homepage" onClick={() => { onNavigate("content"); }} /><QuickAction icon={<Plus size={17} />} title="Add treatment" onClick={() => { onNavigate("content"); }} /><QuickAction icon={<Upload size={17} />} title="Add an image" onClick={() => onNavigate("media")} /></section></div>
      <div className="admin-dashboard-footer"><Clock3 size={14} /> Changes are stored locally on this device <span /> <button onClick={() => onNavigate("settings")}>Manage publishing</button></div>
    </div>
  );
}

function ContentWorkbench({ content, collection, setCollection, persist, reset }: { content: SiteContent; collection: Collection; setCollection: (collection: Collection) => void; persist: (next: SiteContent, message?: string) => void; reset: () => void }) {
  return <div className="admin-page-entry admin-content-page"><div className="admin-section-intro"><div><span className="admin-eyebrow"><FileText size={14} /> Editorial workspace</span><h2>Make your website feel like you.</h2><p>Every field below maps to content your visitors see on the public site.</p></div><button className={buttonClass} onClick={() => window.open("/", "_blank")}><Eye size={15} /> Open live preview</button></div><div className="admin-workbench"><div className="admin-collection-list"><p className="admin-nav-label">Collections</p>{(Object.keys(collectionLabels) as Collection[]).map((id) => <button data-testid={`button-collection-${id}`} key={id} className={`admin-collection-item ${collection === id ? "is-active" : ""}`} onClick={() => setCollection(id)}><span>{collectionLabels[id]}</span><ChevronDown size={14} className={collection === id ? "rotate-180" : ""} /></button>)}<div className="admin-collection-help"><CircleHelp size={16} /><p>Tip: save small changes often. Your public site updates when you save.</p></div></div><div className="admin-editor-pane"><CollectionEditor collection={collection} content={content} persist={persist} reset={reset} /></div></div></div>;
}

function CollectionEditor({ collection, content, persist, reset }: { collection: Collection; content: SiteContent; persist: (next: SiteContent, message?: string) => void; reset: () => void }) {
  if (collection === "home") return <HomeEditor content={content} persist={persist} reset={reset} />;
  if (collection === "treatments") return <TreatmentsEditor content={content} persist={persist} />;
  if (collection === "gallery") return <GalleryEditor content={content} persist={persist} />;
  if (collection === "reviews") return <ReviewsEditor content={content} persist={persist} />;
  if (collection === "stats") return <SimpleListEditor title="Stats" description="The proof points shown on your homepage." items={content.stats} fields={["value", "label"]} onSave={(items) => persist({ ...content, stats: items as SiteContent["stats"] }, "Stats saved locally")} />;
  if (collection === "features") return <SimpleListEditor title="Why choose us" description="The reasons families choose your clinic." items={content.features} fields={["title", "desc"]} onSave={(items) => persist({ ...content, features: items as SiteContent["features"] }, "Features saved locally")} />;
  return <SimpleListEditor title="Patient journey" description="The four steps visitors see before booking." items={content.process} fields={["n", "title", "desc"]} onSave={(items) => persist({ ...content, process: items as SiteContent["process"] }, "Journey saved locally")} />;
}

function HomeEditor({ content, persist, reset }: { content: SiteContent; persist: (next: SiteContent, message?: string) => void; reset: () => void }) {
  const [draft, setDraft] = useState(content.home);
  useEffect(() => setDraft(content.home), [content.home]);
  const update = (key: keyof SiteContent["home"], value: string) => setDraft((current) => ({ ...current, [key]: value }));
  return <EditorFrame eyebrow="Homepage" title="Your front door" description="Shape the words that welcome new patients." onSave={() => persist({ ...content, home: draft }, "Homepage saved locally")} onReset={reset}><div className="admin-form-grid"><TextField label="Eyebrow" value={draft.heroEyebrow} onChange={(v) => update("heroEyebrow", v)} /><TextField label="Main headline" value={draft.heroTitle} onChange={(v) => update("heroTitle", v)} /><TextField label="Headline accent" value={draft.heroAccent} onChange={(v) => update("heroAccent", v)} /><TextField label="Why-us headline" value={draft.whyTitle} onChange={(v) => update("whyTitle", v)} /><TextField label="Why-us accent" value={draft.whyAccent} onChange={(v) => update("whyAccent", v)} /><TextField label="Treatments headline" value={draft.treatmentTitle} onChange={(v) => update("treatmentTitle", v)} /><TextField label="Treatments accent" value={draft.treatmentAccent} onChange={(v) => update("treatmentAccent", v)} /><TextField label="Gallery headline" value={draft.galleryTitle} onChange={(v) => update("galleryTitle", v)} /><TextField label="Gallery accent" value={draft.galleryAccent} onChange={(v) => update("galleryAccent", v)} /><TextField label="Reviews headline" value={draft.reviewsTitle} onChange={(v) => update("reviewsTitle", v)} /><TextField label="Reviews accent" value={draft.reviewsAccent} onChange={(v) => update("reviewsAccent", v)} /><TextField label="Journey headline" value={draft.journeyTitle} onChange={(v) => update("journeyTitle", v)} /><TextField label="Journey accent" value={draft.journeyAccent} onChange={(v) => update("journeyAccent", v)} /><TextAreaField label="Hero description" value={draft.heroDescription} onChange={(v) => update("heroDescription", v)} /><TextAreaField label="CTA description" value={draft.ctaDescription} onChange={(v) => update("ctaDescription", v)} /><TextField label="CTA headline" value={draft.ctaTitle} onChange={(v) => update("ctaTitle", v)} /><TextField label="CTA accent" value={draft.ctaAccent} onChange={(v) => update("ctaAccent", v)} /></div></EditorFrame>;
}

function TreatmentsEditor({ content, persist }: { content: SiteContent; persist: (next: SiteContent, message?: string) => void }) {
  const [selected, setSelected] = useState(content.treatments[0]?.slug ?? "");
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState<EditableTreatment | null>(content.treatments[0] ?? null);
  useEffect(() => { const found = content.treatments.find((item) => item.slug === selected) ?? content.treatments[0]; setDraft(found ?? null); }, [content.treatments, selected]);
  const visible = content.treatments.filter((treatment) => treatment.title.toLowerCase().includes(query.toLowerCase()));
  const select = (slug: string) => { setSelected(slug); setDraft(content.treatments.find((item) => item.slug === slug) ?? null); };
  const update = (key: keyof EditableTreatment, value: string | string[] | { q: string; a: string }[]) => setDraft((current) => current ? ({ ...current, [key]: value } as EditableTreatment) : current);
  const saveTreatment = () => { if (!draft) return; persist({ ...content, treatments: content.treatments.map((item) => item.slug === draft.slug ? draft : item) }, "Treatment saved locally"); };
  const add = () => { const slug = `new-treatment-${Date.now()}`; const item: EditableTreatment = { slug, title: "New treatment", short: "Add a clear description for your patients.", image: "", benefits: ["Add a benefit"], process: ["Add a process step"], faqs: [{ q: "Common question", a: "Add the answer." }] }; persist({ ...content, treatments: [...content.treatments, item] }, "New treatment added"); setSelected(slug); };
  const remove = () => { if (!draft || !window.confirm(`Remove “${draft.title}” from the website?`)) return; const next = content.treatments.filter((item) => item.slug !== draft.slug); persist({ ...content, treatments: next }, "Treatment removed"); setSelected(next[0]?.slug ?? ""); };
  return <div className="admin-treatment-editor"><div className="admin-editor-heading"><div><span className="admin-eyebrow"><Activity size={14} /> Treatment collection</span><h2>Care, clearly explained.</h2><p>Edit treatment pages, images and patient-facing details.</p></div><button className={`${buttonClass} admin-primary-button`} onClick={add}><Plus size={16} /> Add treatment</button></div><div className="admin-treatment-layout"><div className="admin-treatment-list"><div className="admin-search"><Search size={15} /><input aria-label="Search treatments" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search treatments" /></div><div className="admin-list-count">{visible.length} treatments</div>{visible.map((treatment) => <button data-testid={`button-treatment-${treatment.slug}`} key={treatment.slug} className={`admin-treatment-row ${draft?.slug === treatment.slug ? "is-active" : ""}`} onClick={() => select(treatment.slug)}><div className="admin-thumb">{treatment.image ? <img src={treatment.image} alt="" /> : <Activity size={16} />}</div><span><strong>{treatment.title}</strong><small>Published · edited today</small></span><ChevronLeft size={15} className="admin-row-arrow" /></button>)}</div>{draft && <div className="admin-record-editor"><div className="admin-record-top"><div><span className="admin-record-status"><span /> Published</span><h3>{draft.title}</h3></div><button className="admin-icon-button danger" aria-label="Delete treatment" onClick={remove}><Trash2 size={16} /></button></div><TextField label="Treatment name" value={draft.title} onChange={(v) => update("title", v)} /><TextAreaField label="Short description" value={draft.short} onChange={(v) => update("short", v)} /><TextField label="Image URL" value={draft.image} onChange={(v) => update("image", v)} placeholder="/images/treatments/your-image.jpg or https://..." /><ArrayField label="Benefits" items={draft.benefits} onChange={(items) => update("benefits", items)} /><ArrayField label="Process steps" items={draft.process} onChange={(items) => update("process", items)} /><FaqField faqs={draft.faqs} onChange={(faqs) => update("faqs", faqs)} /><div className="admin-editor-actions"><button className={buttonClass} onClick={saveTreatment}><Save size={15} /> Save treatment</button><span>Saved to this browser</span></div></div>}</div></div>;
}

function GalleryEditor({ content, persist }: { content: SiteContent; persist: (next: SiteContent, message?: string) => void }) {
  const [selected, setSelected] = useState(content.gallery[0]?.id ?? 0);
  const [draft, setDraft] = useState(content.gallery[0] ?? null);
  useEffect(() => setDraft(content.gallery.find((item) => item.id === selected) ?? content.gallery[0] ?? null), [content.gallery, selected]);
  const update = (key: "src" | "alt" | "category" | "aspect", value: string) => setDraft((current) => current ? ({ ...current, [key]: value }) : current);
  const saveGallery = () => { if (!draft) return; persist({ ...content, gallery: content.gallery.map((item) => item.id === draft.id ? draft : item) }, "Gallery item saved locally"); };
  const add = () => { const id = Math.max(0, ...content.gallery.map((item) => item.id)) + 1; const item = { id, src: "", alt: "New clinic image", category: "clinic" as const, aspect: "square" as const }; persist({ ...content, gallery: [...content.gallery, item] }, "Gallery item added"); setSelected(id); };
  const remove = () => { if (!draft || !window.confirm(`Remove “${draft.alt}” from the gallery?`)) return; persist({ ...content, gallery: content.gallery.filter((item) => item.id !== draft.id) }, "Gallery item removed"); };
  return <div className="admin-editor-heading"><div><span className="admin-eyebrow"><ImageIcon size={14} /> Media collection</span><h2>Show the space behind the care.</h2><p>Manage gallery images, captions and accessibility text.</p></div><button className={`${buttonClass} admin-primary-button`} onClick={add}><Plus size={16} /> Add image</button><div className="admin-gallery-editor"><div className="admin-gallery-grid">{content.gallery.map((item) => <button key={item.id} className={`admin-gallery-item ${draft?.id === item.id ? "is-active" : ""}`} onClick={() => setSelected(item.id)}><div>{item.src ? <img src={item.src} alt="" /> : <ImageIcon size={22} />}</div><span>{item.alt || "Missing alt text"}</span>{!item.alt && <b>!</b>}</button>)}</div>{draft && <div className="admin-record-editor"><div className="admin-record-top"><div><span className="admin-record-status"><span /> In gallery</span><h3>Image details</h3></div><button className="admin-icon-button danger" aria-label="Delete image" onClick={remove}><Trash2 size={16} /></button></div><TextField label="Image URL" value={draft.src} onChange={(v) => update("src", v)} placeholder="/images/clinic-interior.jpg or https://..." /><ImageUpload onUpload={(src) => update("src", src)} /><TextField label="Alt text" value={draft.alt} onChange={(v) => update("alt", v)} /><SelectField label="Category" value={draft.category} options={["clinic", "treatment-room", "equipment", "branding"]} onChange={(v) => update("category", v)} /><SelectField label="Aspect" value={draft.aspect} options={["square", "portrait", "wide"]} onChange={(v) => update("aspect", v)} /><div className="admin-editor-actions"><button className={buttonClass} onClick={saveGallery}><Save size={15} /> Save image</button><span>Alt text makes this image accessible</span></div></div>}</div></div>;
}

function ReviewsEditor({ content, persist }: { content: SiteContent; persist: (next: SiteContent, message?: string) => void }) {
  const [selected, setSelected] = useState(0);
  const [draft, setDraft] = useState(content.reviews[0] ?? null);
  useEffect(() => setDraft(content.reviews[selected] ?? content.reviews[0] ?? null), [content.reviews, selected]);
  if (!draft) return <EmptyEditor title="No reviews yet" action={() => persist({ ...content, reviews: [{ name: "New patient", date: "Today", rating: 5, text: "Add a review here." }] }, "Review added")} />;
  const update = (key: keyof typeof draft, value: string | number) => setDraft((current) => current ? ({ ...current, [key]: value }) : current);
  const saveReview = () => persist({ ...content, reviews: content.reviews.map((item, index) => index === selected ? draft : item) }, "Review saved locally");
  const add = () => { persist({ ...content, reviews: [...content.reviews, { name: "New patient", date: "Today", rating: 5, text: "Add a review here." }] }, "Review added"); setSelected(content.reviews.length); };
  const remove = () => { if (!window.confirm(`Remove review by ${draft.name}?`)) return; persist({ ...content, reviews: content.reviews.filter((_, index) => index !== selected) }, "Review removed"); setSelected(Math.max(0, selected - 1)); };
  return <EditorFrame eyebrow="Patient reviews" title="Let trust do the talking." description="Keep the proof points visitors use to choose your clinic." onSave={saveReview} actionLabel="Save review"><div className="admin-record-tabs">{content.reviews.map((review, index) => <button key={`${review.name}-${index}`} className={selected === index ? "is-active" : ""} onClick={() => setSelected(index)}>{review.name || "Unnamed patient"}</button>)}<button onClick={add}><Plus size={14} /> Add</button></div><div className="admin-form-grid"><TextField label="Patient name" value={draft.name} onChange={(v) => update("name", v)} /><TextField label="Date label" value={draft.date} onChange={(v) => update("date", v)} /><SelectField label="Rating" value={String(draft.rating)} options={["5", "4", "3", "2", "1"]} onChange={(v) => update("rating", Number(v))} /><TextAreaField label="Review text" value={draft.text} onChange={(v) => update("text", v)} /></div><div className="admin-editor-actions"><button className={buttonClass} onClick={saveReview}><Save size={15} /> Save review</button><button className="admin-text-button danger" onClick={remove}><Trash2 size={14} /> Remove review</button></div></EditorFrame>;
}

function SimpleListEditor({ title, description, items, fields, onSave }: { title: string; description: string; items: Array<Record<string, string>>; fields: string[]; onSave: (items: Array<Record<string, string>>) => void }) {
  const [draft, setDraft] = useState(items);
  useEffect(() => setDraft(items), [items]);
  const update = (index: number, key: string, value: string) => setDraft((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item));
  const add = () => setDraft((current) => [...current, Object.fromEntries(fields.map((field) => [field, field === "n" ? String(current.length + 1).padStart(2, "0") : `New ${field}`]))]);
  return <EditorFrame eyebrow={title} title={title === "Stats" ? "Say what makes the clinic special." : title} description={description} onSave={() => onSave(draft)}><div className="admin-simple-list">{draft.map((item, index) => <div className="admin-simple-row" key={index}><span className="admin-drag-handle">⋮⋮</span>{fields.map((field) => <TextField key={field} label={field === "desc" ? "Description" : field} value={item[field] ?? ""} onChange={(value) => update(index, field, value)} />)}<button className="admin-icon-button danger" aria-label={`Remove item ${index + 1}`} onClick={() => setDraft((current) => current.filter((_, itemIndex) => itemIndex !== index))}><Trash2 size={15} /></button></div>)}<button className="admin-add-row" onClick={add}><Plus size={15} /> Add another</button></div></EditorFrame>;
}

function SettingsEditor({ content, persist, onPublish }: { content: SiteContent; persist: (next: SiteContent, message?: string) => void; onPublish: () => void }) {
  const [draft, setDraft] = useState(content.settings);
  useEffect(() => setDraft(content.settings), [content.settings]);
  const update = (key: keyof typeof draft, value: string) => setDraft((current) => ({ ...current, [key]: value }));
  return <div className="admin-page-entry"><div className="admin-section-intro"><div><span className="admin-eyebrow"><Settings size={14} /> Clinic identity</span><h2>The details patients need.</h2><p>These settings appear across your header, footer and contact page.</p></div><button className={buttonClass} onClick={onPublish}><Globe2 size={14} /> Publish to GitHub</button></div><EditorFrame eyebrow="Public details" title="Identity & contact" description="Keep this information accurate so bookings never miss you." onSave={() => persist({ ...content, settings: draft }, "Clinic settings saved locally")}><div className="admin-form-grid"><TextField label="Clinic name" value={draft.clinicName} onChange={(v) => update("clinicName", v)} /><TextField label="Short name" value={draft.clinicShort} onChange={(v) => update("clinicShort", v)} /><TextField label="Tagline" value={draft.tagline} onChange={(v) => update("tagline", v)} /><TextField label="Doctor name" value={draft.doctorName} onChange={(v) => update("doctorName", v)} /><TextField label="Credentials" value={draft.doctorCredentials} onChange={(v) => update("doctorCredentials", v)} /><TextField label="Phone display" value={draft.phoneDisplay} onChange={(v) => update("phoneDisplay", v)} /><TextField label="Phone digits" value={draft.phone} onChange={(v) => update("phone", v)} /><TextField label="WhatsApp number" value={draft.whatsapp} onChange={(v) => update("whatsapp", v)} /><TextField label="City" value={draft.city} onChange={(v) => update("city", v)} /><TextField label="Region" value={draft.region} onChange={(v) => update("region", v)} /><TextAreaField label="Address" value={draft.address} onChange={(v) => update("address", v)} /><TextField label="Google Maps embed URL" value={draft.mapEmbedUrl} onChange={(v) => update("mapEmbedUrl", v)} /><TextField label="Directions URL" value={draft.mapDirectionsUrl} onChange={(v) => update("mapDirectionsUrl", v)} /></div><div className="admin-hours"><div className="admin-subheading"><div><span className="admin-eyebrow"><Clock3 size={14} /> Opening hours</span><h3>When patients can visit</h3></div></div>{draft.hours.map((hour, index) => <div className="admin-hours-row" key={hour.day}><strong>{hour.day}</strong><label className="admin-switch"><input type="checkbox" checked={!hour.closed} onChange={(e) => setDraft((current) => ({ ...current, hours: current.hours.map((item, itemIndex) => itemIndex === index ? { ...item, closed: !e.target.checked, time: e.target.checked ? item.time === "Closed" ? "10:00 AM – 8:00 PM" : item.time : "Closed" } : item) }))} /><span /></label><input className={inputClass} disabled={hour.closed} value={hour.time} onChange={(e) => setDraft((current) => ({ ...current, hours: current.hours.map((item, itemIndex) => itemIndex === index ? { ...item, time: e.target.value } : item) }))} /></div>)}</div></EditorFrame></div>;
}

function MediaLibrary({ content, persist }: { content: SiteContent; persist: (next: SiteContent, message?: string) => void }) {
  const [query, setQuery] = useState("");
  const filtered = content.gallery.filter((item) => `${item.alt} ${item.category}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="admin-page-entry"><div className="admin-section-intro"><div><span className="admin-eyebrow"><ImageIcon size={14} /> Asset library</span><h2>Images that make the care visible.</h2><p>Upload from this device or use a URL. Add alt text before publishing.</p></div><label className={`${buttonClass} admin-primary-button admin-upload-button`}><Upload size={15} /> Upload image<input type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { const id = Math.max(0, ...content.gallery.map((item) => item.id)) + 1; persist({ ...content, gallery: [...content.gallery, { id, src: String(reader.result), alt: file.name.replace(/\.[^.]+$/, ""), category: "clinic", aspect: "square" }] }, "Image uploaded locally"); }; reader.readAsDataURL(file); }} /></label></div><div className="admin-media-toolbar"><div className="admin-search"><Search size={15} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by alt text or category" /></div><span>{filtered.length} assets · local library</span></div><div className="admin-media-grid">{filtered.map((item) => <article className="admin-media-card" key={item.id}><div className="admin-media-image">{item.src ? <img src={item.src} alt={item.alt} /> : <ImageIcon size={24} />}{!item.alt && <span className="admin-warning">Missing alt</span>}</div><div className="admin-media-meta"><strong>{item.alt || "Untitled image"}</strong><span>{item.category} · {item.aspect}</span></div><div className="admin-media-actions"><button className="admin-text-button" onClick={() => window.alert("Open Website content → Gallery to edit this image's metadata.")}>Edit metadata</button><button className="admin-icon-button danger" aria-label={`Delete ${item.alt}`} onClick={() => { if (window.confirm(`Remove “${item.alt}” from the gallery?`)) persist({ ...content, gallery: content.gallery.filter((galleryItem) => galleryItem.id !== item.id) }, "Gallery item removed"); }}><Trash2 size={14} /></button></div></article>)}</div></div>;
}

function EditorFrame({ eyebrow, title, description, onSave, onReset, actionLabel = "Save changes", children }: { eyebrow: string; title: string; description: string; onSave: () => void; onReset?: () => void; actionLabel?: string; children: React.ReactNode }) {
  return <section className="admin-card admin-editor-card"><div className="admin-editor-card-head"><div><span className="admin-eyebrow"><Sparkles size={14} /> {eyebrow}</span><h2>{title}</h2><p>{description}</p></div><button className={buttonClass} onClick={onReset ?? (() => undefined)} disabled={!onReset}><MoreHorizontal size={17} /></button></div>{children}<div className="admin-editor-actions"><button className={`${buttonClass} admin-primary-button`} onClick={onSave}><Save size={15} /> {actionLabel}</button><span className="admin-save-helper"><Check size={14} /> Saves instantly in this browser</span></div></section>;
}

function CardHeading({ eyebrow, title, action }: { eyebrow: string; title: string; action?: React.ReactNode }) { return <div className="admin-card-heading"><div><span className="admin-eyebrow">{eyebrow}</span><h3>{title}</h3></div>{action}</div>; }
function TimelineItem({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) { return <div className="admin-timeline-item"><span className="admin-timeline-icon">{icon}</span><div><strong>{title}</strong><span>{detail}</span></div><small>Now</small></div>; }
function QuickAction({ icon, title, onClick }: { icon: React.ReactNode; title: string; onClick: () => void }) { return <button className="admin-quick-action" onClick={onClick}><span>{icon}</span><strong>{title}</strong><ArrowUpRight size={15} /></button>; }
function EmptyEditor({ title, action }: { title: string; action: () => void }) { return <div className="admin-empty-editor"><Users size={25} /><h3>{title}</h3><button className={buttonClass} onClick={action}><Plus size={15} /> Add first item</button></div>; }
function TextField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) { return <label className="admin-label">{label}<input data-testid={`input-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className={inputClass} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} /></label>; }
function TextAreaField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="admin-label admin-label-wide">{label}<textarea className={inputClass} rows={4} value={value} onChange={(e) => onChange(e.target.value)} /></label>; }
function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) { return <label className="admin-label">{label}<select className={inputClass} value={value} onChange={(e) => onChange(e.target.value)}>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>; }
function ArrayField({ label, items, onChange }: { label: string; items: string[]; onChange: (items: string[]) => void }) { return <div className="admin-array-field"><div className="admin-array-heading"><span>{label}</span><button type="button" className="admin-text-button" onClick={() => onChange([...items, "New item"])}><Plus size={14} /> Add</button></div>{items.map((item, index) => <div className="admin-array-row" key={index}><span>{String(index + 1).padStart(2, "0")}</span><input className={inputClass} value={item} onChange={(e) => onChange(items.map((value, itemIndex) => itemIndex === index ? e.target.value : value))} /><button className="admin-icon-button danger" aria-label={`Remove ${label} item ${index + 1}`} onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}><X size={14} /></button></div>)}</div>; }
function FaqField({ faqs, onChange }: { faqs: { q: string; a: string }[]; onChange: (faqs: { q: string; a: string }[]) => void }) { return <div className="admin-array-field"><div className="admin-array-heading"><span>FAQs</span><button type="button" className="admin-text-button" onClick={() => onChange([...faqs, { q: "New question", a: "Add the answer." }])}><Plus size={14} /> Add</button></div>{faqs.map((faq, index) => <div className="admin-faq-row" key={index}><span>{String(index + 1).padStart(2, "0")}</span><div><input className={inputClass} value={faq.q} onChange={(e) => onChange(faqs.map((item, itemIndex) => itemIndex === index ? { ...item, q: e.target.value } : item))} /><textarea className={inputClass} rows={2} value={faq.a} onChange={(e) => onChange(faqs.map((item, itemIndex) => itemIndex === index ? { ...item, a: e.target.value } : item))} /></div><button className="admin-icon-button danger" aria-label={`Remove FAQ ${index + 1}`} onClick={() => onChange(faqs.filter((_, itemIndex) => itemIndex !== index))}><X size={14} /></button></div>)}</div>; }
function ImageUpload({ onUpload }: { onUpload: (src: string) => void }) { const inputRef = useRef<HTMLInputElement>(null); const onChange = (event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => onUpload(String(reader.result)); reader.readAsDataURL(file); }; return <button type="button" className="admin-upload-secondary" onClick={() => inputRef.current?.click()}><Upload size={14} /> Choose image from this device<input ref={inputRef} type="file" accept="image/*" onChange={onChange} hidden /></button>; }
function formatRelative(value: string) { const diff = Date.now() - new Date(value).getTime(); if (diff < 60000) return "just now"; if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`; return new Date(value).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }); }