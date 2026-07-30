import { Sparkles, Star } from "lucide-react";
import { TESTIMONIALS } from "../constants/testimonials";

type TestimonialsProps = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

function TestimonialCard({ quote, name, role, initials }: TestimonialsProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
        ))}
      </div>

      {/* Quote */}
      <p className="mt-4 text-sm leading-relaxed text-gray-200">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-6 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-semibold text-[#0a0e1a]">
          {initials}
        </span>
        <div>
          <p className="text-sm font-semibold text-white">{name}</p>
          <p className="text-xs text-gray-400">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="w-full bg-[#0a0e1a] px-6 py-16 md:px-12">
      <div className="mx-auto max-w-6xl text-center">
        {/* Eyebrow */}
        <p className="mb-4 flex items-center justify-center gap-2 text-sm font-semibold tracking-wide text-amber-500">
          <Sparkles className="h-4 w-4" />
          Loved by movie nights everywhere
          <Sparkles className="h-4 w-4" />
        </p>

        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-white md:text-4xl">
          What our matches are saying
        </h2>

        {/* Subtext */}
        <p className="mt-3 text-base text-gray-400">
          Real reactions from people who let CineMatch pick for once.
        </p>

        {/* Testimonial grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 text-left md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
