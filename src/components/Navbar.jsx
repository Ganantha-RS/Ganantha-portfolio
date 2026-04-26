import { useState, useEffect, useRef } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
];

function scrollTo(href) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -80, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function DesktopNavLink({ label, href, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  const showLine = active || hovered;

  return (
    <a
      href={href}
      onClick={(e) => { e.preventDefault(); onClick(); scrollTo(href); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center gap-[3px] px-4 py-2 no-underline"
      style={{ textDecoration: "none" }}
    >
      <span style={{
        fontFamily: "Poppins, sans-serif",
        fontSize: "11px", letterSpacing: "0.18em", fontWeight: 300,
        color: active || hovered ? "white" : "rgba(255,255,255,0.4)",
        transition: "color 0.3s ease",
      }}>
        {label.toUpperCase()}
      </span>
      <span style={{
        position: "absolute", bottom: 3, left: 16, right: 16,
        height: "1px", background: "white",
        transformOrigin: "left center",
        transform: showLine ? "scaleX(1)" : "scaleX(0)",
        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
      }} />
      <span style={{
        width: 3, height: 3, borderRadius: "50%", background: "white",
        opacity: active ? 1 : hovered ? 0.6 : 0,
        transform: active || hovered ? "scale(1)" : "scale(0)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }} />
    </a>
  );
}

function MobileLinkItem({ link, index, active, menuOpen, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={link.href}
      onClick={(e) => { e.preventDefault(); onClick(); scrollTo(link.href); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
      style={{
        textDecoration: "none", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        padding: "18px 0",
        borderBottom: "0.5px solid rgba(255,255,255,0.06)",
        opacity: menuOpen ? 1 : 0,
        transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
        transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${0.1 + index * 0.07}s,
                     transform 0.5s cubic-bezier(0.16,1,0.3,1) ${0.1 + index * 0.07}s`,
      }}
    >
      <span style={{
        fontFamily: "Poppins, sans-serif", fontWeight: 700,
        fontSize: "clamp(1.8rem, 8vw, 2.8rem)",
        letterSpacing: hovered || active ? "0.02em" : "-0.02em",
        color: active ? "#fff" : hovered ? "#fff" : "rgba(255,255,255,0.30)",
        transition: "color 0.3s ease, letter-spacing 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}>
        {link.label}
      </span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setNavVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", "about", "work", "experience", "contact"];
    const onScroll = () => {
      const scrollY = window.scrollY + 120;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop <= scrollY) {
          const label = navLinks.find(l => l.href === `#${ids[i]}`)?.label || "Home";
          setActive(label);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        style={{
          fontFamily: "Poppins, sans-serif",
          opacity: navVisible ? 1 : 0,
          transform: navVisible ? "translateY(0)" : "translateY(-20px)",
          transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1), background 0.5s ease, border-color 0.5s ease",
          background: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "0.5px solid rgba(255,255,255,0.18)" : "0.5px solid transparent",
        }}
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-10 h-[80px]"
      >
        <LogoMark onClick={() => { setActive("Home"); scrollTo("#home"); }} />

        <ul className="hidden md:flex items-center list-none gap-0 m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.label}>
              <DesktopNavLink
                {...link}
                active={active === link.label}
                onClick={() => setActive(link.label)}
              />
            </li>
          ))}
        </ul>

        <CtaButton
          className="hidden md:block"
          onClick={() => { setActive("Contact"); scrollTo("#contact"); }}
        />

        <HamburgerButton open={menuOpen} toggle={() => setMenuOpen((o) => !o)} />
      </nav>

      <div
        className="md:hidden fixed top-[72px] left-0 right-0 bottom-0 z-[99] flex flex-col"
        style={{
          background: "rgba(0,0,0,0.97)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          borderTop: "0.5px solid rgba(255,255,255,0.07)",
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(-12px)",
          pointerEvents: menuOpen ? "all" : "none",
          transition: "opacity 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div className="w-full h-px bg-white/5 overflow-hidden relative">
          <div
            className="absolute top-0 left-0 h-full w-1/2 bg-white/30"
            style={{ animation: menuOpen ? "mobileScan 2.5s ease-in-out infinite" : "none" }}
          />
        </div>

        <div className="flex flex-col px-8 pt-10 pb-8 flex-1">
          <nav className="flex flex-col gap-0 flex-1">
            {navLinks.map((link, i) => (
              <MobileLinkItem
                key={link.label}
                link={link}
                index={i}
                active={active === link.label}
                menuOpen={menuOpen}
                onClick={() => { setActive(link.label); setMenuOpen(false); }}
              />
            ))}
          </nav>

          <div style={{
            marginTop: "auto",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s ease 0.45s, transform 0.5s ease 0.45s",
          }}>
            <div className="w-full h-px bg-white/[0.06] mb-6" />
            <button
              className="w-full text-black bg-white font-semibold text-[11px] tracking-[0.18em] uppercase py-4 mb-6"
              style={{
                fontFamily: "Poppins, sans-serif",
                clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
              }}
              onClick={() => { setMenuOpen(false); scrollTo("#contact"); }}
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes mobileScan {
          0%   { left: -60%; }
          100% { left: 160%; }
        }
      `}</style>
    </>
  );
}

function LogoMark({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#home"
      onClick={(e) => { e.preventDefault(); onClick(); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2.5 no-underline"
      style={{ textDecoration: "none" }}
    >
      <span className="relative font-bold text-white" style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.3rem", letterSpacing: "0.03em" }}>
        GRS
        <span style={{
          position: "absolute", bottom: -2, left: 0,
          height: 1, background: "white",
          width: hovered ? "100%" : "0%",
          transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)",
        }} />
      </span>
    </a>
  );
}

function CtaButton({ className = "", onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className={`${className} relative overflow-hidden text-black bg-white font-semibold text-[11px] tracking-[0.12em] uppercase px-5 py-2.5`}
      style={{
        fontFamily: "Poppins, sans-serif",
        clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
        transform: hovered ? "scale(0.97)" : "scale(1)",
        transition: "transform 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.94)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
      onClick={onClick}
    >
      <span style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.1)",
        transform: hovered ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
      }} />
      <span className="relative">Contact Me</span>
    </button>
  );
}

function HamburgerButton({ open, toggle }) {
  return (
    <button
      aria-label="Toggle menu"
      onClick={toggle}
      className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] bg-transparent border-none p-0"
    >
      {[
        open ? { transform: "translateY(6px) rotate(45deg)" } : { transform: "none" },
        { opacity: open ? 0 : 1, transform: open ? "scaleX(0)" : "scaleX(1)" },
        open ? { transform: "translateY(-6px) rotate(-45deg)" } : { transform: "none" },
      ].map((style, i) => (
        <span
          key={i}
          className="block w-6 h-px bg-white origin-center"
          style={{
            transition: i === 1 ? "opacity 0.3s ease, transform 0.4s ease" : "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
            ...style,
          }}
        />
      ))}
    </button>
  );
}