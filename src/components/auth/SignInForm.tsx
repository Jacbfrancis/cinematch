import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

interface SignInFormProps {
  onSwitchToSignUp: () => void;
  onSubmit?: (data: { email: string; password: string }) => void;
}

export default function SignInForm({
  onSwitchToSignUp,
  onSubmit,
}: SignInFormProps) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ email, password });
  };

  return (
    <div className="w-full max-w-md">
      {/* Top link */}
      <div className="flex justify-end">
        <p className="text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="font-semibold text-amber-500 hover:text-amber-400"
          >
            Sign up
          </button>
        </p>
      </div>

      {/* Heading */}
      <div className="mt-6 text-center">
        <h1 className="mt-12 text-4xl font-extrabold text-white">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-gray-400">Sign in to continue.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-2">
        <div>
          <label
            htmlFor="email"
            className="block text-md font-medium text-gray-300 pl-2"
          >
            Email Address
          </label>
        </div>

        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full rounded-lg border border-white/15 bg-transparent py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-gray-500 focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300 pl-2"
          >
            Password
          </label>
        </div>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full rounded-lg border border-white/15 bg-transparent py-3.5 pl-11 pr-11 text-sm text-white placeholder:text-gray-500 focus:border-amber-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => navigate("/forgot-password")}
            type="button"
            className="text-xs font-medium text-amber-500 hover:text-amber-400"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3.5 text-sm font-bold text-[#0a0e1a] transition-transform hover:scale-[1.01]"
        >
          Sign In
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-gray-500">or</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Social sign in */}
      <div className="flex flex-col gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-lg border border-white/15 py-3 text-sm font-medium text-gray-200 transition-colors hover:border-white/30"
        >
          <span className="text-base font-bold text-[#4285F4]">G</span>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
