import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SponsoredHackathons from "../components/SponsoredHackathons";
import UserReviews from "../components/UserReviews";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const FEATURES = [
  {
    id: "organizer",
    icon: "🎯",
    gradient: "from-cyan-500 to-blue-600",
    title: "Organizer Dashboard",
    shortDesc: "Full control over your hackathon from creation to results.",
    features: ["Create events with timeline", "Add problem statements", "Manage teams & submissions", "Real-time announcements"],
    detailTitle: "Complete Hackathon Management",
    detailDesc: "The Organizer Dashboard gives you a powerful command center to create and manage every aspect of your hackathon. Set timelines, define problem statements with difficulty levels, track team registrations, monitor submissions in real-time, and push live announcements to all participants via Socket.io.",
    detailSteps: [
      { label: "Create", desc: "Set up hackathon with title, dates, prize pool, and domains" },
      { label: "Configure", desc: "Add problem statements with categories and difficulty" },
      { label: "Monitor", desc: "Track teams, submissions, and participant activity" },
      { label: "Announce", desc: "Push real-time announcements to all participants" },
    ],
    cta: { text: "Go to Organizer Panel", link: "/organizer" },
  },
  {
    id: "judge",
    icon: "⚖️",
    gradient: "from-blue-500 to-violet-600",
    title: "Judge Panel",
    shortDesc: "Comprehensive scoring with detailed rubrics and feedback.",
    features: ["Innovation & creativity scoring", "UI/UX evaluation", "Technical complexity review", "Presentation quality rating"],
    detailTitle: "Rubric-based Scoring System",
    detailDesc: "Judges get a streamlined review panel with interactive sliders for each scoring dimension. Rate submissions across Innovation, UI/UX, Technical Complexity, and Presentation — each on a 0-10 scale. Leave detailed feedback notes and watch the leaderboard update in real-time.",
    detailSteps: [
      { label: "Review", desc: "Browse all submissions with GitHub & demo links" },
      { label: "Score", desc: "Use interactive sliders across 4 rubric dimensions" },
      { label: "Feedback", desc: "Leave detailed notes for each team" },
      { label: "Publish", desc: "Scores auto-aggregate to the live leaderboard" },
    ],
    cta: { text: "Go to Judge Panel", link: "/judge" },
  },
  {
    id: "leaderboard",
    icon: "🏆",
    gradient: "from-violet-500 to-pink-600",
    title: "Leaderboard & Certificates",
    shortDesc: "Real-time rankings and automatic certificate generation.",
    features: ["Live score aggregation", "Gold/Silver/Bronze badges", "Downloadable PDF certificates", "Socket-powered updates"],
    detailTitle: "Live Rankings & Auto Certificates",
    detailDesc: "The leaderboard aggregates scores from all judges in real-time, displaying teams ranked by average score with visual progress bars. Top 3 teams get gold, silver, and bronze gradient badges. Once results are finalized, every participant can download a personalized PDF certificate.",
    detailSteps: [
      { label: "Aggregate", desc: "Average scores across all judges automatically" },
      { label: "Rank", desc: "Teams ranked with visual score bars and badges" },
      { label: "Refresh", desc: "Socket.io pushes live updates as scores come in" },
      { label: "Certify", desc: "Auto-generated PDF certificates for download" },
    ],
    cta: { text: "View Leaderboard", link: "/leaderboard" },
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className="relative overflow-hidden">
      {/* Extra ambient blobs for hero */}
      <div className="blob-cyan w-[500px] h-[500px] -top-32 left-1/4 absolute" />
      <div className="blob-violet w-[400px] h-[400px] top-1/3 -right-32 absolute" />

      <div className="container-max py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-cyan-300">National-level Hackathon Management</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="mt-6 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              <span className="text-slate-900 dark:text-white">Build. Compete. Win.</span>
              <span className="block text-gradient mt-2">One platform for everything.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-5 text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-lg">
              Teams, problem statements, submissions, judge scoring, leaderboard, real-time chat,
              announcements and certificates — all in a sleek dashboard experience.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <Link to="/hackathons" className="btn btn-primary px-6 py-3 text-base">
                Explore Hackathons
              </Link>
              <Link to="/register" className="btn btn-outline px-6 py-3 text-base">
                Create Account
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-12 grid grid-cols-3 gap-4">
              <Stat t="Role-based" v="Auth" d="Participant / Organizer / Judge" />
              <Stat t="Realtime" v="Chat" d="Team + global rooms" />
              <Stat t="Auto" v="PDF" d="Certificate generator" />
            </motion.div>
          </motion.div>

          {/* Right — Quick Flow card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card-glow p-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">Quick Flow</h3>
              <span className="badge-brand">Demo Ready</span>
            </div>

            <div className="mt-5 space-y-4">
              <Step n="1" t="Register & choose role" d="Participant / Organizer / Judge" />
              <Step n="2" t="Create / Join team" d="Invite code based joining" />
              <Step n="3" t="Submit links" d="GitHub + Demo + PPT/PDF" />
              <Step n="4" t="Judges score" d="Rubric scoring + notes" />
              <Step n="5" t="Leaderboard + certificate" d="Ranks + PDF download" />
            </div>

            <div className="mt-6 rounded-xl border border-slate-300 bg-slate-100 dark:border-slate-700/50 dark:bg-slate-800/60 p-4 text-sm text-slate-600 dark:text-slate-400">
              Organizer creates hackathon + problems. Judges review. Participants submit.
            </div>
          </motion.div>
        </div>

        {/* Feature tabs section */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
              Everything you need to <span className="text-gradient">run a hackathon</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-3 max-w-xl mx-auto">
              Click each feature to explore in detail.
            </p>
            <div className="mt-6 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500" />
          </motion.div>

          {/* Tab cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="grid md:grid-cols-3 gap-6"
          >
            {FEATURES.map((f) => (
              <FeatureTab
                key={f.id}
                feature={f}
                isActive={activeTab === f.id}
                onClick={() => setActiveTab(activeTab === f.id ? null : f.id)}
              />
            ))}
          </motion.div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            {activeTab && (
              <FeatureDetail
                key={activeTab}
                feature={FEATURES.find((f) => f.id === activeTab)}
              />
            )}
          </AnimatePresence>
        </div>

        {/* ── Sponsored Hackathons Section ─────────────────── */}
        <SponsoredHackathons showBrowseCTA={true} />

        {/* ── User Reviews Section ─────────────────── */}
        <UserReviews />
      </div>
    </div>
  );
}

function Stat({ t, v, d }) {
  return (
    <div className="card p-4 text-center">
      <div className="text-xs text-slate-500">{t}</div>
      <div className="text-2xl font-black text-gradient mt-1">{v}</div>
      <div className="text-xs text-slate-500 mt-1">{d}</div>
    </div>
  );
}

function Step({ n, t, d }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-glow">
        {n}
      </div>
      <div>
        <div className="font-semibold text-slate-900 dark:text-white">{t}</div>
        <div className="text-sm text-slate-500 dark:text-slate-400">{d}</div>
      </div>
    </div>
  );
}

