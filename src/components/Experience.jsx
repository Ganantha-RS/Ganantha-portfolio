import { useEffect, useRef, useState } from "react";
import "@fontsource/poppins";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

function useInView(threshold = 0.1) {
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

function Reveal({ children, delay = 0, from = "bottom", inView }) {
  const transforms = {
    bottom: inView ? "translateY(0)" : "translateY(24px)",
    left:   inView ? "translateX(0)" : "translateX(-24px)",
    right:  inView ? "translateX(0)" : "translateX(24px)",
  };
  return (
    <div style={{
      opacity: inView ? 1 : 0,
      transform: transforms[from],
      transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

const TIMELINE = [
    {
      type: "education",
      period: "2024 — 2028",
      title: "Network & Application Information Systems",
      place: "SMK Negeri 26 Jakarta",
      desc: "Majoring in SIJA studying web development, networking, software engineering, and application development. Actively building real-world projects alongside formal education.",
      tags: ["Education", "Software Engineering", "Networking"],
    },
  {
    type: "Experience",
    period: "Aug 2025 — Jan 2026",
    title: "Game Developer",
    place: "PT Solu Filantropi",
    desc: "Developed educational games for elementary school students focused on digital literacy. Collaborated cross-functionally with a multidisciplinary team to design and build interactive learning experiences.",
    tags: ["Game Development", "EdTech", "Team Collaboration"],
  },
];

const CERTIFICATIONS = [
  { title: "Building Web Apps with React", issuer: "Dicoding", year: "2026", pdf: "/certificates/cert-react.pdf" },
  { title: "Back-End Development with JavaScript", issuer: "Dicoding", year: "2026", pdf: "/certificates/cert-backend-js.pdf" },
  { title: "Front-End Web Development", issuer: "Dicoding", year: "2026", pdf: "/certificates/cert-frontend.pdf" },
  { title: "JavaScript Basic Programming", issuer: "Dicoding", year: "2026", pdf: "/certificates/cert-js.pdf" },
  { title: "Cloud & Generative AI Fundamentals", issuer: "Dicoding", year: "2026", pdf: "/certificates/cert-cloud-ai.pdf" },
  { title: "Software Developer Fundamentals", issuer: "Dicoding", year: "2026", pdf: "/certificates/cert-software-dev.pdf" },
  { title: "Programming Logic & Algorithms", issuer: "Dicoding", year: "2026", pdf: "/certificates/cert-logic.pdf" },
  { title: "Web Programming Basics", issuer: "Dicoding", year: "2026", pdf: "/certificates/cert-web-basic.pdf" },
  { title: "AI Fundamentals", issuer: "Dicoding", year: "2026", pdf: "/certificates/cert-ai.pdf" },
];

function CertModal({ cert, onClose }) {
useEffect(() => {
  const style = document.createElement("style");
  style.id = "modal-cursor-fix";
  style.innerHTML = `*, *::before, *::after { cursor: none !important; }`;
  document.head.appendChild(style);
  

  return () => {
    document.getElementById("modal-cursor-fix")?.remove();
  };
}, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 99998,
        background: "rgba(0,0,0,0.92)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "2rem",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 860,
          background: "#0a0a0a",
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex", flexDirection: "column",
          maxHeight: "90vh",
          animation: "slideUp 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 28px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          flexShrink: 0,
        }}>
          <div>
            <div style={{
              fontSize: 15, fontWeight: 600,
              color: "rgba(255,255,255,0.85)",
              fontFamily: "Poppins, sans-serif",
              marginBottom: 3,
            }}>
              {cert.title}
            </div>
            <div style={{
              fontSize: 11, letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.6)",
              fontFamily: "Poppins, sans-serif",
            }}>
              {cert.issuer} · {cert.year}
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <a
              href={cert.pdf}
              download
              style={{
                fontSize: 10, letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.6)",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "8px 16px",
                fontFamily: "Poppins, sans-serif",
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
            >
              DOWNLOAD
            </a>
            <button
              onClick={onClose}
              style={{
                background: "none", border: "none",
                color: "rgba(255,255,255,0.35)",
                fontSize: 22, cursor: "none",
                lineHeight: 1, padding: "4px 8px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "white"}
              onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
            >
              ×
            </button>
          </div>
        </div>

        <div style={{ flex: 1, overflow: "hidden", minHeight: 0 }}>
          <iframe
                src={`${cert.pdf}#toolbar=0&navpanes=0&scrollbar=0`}
                title={cert.title}
                style={{ 
                    width: "100%", height: "100%", 
                    minHeight: 500, border: "none", 
                    background: "#111",
                    pointerEvents: "auto"
                }}  
            />
        </div>
      </div>
    </div>
  );
}

function CertCard({ cert, index, inView }) {
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "24px 28px",
          cursor: "none",
          transition: "background 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          borderColor: hovered ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.08)",
          opacity: inView ? 1 : 0,
          transitionProperty: "background, border-color, transform, opacity",
          transitionDuration: "0.3s, 0.3s, 0.3s, 0.7s",
          transitionDelay: `0s, 0s, 0s, ${index * 60}ms`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, gap: 12 }}>
          <div style={{
            fontSize: 10, letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.6)",
            fontFamily: "Poppins, sans-serif",
          }}>
            {cert.year}
          </div>
          <div style={{
            fontSize: 9, letterSpacing: "0.2em",
            color: hovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.18)",
            fontFamily: "Poppins, sans-serif",
            transition: "color 0.3s ease",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            VIEW PDF
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div style={{
          fontSize: 15, fontWeight: 600,
          color: hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.65)",
          fontFamily: "Poppins, sans-serif",
          lineHeight: 1.3,
          marginBottom: 8,
          letterSpacing: "-0.01em",
          transition: "color 0.3s ease",
        }}>
          {cert.title}
        </div>

        <div style={{
          fontSize: 11, letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.5)",
          fontFamily: "Poppins, sans-serif",
        }}>
          {cert.issuer}
        </div>

        <div style={{
          marginTop: 20,
          height: 1,
          background: hovered
            ? "linear-gradient(90deg, rgba(255,255,255,0.2), transparent)"
            : "linear-gradient(90deg, rgba(255,255,255,0.06), transparent)",
          transition: "background 0.4s ease",
        }} />
      </div>

      {modalOpen && <CertModal cert={cert} onClose={() => setModalOpen(false)} />}
    </>
  );
}

