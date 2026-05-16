/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0066FF",
        "primary-dark": "#0052CC",
        "primary-light": "#E6F0FF",
        secondary: "#FFB81C",
        "secondary-dark": "#E6A519",
        "bg-main": "#FFFFFF",
        "bg-secondary": "#F8F9FA",
        "bg-cta": "#F0F4FF",
        "text-main": "#1A1A1A",
        "text-secondary": "#666666",
        "border-color": "#E0E0E0",
        success: "#10B981",
        error: "#EF4444",
        "footer-bg": "#1a1a1a",
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out forwards",
        "slide-up": "slideUp 0.3s ease-out forwards",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.03)" },
        },
      },
    },
  },
  plugins: [],
};
