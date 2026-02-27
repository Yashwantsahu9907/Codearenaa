import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AuthLogin() {
  const { login, user } = useContext(AuthContext);
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) nav("/dashboard", { replace: true });
  }, [user, nav]);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await login(email, password);
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative">
      <div className="blob-cyan w-[300px] h-[300px] -top-20 -left-20 absolute" />
      <div className="blob-violet w-[250px] h-[250px] bottom-0 right-0 absolute" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="card-glow p-8">
          <div className="text-center">
            <h2 className="text-3xl font-black text-gradient">Welcome back</h2>
            <p className="text-sm text-slate-600 dark:text-slate-500 mt-2">Sign in to your CODEARENA account</p>
          </div>

          {err && (
            <div className="mt-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {err}
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <label className="block">
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email</div>
              <input
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="block">
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</div>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </label>

            <button
              disabled={loading}
              className={
                "btn btn-primary w-full py-3 text-base " +
                (loading ? "opacity-70 cursor-not-allowed" : "")
              }
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" className="opacity-75" />
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-500">
            New user?{" "}
            <Link className="text-cyan-500 dark:text-cyan-400 font-semibold hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors" to="/register">
              Create account
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}