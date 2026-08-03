import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { NAV_LINKS } from "../constants/navLinks";
import type { Dispatch, SetStateAction } from "react";

type NavMenuProps = {
  user: { displayName: string; email: string } | null;
  loading: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
  signOut: () => void;
  signIn: () => void;
  initials: string;
};

export default function NavMenu({
  user,
  loading,
  setMobileOpen,
  signOut,
  signIn,
  initials,
}: NavMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="overflow-hidden md:hidden"
    >
      <div className="mx-auto mt-4 max-w-7xl border-t border-white/10 pt-4">
        <ul className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={
                  link.label === "Home"
                    ? "block rounded-lg bg-amber-500/10 px-3 py-2.5 text-sm font-medium text-amber-500"
                    : "block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-3 border-t border-white/10 pt-3">
          {!loading && !user && (
            <button
              type="button"
              onClick={() => {
                signIn();
                setMobileOpen(false);
              }}
              className="flex w-full items-center justify-center rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-[#0a0e1a] transition-colors hover:bg-amber-400"
            >
              Sign In
            </button>
          )}

          {!loading && user && (
            <div className="flex items-center gap-3 rounded-lg px-3 py-2">
              {
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/10 text-xs font-semibold text-amber-500">
                  {initials}
                </span>
              }
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  {user.displayName ?? "CineMatch user"}
                </p>
                <p className="truncate text-xs text-gray-400">{user.email}</p>
              </div>
              <button
                type="button"
                onClick={signOut}
                aria-label="Sign out"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:text-white"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
