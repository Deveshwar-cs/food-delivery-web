/** @type {import('tailwindcss').Config} */
export default {
  // ── Dark mode: class strategy ──────────────────────────────────────────────
  // Tailwind will apply dark-variant utilities only when the <html> element
  // carries the "dark" class. Our useDarkMode hook manages that class.
  darkMode: "class",

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      // Smooth color transitions for the dark/light switch
      transitionProperty: {
        colors:
          "color, background-color, border-color, text-decoration-color, fill, stroke",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
      transitionTimingFunction: {
        DEFAULT: "ease-in-out",
      },
    },
  },

  plugins: [],
};
