import { useEffect, useRef, useState } from "react";
import "@fontsource/poppins";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import { FaWhatsapp, FaEnvelope, FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { IoCopyOutline, IoCheckmark } from "react-icons/io5";

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

const CONTACTS = [
  {
    label: "WHATSAPP",
    value: "+62 823 1088 0101",
    href: "https://wa.me/6282310880101",
    icon: <FaWhatsapp size={22} color="rgba(255,255,255,0.7)" />,
  },
  {
    label: "EMAIL",
    value: "ganantha.ravaldy@gmail.com",
    href: "mailto:ganantha.ravaldy@gmail.com",
    icon: <FaEnvelope size={22} color="rgba(255,255,255,0.7)" />,
  },
];

const SOCIALS = [
  { label: "GITHUB", href: "https://github.com/Ganantha-RS", icon: <FaGithub size={15} /> },
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/ganantha-ravaldy-784a79335/", icon: <FaLinkedinIn size={15} /> },
  { label: "INSTAGRAM", href: "https://www.instagram.com/ganantrllz/", icon: <FaInstagram size={15} /> },
];

export default function Contact() {
  const [sectionRef, sectionInView] = useInView(0.08);
  const [contactRef, contactInView] = useInView(0.15);
  const [copied, setCopied] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-black overflow-hidden"
      style={{ fontFamily: "Poppins, sans-serif", paddingBottom: 0 }}
    >
      <div className="absolute pointer-events-none" style={{
        top: "10%", left: "50%", transform: "translateX(-50%)",
        width: 800, height: 800, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.012) 0%, transparent 65%)",
        filter: "blur(80px)",
      }} />

      <div className="max-w-[1160px] mx-auto px-6 md:px-8 pt-36">

        <div style={{ textAlign: "center", marginBottom: 100 }}>
          <div style={{
            fontSize: "clamp(90px, 12vw, 150px)", fontWeight: 700,
            color: "rgba(255,255,255,0.022)", lineHeight: 1,
            letterSpacing: "-0.04em", userSelect: "none",
            marginBottom: -50, fontFamily: "Poppins, sans-serif",
            opacity: sectionInView ? 1 : 0,
            transition: "opacity 0.8s ease 0.1s",
          }}>
            05
          </div>

          <div style={{
            opacity: sectionInView ? 1 : 0,
            transform: sectionInView ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.15s",
            marginBottom: 24,
          }}>
            <h2 style={{
              fontSize: "clamp(42px, 7vw, 110px)", fontWeight: 500,
              color: "rgba(255,255,255,0.92)", lineHeight: 1.0,
              letterSpacing: "-0.035em", marginBottom: 0,
              fontFamily: "Poppins, sans-serif",
            }}>
              Got a project
            </h2>
            <h2 style={{
              fontSize: "clamp(42px, 7vw, 110px)", fontWeight: 600,
              color: "rgba(255,255,255,0.18)", lineHeight: 1.0,
              letterSpacing: "-0.035em", marginBottom: 8,
              fontFamily: "Poppins, sans-serif",
            }}>
              in mind?
            </h2>
          </div>

          <div style={{
            opacity: sectionInView ? 1 : 0,
            transform: sectionInView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s",
          }}>
            <a
              href="mailto:ganantha.ravaldy@gmail.com"
              style={{
                display: "inline-flex", alignItems: "center", gap: 12,
                fontSize: 11, letterSpacing: "0.28em", fontWeight: 600,
                color: "black", background: "white",
                padding: "16px 40px", textDecoration: "none",
                fontFamily: "Poppins, sans-serif",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.82"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              LET'S WORK TOGETHER
              <HiOutlineArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div ref={contactRef} className="contact-grid" style={{ marginBottom: 80 }}>
          {CONTACTS.map((c, i) => (
            <div
  key={c.label}
  style={{
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "28px",
    display: "flex",
    flexDirection: "column",  // ← default column di mobile
    gap: 16,
    opacity: contactInView ? 1 : 0,
    transform: contactInView ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.7s ease ${i * 100}ms, transform 0.7s ease ${i * 100}ms, background 0.3s ease, border-color 0.3s ease`,
    background: "rgba(255,255,255,0.01)",
  }}
  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)"; }}
  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.01)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
>
  {/* Icon + Label + Value */}
  <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0 }}>
    <div style={{
      width: 44, height: 44, borderRadius: "50%",
      border: "1px solid rgba(255,255,255,0.1)",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
      background: "rgba(255,255,255,0.04)",
    }}>
      {c.icon}
    </div>
    <div style={{ minWidth: 0, flex: 1 }}>
      <div style={{
        fontSize: 9, letterSpacing: "0.35em",
        color: "rgba(255,255,255,0.22)", marginBottom: 5,
        fontFamily: "Poppins, sans-serif",
      }}>
        {c.label}
      </div>
      <div style={{
        fontSize: "clamp(12px, 1.5vw, 15px)", fontWeight: 500,
        color: "rgba(255,255,255,0.7)",
        fontFamily: "Poppins, sans-serif",
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
      }}>
        {c.value}
      </div>
    </div>
  </div>

  {/* Buttons — full width di mobile */}
  <div style={{ display: "flex", gap: 8 }}>
    <button
      onClick={() => handleCopy(c.value, c.label)}
      style={{
        flex: 1,                // ← stretch di mobile
        background: "none",
        border: "1px solid",
        borderColor: copied === c.label ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.1)",
        padding: "9px 14px", cursor: "none",
        fontSize: 9, letterSpacing: "0.2em",
        color: copied === c.label ? "rgba(74,222,128,0.8)" : "rgba(255,255,255,0.3)",
        fontFamily: "Poppins, sans-serif",
        transition: "color 0.2s, border-color 0.2s",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
        height: 36,
      }}
      onMouseEnter={(e) => { if (copied !== c.label) { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}}
      onMouseLeave={(e) => { if (copied !== c.label) { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}}
    >
      {copied === c.label
        ? <><IoCheckmark size={11} /> COPIED</>
        : <><IoCopyOutline size={11} /> COPY</>
      }
    </button>
    <a
      href={c.href}
      target="_blank"
      rel="noreferrer"
      style={{
        flex: 1,                // ← stretch di mobile
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "9px 14px",
        fontSize: 9, letterSpacing: "0.2em",
        color: "rgba(255,255,255,0.3)",
        textDecoration: "none",
        fontFamily: "Poppins, sans-serif",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
        transition: "color 0.2s, border-color 0.2s",
        height: 36,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
    >
      <HiOutlineArrowUpRight size={11} /> OPEN
    </a>
  </div>
</div>
          ))}
        </div>
      </div>

      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.15)",
        padding: "28px 0",
        opacity: sectionInView ? 1 : 0,
        transition: "opacity 0.8s ease 0.8s",
      }}>
        <div className="max-w-[1160px] mx-auto px-6 md:px-8 footer-row">
          <div style={{
            fontSize: 11, letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.6)",
            fontFamily: "Poppins, sans-serif",
          }}>
            © 2026 · GANANTHA RAVALDY SYAHREZA
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {SOCIALS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 7,
                  fontSize: 10, letterSpacing: "0.25em",
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  fontFamily: "Poppins, sans-serif",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
              >
                {icon}
                <span className="hidden sm:inline">{label}</span>
              </a>
            ))}
          </div>

          <div style={{
            fontSize: 10, letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.6)",
            fontFamily: "Poppins, sans-serif",
          }}>
            PORTFOLIO · 2026
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1px;
          background: rgba(255,255,255,0.05);
        }
        @media (min-width: 640px) {
          .contact-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .footer-row {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: center;
          text-align: center;
        }
        @media (min-width: 768px) {
          .footer-row {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
        }
      `}</style>
    </section>
  );
}