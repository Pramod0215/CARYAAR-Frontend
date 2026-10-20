"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CarFront,
  ChevronDown,
  CircleUserRound,
  Heart,
  KeyRound,
  Leaf,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import CarCard from "@/components/marketplace/car-card";
import { useAuth } from "@/features/auth/auth-context";
import { carListings, type CarListing } from "@/features/cars/data";
import heroCar from "../../assets/Assets/Audi-etron-Exterior-170076.jpg";

type DialogState = "signin" | "sell" | CarListing | null;
type PriceFilter = "all" | "under-50" | "electric" | "saved";

function Dialog({
  title,
  children,
  onClose,
  wide = false,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <section
        aria-label={title}
        aria-modal="true"
        className={`dialog${wide ? " wide" : ""}`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="dialog-header">
          <h2 className="dialog-title">{title}</h2>
          <button aria-label="Close dialog" className="dialog-close" onClick={onClose} type="button">
            <X aria-hidden="true" size={18} />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

export default function Marketplace() {
  const { signIn, signOut, user } = useAuth();
  const [query, setQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [sortOrder, setSortOrder] = useState("recommended");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [dialog, setDialog] = useState<DialogState>(null);
  const [toast, setToast] = useState("");

  const filteredCars = useMemo(() => {
    const normalisedQuery = query.trim().toLowerCase();
    const cars = carListings.filter((car) => {
      const matchesQuery =
        !normalisedQuery ||
        `${car.name} ${car.location} ${car.fuel} ${car.year}`
          .toLowerCase()
          .includes(normalisedQuery);
      const matchesFilter =
        priceFilter === "all" ||
        (priceFilter === "under-50" && car.price < 50) ||
        (priceFilter === "electric" && car.fuel === "Electric") ||
        (priceFilter === "saved" && savedIds.includes(car.id));

      return matchesQuery && matchesFilter;
    });

    if (sortOrder === "price-low") return cars.sort((first, second) => first.price - second.price);
    if (sortOrder === "price-high") return cars.sort((first, second) => second.price - first.price);
    if (sortOrder === "newest") return cars.sort((first, second) => second.year - first.year);
    return cars;
  }, [priceFilter, query, savedIds, sortOrder]);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    if (!email) return;
    signIn(email);
    setDialog(null);
    showToast("Preview session started.");
  }

  function handleSellRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDialog(null);
    showToast("This preview does not submit listing enquiries yet.");
  }

  function toggleSaved(id: string) {
    setSavedIds((current) =>
      current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id],
    );
  }

  const selectedCar = typeof dialog === "object" && dialog !== null ? dialog : null;

  return (
    <>
      <div className="page-shell">
        <header className="site-header">
          <a aria-label="CarYAAR home" className="brand" href="#top">
            <span className="brand-mark"><CarFront aria-hidden="true" size={21} /></span>
            car<span>YAAR</span>
          </a>
          <nav aria-label="Main navigation" className="header-nav">
            <a href="#cars">Buy a car</a>
            <a href="#sell" onClick={(event) => { event.preventDefault(); setDialog("sell"); }}>Sell a car</a>
            <a href="#how-it-works">How it works</a>
          </nav>
          <div className="header-actions">
            {user ? (
              <button className="sign-in-button" onClick={() => { signOut(); showToast("Preview session ended."); }} type="button">
                <CircleUserRound aria-hidden="true" size={16} /> Sign out
              </button>
            ) : (
              <button className="sign-in-button" onClick={() => setDialog("signin")} type="button">
                <CircleUserRound aria-hidden="true" size={16} /> Sign in
              </button>
            )}
            <button className="sell-button" onClick={() => setDialog("sell")} type="button">
              Sell your car <ArrowUpRight aria-hidden="true" size={14} />
            </button>
          </div>
        </header>

        <main id="top">
          <section aria-labelledby="hero-title" className="hero">
            <div className="hero-copy">
              <span className="eyebrow"><span className="eyebrow-dot" /> A better way to find your next car</span>
              <h1 id="hero-title">Good cars.<br />Good people.<br /><span>Great journeys.</span></h1>
              <p className="hero-description">Find a car worth falling for, or find the right person for the one you love.</p>
              <form className="hero-search" onSubmit={(event) => { event.preventDefault(); document.getElementById("cars")?.scrollIntoView({ behavior: "smooth" }); }}>
                <label className="search-field">
                  <Search aria-hidden="true" size={17} />
                  <input
                    aria-label="Search cars, fuel type, or city"
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Try “electric” or “Bengaluru”"
                    value={query}
                  />
                </label>
                <button className="search-button" type="submit">Find a car <ArrowRight aria-hidden="true" size={14} /></button>
              </form>
              <div className="hero-proof" id="how-it-works">
                <span className="hero-proof-item"><ShieldCheck aria-hidden="true" size={14} /> Sample listings</span>
                <span className="hero-proof-item"><BadgeCheck aria-hidden="true" size={14} /> Clear car details</span>
                <span className="hero-proof-item"><Heart aria-hidden="true" size={14} /> People-first deals</span>
              </div>
            </div>
            <div aria-hidden="true" className="hero-visual">
              <Image alt="" className="hero-car-image" priority src={heroCar} sizes="(max-width: 720px) 100vw, 50vw" />
              <div className="hero-sticker">
                <span className="sticker-icon"><Sparkles aria-hidden="true" size={17} /></span>
                <span><span className="sticker-label">A little more electric</span><span className="sticker-value">Audi e-tron 55 quattro</span></span>
              </div>
            </div>
          </section>

          <section aria-labelledby="cars-title" className="marketplace-section" id="cars">
            <div className="section-heading">
              <div>
                <span className="eyebrow">The good finds</span>
                <h2 className="section-title" id="cars-title">Cars with a story.</h2>
                <p className="section-caption">Sample listings to preview the CarYAAR experience.</p>
              </div>
            </div>

            <div className="listing-toolbar">
              <div aria-label="Filter cars" className="listing-filters" role="group">
                <button aria-pressed={priceFilter === "all"} className={`filter-chip${priceFilter === "all" ? " active" : ""}`} onClick={() => setPriceFilter("all")} type="button">All cars</button>
                <button aria-pressed={priceFilter === "under-50"} className={`filter-chip${priceFilter === "under-50" ? " active" : ""}`} onClick={() => setPriceFilter("under-50")} type="button"><SlidersHorizontal aria-hidden="true" size={12} /> Under ₹50L</button>
                <button aria-pressed={priceFilter === "electric"} className={`filter-chip${priceFilter === "electric" ? " active" : ""}`} onClick={() => setPriceFilter("electric")} type="button"><Leaf aria-hidden="true" size={12} /> Electric</button>
                <button aria-pressed={priceFilter === "saved"} className={`filter-chip${priceFilter === "saved" ? " active" : ""}`} onClick={() => setPriceFilter("saved")} type="button"><Heart aria-hidden="true" size={12} /> Saved{savedIds.length > 0 ? ` (${savedIds.length})` : ""}</button>
              </div>
              <label className="sort-control">
                <span>Sort:</span>
                <select aria-label="Sort cars" onChange={(event) => setSortOrder(event.target.value)} value={sortOrder}>
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                  <option value="newest">Newest first</option>
                </select>
                <ChevronDown aria-hidden="true" size={13} />
              </label>
            </div>

            <div aria-live="polite" className="car-grid">
              {filteredCars.length ? filteredCars.map((car) => (
                <CarCard
                  car={car}
                  isSaved={savedIds.includes(car.id)}
                  key={car.id}
                  onToggleSaved={toggleSaved}
                  onViewDetails={setDialog}
                />
              )) : (
                <div className="empty-state">
                  <Search aria-hidden="true" size={20} />
                  <strong>No cars found just yet</strong>
                  <span>Try a different search or browse all cars.</span>
                  <button className="details-button" onClick={() => { setQuery(""); setPriceFilter("all"); }} type="button">Clear filters <ArrowRight aria-hidden="true" size={13} /></button>
                </div>
              )}
            </div>
          </section>

          <section aria-label="Sell your car" className="sell-banner" id="sell">
            <div className="sell-banner-copy">
              <span aria-hidden="true" className="sell-banner-icon"><KeyRound size={19} /></span>
              <div><h2>Your car deserves a good next home.</h2><p>Start with the basics. We’ll take it from there.</p></div>
            </div>
            <button className="primary-button" onClick={() => setDialog("sell")} type="button">List your car <ArrowRight aria-hidden="true" size={14} /></button>
          </section>
        </main>

        <footer className="site-footer">
          <span className="footer-brand">carYAAR</span>
          <span>Made for the love of the drive.</span>
          <div className="utility-footer-links">
            <Link href="/support">Support</Link>
            <Link href="/feedback">Feedback</Link>
          </div>
          <span>© 2026 CarYAAR</span>
        </footer>
      </div>

      {dialog === "signin" && (
        <Dialog onClose={() => setDialog(null)} title="Welcome to CarYAAR">
          <p className="dialog-kicker">Preview sign-in</p>
          <p className="dialog-description">Enter your email to preview your account experience.</p>
          <form onSubmit={handleSignIn}>
            <label className="form-field">Email address<input autoComplete="email" name="email" placeholder="you@example.com" required type="email" /></label>
            <div className="demo-notice">This preview creates a local demo session only. Connect an authentication provider for secure accounts.</div>
            <div className="dialog-actions"><button className="primary-button" type="submit">Continue with email <ArrowRight aria-hidden="true" size={14} /></button></div>
          </form>
        </Dialog>
      )}

      {dialog === "sell" && (
        <Dialog onClose={() => setDialog(null)} title="Tell us about your car" wide>
          <p className="dialog-description">A few details are all it takes to get started.</p>
          <form onSubmit={handleSellRequest}>
            <div className="form-grid">
              <label className="form-field">Make<input name="make" placeholder="e.g. Audi" required /></label>
              <label className="form-field">Model<input name="model" placeholder="e.g. A4" required /></label>
              <label className="form-field">Year<select aria-label="Model year" defaultValue="" name="year" required><option disabled value="">Choose year</option>{Array.from({ length: 17 }, (_, index) => 2026 - index).map((year) => <option key={year} value={year}>{year}</option>)}</select></label>
              <label className="form-field">City<input name="city" placeholder="e.g. Bengaluru" required /></label>
              <label className="form-field full">Your email<input autoComplete="email" name="email" placeholder="you@example.com" required type="email" /></label>
            </div>
            <div className="demo-notice">This enquiry is a front-end preview. Listing details are not sent or stored.</div>
            <div className="dialog-actions"><button className="secondary-button" onClick={() => setDialog(null)} type="button">Cancel</button><button className="primary-button" type="submit">Continue <ArrowRight aria-hidden="true" size={14} /></button></div>
          </form>
        </Dialog>
      )}

      {selectedCar && (
        <Dialog onClose={() => setDialog(null)} title={selectedCar.name} wide>
          <Image alt={`${selectedCar.year} ${selectedCar.name}`} className="dialog-car-image" src={selectedCar.image} />
          <p className="detail-price">{selectedCar.displayPrice}</p>
          <div className="detail-specs">
            <div className="detail-spec"><span>Year</span>{selectedCar.year}</div>
            <div className="detail-spec"><span>Distance</span>{selectedCar.kilometres}</div>
            <div className="detail-spec"><span>Fuel</span>{selectedCar.fuel}</div>
            <div className="detail-spec"><span>Transmission</span>{selectedCar.transmission}</div>
            <div className="detail-spec"><span>Location</span>{selectedCar.location}</div>
            <div className="detail-spec"><span>Listing</span>{selectedCar.tag}</div>
          </div>
          <div className="dialog-actions"><button className="secondary-button" onClick={() => toggleSaved(selectedCar.id)} type="button"><Heart aria-hidden="true" size={14} /> {savedIds.includes(selectedCar.id) ? "Saved" : "Save car"}</button><button className="primary-button" onClick={() => setDialog("signin")} type="button">Contact seller <ArrowUpRight aria-hidden="true" size={14} /></button></div>
        </Dialog>
      )}

      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}
