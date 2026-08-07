import { Bookmark, Heart, MonitorSmartphone } from "lucide-react";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <main
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/auth-bg.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/80" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-between gap-16 px-6 py-10 lg:px-12">
        {/* LEFT CONTENT */}
        <div className="hidden max-w-xl lg:block">
          <h1 className="text-5xl font-bold leading-tight text-white">
            Find movies
            <br />
            you'll <span className="text-amber-500">love.</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-gray-300">
            CineMatch recommends the perfect movie for your mood. Save favorites
            and discover personalized recommendations.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-3 text-white">
              <Bookmark className="h-5 w-5 text-amber-500" />
              <span>Save your favorite movies</span>
            </div>

            <div className="flex items-center gap-3 text-white">
              <Heart className="h-5 w-5 text-amber-500" />
              <span>Get personalized recommendations</span>
            </div>

            <div className="flex items-center gap-3 text-white">
              <MonitorSmartphone className="h-5 w-5 text-amber-500" />
              <span>Sync across all your devices</span>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="w-full max-w-xl">
          <div className="rounded-3xl border border-white/10 bg-[#07101D]/70 p-6 backdrop-blur-2xl lg:p-10">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </main>
  );
}
