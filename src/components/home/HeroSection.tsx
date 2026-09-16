import HeroScroll from "@/components/hero/HeroScroll";

// Hero video — home.hero is empty in API for now, so local fallback.
export default function HeroSection() {
  return (
    <section className="relative flex h-screen w-screen items-end justify-center overflow-hidden px-6 pb-[150px] text-white">
      <div className="absolute inset-0 z-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          src="/img/SPA-Mansoura.mp4"
        />
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-white/10 via-white/10 to-white dark:from-[rgba(10,15,29,0.2)] dark:via-[rgba(10,15,29,0.2)] dark:to-[rgba(10,15,29,1)]" />

      <HeroScroll />
    </section>
  );
}
