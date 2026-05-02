import { useEffect, useRef, useState } from "react";
import "@fontsource/poppins";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import ProfileCard from "./ui/ProfileCard";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiThreedotjs, SiNodedotjs, SiExpress, SiPhp,
  SiLaravel, SiMysql, SiSupabase, SiFigma,
  SiGsap, SiVite, SiGit, SiWebgl, SiFramer
} from "react-icons/si";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Counter({ target, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(t);
  }, [inView, target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function Reveal({ children, delay = 0, from = "bottom", inView }) {
  const base = "transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]";
  const visible = "opacity-100 translate-x-0 translate-y-0";
  const hiddenMap = {
    bottom: "opacity-0 translate-y-7",
    left: "opacity-0 -translate-x-7",
    right: "opacity-0 translate-x-7",
  };
  return (
    <div
      className={`${base} ${inView ? visible : hiddenMap[from]}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const TECH = [
  { name: "React",      icon: <SiReact      className="w-10 h-10 text-white/80" /> },
  { name: "Next.js",    icon: <SiNextdotjs  className="w-10 h-10 text-white/80" /> },
  { name: "TypeScript", icon: <SiTypescript className="w-10 h-10 text-white/80" /> },
  { name: "Tailwind",   icon: <SiTailwindcss className="w-10 h-10 text-white/80" /> },
  { name: "Three.js",   icon: <SiThreedotjs className="w-10 h-10 text-white/80" /> },
  { name: "Node.js",    icon: <SiNodedotjs  className="w-10 h-10 text-white/80" /> },
  { name: "Express",    icon: <SiExpress    className="w-10 h-10 text-white/80" /> },
  { name: "PHP",        icon: <SiPhp        className="w-10 h-10 text-white/80" /> },
  { name: "Laravel",    icon: <SiLaravel    className="w-10 h-10 text-white/80" /> },
  { name: "MySQL",      icon: <SiMysql      className="w-10 h-10 text-white/80" /> },
  { name: "Supabase",   icon: <SiSupabase   className="w-10 h-10 text-white/80" /> },
  { name: "Figma",      icon: <SiFigma      className="w-10 h-10 text-white/80" /> },
  { name: "GSAP",       icon: <SiGsap       className="w-10 h-10 text-white/80" /> },
  { name: "Vite",       icon: <SiVite       className="w-10 h-10 text-white/80" /> },
  { name: "Git",        icon: <SiGit        className="w-10 h-10 text-white/80" /> },
  { name: "Framer",     icon: <SiFramer     className="w-10 h-10 text-white/80" /> },
];

const TECH_LOOP = [...TECH, ...TECH];

const FACTS = [
  { label: "CURRENTLY", value: "Building & open to remote work" },
  { label: "OBSESSED WITH", value: "Always curious about new technologies and excited to keep learning" },
  { label: "EDUCATION", value: "Informatics — Jakarta, 2024" },
  { label: "LANGUAGES", value: "Indonesian · English" },
  { label: "STATUS", value: "Open to work", green: true },
  { label: "AVAILABLE FOR", value: "Freelance & Full-time Remote" },
];

export default function About() {
  const [sectionRef, sectionInView] = useInView(0.06);
  const marqueeRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    const tick = () => {
      posRef.current -= 0.5;
      if (Math.abs(posRef.current) >= half) posRef.current = 0;
      el.style.transform = `translateX(${posRef.current}px)`;
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-black min-h-screen pt-10 pb-0 overflow-hidden"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="absolute top-[10%] -right-[10%] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.01) 0%, transparent 65%)", filter: "blur(80px)" }}
      />

      <Reveal inView={sectionInView} delay={0} from="bottom">
        <div className="flex items-center justify-center gap-4 mb-20">
          <div className="w-10 h-px bg-white/60" />
          <span className="text-[17px] tracking-[0.5em] text-white/60">ABOUT ME</span>
          <div className="w-10 h-px bg-white/60" />
        </div>
      </Reveal>

      <div className="about-grid max-w-[1200px] mx-auto px-8 grid grid-cols-2 gap-20 items-start mb-20">
        <div className="flex flex-col items-center">
          <Reveal inView={sectionInView} delay={150} from="left">
         <ProfileCard
            name="Ganantha Ravaldy"
            title="Web Developer"
            handle="Ganantha"
            status="Online"
            contactText="Contact Me"
            avatarUrl="/profile (3).png"
            showUserInfo
            enableTilt={true}
            enableMobileTilt
            onContactClick={() => console.log('Contact clicked')}
            behindGlowColor="rgba(125, 190, 255, 0.67)"
            iconUrl="/assets/demo/iconpattern.png"
            behindGlowEnabled
            innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
          />
          </Reveal>
        </div>

        <div>
          

          <Reveal inView={sectionInView} delay={200} from="right">
            <h2 className="text-[clamp(32px,3.8vw,56px)] font-semibold text-white/90 leading-[1.06] tracking-[-0.025em] mb-1">
              Writing code.
            </h2>
            <h2 className="text-[clamp(32px,3.8vw,56px)] font-semibold text-white/50 leading-[1.06] tracking-[-0.025em] mb-7">
              Solving problems. Shipping products.
            </h2>
          </Reveal>

          <Reveal inView={sectionInView} delay={260} from="right">
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-8 h-px bg-white/60" />
              <span className="text-[10px] tracking-[0.35em] text-white/60">JAKARTA, INDONESIA</span>
            </div>
          </Reveal>

          <Reveal inView={sectionInView} delay={330} from="right">
            <p className="text-md leading-[2] text-white/70 max-w-[480px] mb-10 tracking-[0.01em]">
             I'm someone who loves keeping up with how technology evolves there's always something new to learn, and that's exactly what keeps me going. I got into web development because I enjoy turning complex ideas into things people can actually use. My approach is simple: understand the problem first, then build something that genuinely addresses it.
            </p>
          </Reveal>

          <Reveal inView={sectionInView} delay={420} from="right">
            <div className="mb-9">
              <div className="text-[15px] tracking-[0.45em] text-white/60 mb-4">QUICK FACTS</div>
              <div className="grid grid-cols-2 gap-px bg-white/[0.06]">
                {FACTS.map(({ label, value, green }) => (
                  <div key={label} className="bg-black p-3.5">
                    <div className="text-[14px] tracking-[0.3em] text-white/50 mb-1.5">{label}</div>
                    <div className={`text-[13px] flex items-center gap-1.5 ${green ? "text-green-400/75" : "text-white/65"}`}>
                      {green && <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />}
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </div>

      <div className="border-t border-b border-white/25 py-8 overflow-hidden relative">
        <div className="absolute top-0 left-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #000, transparent)" }} />
        <div className="absolute top-0 right-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: "linear-gradient(-90deg, #000, transparent)" }} />

        <div className="flex items-center justify-center z-20 pointer-events-none pb-10">
          <span className="text-lg tracking-[0.5em] text-white/50 bg-black px-4 py-1">
            TECH STACK
          </span>
        </div>

        <div className="flex will-change-transform" ref={marqueeRef}>
          {TECH_LOOP.map((tech, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2.5 px-9 shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-default"
            >
              {tech.icon}
              <span className="text-[14px] tracking-[0.25em] text-white whitespace-nowrap mt-1">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)" }} />

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
