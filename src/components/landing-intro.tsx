'use client';

import { useRef, useState } from 'react';
import { ArrowRight, Check, ClipboardCheck, FileText, House, ShieldCheck } from 'lucide-react';

export function LandingIntro({ onStartAudit, onUpgrade }: { onStartAudit: () => void; onUpgrade: () => void }) {
  const [exampleOpen, setExampleOpen] = useState(false);
  const exampleRef = useRef<HTMLElement>(null);

  function showExample() {
    setExampleOpen(true);
    requestAnimationFrame(() => {
      exampleRef.current?.focus({ preventScroll: true });
      exampleRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    });
  }

  return <>
    <section className="hero conversion-hero" aria-labelledby="hero-title">
      <div className="deadline-badge"><span className="live-dot" /> NOVEMBER 20, 2026 POLICY REVIEW <span aria-hidden="true">•</span> 2026 AIRCOVER PREPARATION</div>
      <h1 id="hero-title">Audit Your Airbnb Rules Before Nov 20.<br /><span>Build Better-Documented AirCover Claims.</span></h1>
      <p className="hero-description">Paste your current House Rules or checkout message. Spot potentially banned guest chores, punitive fines, and off-platform ID requests - and get copy-paste rewrites plus a cleaner turnover checklist ready for your review.</p>
      <div className="hero-actions">
        <button type="button" className="primary hero-start" onClick={onStartAudit}>Start Free Audit (2 Free Credits)<ArrowRight size={18} /></button>
        <button type="button" className="outline hero-example" aria-expanded={exampleOpen} aria-controls="landing-example" onClick={showExample}>See Sample Before &amp; After<ArrowRight size={16} /></button>
      </div>
      <div className="conversion-trust" aria-label="Pricing and product details">
        <span><Check size={15} /> 2 Free Full Reports (No Card Required)</span>
        <span><Check size={15} /> Reviews the supplied Nov 20, 2026 framework</span>
        <button type="button" onClick={onUpgrade}><Check size={15} /> Pro Pass: $9.99 One-Time for 100 Credits<ArrowRight size={13} /></button>
      </div>
      <p className="hero-fine-print">Independent tool. Verify the supplied policy framework against current Airbnb terms. Timing and outcomes vary; no guaranteed compliance or reimbursement. Pro credits have no scheduled expiry; browser storage limits apply.</p>
    </section>

    <section id="landing-example" ref={exampleRef} tabIndex={-1} hidden={!exampleOpen} className="landing-example" aria-labelledby="example-title">
      <div className="example-heading"><div><span className="eyebrow small">ZERO CREDITS · ILLUSTRATIVE EXAMPLE</span><h2 id="example-title">Live Example: 40/100 Risky Rules → 98/100 Revised Rules</h2></div><button type="button" className="outline" onClick={() => setExampleOpen(false)}>Hide example</button></div>
      <p className="example-caption">Fixed demonstration, not a live AI assessment. Scores illustrate the supplied framework and do not certify compliance.</p>
      <div className="example-comparison">
        <article className="example-before"><div className="example-score"><span>BEFORE · POTENTIAL ISSUES</span><strong>40<small>/100</small></strong></div><blockquote>“Strip the beds, start laundry, wash all dishes, and haul trash to the off-site dumpster. $250 smoking fine. Upload your passport to our check-in portal. See the welcome binder for extra rules.”</blockquote><p><ShieldCheck size={15} /> Guest chores, flat penalties, off-platform ID collection, and rules disclosed after booking.</p></article>
        <article className="example-after"><div className="example-score"><span>AFTER · REVIEWED DRAFT</span><strong>98<small>/100</small></strong></div><blockquote>“No smoking indoors. Before leaving, please turn off lights and AC, close windows, and lock the door. Place used towels in the hamper if convenient. Thank you for staying with us!”</blockquote><p><Check size={15} /> Low-effort checkout requests. Publish all applicable rules before booking; pursue documented actual losses through Airbnb.</p></article>
      </div>
      <div className="example-handoff"><House size={20} /><div><strong>Cleaner checklist: the chores still get done.</strong><p>Strip beds · Wash linens · Wash dishes · Take trash to the designated disposal point.</p></div><button type="button" className="outline" onClick={onStartAudit}>Get my own rewrite<ArrowRight size={14} /></button></div>
    </section>

    <section className="landing-values" aria-label="What you get and how to use it">
      <article><span className="value-step"><ShieldCheck size={20} /> 01 · AUDIT</span><h2>Reduce Nov 20 Rule Risks</h2><p>Flags potentially banned checkout chores - stripping beds, laundry, dishes, and trash haul - alongside punitive flat fines ($250 smoking fees) and post-booking welcome-book rules that may put a listing at risk.</p><strong>Paste your rules → Get specific fixes</strong></article>
      <article><span className="value-step"><ClipboardCheck size={20} /> 02 · REPLACE &amp; DELEGATE</span><h2>Keep Cleaner Turnovers Smooth</h2><p>Splits flagged guest chores into a ready-to-send Housekeeper Turnover Checklist while giving you a warm, guest-friendly checkout message. Cleaning stays covered without making guests do the heavy lifting.</p><strong>Copy your rewrites → Send the checklist</strong></article>
      <article><span className="value-step"><FileText size={20} /> 03 · DOCUMENT &amp; FILE</span><h2>Prepare Stronger AirCover Claims</h2><p>Calculates 14-day guest-request and 30-day claim planning dates, recommends unedited camera originals, and drafts neutral Resolution Center messages. Confirm applicable deadlines and evidence requirements.</p><strong>Describe the incident → Review your filing plan</strong></article>
    </section>
  </>;
}
