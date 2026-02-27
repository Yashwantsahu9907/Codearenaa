import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="relative min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#020617] dark:text-[#e2e8f0] transition-colors duration-300">
          {/* Ambient background blobs */}
          <div className="blob-cyan w-[600px] h-[600px] -top-64 -left-64 fixed" />
          <div className="blob-violet w-[500px] h-[500px] top-1/2 -right-48 fixed" />
          <div className="blob-blue w-[400px] h-[400px] bottom-0 left-1/3 fixed" />

          <Navbar />
          <main className="flex-1 relative z-10">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}