import React, { useEffect, useState } from "react";
import { api } from "../api/axios";
import { useSocket } from "../hooks/useSocket";
import { motion } from "framer-motion";

/* ── Demo leaderboard data ──────────────────────────────── */
const DEMO_HACKATHONS = [
  { _id: "demo-1", title: "CodeStorm 2026" },
  { _id: "demo-2", title: "HackIndia Delhi" },
  { _id: "demo-3", title: "DevSprint Hybrid" },
];

const DEMO_ROWS = [
  { submissionId: "s1", rank: 1, team: { name: "NeuralNinjas" }, githubUrl: "#", demoVideoUrl: "#" },
  { submissionId: "s2", rank: 2, team: { name: "ByteBusters" }, githubUrl: "#", demoVideoUrl: "#" },
  { submissionId: "s3", rank: 3, team: { name: "CodeCrushers" }, githubUrl: "#", demoVideoUrl: "#" },
  { submissionId: "s4", rank: 4, team: { name: "PixelPirates" }, githubUrl: "#", demoVideoUrl: "" },
  { submissionId: "s5", rank: 5, team: { name: "StackSurfers" }, githubUrl: "#", demoVideoUrl: "#" },
  { submissionId: "s6", rank: 6, team: { name: "DevDragons" }, githubUrl: "#", demoVideoUrl: "" },
  { submissionId: "s7", rank: 7, team: { name: "CloudChasers" }, githubUrl: "#", demoVideoUrl: "#" },
  { submissionId: "s8", rank: 8, team: { name: "HackHawks" }, githubUrl: "#", demoVideoUrl: "" },
];

const rankStyles = {
  1: "from-amber-400 to-yellow-500 text-slate-900",
  2: "from-slate-300 to-slate-400 text-slate-900",
  3: "from-amber-600 to-amber-700 text-white",
};

const rankEmoji = { 1: "🥇", 2: "🥈", 3: "🥉" };

export default function Leaderboard() {
  const [hackathons, setHackathons] = useState([]);
  const [hackathonId, setHackathonId] = useState("");
  const [rows, setRows] = useState([]);

  const socket = useSocket({ hackathonId, teamId: null });

  useEffect(() => {
    api
      .get("/hackathons")
      .then((r) => {
        const data = r.data && r.data.length ? r.data : DEMO_HACKATHONS;
        setHackathons(data);
        if (data[0]?._id) setHackathonId(data[0]._id);
      })
      .catch(() => {
        setHackathons(DEMO_HACKATHONS);
        setHackathonId(DEMO_HACKATHONS[0]._id);
      });
  }, []);

  async function load() {
    if (!hackathonId) return;
    try {
      const r = await api.get(`/hackathons/${hackathonId}/submissions/public`);
      setRows(r.data && r.data.length ? r.data : DEMO_ROWS);
    } catch {
      setRows(DEMO_ROWS);
    }
  }

  useEffect(() => {
    load().catch(console.error);
  }, [hackathonId]);

  useEffect(() => {
    socket.on("leaderboard:refresh", () => load().catch(console.error));
    return () => socket.off("leaderboard:refresh");
  }, [socket, hackathonId]);

  return (
    <div className="container-max py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="section-heading flex items-center gap-3">
            <span className="text-3xl">🏆</span> Leaderboard & Submissions
          </h1>
          <p className="section-sub">Live tracking of team submissions for this hackathon.</p>
        </div>

        <div className="flex gap-2">
          <select
            className="select-dark"
            value={hackathonId}
            onChange={(e) => setHackathonId(e.target.value)}
          >
            {hackathons.map((h) => (
              <option key={h._id} value={h._id}>
                {h.title}
              </option>
            ))}
          </select>
          <button onClick={load} className="btn btn-dark">
            Refresh
          </button>
        </div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        <StatCard label="Total Submissions" value={rows.length} icon="📤" />
        <StatCard label="Teams Participating" value={rows.length} icon="👥" />
      </motion.div>

      {/* Full table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-8 card overflow-hidden"
      >
        <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
          <h3 className="font-bold text-white">Submitted Projects</h3>
          <span className="badge">{rows.length} teams</span>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700/50 bg-slate-800/40">
              <th className="text-left p-4 text-slate-500 font-semibold text-xs uppercase tracking-wider">#</th>
              <th className="text-left p-4 text-slate-500 font-semibold text-xs uppercase tracking-wider">Team</th>
              <th className="text-left p-4 text-slate-500 font-semibold text-xs uppercase tracking-wider">Status</th>
              <th className="text-left p-4 text-slate-500 font-semibold text-xs uppercase tracking-wider">Links</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <motion.tr
                key={r.submissionId}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className={
                  "border-b border-slate-700/20 last:border-0 hover:bg-slate-800/50 transition-colors " +
                  (r.rank <= 3 ? "bg-slate-800/20" : "")
                }
              >
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {rankEmoji[r.rank] && <span className="text-lg">{rankEmoji[r.rank]}</span>}
                    <span
                      className={
                        "inline-flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm bg-gradient-to-r " +
                        (rankStyles[r.rank] || "from-slate-700 to-slate-600 text-slate-300")
                      }
                    >
                      {r.rank}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className={
                      "w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br " +
                      (r.rank === 1 ? "from-amber-400 to-yellow-500" : r.rank === 2 ? "from-slate-300 to-slate-400" : r.rank === 3 ? "from-amber-600 to-amber-700" : "from-slate-600 to-slate-500")
                    }>
                      {r.team?.name?.charAt(0) || "?"}
                    </div>
                    <span className="font-semibold text-white">{r.team?.name || "-"}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Submitted
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <a className="text-cyan-400 font-semibold hover:text-cyan-300 text-xs" href={r.githubUrl} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                    {r.demoVideoUrl ? (
                      <>
                        <span className="text-slate-700">•</span>
                        <a className="text-cyan-400 font-semibold hover:text-cyan-300 text-xs" href={r.demoVideoUrl} target="_blank" rel="noreferrer">
                          Demo
                        </a>
                      </>
                    ) : null}
                  </div>
                </td>
              </motion.tr>
            ))}
            {!rows.length && (
              <tr>
                <td className="p-8 text-slate-500 text-center" colSpan="4">
                  <div className="text-3xl mb-2">📊</div>
                  No submissions yet. Be the first to submit!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

/* ── Stat Card ──────────────────────────────────────────── */
function StatCard({ label, value, icon }) {
  return (
    <div className="card p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center text-lg">
        {icon}
      </div>
      <div>
        <div className="text-xs text-slate-500">{label}</div>
        <div className="text-lg font-bold text-white">{value}</div>
      </div>
    </div>
  );
}