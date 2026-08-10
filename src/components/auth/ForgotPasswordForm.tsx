import { useState } from "react";
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";

interface ForgotPasswordFormProps {
  onSubmit?: (email: string) => Promise<void> | void;
}

export default function ForgotPasswordForm({
  onSubmit,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit?.(email);
    setIsSent(true);
  };

  if (isSent) {
    return (
      <div className="flex flex-col items-center text-center">
        <CheckCircle2 className="h-14 w-14 text-amber-500" />

        <h1 className="mt-6 text-3xl font-bold text-white">Check your email</h1>

        <p className="mt-3 max-w-md text-gray-400">
          We've sent a password reset link to
          <span className="font-medium text-white"> {email}</span>.
        </p>

        <Link
          to="/auth"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3 font-semibold text-[#07101D]"
        >
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Back Link */}
      <Link
        to="/auth"
        className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Sign In
      </Link>

      {/* Heading */}
      <div className="mt-10 text-center">
        <h1 className="text-4xl font-bold text-white">Forgot Password?</h1>

        <p className="mt-3 text-gray-400">
          Enter your email and we'll send you a reset link.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Email Address
          </label>

          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full rounded-xl border border-white/15 bg-transparent py-3.5 pl-11 pr-4 text-white placeholder:text-gray-500 focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-3.5 font-bold text-[#07101D] transition hover:scale-[1.01]"
        >
          Send Reset Link
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
