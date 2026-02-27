import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950/80 backdrop-blur-md pt-16 pb-8 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-5">
            <Link to="/" className="font-black text-2xl tracking-tight inline-block mb-4">
              <span className="text-gradient">CODE</span>
              <span className="text-slate-900 dark:text-white">ARENA</span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 max-w-sm">
              The ultimate national-level hackathon management platform. Build, compete, and win with top-tier tools for participants, organizers, and judges.
            </p>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Subscribe to our Newsletter</h4>
              <div className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="input !mt-0 flex-1 bg-slate-100 dark:bg-slate-900/50 border-slate-300 dark:border-slate-700/50 focus:border-cyan-500/50"
                />
                <button className="btn btn-primary px-4 py-2 text-sm whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-slate-900 dark:text-white font-bold mb-5 tracking-wide">Platform</h4>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/hackathons" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Explore Hackathons</Link></li>
              <li><Link to="/leaderboard" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Global Leaderboard</Link></li>
              <li><Link to="/register" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Create Account</Link></li>
              <li><Link to="/login" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Sign In</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-slate-900 dark:text-white font-bold mb-5 tracking-wide">Features</h4>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors cursor-pointer">Organizer Dashboard</li>
              <li className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors cursor-pointer">Live Judge Panel</li>
              <li className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors cursor-pointer">Real-time Mentoring</li>
              <li className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors cursor-pointer">Auto Certificates</li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-slate-900 dark:text-white font-bold mb-5 tracking-wide">Connect</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Follow us on social media for the latest hackathon announcements and updates.
            </p>
            <div className="flex gap-4">
              {/* Social Icons (using simple generic SVGs) */}
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-cyan-50 hover:text-cyan-500 dark:hover:bg-cyan-500/20 dark:hover:text-cyan-400 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-cyan-50 hover:text-cyan-500 dark:hover:bg-cyan-500/20 dark:hover:text-cyan-400 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-cyan-50 hover:text-cyan-500 dark:hover:bg-cyan-500/20 dark:hover:text-cyan-400 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-cyan-50 hover:text-cyan-500 dark:hover:bg-cyan-500/20 dark:hover:text-cyan-400 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.156-.12-.322-.16-.485s-.08-.344-.12-.51c2.14-.768 4.41-1.942 5.09-2.622-1.2-1.574-2.82-2.83-4.797-3.418v-.037c1.397.66 2.77 1.385 4.01 1.998v.037zM11.99 4a8.497 8.497 0 013.78 1.118c-.808-.66-1.516-1.26-2.094-1.74A8.502 8.502 0 0113.8 3.51a8.497 8.497 0 01-1.81.49zm-4.706 1.1A8.495 8.495 0 0111.4 3.65c-1.39.734-2.793 1.543-3.804 2.115a8.498 8.498 0 01-.312-1.325v-.01zM4.195 8.27a8.497 8.497 0 011.65-2.584c.642.54 1.487 1.258 2.457 2.053-.41.36-.838.74-1.282 1.135a8.497 8.497 0 01-2.825-1.06zm-.324 7.641a8.497 8.497 0 01-1.31-5.34c1.072.316 2.628.706 4.364.706.012 0 .02-.001.03-.001-.01.25-.018.498-.018.744 0 2.222.378 4.19.866 5.86-2.22-.324-4.228-1.076-4.632-1.408v-.011zm3.8-9.06c.4-.356.81-.72 1.238-1.092.8.69 1.638 1.47 2.373 2.25.176.183.332.374.492.564-.08.016-.16.03-.242.046a16.828 16.828 0 00-6.074.88c-.686-.882-1.458-1.812-2.312-2.73 1.13-1.07 2.74-2.092 4.525-2.92v.002h-.01v.002zm2.14.73l.63.59c-.27.4-.53.8-.78 1.2a15.22 15.22 0 00-1.272-1.12c.48-.22.95-.44 1.422-.67z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/60 flex flex-col md:flex-row gap-4 justify-between items-center text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} CODEARENA. All rights reserved.</span>
            <span className="hidden sm:inline mx-2">•</span>
            <span className="hidden sm:inline">Built with React & Tailwind CSS</span>
          </div>

          <div className="flex gap-6">
            <a href="#" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
}