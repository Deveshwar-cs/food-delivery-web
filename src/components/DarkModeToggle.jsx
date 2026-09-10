import React from "react";
import {Sun, Moon} from "lucide-react";

/**
 * DarkModeToggle
 *
 * A clean icon button that shows Sun in dark mode and Moon in light mode.
 * Designed to drop into the Navbar actions row with zero extra CSS.
 *
 * Props:
 *   isDark  – boolean
 *   onToggle – () => void
 */
const DarkModeToggle = ({isDark, onToggle}) => {
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="
        navbar__icon-btn
        relative flex items-center justify-center
        w-[38px] h-[38px] rounded-md border-none
        bg-transparent cursor-pointer
        text-[var(--clr-text-secondary)]
        transition-colors duration-300
        hover:bg-[var(--clr-surface-2)] hover:text-[var(--clr-text)]
      "
    >
      {/* Sun icon — shown when dark mode is active */}
      <Sun
        size={18}
        className={`
          absolute transition-all duration-300 ease-in-out
          ${isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"}
        `}
      />
      {/* Moon icon — shown when light mode is active */}
      <Moon
        size={18}
        className={`
          absolute transition-all duration-300 ease-in-out
          ${isDark ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}
        `}
      />
    </button>
  );
};

export default DarkModeToggle;
