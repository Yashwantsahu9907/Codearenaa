import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const roles = [
  { value: "PARTICIPANT", label: "Participant", icon: "🚀", desc: "Join teams & submit projects" },
  { value: "ORGANIZER", label: "Organizer", icon: "🎯", desc: "Create & manage hackathons" },
  { value: "JUDGE", label: "Judge", icon: "⚖️", desc: "Review & score submissions" },
  { value: "MENTOR", label: "Mentor", icon: "🧠", desc: "Guide participants" },
];

export default function AuthRegister() {
  const { register } = useContext(AuthContext);
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "PARTICIPANT",
  });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  function set(k, v) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await register(form);
      nav("/dashboard");
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative">
      <div className="blob-violet w-[300px] h-[300px] -top-20 -right-20 absolute" />
      <div className="blob-cyan w-[250px] h-[250px] bottom-0 left-0 absolute" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="card-glow p-8">
          <div className="text-center">
            <h2 className="text-3xl font-black text-gradient">Join CODEARENA</h2>
            <p className="text-sm text-slate-600 dark:text-slate-500 mt-2">Choose your role and start competing</p>
          </div>

          {err && (
            <div className="mt-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {err}
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <label className="block">
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full name</div>
              <input
                className="input"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Your name"
                required
              />
            </label>

            <label className="block">
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email</div>
              <input
                className="input"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="block">
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</div>
              <input
                type="password"
                className="input"
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
                placeholder="Min 6+ chars"
                required
              />
            </label>

            {/* Role selector cards */}
            <div>
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Role</div>
              <div className="grid grid-cols-2 gap-2">
                {roles.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => set("role", r.value)}
                    className={
                      "p-3 rounded-xl border text-left transition-all duration-200 " +
                      (form.role === r.value
                        ? "border-cyan-500/50 bg-cyan-500/10 shadow-glow"
                        : "border-slate-300 bg-slate-50 hover:border-slate-400 dark:border-slate-700/50 dark:bg-slate-800/50 dark:hover:border-slate-600")
                    }
                  >
                    <div className="text-lg">{r.icon}</div>
                    <div className={
                      "text-sm font-semibold mt-1 " +
                      (form.role === r.value ? "text-cyan-600 dark:text-cyan-400" : "text-slate-700 dark:text-slate-300")
                    }>
                      {r.label}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{r.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={loading}
              className={
                "btn btn-primary w-full py-3 text-base " +
                (loading ? "opacity-70 cursor-not-allowed" : "")
              }
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-500">
            Already have account?{" "}
            <Link className="text-cyan-600 hover:text-cyan-500 dark:text-cyan-400 font-semibold dark:hover:text-cyan-300 transition-colors" to="/login">
              Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}