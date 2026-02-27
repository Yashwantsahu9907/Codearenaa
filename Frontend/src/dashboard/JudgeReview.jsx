import React, { useEffect, useState } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { api } from "../api/axios";
import { useSocket } from "../hooks/useSocket";
import { motion } from "framer-motion";

export default function JudgeReview() {
  const [params] = useSearchParams();
  const hackathonId = params.get("hackathonId");
  const submissionId = params.get("submissionId");

  const socket = useSocket({ hackathonId, teamId: null });

  const [sub, setSub] = useState(null);
  const [form, setForm] = useState({
    innovation: 7,
    ux: 7,
    complexity: 7,
    presentation: 7,
    note: "",
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!hackathonId || !submissionId) return;
    api
      .get(`/hackathons/${hackathonId}/submissions/all`)
      .then((r) => setSub(r.data.find((x) => x._id === submissionId) || null))
      .catch(console.error);
  }, [hackathonId, submissionId]);

  if (!hackathonId || !submissionId) return <Navigate to="/judge" replace />;

  async function submitScore() {
    setMsg("");
    await api.post(`/hackathons/${hackathonId}/judge/score/${submissionId}`, form);
    setMsg("Scored ✅ Leaderboard will refresh.");
    socket.emit("leaderboard:refresh", { hackathonId });
  }

  const total = form.innovation + form.ux + form.complexity + form.presentation;

  return (
    <div className="container-max py-10 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card p-6"
      >
        <h1 className="text-2xl font-black text-gradient">Review Submission</h1>

        {!sub ? (
          <div className="mt-4 flex items-center gap-3 text-slate-500">
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
              <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" className="opacity-75" />
            </svg>
            Loading submission...
          </div>
        ) : (
          <>
            {/* Team info */}
            <div className="mt-5 rounded-xl border border-slate-700/50 bg-slate-800/60 p-4">
              <div className="text-xs text-slate-500">Team</div>
              <div className="text-lg font-bold text-white">{sub.teamId?.name || "-"}</div>
              <div className="mt-2 flex items-center gap-3 text-sm">
                <a className="text-cyan-400 font-semibold hover:text-cyan-300" href={sub.githubUrl} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
                {sub.demoVideoUrl && (
                  <>
                    <span className="text-slate-600">•</span>
                    <a className="text-cyan-400 font-semibold hover:text-cyan-300" href={sub.demoVideoUrl} target="_blank" rel="noreferrer">
                      Demo ↗
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Score total indicator */}
            <div className="mt-5 rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 text-center">
              <div className="text-xs text-slate-500">Total Score</div>
              <div className="text-4xl font-black text-gradient mt-1">{total}</div>
              <div className="text-xs text-slate-600 mt-1">out of 40</div>
              <div className="mt-3 w-full h-2 rounded-full bg-slate-700/50 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(total / 40) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Score sliders */}
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              <ScoreSlider
                label="Innovation"
                value={form.innovation}
                onChange={(v) => setForm((p) => ({ ...p, innovation: v }))}
                color="from-cyan-500 to-cyan-400"
              />
              <ScoreSlider
                label="UI/UX"
                value={form.ux}
                onChange={(v) => setForm((p) => ({ ...p, ux: v }))}
                color="from-blue-500 to-blue-400"
              />
              <ScoreSlider
                label="Complexity"
                value={form.complexity}
                onChange={(v) => setForm((p) => ({ ...p, complexity: v }))}
                color="from-violet-500 to-violet-400"
              />
              <ScoreSlider
                label="Presentation"
                value={form.presentation}
                onChange={(v) => setForm((p) => ({ ...p, presentation: v }))}
                color="from-pink-500 to-pink-400"
              />
            </div>

            {/* Note */}
            <label className="block mt-5">
              <div className="text-sm font-semibold text-slate-300">Note</div>
              <textarea
                className="input min-h-[110px] resize-y"
                value={form.note}
                onChange={(e) => setForm((p) => ({ ...p, note: e.target.value }))}
                placeholder="Feedback for team..."
              />
            </label>

            <button
              onClick={submitScore}
              className="mt-5 btn btn-primary w-full py-3 text-base"
            >
              Submit Score
            </button>

            {msg && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                {msg}
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}

function ScoreSlider({ label, value, onChange, color }) {
  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-semibold text-slate-300">{label}</div>
        <div className="text-lg font-black text-white">{value}</div>
      </div>
      <input
        type="range"
        min="0"
        max="10"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-700/50
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
          [&::-webkit-slider-thumb]:from-cyan-400 [&::-webkit-slider-thumb]:to-blue-500
          [&::-webkit-slider-thumb]:shadow-glow [&::-webkit-slider-thumb]:cursor-pointer"
      />
      <div className="mt-1 w-full h-1.5 rounded-full bg-slate-700/50 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          style={{ width: `${value * 10}%` }}
        />
      </div>
    </div>
  );
}