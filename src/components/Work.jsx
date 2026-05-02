import { useEffect, useRef, useState } from "react";
import "@fontsource/poppins";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

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

const PROJECTS = [
  {
    number: "01",
    title: "FindPart",
    description:
      "FindPart is a web platform that connects startups with talents and investors through a swipe-based matching system. Users can explore opportunities, express interest, and when there's a mutual match, they can chat, collaborate, or discuss roles and investments.",
    tags: ["React", "Laravel", "Tailwind", "MySQL"],
    demo: "https://github.com/Ganantha-RS/FindPart",
    github: "https://github.com/Ganantha-RS/FindPart",
    image: '/Findpart.jpg',
  },
  {
    number: "02",
    title: "EqualWork",
    description:
      "EqualWorks is an inclusive platform that helps users learn digital skills and connect with remote job opportunities. With built-in accessibility features and smart job matching, it ensures equal access for everyone, including people with disabilities and marginalized communities.",
    tags: ["React", "Laravel", "Tailwind", "MySQL"],
    demo: "https://github.com/Ganantha-RS/EQUALWORKS",
    github: "",
    image: '/Equalwork.jpg',
  },
  {
    number: "03",
    title: "Betfree",
    description:
      "BetFree is a digital platform that helps users prevent and overcome gambling addiction through education, self-assessment tools, community support, and AI guidance.",
    tags: ["React", "Laravel", "Tailwind", "MySQL"],
    demo: "https://github.com/Ganantha-RS/Betfree",
    github: "https://github.com/Ganantha-RS/Betfree",
    image: '/Betfree.jpg',
  },
];

