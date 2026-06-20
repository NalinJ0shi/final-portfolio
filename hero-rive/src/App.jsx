import { useEffect, useState } from "react";
import { useRive, Fit, Layout } from "@rive-app/react-canvas";
import "./App.css";

function App() {
  const [activeNav, setActiveNav] = useState("Home");
  const [isLoading, setIsLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth >= 1024;
  });
  const navItems = ["Home", "About", "Contact"];

  const { rive, RiveComponent } = useRive({
    src: "/char05.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
    }),
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(90deg, #2a100f 0%, #4b1d1b 50%, #924d2b 100%)",
            color: "#ece2e2",
            fontSize: "1rem",
            fontWeight: 600,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          Loading...
        </div>
      )}

      {!isLoading && !isDesktop && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(90deg, #2a100f 0%, #4b1d1b 50%, #924d2b 100%)",
            color: "#ece2e2",
            textAlign: "center",
            padding: "24px",
          }}
        >
          <div style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800 }}>
            VIEW IN DESKTOP
          </div>
          <div
            style={{
              marginTop: "12px",
              fontSize: "0.95rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            This experience is best on larger screens.
          </div>
        </div>
      )}

      {!isLoading && isDesktop && (
        <div
          style={{
            width: "100%",
            maxWidth: "1300px",
            minHeight: "100vh",
            height: "100vh",
            margin: "0 auto",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            background:
              "linear-gradient(90deg, #2a100f 0%, #4b1d1b 50%, #924d2b 100%)",
            backgroundColor: "#2a100f",
            color: "#ece2e2",
          }}
        >
          <nav
            style={{
              width: "100%",
              maxWidth: "100%",
              margin: "0 auto",
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              boxSizing: "border-box",
              position: "relative",
              zIndex: 1,
              flexShrink: 0,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: "18px" }}>Nalin</div>
            <div
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "12px",
              }}
            >
              {navItems.map((item) => {
                const isActive = activeNav === item;
                return (
                  <button
                    key={item}
                    onClick={() => setActiveNav(item)}
                    style={{
                      background: isActive
                        ? "rgba(255,255,255,0.12)"
                        : "transparent",
                      color: "inherit",
                      border: "none",
                      borderRadius: "999px",
                      padding: "8px 12px",
                      fontSize: "14px",
                      fontWeight: isActive ? 700 : 500,
                      cursor: "pointer",
                      transition: "transform 0.2s ease, background 0.2s ease",
                      transform: isActive ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </nav>
          <div
            style={{
              width: "100%",
              maxWidth: "100%",
              flex: 1,
              minHeight: 0,
              margin: "0 auto",
              position: "relative",
              overflow: "hidden",
              isolation: "isolate",
            }}
            onMouseMove={(e) => {
              if (!rive) return;

              const inputs = rive.stateMachineInputs("State Machine 1");

              const pointerX = inputs.find(
                (input) => input.name === "PointerX"
              );
              const pointerY = inputs.find(
                (input) => input.name === "PointerY"
              );

              const x = ((e.clientX / window.innerWidth) * 200) - 100;
              const y = -(((e.clientY / window.innerHeight) * 200) - 100);

              if (pointerX) pointerX.value = x;
              if (pointerY) pointerY.value = y;
            }}
          >
            <RiveComponent
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
              }}
            />
            <div className="hero-text-wrap">
              {/* Change this text to edit the animated headline */}
              <h1 className="hero-text">NALIN</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;