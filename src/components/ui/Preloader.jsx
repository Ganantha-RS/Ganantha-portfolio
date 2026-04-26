import { useEffect, useRef, useState } from "react";
import "@fontsource/poppins";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState("init");

  const counterRef = useRef(null);

  useEffect(() => {
    let t1, t2, t3, t4, t5, t6;

    t1 = setTimeout(() => setPhase("logo-in"), 200);
    t2 = setTimeout(() => setPhase("scan"), 900);

    let count = 0;
    t3 = setTimeout(() => {
      const interval = setInterval(() => {
        count += Math.floor(Math.random() * 8) + 3;
        if (count >= 100) {
          count = 100;
          clearInterval(interval);
        }
        if (counterRef.current) counterRef.current.textContent = `${count}%`;
      }, 28);
    }, 1000);

    t4 = setTimeout(() => setPhase("logo-out"), 3200);

    t5 = setTimeout(() => {
      setPhase("curtain");
      onComplete?.(); 
    }, 3700);

    t6 = setTimeout(() => setPhase("done"), 5000);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      clearTimeout(t4); clearTimeout(t5); clearTimeout(t6);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999999,
          background: "#000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Poppins, sans-serif",
          overflow: "hidden",
          opacity: phase === "logo-out" ? 0 : phase === "curtain" ? 0 : 1,
          pointerEvents: phase === "curtain" || phase === "done" ? "none" : "all",
          transition: phase === "logo-out"
            ? "opacity 0.5s cubic-bezier(0.16,1,0.3,1)"
            : "none",
        }}
      >
        <div style={{
          position: "absolute", left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          top: "50%",
          opacity: phase === "scan" ? 1 : 0,
          animation: phase === "scan" ? "scanLine 2s ease-in-out forwards" : "none",
          pointerEvents: "none",
        }} />

        {["tl", "tr", "bl", "br"].map((pos) => (
          <div
            key={pos}
            style={{
              position: "absolute",
              width: 20, height: 20,
              ...(pos.includes("t") ? { top: 32 } : { bottom: 32 }),
              ...(pos.includes("l") ? { left: 32 } : { right: 32 }),
              borderTop: pos.includes("t") ? "1px solid rgba(255,255,255,0.2)" : "none",
              borderBottom: pos.includes("b") ? "1px solid rgba(255,255,255,0.2)" : "none",
              borderLeft: pos.includes("l") ? "1px solid rgba(255,255,255,0.2)" : "none",
              borderRight: pos.includes("r") ? "1px solid rgba(255,255,255,0.2)" : "none",
              opacity: phase === "logo-in" || phase === "scan" ? 1 : 0,
              transition: "opacity 0.6s ease 0.5s",
            }}
          />
        ))}

        <div style={{
          position: "relative",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 24,
          opacity: phase === "init" ? 0 : 1,
          transform: phase === "init"
            ? "scale(0.92)"
            : phase === "logo-out"
            ? "scale(1.04)"
            : "scale(1)",
          transition: phase === "init"
            ? "none"
            : phase === "logo-out"
            ? "opacity 0.5s ease, transform 0.5s ease"
            : "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <div style={{ position: "relative" }}>
            <img
              src="/Logo.png"
              alt="GRS"
              style={{ width: "clamp(140px, 20vw, 220px)", height: "auto", display: "block" }}
            />
            {phase === "scan" && (
              <>
                <div style={{
                  position: "absolute", left: 0, right: 0,
                  top: "38%", height: 1,
                  background: "rgba(255,255,255,0.15)",
                  animation: "glitchLine1 0.8s ease 0.3s both",
                }} />
                <div style={{
                  position: "absolute", left: 0, right: 0,
                  top: "62%", height: 1,
                  background: "rgba(255,255,255,0.1)",
                  animation: "glitchLine2 0.8s ease 0.5s both",
                }} />
              </>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{
              fontSize: 10, letterSpacing: "0.55em",
              color: "rgba(255,255,255,0.5)",
              opacity: phase === "scan" ? 1 : 0,
              transform: phase === "scan" ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
            }}>
              GANANTHA RAVALDY SYAHREZA
            </div>
            <div style={{
              height: 1, background: "rgba(255,255,255,0.5)",
              width: phase === "scan" ? "100%" : "0%",
              transition: "width 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }} />
            <div style={{
              fontSize: 9, letterSpacing: "0.4em",
              color: "rgba(255,255,255,0.5)",
              opacity: phase === "scan" ? 1 : 0,
              transition: "opacity 0.6s ease 0.6s",
            }}>
              WEB DEVELOPER · PORTFOLIO
            </div>
          </div>
        </div>

        <div style={{
          position: "absolute", bottom: 36, left: 40,
          display: "flex", alignItems: "center", gap: 12,
          opacity: phase === "scan" ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}>
          <div style={{
            width: 4, height: 4, borderRadius: "50%", background: "white",
            animation: phase === "scan" ? "pulse 1s ease infinite" : "none",
          }} />
          <span ref={counterRef} style={{
            fontSize: 11, letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.4)",
          }}>
            0%
          </span>
        </div>

        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 1, background: "rgba(255,255,255,0.06)",
        }}>
          <div style={{
            height: "100%", background: "rgba(255,255,255,0.4)",
            width: phase === "scan" ? "100%" : "0%",
            transition: "width 2.2s cubic-bezier(0.16,1,0.3,1) 0.8s",
          }} />
        </div>

        <div style={{
          position: "absolute", bottom: 36, right: 40,
          fontSize: 9, letterSpacing: "0.35em",
          color: "rgba(255,255,255,0.5)",
          opacity: phase === "scan" ? 1 : 0,
          transition: "opacity 0.4s ease 0.5s",
        }}>
          INITIALIZING
        </div>
      </div>

      <div style={{
        position: "fixed",
        left: 0, right: 0, top: 0,
        zIndex: 999998,
        background: "#000",
        height: "50vh",
        transformOrigin: "top",
        transform: phase === "curtain" || phase === "done"
          ? "scaleY(0)"
          : "scaleY(1)",
        transition: phase === "curtain"
          ? "transform 1s cubic-bezier(0.76,0,0.24,1) 0.1s"
          : "none",
        pointerEvents: "none",
      }}>
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 1,
          background: "rgba(255,255,255,0.15)",
          opacity: phase === "curtain" ? 1 : 0,
          transition: "opacity 0.2s ease",
        }} />
      </div>

      <div style={{
        position: "fixed",
        left: 0, right: 0, bottom: 0,
        zIndex: 999998,
        background: "#000",
        height: "50vh",
        transformOrigin: "bottom",
        transform: phase === "curtain" || phase === "done"
          ? "scaleY(0)"
          : "scaleY(1)",
        transition: phase === "curtain"
          ? "transform 1s cubic-bezier(0.76,0,0.24,1) 0.1s"
          : "none",
        pointerEvents: "none",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: 1,
          background: "rgba(255,255,255,0.15)",
          opacity: phase === "curtain" ? 1 : 0,
          transition: "opacity 0.2s ease",
        }} />
      </div>

      <style>{`
        @keyframes scanLine {
          0%   { top: 0%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes glitchLine1 {
          0%   { opacity: 0; transform: translateX(-4px); }
          50%  { opacity: 1; transform: translateX(4px); }
          100% { opacity: 0; transform: translateX(0); }
        }
        @keyframes glitchLine2 {
          0%   { opacity: 0; transform: translateX(4px); }
          50%  { opacity: 1; transform: translateX(-4px); }
          100% { opacity: 0; transform: translateX(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.3; transform: scale(0.6); }
        }
      `}</style>
    </>
  );
}