export default function Experience() {
  const [sectionRef, sectionInView] = useInView(0.05);
  const [timelineRef, timelineInView] = useInView(0.08);
  const [certRef, certInView] = useInView(0.05);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-black overflow-hidden"
      style={{ fontFamily: "Poppins, sans-serif", paddingTop: 140}}
    >
      <div className="absolute pointer-events-none" style={{
        top: "20%", right: "-8%",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.01) 0%, transparent 65%)",
        filter: "blur(80px)",
      }} />

      <div className="max-w-[1160px] mx-auto px-6 md:px-8">

        <Reveal inView={sectionInView} delay={0} from="bottom">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="w-10 h-px bg-white/60" />
            <span className="text-[17px] tracking-[0.5em] text-white/60">EXPERIENCE</span>
            <div className="w-10 h-px bg-white/60" />
          </div>
        </Reveal>

        <Reveal inView={sectionInView} delay={100} from="bottom">
          <div style={{ marginBottom: 80 }}>
            <div style={{
              fontSize: "clamp(90px, 12vw, 150px)", fontWeight: 700,
              color: "rgba(255,255,255,0.022)", lineHeight: 1,
              letterSpacing: "-0.04em", userSelect: "none",
              marginBottom: -45, marginLeft: -4,
              fontFamily: "Poppins, sans-serif",
            }}>
              04
            </div>
            <h2 style={{
              fontSize: "clamp(28px, 3.8vw, 56px)", fontWeight: 600,
              color: "rgba(255,255,255,0.9)", lineHeight: 1.06,
              letterSpacing: "-0.025em", marginBottom: 4,
              fontFamily: "Poppins, sans-serif",
            }}>
              Where I've been,
            </h2>
            <h2 style={{
              fontSize: "clamp(28px, 3.8vw, 56px)", fontWeight: 600,
              color: "rgba(255,255,255,0.2)", lineHeight: 1.06,
              letterSpacing: "-0.025em", fontFamily: "Poppins, sans-serif",
            }}>
              what I've done.
            </h2>
          </div>
        </Reveal>

        <div ref={timelineRef} style={{ marginBottom: 100 }}>
          <Reveal inView={timelineInView} delay={0} from="left">
            <div style={{
              fontSize: 15, letterSpacing: "0.45em",
              color: "rgba(255,255,255,0.6)", marginBottom: 40,
              fontFamily: "Poppins, sans-serif",
              display: "flex", alignItems: "center", gap: 16,
            }}>
              <span>TIMELINE</span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.6)" }} />
            </div>
          </Reveal>

          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute",
              left: 0, top: 6, bottom: 0,
              width: 1,
              background: "linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)",
            }} />

            {TIMELINE.map((item, i) => {
              const [hov, setHov] = useState(false);
              return (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "2rem",
                    paddingLeft: 24,
                    paddingBottom: i < TIMELINE.length - 1 ? 56 : 0,
                    position: "relative",
                    opacity: timelineInView ? 1 : 0,
                    transform: timelineInView ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.8s ease ${i * 150}ms, transform 0.8s ease ${i * 150}ms`,
                  }}
                  onMouseEnter={() => setHov(true)}
                  onMouseLeave={() => setHov(false)}
                  className="timeline-row"
                >
                  <div style={{
                    position: "absolute",
                    left: -4, top: 6,
                    width: 8, height: 8,
                    borderRadius: "50%",
                    background: hov ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    transition: "background 0.3s ease",
                    zIndex: 1,
                  }} />

                  <div>
                    <div style={{
                      fontSize: 12, letterSpacing: "0.3em",
                      color: "rgba(255,255,255,0.6)",
                      fontFamily: "Poppins, sans-serif",
                      marginBottom: 6,
                    }}>
                      {item.period}
                    </div>
                    <div style={{
                      display: "inline-block",
                      fontSize: 9, letterSpacing: "0.2em",
                      color: "rgba(255,255,255,0.6)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      padding: "3px 10px",
                      fontFamily: "Poppins, sans-serif",
                      textTransform: "uppercase",
                    }}>
                      {item.type}
                    </div>
                  </div>

                  <div>
                    <div style={{
                      fontSize:20, fontWeight: 600,
                      color: hov ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.8)",
                      letterSpacing: "-0.015em",
                      marginBottom: 6,
                      fontFamily: "Poppins, sans-serif",
                      transition: "color 0.3s ease",
                      lineHeight: 1.2,
                    }}>
                      {item.title}
                    </div>
                    <div className="mt-3" style={{
                      fontSize: 13, letterSpacing: "0.12em",
                      color: "rgba(255,255,255,0.5)",
                      fontFamily: "Poppins, sans-serif",
                    }}>
                      {item.place}
                    </div>
                  </div>

                  <div>
                    <p style={{
                      fontSize: 14, lineHeight: 1.85,
                      color: "rgba(255,255,255,0.6)",
                      marginBottom: 14,
                      fontFamily: "Poppins, sans-serif",
                    }}>
                      {item.desc}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {item.tags.map((tag) => (
                        <span key={tag} style={{
                          fontSize: 10, letterSpacing: "0.18em",
                          color: "rgba(255,255,255,0.6)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          padding: "4px 10px",
                          fontFamily: "Poppins, sans-serif",
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div ref={certRef}>
          <Reveal inView={certInView} delay={0} from="bottom">
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 40, flexWrap: "wrap", gap: 12,
            }}>
              <div style={{
                fontSize: 15, letterSpacing: "0.45em",
                color: "rgba(255,255,255,0.6)",
                fontFamily: "Poppins, sans-serif",
                display: "flex", alignItems: "center", gap: 16,
              }}>
                <span>CERTIFICATIONS</span>
                <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.06)" }} />
              </div>
              <span style={{
                fontSize: 13, letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.4)",
                fontFamily: "Poppins, sans-serif",
              }}>
                CLICK TO VIEW PDF
              </span>
            </div>
          </Reveal>

          <div className="cert-grid">
            {CERTIFICATIONS.map((cert, i) => (
              <CertCard key={i} cert={cert} index={i} inView={certInView} />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-[8%] right-[8%] h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }}
      />

      <style>{`
        .cert-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1px;
          background: rgba(255,255,255,0.05);
        }
        .timeline-row {
          grid-template-columns: 1fr !important;
        }
        @media (min-width: 640px) {
          .cert-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .cert-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .timeline-row {
            grid-template-columns: 1fr 1fr 1fr !important;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}