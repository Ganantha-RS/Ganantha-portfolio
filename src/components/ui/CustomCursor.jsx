import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "custom-cursor-style";
    style.innerHTML = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(style);

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
    };

    const loop = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.20;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.20;
      if (cursorRef.current) {
        cursorRef.current.style.left = pos.current.x + "px";
        cursorRef.current.style.top = pos.current.y + "px";
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    const SELECTORS =
      'button, a, input, textarea, select, label, [role="button"], [data-cursor="hover"], [class*="cursor-pointer"]';

    const onOver = (e) => { if (e.target.closest(SELECTORS)) setHovered(true); };
    const onOut  = (e) => { if (e.target.closest(SELECTORS)) setHovered(false); };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);

    return () => {
      document.getElementById("custom-cursor-style")?.remove();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="hidden md:block"
        style={{
          position: "fixed",
          top: 0, left: 0,
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-50%, -50%)",
          width: hovered ? 60 : 75,
          height: hovered ? 60 : 75,
          borderRadius: "50%",
          border: hovered
            ? "1px solid rgba(255,255,255,0.55)"
            : "1.5px solid rgba(255,255,255,0.85)",
          backgroundColor: hovered
            ? "rgba(255,255,255,0.08)"
            : "transparent",
          transition: [
            "width 0.5s cubic-bezier(0.23,1,0.32,1)",
            "height 0.5s cubic-bezier(0.23,1,0.32,1)",
            "border 0.3s ease",
            "background-color 0.3s ease",
          ].join(", "),
        }}
      />

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="hidden md:block"
        style={{
          position: "fixed",
          top: 0, left: 0,
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-50%, -50%)",
          width: hovered ? 15 : 20,
          height: hovered ? 15 : 20,
          borderRadius: "50%",
          backgroundColor: "white",
          opacity: hovered ? 0.35 : 1,
          transition: [
            "width 0.3s cubic-bezier(0.23,1,0.32,1)",
            "height 0.3s cubic-bezier(0.23,1,0.32,1)",
            "opacity 0.3s ease",
          ].join(", "),
        }}
      />
    </>
  );
}