function ProjectCard({ project, index, flip }) {
  const [ref, inView] = useInView(0.12);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="relative w-full project-card"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.1)",
        borderBottom: index === PROJECTS.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
        overflow: "hidden",
      }}
    >
      <div
        className={`project-inner ${flip ? "project-flip" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="project-thumb"
          style={{
            borderRight: !flip ? "1px solid rgba(255,255,255,0.07)" : "none",
            borderLeft: flip ? "1px solid rgba(255,255,255,0.07)" : "none",
          }}
        >
          {project.image && (
            <>
              <img
                src={project.image}
                alt={project.title}
                className="img-mobile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                  opacity: hovered ? 0.95 : 0.75,
                  transition: "opacity 0.5s ease",
                }}
              />

              <div
                className="img-desktop"
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "32px",
                  boxSizing: "border-box",
                  background: "rgba(255,255,255,0)",
                }}
              >
                <div style={{
                  width: "100%",
                  borderRadius: 8,
                  overflow: "hidden",
                  boxShadow: hovered
                    ? "0 24px 64px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.13)"
                    : "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)",
                  transform: hovered ? "scale(1.03) translateY(-4px)" : "scale(1) translateY(0)",
                  transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1), box-shadow 0.7s ease",
                }}>
                  <div style={{
                    background: "rgba(255,255,255,0.06)",
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}>
                    {[0, 1, 2].map(i => (
                      <span key={i} style={{
                        width: 8, height: 8,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.15)",
                        display: "inline-block",
                      }} />
                    ))}
                  </div>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      opacity: hovered ? 0.95 : 0.78,
                      transition: "opacity 0.5s ease",
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="project-content">
          <div style={{
            fontSize: 11, letterSpacing: "0.4em",
            color: "rgba(255,255,255,0.25)",
            marginBottom: 18,
            fontFamily: "Poppins, sans-serif",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(14px)",
            transition: `opacity 0.7s ease ${0.05 + index * 0.05}s, transform 0.7s ease ${0.05 + index * 0.05}s`,
          }}>
            PROJECT {project.number}
          </div>

          <h3 style={{
            fontSize: "clamp(28px, 3.5vw, 52px)",
            fontWeight: 600,
            color: hovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.85)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            marginBottom: 18,
            fontFamily: "Poppins, sans-serif",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(18px)",
            transitionProperty: "color, opacity, transform",
            transitionDuration: "0.3s, 0.7s, 0.7s",
            transitionDelay: `0s, ${0.1 + index * 0.05}s, ${0.1 + index * 0.05}s`,
            transitionTimingFunction: "ease",
          }}>
            {project.title}
          </h3>

          <div style={{
            width: hovered ? 44 : 24,
            height: 1,
            background: "rgba(255,255,255,0.22)",
            marginBottom: 18,
            transition: "width 0.4s cubic-bezier(0.16,1,0.3,1)",
          }} />

          <p style={{
            fontSize: 14, lineHeight: 1.9,
            color: "rgba(255,255,255,0.4)",
            maxWidth: 380, marginBottom: 24,
            letterSpacing: "0.01em",
            fontFamily: "Poppins, sans-serif",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: `opacity 0.7s ease ${0.15 + index * 0.05}s, transform 0.7s ease ${0.15 + index * 0.05}s`,
          }}>
            {project.description}
          </p>

          <div style={{
            display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(14px)",
            transition: `opacity 0.7s ease ${0.2 + index * 0.05}s, transform 0.7s ease ${0.2 + index * 0.05}s`,
          }}>
            {project.tags.map((tag) => (
              <span key={tag} style={{
                fontSize: 10, letterSpacing: "0.22em",
                color: "rgba(255,255,255,0.4)",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "5px 12px",
                fontFamily: "Poppins, sans-serif",
              }}>
                {tag}
              </span>
            ))}
          </div>

          <div style={{
            display: "flex", alignItems: "center",
            gap: 20, flexWrap: "wrap",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(14px)",
            transition: `opacity 0.7s ease ${0.25 + index * 0.05}s, transform 0.7s ease ${0.25 + index * 0.05}s`,
          }}>
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: 10, letterSpacing: "0.25em", fontWeight: 600,
                color: "black", background: "white",
                padding: "11px 22px", textDecoration: "none",
                fontFamily: "Poppins, sans-serif",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                display: "inline-block",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.8"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              VIEW PROJECT
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .project-inner {
          display: flex;
          flex-direction: column;
          min-height: unset;
        }

        .project-thumb {
          width: 100%;
          aspect-ratio: 16 / 9;
          background: rgba(255,255,255,0.03);
          overflow: hidden;
          position: relative;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        .project-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 36px 24px;
        }

        /* Mobile: show full cover image, hide desktop mockup */
        .img-mobile {
          display: block;
        }
        .img-desktop {
          display: none;
        }

        @media (min-width: 768px) {
          .project-inner {
            flex-direction: row !important;
            min-height: 460px;
          }
          .project-flip {
            flex-direction: row-reverse !important;
          }
          .project-thumb {
            width: 52% !important;
            aspect-ratio: unset !important;
            flex-shrink: 0;
            overflow: hidden !important;
            border-bottom: none !important;
            min-height: 460px !important;
          }
          .project-content {
            padding: 48px 52px !important;
          }

          /* Desktop: hide mobile image, show mockup */
          .img-mobile {
            display: none !important;
          }
          .img-desktop {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function Work() {
  const [sectionRef, sectionInView] = useInView(0.05);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-black overflow-hidden"
      style={{ fontFamily: "Poppins, sans-serif", paddingTop: 140, paddingBottom: 120 }}
    >
      <div className="absolute pointer-events-none" style={{
        top: "20%", left: "-5%",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.01) 0%, transparent 65%)",
        filter: "blur(80px)",
      }} />

      <div className="flex items-center justify-center gap-4 mb-10" style={{
        opacity: sectionInView ? 1 : 0,
        transform: sectionInView ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}>
        <div className="w-10 h-px bg-white/60" />
        <span className="text-[17px] tracking-[0.5em] text-white/60">SELECTED WORK</span>
        <div className="w-10 h-px bg-white/60" />
      </div>

      <div className="max-w-[1160px] mx-auto px-6 md:px-8 mb-16" style={{
        opacity: sectionInView ? 1 : 0,
        transform: sectionInView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
      }}>
        <div style={{
          fontSize: "clamp(90px, 12vw, 150px)", fontWeight: 700,
          color: "rgba(255,255,255,0.022)", lineHeight: 1,
          letterSpacing: "-0.04em", userSelect: "none",
          marginBottom: -45, marginLeft: -4,
          fontFamily: "Poppins, sans-serif",
        }}>
          03
        </div>
        <h2 style={{
          fontSize: "clamp(28px, 3.8vw, 56px)", fontWeight: 600,
          color: "rgba(255,255,255,0.9)", lineHeight: 1.06,
          letterSpacing: "-0.025em", marginBottom: 4,
          fontFamily: "Poppins, sans-serif",
        }}>
          Things I've built
        </h2>
        <h2 style={{
          fontSize: "clamp(28px, 3.8vw, 56px)", fontWeight: 600,
          color: "rgba(255,255,255,0.4)", lineHeight: 1.06,
          letterSpacing: "-0.025em", fontFamily: "Poppins, sans-serif",
        }}>
          that I'm proud of.
        </h2>
      </div>

      <div className="max-w-[1160px] mx-auto px-6 md:px-8">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} flip={i % 2 !== 0} />
        ))}
      </div>

      <div className="flex justify-center mt-20" style={{
        opacity: sectionInView ? 1 : 0,
        transition: "opacity 0.8s ease 0.5s",
      }}>
        <a
          href="https://github.com/Ganantha-RS"
          target="_blank"
          rel="noreferrer"
          style={{
            fontSize: 14, letterSpacing: "0.28em",
            color: "rgba(255,255,255,0.5)", textDecoration: "none",
            display: "flex", alignItems: "center", gap: 12,
            fontFamily: "Poppins, sans-serif",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
          onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
        >
          <span style={{ width: 32, height: 1, background: "currentColor" }} />
          VIEW ALL ON GITHUB
          <span style={{ width: 32, height: 1, background: "currentColor" }} />
        </a>
      </div>

      <div className="absolute bottom-0 left-[2%] right-[2%] h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)" }}
      />
    </section>
  );
}
