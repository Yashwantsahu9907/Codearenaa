import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
      ? "bg-cyan-500/10 text-cyan-400 shadow-[inset_0_0_8px_rgba(6,182,212,0.2)]"
      : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
    }`;

  const navLinks = (
    <>
      <NavLink className={linkClass} to="/hackathons" onClick={() => setMobileOpen(false)}>
        Hackathons
      </NavLink>
      <NavLink className={linkClass} to="/leaderboard" onClick={() => setMobileOpen(false)}>
        Leaderboard
      </NavLink>
    </>
  );

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-900/70 backdrop-blur-xl"
    >
      <div className="container-max py-3 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 shadow-glow group-hover:shadow-glow-lg transition-shadow duration-300 flex items-center justify-center">
            <span className="text-white font-black text-sm">CA</span>
          </div>
          <span className="font-black text-xl tracking-tight">
            <span className="text-gradient">CODE</span>
            <span className="text-white">ARENA</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {navLinks}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-amber-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors ml-2"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {!user ? (
            <div className="flex items-center gap-2 ml-2">
              <Link className="btn btn-outline" to="/login">Login</Link>
              <Link className="btn btn-primary" to="/register">Register</Link>
            </div>
          ) : (
            <div className="flex items-center gap-3 ml-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/50">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  {user.name?.charAt(0)?.toUpperCase()}
                </div>
                <span className="text-sm text-slate-300">
                  {user.name}
                </span>
                <span className="badge-brand text-[10px]">{user.role}</span>
              </div>
              <Link className="btn btn-outline" to="/dashboard">Dashboard</Link>
              <button className="btn btn-dark" onClick={logout}>Logout</button>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-xl"
          >
            <div className="container-max py-4 flex flex-col gap-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold uppercase text-xs">Menu</span>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-amber-400"
                >
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
              {navLinks}
              {!user ? (
                <div className="flex flex-col gap-2 pt-2 border-t border-slate-700/50">
                  <Link className="btn btn-outline text-center" to="/login" onClick={() => setMobileOpen(false)}>Login</Link>
                  <Link className="btn btn-primary text-center" to="/register" onClick={() => setMobileOpen(false)}>Register</Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-2 border-t border-slate-700/50">
                  <div className="text-slate-400 text-xs">
                    Signed in as <b className="text-slate-200">{user.name}</b> • {user.role}
                  </div>
                  <Link className="btn btn-outline text-center" to="/dashboard" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                  <button className="btn btn-dark" onClick={() => { logout(); setMobileOpen(false); }}>Logout</button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}