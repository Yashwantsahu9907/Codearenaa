import defaultTheme from "tailwindcss/defaultTheme";

export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        surface: {
          DEFAULT: "#0f172a",
          50: "#1e293b",
          100: "#1a2335",
          200: "#151d2e",
          300: "#0f172a",
          400: "#0c1322",
          500: "#080e1a",
        },
        brand: {
          cyan: "#06b6d4",
          blue: "#3b82f6",
          violet: "#8b5cf6",
          pink: "#ec4899",
        },
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)",
        "gradient-brand-h": "linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6)",
        "gradient-warm": "linear-gradient(135deg, #f59e0b, #ef4444, #ec4899)",
        "gradient-surface": "linear-gradient(180deg, #1e293b, #0f172a)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out",
      },
      boxShadow: {
        glow: "0 0 20px rgba(6, 182, 212, 0.15)",
        "glow-lg": "0 0 40px rgba(6, 182, 212, 0.2)",
        "glow-brand": "0 0 30px rgba(59, 130, 246, 0.25)",
      },
    },
  },
  plugins: [],
};