function FeatureTab({ feature, isActive, onClick }) {
  const { icon, gradient, title, shortDesc, features } = feature;
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onClick}
      className={
        "relative cursor-pointer rounded-2xl transition-all duration-300 " +
        (isActive ? "ring-2 ring-cyan-500/50" : "")
      }
    >
      {/* Gradient border glow on active */}
      <div
        className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br ${gradient} transition-opacity duration-500 ${isActive ? "opacity-30" : "opacity-0 group-hover:opacity-20"
          }`}
      />

      <div
        className={
          "relative rounded-2xl border p-6 h-full transition-all duration-300 backdrop-blur-sm " +
          (isActive
            ? "border-cyan-500/30 bg-slate-800/90 shadow-glow"
            : "border-slate-700/50 bg-slate-800/50 hover:border-slate-600/60 hover:shadow-glow")
        }
      >
        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl shadow-lg ${isActive ? "shadow-glow" : ""} transition-shadow duration-300`}>
          {icon}
        </div>

        {/* Expanding gradient line */}
        <div className={`mt-4 h-0.5 rounded-full bg-gradient-to-r ${gradient} transition-all duration-500 ${isActive ? "w-full" : "w-8"}`} />

        <h3 className={`mt-4 text-lg font-bold transition-colors duration-300 ${isActive ? "text-gradient" : "text-slate-900 dark:text-white"}`}>
          {title}
        </h3>
        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{shortDesc}</p>

        {/* Sub-features */}
        <ul className="mt-4 space-y-2">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-slate-500">
              <svg className="w-4 h-4 shrink-0 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {f}
            </li>
          ))}
        </ul>

        {/* Click indicator */}
        <div className={`mt-5 flex items-center gap-1.5 text-xs font-semibold transition-colors ${isActive ? "text-cyan-400" : "text-slate-600"}`}>
          {isActive ? "▲ Hide details" : "▼ Show details"}
        </div>
      </div>
    </motion.div>
  );
}

function FeatureDetail({ feature }) {
  const { gradient, icon, detailTitle, detailDesc, detailSteps, cta } = feature;
  return (
    <motion.div
      initial={{ opacity: 0, height: 0, marginTop: 0 }}
      animate={{ opacity: 1, height: "auto", marginTop: 24 }}
      exit={{ opacity: 0, height: 0, marginTop: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="card p-8 relative">
        {/* Background glow */}
        <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-10 bg-gradient-to-br ${gradient} pointer-events-none`} />

        <div className="relative grid md:grid-cols-2 gap-8 items-start">
          {/* Left — Detail text */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-xl shadow-glow`}>
                {icon}
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">{detailTitle}</h3>
            </div>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{detailDesc}</p>

            <Link
              to={cta.link}
              className="mt-6 btn btn-primary inline-flex items-center gap-2 px-6 py-3"
            >
              {cta.text}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Right — Steps */}
          <div className="space-y-4">
            {detailSteps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className="flex gap-4 items-start"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg`}>
                  {i + 1}
                </div>
                <div className="rounded-xl border border-slate-300 bg-slate-100 dark:border-slate-700/50 dark:bg-slate-800/60 p-4 flex-1">
                  <div className="font-semibold text-slate-900 dark:text-white text-sm">{s.label}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">{s.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}