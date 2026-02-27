import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../api/axios";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function JudgeDashboard() {
  const { user } = useContext(AuthContext);
  const [hackathons, setHackathons] = useState([]);
  const [hackathonId, setHackathonId] = useState("");
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    api.get("/hackathons").then((r) => {
      setHackathons(r.data);
      if (r.data[0]?._id) setHackathonId(r.data[0]._id);
    });
  }, []);

  useEffect(() => {
    if (!hackathonId) return;
    api
      .get(`/hackathons/${hackathonId}/submissions/all`)
      .then((r) => setSubs(r.data))
      .catch(console.error);
  }, [hackathonId]);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "JUDGE") return <Navigate to="/dashboard" replace />;

  return (
    <div className="container-max py-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs text-slate-500">Judge</div>
            <h1 className="section-heading flex items-center gap-2">
              <span>⚖️</span> Judge Dashboard
            </h1>
            <p className="section-sub">Review and score submissions.</p>
          </div>

          <select
            className="select-dark"
            value={hackathonId}
            onChange={(e) => setHackathonId(e.target.value)}
          >
            {hackathons.map((h) => (
              <option key={h._id} value={h._id}>{h.title}</option>
            ))}
          </select>
        </div>

        <div className="mt-6 card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/50 bg-slate-800/60">
                <th className="text-left p-4 text-slate-400 font-semibold">Team</th>
                <th className="text-left p-4 text-slate-400 font-semibold">Status</th>
                <th className="text-left p-4 text-slate-400 font-semibold">Links</th>
                <th className="text-left p-4 text-slate-400 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((s, i) => (
                <motion.tr
                  key={s._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-slate-700/30 last:border-0 hover:bg-slate-800/40 transition-colors"
                >
                  <td className="p-4 font-semibold text-white">{s.teamId?.name || "-"}</td>
                  <td className="p-4">
                    <span
                      className={
                        "text-xs px-2.5 py-1 rounded-full font-semibold " +
                        (s.status === "SUBMITTED"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "badge")
                      }
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <a
                      className="text-cyan-400 font-semibold hover:text-cyan-300"
                      href={s.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                    {s.demoVideoUrl ? (
                      <>
                        <span className="mx-2 text-slate-600">•</span>
                        <a
                          className="text-cyan-400 font-semibold hover:text-cyan-300"
                          href={s.demoVideoUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Demo
                        </a>
                      </>
                    ) : null}
                  </td>
                  <td className="p-4">
                    <Link
                      className="btn btn-primary py-1.5 px-3 text-xs"
                      to={`/judge-review?hackathonId=${hackathonId}&submissionId=${s._id}`}
                    >
                      Review
                    </Link>
                  </td>
                </motion.tr>
              ))}
              {!subs.length && (
                <tr>
                  <td className="p-8 text-slate-500 text-center" colSpan="4">
                    <div className="text-3xl mb-2">📋</div>
                    No submissions yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-sm text-slate-500">
          After scoring, leaderboard auto refreshes when participants submit or you score.
        </div>
      </motion.div>
    </div>
  );
}