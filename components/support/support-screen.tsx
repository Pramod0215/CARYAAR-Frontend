"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { ArrowRight, ChevronDown, CircleHelp, LifeBuoy, Search, ShieldCheck } from "lucide-react";

const faqs = [
  { category: "Buying", question: "How do I contact a seller?", answer: "Open a car listing and choose Contact seller. You can review the car details before starting a conversation." },
  { category: "Buying", question: "How can I check a car before buying?", answer: "Arrange an independent inspection, review the service history, and verify the registration and ownership documents before payment." },
  { category: "Selling", question: "How do I list my car?", answer: "Start with the Sell your car form and share the vehicle details. A complete listing should include clear photos, service records, and an honest description." },
  { category: "Selling", question: "Can I update a listing after publishing?", answer: "Listing changes should be made from your seller account. If you cannot edit a listing, contact support with its reference number." },
  { category: "Account", question: "How do I keep my account safe?", answer: "Use a unique password and never share a password, one-time code, or payment PIN with another person." },
  { category: "Payments", question: "Does CarYAAR hold payment for a car?", answer: "Confirm payment terms directly with the seller and complete ownership checks before transferring funds. Never pay a deposit you cannot verify." },
];

export default function SupportScreen() {
  const [query, setQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const visibleFaqs = useMemo(() => {
    const search = query.trim().toLowerCase();
    return faqs.filter((faq) => `${faq.category} ${faq.question} ${faq.answer}`.toLowerCase().includes(search));
  }, [query]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <section className="utility-hero" aria-labelledby="support-title">
        <span className="eyebrow"><span className="eyebrow-dot" /> CAR YAAR CARE</span>
        <h1 id="support-title">A hand when<br /><em>you need one.</em></h1>
        <p>Find a quick answer or tell us what’s getting in the way.</p>
      </section>

      <div className="support-grid">
        <section className="support-faq" aria-labelledby="faq-title">
          <div className="utility-section-heading">
            <div>
              <span className="eyebrow">A good place to start</span>
              <h2 id="faq-title">Common questions</h2>
            </div>
            <CircleHelp aria-hidden="true" className="section-mark" size={23} />
          </div>
          <label className="utility-search">
            <Search aria-hidden="true" size={17} />
            <input aria-label="Search help topics" onChange={(event) => setQuery(event.target.value)} placeholder="Search buying, selling, accounts…" value={query} />
          </label>
          <div className="faq-list">
            {visibleFaqs.length ? visibleFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              const answerId = `faq-answer-${index}`;
              return (
                <article className="faq-item" key={faq.question}>
                  <button aria-controls={answerId} aria-expanded={isOpen} className="faq-question" onClick={() => setOpenFaq(isOpen ? -1 : index)} type="button">
                    <span><span className="faq-category">{faq.category}</span>{faq.question}</span>
                    <ChevronDown aria-hidden="true" className={isOpen ? "faq-chevron open" : "faq-chevron"} size={17} />
                  </button>
                  {isOpen && <p className="faq-answer" id={answerId}>{faq.answer}</p>}
                </article>
              );
            }) : <p className="faq-empty">No answers matched. Send us a note and we’ll point you in the right direction.</p>}
          </div>
          <Link className="text-link" href="/feedback">Have an idea for us? Leave feedback <ArrowRight aria-hidden="true" size={14} /></Link>
        </section>

        <aside className="support-aside">
          <div className="support-aside-heading">
            <span className="support-aside-icon"><LifeBuoy aria-hidden="true" size={19} /></span>
            <div><span className="eyebrow">PERSONAL HELP</span><h2>Still stuck?</h2></div>
          </div>
          {submitted ? (
            <div aria-live="polite" className="form-confirmation">
              <ShieldCheck aria-hidden="true" size={22} />
              <h3>Thanks for writing in.</h3>
              <p>This is a screen preview. Your message wasn’t sent and no support ticket was created.</p>
              <button className="text-link" onClick={() => setSubmitted(false)} type="button">Send another message <ArrowRight aria-hidden="true" size={14} /></button>
            </div>
          ) : (
            <>
              <p className="support-aside-copy">Tell us a little about the issue and what you need help with.</p>
              <form className="utility-form" onSubmit={handleSubmit}>
                <label className="form-field">Your name<input autoComplete="name" name="name" placeholder="Name" required /></label>
                <label className="form-field">Email address<input autoComplete="email" name="email" placeholder="you@example.com" required type="email" /></label>
                <label className="form-field">What can we help with?
                  <select defaultValue="" name="topic" required>
                    <option disabled value="">Choose a topic</option>
                    <option value="buying">Buying a car</option>
                    <option value="selling">Selling a car</option>
                    <option value="account">My account</option>
                    <option value="safety">Safety or a concern</option>
                    <option value="other">Something else</option>
                  </select>
                </label>
                <label className="form-field">Your message<textarea maxLength={1200} name="message" placeholder="Share the details that will help us understand…" required rows={4} /></label>
                <p className="form-privacy-note">Never include passwords, one-time codes, or payment PINs.</p>
                <button className="primary-button utility-submit" type="submit">Review message <ArrowRight aria-hidden="true" size={14} /></button>
              </form>
              <p className="preview-note">Preview form only. Messages are not transmitted.</p>
            </>
          )}
        </aside>
      </div>
    </>
  );
}
