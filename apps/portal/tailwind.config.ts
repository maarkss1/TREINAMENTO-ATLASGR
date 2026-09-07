import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        atlas: {
          orange: "#FF5618",
          dark: "#333333",
        },
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "sans-serif"],
        display: ["var(--font-mont)", "sans-serif"],
      },
      animation: {
        "glow-pulse": "glow 2s ease-in-out infinite",
        "ripple": "ripple 0.6s linear",
        "fade-in": "fade-in-atlas 200ms ease-out",
        "slide-in": "slide-in-atlas 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scale-in-atlas 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        glow: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(255, 86, 24, 0.4)" },
          "50%": { boxShadow: "0 0 30px rgba(255, 86, 24, 0.8)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
        "fade-in-atlas": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in-atlas": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in-atlas": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        }
      },
      boxShadow: {
        "glow": "0 0 15px rgba(255, 86, 24, 0.5)",
        "premium": "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
