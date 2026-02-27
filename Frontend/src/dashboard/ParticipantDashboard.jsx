import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../api/axios";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ParticipantDashboard() {
  const { user } = useContext(AuthContext);
  const [hackathons, setHackathons] = useState([]);

  useEffect(() => {
    api.get("/hackathons").then((r) => setHackathons(r.data)).catch(console.error);
  }, []);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "ORGANIZER") return <Navigate to="/organizer" replace />;
  if (user.role === "JUDGE") return <Navigate to="/judge" replace />;

  return (
    <div className="container-max py-10">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card p-6"
      >
        <div className="text-xs text-slate-500">Dashboard</div>
        <h1 className="text-3xl font-black mt-1">
          Welcome, <span className="text-gradient">{user.name}</span>
        </h1>
        <p className="text-slate-400 mt-2">
          Pick a hackathon, create/join team and submit your project.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link className="btn btn-primary" to="/hackathons">
            Browse Hackathons
          </Link>
          <Link className="btn btn-outline" to="/leaderboard">
            Leaderboard
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {hackathons.slice(0, 6).map((h, i) => (
          <motion.div
            key={h._id}
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
          >
            <Link
              to={`/hackathons/${h._id}`}
              className="card p-5 block hover:shadow-glow hover:border-cyan-500/30 transition-all duration-300 group"
            >
              <div className="text-xs text-slate-500">{h.mode}</div>
              <div className="font-bold text-white mt-1 group-hover:text-gradient transition-colors">
                {h.title}
              </div>
              <div className="text-sm text-slate-400 mt-1 line-clamp-2">{h.tagline}</div>
              <div className="mt-3 text-xs text-slate-500">
                Submission: <b className="text-slate-300">{new Date(h.submissionDeadline).toLocaleDateString()}</b>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}