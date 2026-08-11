import { Film } from "lucide-react";
import { NAV_LINKS } from "../constants/navLinks";

const CONTACT_LINKS = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Support", href: "/support" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0e1a] px-6 pb-8 pt-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="border-t border-b py-6 border-white/10 grid gap-10 md:grid-cols-[5fr_2.5fr_2.5fr]">
          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-2">
              <Film className="h-6 w-6 text-amber-500" />
              <span className="text-lg font-bold tracking-tight text-white">
                CINE<span className="text-amber-500">MATCH</span>
              </span>
            </a>
            <p className="mt-4 max-w-md text-md text-gray-400">
              Answer a few simple questions and get a movie recommendation
              tailored to your mood, preferences, and available time.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-semibold tracking-wide text-gray-500">
              EXPLORE
            </h3>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold tracking-wide text-gray-500">
              COMPANY
            </h3>
            <ul className="mt-4 space-y-3">
              {CONTACT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-xs text-gray-500 mt-6 flex flex-col items-start justify-start gap-4 border-white/10 md:flex-col">
        <span className="flex gap-2">
          <img className="w-10" src="/tmdb-logo.svg" alt="tmdb logo" />
          Powered by TMDB.
        </span>{" "}
        <p className="">© 2026 CineMatch. All rights reserved.</p>
      </div>
    </footer>
  );
}
