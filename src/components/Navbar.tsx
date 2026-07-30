import { Film, User } from "lucide-react";
import { NAV_LINKS } from "../constants/navLinks";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#121736] px-6 py-4 md:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <Film className="h-7 w-7 text-amber-500" />
          <span className="text-xl font-bold tracking-tight text-white">
            CINE<span className="text-amber-500">MATCH</span>
          </span>
        </a>

        {/* Nav links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={
                  link.label === "Home"
                    ? "border-b-2 border-amber-500 pb-1 text-sm font-medium text-amber-500"
                    : "text-sm font-medium text-gray-300 transition-colors hover:text-white"
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Profile icon */}
        <button
          type="button"
          aria-label="Profile"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-amber-500 transition-colors hover:border-amber-500"
        >
          <User className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
}
