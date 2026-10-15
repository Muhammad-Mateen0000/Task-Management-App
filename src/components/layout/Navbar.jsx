import { LogOut } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = ({ user, onLogout }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-blue-500/20 bg-[var(--primary)] text-white shadow-sm">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center gap-3 px-3 sm:px-4 lg:px-5">
        {/* Company Logo */}
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-white/30 bg-white shadow-lg">
          <img
            src="/it-beam-logo.jpg"
            alt="IT Beam Solutions"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Company Name */}
        <div className="flex min-w-0 items-center gap-2">
          <div className="min-w-0">
            <p className="truncate font-[Space_Grotesk] text-base font-bold tracking-tight sm:text-lg">
              IT Beam Solutions
            </p>

            <p className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-white/60 sm:block">
              Task Management
            </p>
          </div>
        </div>

        <div className="flex-1" />

        {/* User */}
        {user && (
          <div className="hidden items-center gap-2 sm:flex">
            <div className="grid h-9 w-9 place-items-center overflow-hidden rounded-full border-2 border-white/30 bg-white/20 font-bold">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                user.name.charAt(0).toUpperCase()
              )}
            </div>

            <span className="max-w-24 truncate text-sm font-semibold">
              {user.name}
            </span>
          </div>
        )}

        <ThemeToggle />

        {user && (
          <button
            type="button"
            onClick={onLogout}
            className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 transition hover:bg-white/20"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
