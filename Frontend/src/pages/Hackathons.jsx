import React, { useEffect, useMemo, useState } from "react";
import { api } from "../api/axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SponsoredHackathons from "../components/SponsoredHackathons";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" },
  }),
};

export default function Hackathons() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [mode, setMode] = useState("ALL");
  const [showTeammateModal, setShowTeammateModal] = useState(false);

  useEffect(() => {
    api
      .get("/hackathons")
      .then((r) => {
        setItems(r.data && r.data.length ? r.data : []);
      })
      .catch(() => {
        setItems([]);
      });
  }, []);

  const filtered = useMemo(() => {
    return items.filter((h) => {
      const okQ =
        !q ||
        h.title.toLowerCase().includes(q.toLowerCase()) ||
        (h.tagline || "").toLowerCase().includes(q.toLowerCase());
      const okMode = mode === "ALL" ? true : h.mode === mode;
      return okQ && okMode;
    });
  }, [items, q, mode]);

  const counts = useMemo(() => {
    const online = items.filter((h) => h.mode === "ONLINE").length;
    const offline = items.filter((h) => h.mode === "OFFLINE").length;
    const hybrid = items.filter((h) => h.mode === "HYBRID").length;
    const totalPrize = items.reduce((sum, h) => sum + (h.prizePool || 0), 0);
    return { total: items.length, online, offline, hybrid, totalPrize };
  }, [items]);

  return (
    <div className="container-max py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between">
        <div>
          <h1 className="section-heading flex items-center gap-3">
            <span className="text-3xl">🚀</span> Explore Hackathons
          </h1>
          <p className="section-sub">Browse upcoming and active events across India.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            className="input w-full sm:w-72 !mt-0"
            placeholder="Search hackathons..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select
            className="select-dark"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="ALL">All modes ({counts.total})</option>
            <option value="ONLINE">Online ({counts.online})</option>
            <option value="OFFLINE">Offline ({counts.offline})</option>
            <option value="HYBRID">Hybrid ({counts.hybrid})</option>
          </select>
        </div>
      </div>

      {/* Featured Hackathon Banner */}
      {filtered.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8 relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 sm:p-10 shadow-glow-lg"
        >
          {/* Decorative glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Featured Hackathon
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                {filtered[0].title}
              </h2>
              <p className="mt-3 text-slate-300 max-w-2xl text-lg">
                {filtered[0].tagline || "Join the ultimate coding showdown and build the future!"}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg">💰</span>
                  <span className="text-white">₹{filtered[0].prizePool?.toLocaleString() || 0} Prize Pool</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg">📅</span>
                  <span>Ends: {fmt(filtered[0].registrationEnd)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg">{filtered[0].mode === "ONLINE" ? "🌐" : "📍"}</span>
                  <span>{filtered[0].mode}</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to={`/hackathons/${filtered[0]._id}`} className="btn btn-primary px-8 py-3 text-base shadow-glow">
                  Apply Now
                </Link>
                <button
                  onClick={() => setShowTeammateModal(true)}
                  className="btn btn-outline px-8 py-3 text-base flex items-center gap-2 group border-slate-600 text-slate-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/10"
                >
                  <svg className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Find Teammates
                </button>
              </div>
            </div>

            {/* Featured Image/Graphic */}
            <div className="hidden lg:block relative w-[300px] h-[250px] shrink-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-violet-500 rounded-3xl transform rotate-3 opacity-20" />
              <div className="absolute inset-0 bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden flex items-center justify-center -rotate-3 hover:rotate-0 transition-transform duration-500">
                <span className="text-8xl">🚀</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Recommended Teammates Modal */}
      <AnimatePresence>
        {showTeammateModal && (
          <TeammatesModal onClose={() => setShowTeammateModal(false)} />
        )}
      </AnimatePresence>

      <SponsoredHackathons showBrowseCTA={false} />

      {/* Hackathon grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {filtered.map((h, i) => (
          <motion.div key={h._id} custom={i} variants={cardVariants}>
            <Link
              to={`/hackathons/${h._id}`}
              className="card p-5 block hover:shadow-glow hover:border-cyan-500/30 transition-all duration-300 group h-full"
            >
              {/* Mode badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={
                        "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider " +
                        (h.mode === "ONLINE"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : h.mode === "OFFLINE"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-violet-500/10 text-violet-400 border border-violet-500/20")
                      }
                    >
                      {h.mode}
                    </span>
                    {h.city && <span className="text-xs text-slate-500">📍 {h.city}</span>}
                  </div>
                  <div className="mt-2 font-bold text-slate-900 dark:text-white text-lg group-hover:text-gradient transition-colors">
                    {h.title}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                    {h.tagline}
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold whitespace-nowrap">
                  ₹{h.prizePool >= 100000 ? `${(h.prizePool / 100000).toFixed(0)}L` : h.prizePool?.toLocaleString() || 0}
                </div>
              </div>

              {/* Dates */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-slate-300 dark:border-slate-700/50 bg-slate-100 dark:bg-slate-800/40 p-2">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">Reg Ends</div>
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5">{fmt(h.registrationEnd)}</div>
                </div>
                <div className="rounded-lg border border-slate-300 dark:border-slate-700/50 bg-slate-100 dark:bg-slate-800/40 p-2">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">Submission</div>
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5">{fmt(h.submissionDeadline)}</div>
                </div>
              </div>

              {/* Domains */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {(h.domains || []).slice(0, 4).map((d) => (
                  <span
                    key={d}
                    className="text-[11px] px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20"
                  >
                    {d}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-cyan-500 group-hover:text-cyan-400 transition-colors">
                View Details
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {!filtered.length && (
        <div className="mt-16 text-center text-slate-500">
          <div className="text-4xl mb-3">🔍</div>
          No hackathons found.
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="card p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-lg">
        {icon}
      </div>
      <div>
        <div className="text-xs text-slate-500">{label}</div>
        <div className="text-lg font-bold text-slate-900 dark:text-white">{value}</div>
      </div>
    </div>
  );
}

function fmt(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function TeammatesModal({ onClose }) {
  // Mock data for recommended teammates
  const recommendations = [
    { id: 1, name: "Aarav Sharma", role: "Frontend Developer", match: "98%", skills: ["React", "Tailwind", "UI/UX"], status: "Looking for Team" },
    { id: 2, name: "Priya Patel", role: "Backend Engineer", match: "95%", skills: ["Node.js", "MongoDB", "Express"], status: "Looking for Team" },
    { id: 3, name: "Rohan Kumar", role: "UI/UX Designer", match: "88%", skills: ["Figma", "Prototyping"], status: "Looking for Team" },
    { id: 4, name: "Sneha Reddy", role: "Full Stack Developer", match: "85%", skills: ["Next.js", "PostgreSQL", "Prisma"], status: "Looking for Team" }
  ];

  const [requested, setRequested] = useState([]);

  const handleRequest = (id) => {
    setRequested(prev => [...prev, id]);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Find Teammates</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Recommended developers based on your profile.</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
            {recommendations.map(user => (
              <div key={user.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/30 transition-colors bg-white dark:bg-slate-800/40 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between group">

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 dark:text-white">{user.name}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase">
                        {user.match} Match
                      </span>
                    </div>
                    <div className="text-sm text-cyan-600 dark:text-cyan-400 font-medium mt-0.5">{user.role}</div>
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {user.skills.map(skill => (
                        <span key={skill} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs border border-slate-200 dark:border-slate-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleRequest(user.id)}
                  disabled={requested.includes(user.id)}
                  className={`shrink-0 w-full sm:w-auto px-4 py-2 rounded-xl text-sm font-bold transition-all ${requested.includes(user.id)
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-200 dark:border-slate-700"
                      : "bg-cyan-500 text-white hover:bg-cyan-400 shadow-lg shadow-cyan-500/25"
                    }`}
                >
                  {requested.includes(user.id) ? "Request Sent" : "Send Invite"}
                </button>
              </div>
            ))}
          </div>

        </motion.div>
      </motion.div>
    </>
  );
}