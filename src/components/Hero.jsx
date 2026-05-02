import { useEffect, useRef, useState } from "react";
import Particles from "./ui/Particles";
import "@fontsource/poppins";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import Lanyard from "./ui/Lanyard";

const ROLES = ["Web Developer", "Creative Coder", "Problem Solver"];

function useTypewriter(words, speed = 75, pause = 2200) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let t;
    if (!deleting && charIdx < current.length) {
      t = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      t = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      t = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }
    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

function MagneticBtn({ children, className, onClick }) {
  const ref = useRef(null);
  const handleMove = (e) => {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
  };
  const handleLeave = () => { ref.current.style.transform = "translate(0,0)"; };

  return (
    <button
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)" }}
    >
      {children}
    </button>
  );
}

function Reveal({ children, delay = 0, from = "bottom", loaded }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [loaded, delay]);

  const transforms = {
    bottom: show ? "translateY(0)" : "translateY(32px)",
    left:   show ? "translateX(0)" : "translateX(-24px)",
  };

  return (
    <span style={{
      display: "block",
      opacity: show ? 1 : 0,
      transform: transforms[from],
      transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)`,
    }}>
      {children}
    </span>
  );
}

export default function Hero({ loaded }) {
  const role = useTypewriter(ROLES);
  const [ready, setReady] = useState(false);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(t);
  }, [loaded]);

  useEffect(() => {
    const onMove = (e) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; };
    const loop = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.18;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.18;
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <>
      <div
        id="home"
        style={{ fontFamily: "Poppins, sans-serif" }}
        className="relative h-screen overflow-hidden bg-black"
      >
        <div className="absolute inset-0 z-20 pointer-events-none">
          <Particles
            particleCount={500}
            particleSpread={10}
            speed={0.2}
            moveParticlesOnHover={true}
            particleHoverFactor={1}
            alphaParticles={true}
            particleColors={["#888888"]}
          />
        </div>

        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none z-[1]"
          style={{
            width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.035) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="absolute inset-0 z-10 flex h-full items-center pointer-events-none max-w-8xl mx-auto lg:mt-10 mt-0">
          <div
            className="text-white w-full md:w-auto flex flex-col gap-0 items-center md:items-start px-6 md:pl-24 lg:pl-32"
            style={{ opacity: ready ? 1 : 0, transition: "opacity 0.4s ease" }}
          >
            <div className="overflow-hidden">
              <Reveal delay={200} loaded={loaded}>
                <h1
                  className="font-semibold leading-[1.0] text-white/80 text-center md:text-left"
                  style={{ fontSize: "clamp(40px, 6vw, 82px)", letterSpacing: "-0.02em" }}
                >
                  Ganantha Ravaldy
                </h1>
              </Reveal>
            </div>

            <div className="overflow-hidden">
              <Reveal delay={350} loaded={loaded}>
                <h1
                  className="font-semibold leading-[1.0] mb-5 text-white/50 text-center md:text-left"
                  style={{ fontSize: "clamp(40px, 6vw, 82px)", letterSpacing: "-0.02em" }}
                >
                  Syahreza
                </h1>
              </Reveal>
            </div>

            <Reveal delay={500} loaded={loaded}>
              <div className="flex items-center gap-4 mb-5">
                <div
                  style={{
                    height: 1,
                    background: "linear-gradient(90deg, rgba(255,255,255,0.5), transparent)",
                    animation: ready ? "expandLine 1s cubic-bezier(0.16,1,0.3,1) 0.6s both" : "none",
                  }}
                  className="w-20"
                />
              </div>
            </Reveal>

            <Reveal delay={600} loaded={loaded}>
              <h2
                className="italic font-medium text-white/70 mb-2 text-center md:text-left"
                style={{ fontSize: "clamp(22px, 3.8vw, 54px)", letterSpacing: "-0.01em" }}
              >
                {role}
                <span
                  className="inline-block align-middle ml-1"
                  style={{
                    width: 2, height: "0.85em",
                    background: "rgba(255,255,255,0.7)",
                    animation: "blink 1s step-end infinite",
                    verticalAlign: "middle",
                  }}
                />
              </h2>
            </Reveal>

            <Reveal delay={800} loaded={loaded}>
              <p
                className="text-white/40 text-md leading-relaxed max-w-xl mb-10 text-center md:text-left"
                style={{ letterSpacing: "0.02em" }}
              >
Web Developer turning complex problems into clean, performant web solutions. Based in Jakarta, Indonesia
              </p>
            </Reveal>

            <Reveal delay={950} loaded={loaded}>
              <div className="flex items-center gap-5 pointer-events-auto justify-center md:justify-start">
                <MagneticBtn
                  className="group relative overflow-hidden px-7 py-3 text-[11px] tracking-[0.25em] font-semibold text-black bg-white"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                  onClick={() => {
                    const el = document.getElementById("work");
                    if (el) {
                      if (window.__lenis) {
                        window.__lenis.scrollTo(el, { offset: -80, duration: 1.4 });
                      } else {
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                >
                  <span
                    className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0"
                    style={{ transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)" }}
                  />
                  <span className="relative group-hover:text-white transition-colors duration-300">
                    VIEW WORK
                  </span>
                  <span className="relative ml-2 inline-block group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </MagneticBtn>
              </div>
            </Reveal>

            <Reveal delay={1100} loaded={loaded}>
              <div className="flex items-center gap-7 mt-10 justify-center md:justify-start">
                {[
                  { label: "GITHUB", href: "https://github.com/Ganantha-RS" },
                  { label: "LINKEDIN", href: "https://www.linkedin.com/in/ganantha-ravaldy-784a79335/" },
                  { label: "INSTAGRAM", href: "https://www.instagram.com/ganantrllz/" },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="relative text-[12px] tracking-[0.3em] text-white/50 hover:text-white transition-colors duration-300 group pointer-events-auto"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {label}
                    <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-px bg-white/50 transition-all duration-400" />
                  </a>
                ))}
                <span style={{ width: 1, height: 14, background: "rgba(255,255,255,0.40)" }} />
              </div>
            </Reveal>
          </div>

<div
  className="hidden xl:block flex-shrink-0 ml-auto pointer-events-auto"
  style={{ 
  position: "absolute",
  top: -60,
  right: "0",
  width: 830,
  height: "100vh",
  opacity: ready ? 1 : 0,
  transition: "opacity ease 0.2s",
}}
>
 {ready && <Lanyard position={[0, 0, 16]} gravity={[0, -40, 0]} />}
</div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes expandLine {
          from { width: 0; opacity: 0; }
          to   { width: 5rem; opacity: 1; }
        }
      `}</style>
    </>
  );
}
