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
  { submissionId: "s1", rank: 1, team: { name: "NeuralNinjas" }, avgTotal: 38.5, judgeCount: 4, githubUrl: "#", demoVideoUrl: "#", scores: { innovation: 9.8, ux: 9.5, complexity: 9.7, presentation: 9.5 } },
  { submissionId: "s2", rank: 2, team: { name: "ByteBusters" }, avgTotal: 36.2, judgeCount: 4, githubUrl: "#", demoVideoUrl: "#", scores: { innovation: 9.2, ux: 9.0, complexity: 9.0, presentation: 9.0 } },
  { submissionId: "s3", rank: 3, team: { name: "CodeCrushers" }, avgTotal: 34.8, judgeCount: 4, githubUrl: "#", demoVideoUrl: "#", scores: { innovation: 8.8, ux: 8.7, complexity: 8.8, presentation: 8.5 } },
  { submissionId: "s4", rank: 4, team: { name: "PixelPirates" }, avgTotal: 32.4, judgeCount: 3, githubUrl: "#", demoVideoUrl: "", scores: { innovation: 8.5, ux: 8.0, complexity: 8.2, presentation: 7.7 } },
  { submissionId: "s5", rank: 5, team: { name: "StackSurfers" }, avgTotal: 31.0, judgeCount: 3, githubUrl: "#", demoVideoUrl: "#", scores: { innovation: 8.0, ux: 7.8, complexity: 7.8, presentation: 7.4 } },
  { submissionId: "s6", rank: 6, team: { name: "DevDragons" }, avgTotal: 29.6, judgeCount: 4, githubUrl: "#", demoVideoUrl: "", scores: { innovation: 7.5, ux: 7.5, complexity: 7.4, presentation: 7.2 } },
  { submissionId: "s7", rank: 7, team: { name: "CloudChasers" }, avgTotal: 28.2, judgeCount: 3, githubUrl: "#", demoVideoUrl: "#", scores: { innovation: 7.2, ux: 7.0, complexity: 7.0, presentation: 7.0 } },
  { submissionId: "s8", rank: 8, team: { name: "HackHawks" }, avgTotal: 26.0, judgeCount: 3, githubUrl: "#", demoVideoUrl: "", scores: { innovation: 6.8, ux: 6.5, complexity: 6.5, presentation: 6.2 } },
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
      const r = await api.get(`/hackathons/${hackathonId}/judge/leaderboard`);
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

  const topThree = rows.slice(0, 3);
  const rest = rows.slice(3);
  const maxScore = 40;

  return (
    <div className="container-max py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="section-heading flex items-center gap-3">
            <span className="text-3xl">🏆</span> Leaderboard
          </h1>
          <p className="section-sub">Live rankings based on average judge scores.</p>
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
        <StatCard label="Teams Ranked" value={rows.length} icon="👥" />
        <StatCard label="Top Score" value={rows[0] ? Number(rows[0].avgTotal).toFixed(1) : "-"} icon="⭐" />
        <StatCard label="Avg Score" value={rows.length ? (rows.reduce((s, r) => s + Number(r.avgTotal), 0) / rows.length).toFixed(1) : "-"} icon="📊" />
        <StatCard label="Total Judges" value={rows[0]?.judgeCount || "-"} icon="⚖️" />
      </motion.div>

      {/* Podium — Top 3 */}
      {topThree.length >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 grid grid-cols-3 gap-4 items-end"
        >
          {/* 2nd Place */}
          <PodiumCard rank={2} data={topThree[1]} maxScore={maxScore} />
          {/* 1st Place */}
          <PodiumCard rank={1} data={topThree[0]} maxScore={maxScore} />
          {/* 3rd Place */}
          <PodiumCard rank={3} data={topThree[2]} maxScore={maxScore} />
        </motion.div>
      )}

      {/* Full table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-8 card overflow-hidden"
      >
        <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
          <h3 className="font-bold text-white">Full Rankings</h3>
          <span className="badge">{rows.length} teams</span>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700/50 bg-slate-800/40">
              <th className="text-left p-4 text-slate-500 font-semibold text-xs uppercase tracking-wider">Rank</th>
              <th className="text-left p-4 text-slate-500 font-semibold text-xs uppercase tracking-wider">Team</th>
              <th className="text-left p-4 text-slate-500 font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">Innovation</th>
              <th className="text-left p-4 text-slate-500 font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">UI/UX</th>
              <th className="text-left p-4 text-slate-500 font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">Complexity</th>
              <th className="text-left p-4 text-slate-500 font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">Presentation</th>
              <th className="text-left p-4 text-slate-500 font-semibold text-xs uppercase tracking-wider">Total</th>
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
                <td className="p-4 hidden sm:table-cell">
                  <ScoreCell value={r.scores?.innovation} />
                </td>
                <td className="p-4 hidden sm:table-cell">
                  <ScoreCell value={r.scores?.ux} />
                </td>
                <td className="p-4 hidden sm:table-cell">
                  <ScoreCell value={r.scores?.complexity} />
                </td>
                <td className="p-4 hidden sm:table-cell">
                  <ScoreCell value={r.scores?.presentation} />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-cyan-400 text-base">
                      {Number(r.avgTotal).toFixed(1)}
                    </span>
                    <div className="w-16 h-2 rounded-full bg-slate-700/50 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(Number(r.avgTotal) / maxScore) * 100}%` }}
                        transition={{ duration: 0.6, delay: i * 0.05 }}
                        className={
                          "h-full rounded-full bg-gradient-to-r " +
                          (r.rank === 1
                            ? "from-amber-400 to-yellow-500"
                            : r.rank === 2
                              ? "from-slate-300 to-slate-400"
                              : r.rank === 3
                                ? "from-amber-600 to-amber-700"
                                : "from-cyan-500 to-blue-500")
                        }
                      />
                    </div>
                  </div>
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
                <td className="p-8 text-slate-500 text-center" colSpan="8">
                  <div className="text-3xl mb-2">📊</div>
                  No scores yet. Judges need to score submissions.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

/* ── Podium Card ────────────────────────────────────────── */
function PodiumCard({ rank, data, maxScore }) {
  const isFirst = rank === 1;
  const gradient = rankStyles[rank];
  const height = isFirst ? "h-48" : rank === 2 ? "h-40" : "h-36";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank === 1 ? 0.1 : rank === 2 ? 0.2 : 0.3, duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className={
        "w-full rounded-2xl border border-slate-700/50 backdrop-blur-sm p-4 md:p-5 text-center transition-all duration-300 " +
        (isFirst ? "bg-slate-800/80 shadow-glow-lg" : "bg-slate-800/50")
      }>
        {/* Medal */}
        <div className="text-3xl md:text-4xl mb-2">{rankEmoji[rank]}</div>

        {/* Avatar */}
        <div className={`mx-auto w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-lg md:text-xl font-black shadow-lg ${isFirst ? "shadow-glow ring-2 ring-amber-400/30" : ""}`}>
          {data.team?.name?.charAt(0) || "?"}
        </div>

        {/* Name */}
        <div className={`mt-3 font-bold text-sm md:text-base ${isFirst ? "text-gradient" : "text-white"}`}>
          {data.team?.name || "-"}
        </div>

        {/* Score */}
        <div className={`mt-1 text-xl md:text-2xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
          {Number(data.avgTotal).toFixed(1)}
        </div>
        <div className="text-[10px] text-slate-500 uppercase tracking-wider">out of {maxScore}</div>

        {/* Score bar */}
        <div className="mt-3 w-full h-1.5 rounded-full bg-slate-700/50 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(Number(data.avgTotal) / maxScore) * 100}%` }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
          />
        </div>
      </div>

      {/* Podium base */}
      <div className={`w-full ${height} rounded-b-2xl bg-gradient-to-b ${gradient} opacity-10 -mt-3 rounded-t-none`} />
    </motion.div>
  );
}

/* ── Score Cell ─────────────────────────────────────────── */
function ScoreCell({ value }) {
  if (value === undefined || value === null) return <span className="text-slate-600">-</span>;
  const num = Number(value);
  const color =
    num >= 9 ? "text-emerald-400" :
      num >= 7 ? "text-cyan-400" :
        num >= 5 ? "text-amber-400" :
          "text-red-400";
  return (
    <span className={`font-semibold ${color}`}>{num.toFixed(1)}</span>
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