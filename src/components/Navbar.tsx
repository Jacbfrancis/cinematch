"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Film, Menu, X, LogOut, ChevronDown } from "lucide-react";
import { NAV_LINKS } from "../constants/navLinks";
import NavMenu from "./NavMenu";

interface MockUser {
  displayName: string;
  email: string;
  photoURL?: string;
}

// Placeholder auth state — swap this out for a real useAuth() hook later.
// Clicking "Sign In" below just fakes a logged-in user so you can preview
// both UI states without any backend wired up yet.
const DUMMY_USER: MockUser = {
  displayName: "Jacob",
  email: "jacob@example.com",
};

export default function Navbar() {
  const [user, setUser] = useState<MockUser | null>(null);
  const loading = false;
  const signOut = () => setUser(null);
  const signIn = () => setUser(DUMMY_USER);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  // Close the profile dropdown when clicking outside of it
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close the mobile menu whenever the viewport grows back to desktop size
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setMobileOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const initials =
    user?.displayName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "?";

  return (
    <nav className="relative w-full bg-[#121736] px-6 py-4 md:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <Film className="h-7 w-7 text-amber-500" />
          <span className="text-xl font-bold tracking-tight text-white">
            CINE<span className="text-amber-500">MATCH</span>
          </span>
        </a>

        {/* Desktop nav links */}
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

        {/* Desktop auth area */}
        <div className="hidden md:block">
          {!loading && !user && (
            <button
              type="button"
              onClick={signIn}
              className="inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-[#0a0e1a] transition-colors hover:bg-amber-400"
            >
              Sign In
            </button>
          )}

          {!loading && user && (
            <div ref={profileRef} className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((o) => !o)}
                aria-label="Account menu"
                className="flex items-center gap-2 rounded-full border border-gray-700 py-1 pl-1 pr-3 transition-colors hover:border-amber-500"
              >
                {
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/10 text-xs font-semibold text-amber-500">
                    {initials}
                  </span>
                }
                <ChevronDown
                  className={`h-4 w-4 text-gray-400 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute z-100 right-0 top-full mt-2 w-56 rounded-xl border border-white/10 bg-[#0d1224] p-3 shadow-xl"
                  >
                    <p className="truncate text-sm font-semibold text-white">
                      {user.displayName ?? "CineMatch user"}
                    </p>
                    <p className="truncate text-xs text-gray-400">
                      {user.email}
                    </p>
                    <div className="my-3 h-px bg-white/10" />
                    <button
                      type="button"
                      onClick={signOut}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-amber-500 transition-colors hover:border-amber-500 md:hidden"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <NavMenu
            user={user}
            loading={loading}
            setMobileOpen={setMobileOpen}
            signOut={signOut}
            signIn={signIn}
            initials={initials}
          />
        )}
      </AnimatePresence>
    </nav>
  );
}
