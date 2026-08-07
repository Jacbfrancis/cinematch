import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

interface SignUpFormProps {
  onSwitchToSignIn: () => void;
  onSubmit?: (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
}

export default function SignUpForm({
  onSwitchToSignIn,
  onSubmit,
}: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <div>
      {/* Top Link */}
      <div className="text-right text-sm text-gray-400">
        Already have an account?{" "}
        <button
          onClick={onSwitchToSignIn}
          className="font-medium text-amber-500 hover:text-amber-400"
        >
          Sign in
        </button>
      </div>

      {/* Heading */}
      <div className="mt-6 text-center">
        <h1 className="mt-12 text-3xl font-bold text-white">
          Create your account
        </h1>

        <p className="mt-3 text-gray-400">
          Join CineMatch and start your movie journey.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
        <div>
          <label
            htmlFor="name"
            className="pl-2 block text-sm font-medium text-gray-300"
          >
            Full Name
          </label>
        </div>
        <div className="relative">
          <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

          <input
            type="text"
            placeholder="John Doe"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-transparent py-3.5 pl-11 pr-4 text-white placeholder:text-gray-500 focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="signup-email"
            className="pl-2 block text-sm font-medium text-gray-300"
          >
            Email Address
          </label>
        </div>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

          <input
            type="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-transparent py-3.5 pl-11 pr-4 text-white placeholder:text-gray-500 focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="signup-password"
            className="pl-2 block text-sm font-medium text-gray-300"
          >
            Password
          </label>
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-transparent py-3.5 pl-11 pr-11 text-white placeholder:text-gray-500 focus:border-amber-500 focus:outline-none"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="mt-4">
          <label
            htmlFor="confirm-password"
            className="pl-2 block text-sm font-medium text-gray-300"
          >
            Confirm Password
          </label>
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            required
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({
                ...formData,
                confirmPassword: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-transparent py-3.5 pl-11 pr-11 text-white placeholder:text-gray-500 focus:border-amber-500 focus:outline-none"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          type="submit"
          className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-3.5 font-bold text-[#07101D] transition hover:scale-[1.01]"
        >
          Sign Up
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-gray-500">or</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Social */}
      <div className="space-y-3">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-white"
        >
          <span className="font-bold text-[#4285F4]">G</span>
          Sign up with Google
        </button>
      </div>

      <p className="mt-8 text-center text-xs text-gray-500">
        By signing up, you agree to our{" "}
        <span className="text-amber-500">Terms of Service</span> and{" "}
        <span className="text-amber-500">Privacy Policy</span>.
      </p>
    </div>
  );
}
