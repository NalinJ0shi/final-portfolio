import { useEffect, useState } from "react";
import { useRive, Fit, Layout } from "@rive-app/react-canvas";
import "./App.css";

function App() {
  const [activeNav, setActiveNav] = useState("Home");
  const [isLoading, setIsLoading] = useState(true);
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
              // Change the color stops here to edit the bottom-to-top radial glow
              "radial-gradient(ellipse at 50% 100%, #924d2b 0%, #4b1d1b 58%, #2a100f 100%)",
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

      {!isLoading && (
        <div
          style={{
            width: "100%",
            maxWidth: "1300px",
            minHeight: "100vh",
            height: "100vh",
            margin: "0 auto",
            overflow: "hidden",
            position: "relative",
            background:
              // Change the color stops here to edit the bottom-to-top radial glow
              "radial-gradient(ellipse at 50% 100%, #924d2b 0%, #4b1d1b 58%, #2a100f 100%)",
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
              justifyContent: "space-between",
              alignItems: "center",
              boxSizing: "border-box",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: "18px" }}>Nalin</div>
            <div
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "18px",
                alignItems: "center",
              }}
            >
              {navItems.map((item) => {
                const isActive = activeNav === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setActiveNav(item)}
                    style={{
                      position: "relative",
                      background: "transparent",
                      border: "none",
                      color: isActive ? "#fff" : "rgba(255,255,255,0.78)",
                      fontSize: isActive ? "16px" : "14px",
                      fontWeight: isActive ? 700 : 500,
                      cursor: "pointer",
                      padding: "6px 0",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "6px",
                      transition: "color 0.2s ease",
                    }}
                  >
                    <span>{item}</span>
                    {isActive && (
                      <span
                        style={{
                          width: "4px",
                          height: "4px",
                          borderRadius: "50%",
                          backgroundColor: "#fff",
                          display: "block",
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
          <div
            style={{
              width: "100%",
              maxWidth: "100%",
              height: "calc(100vh - 64px)",
              margin: "0 auto",
              position: "relative",
              overflow: "hidden",
              isolation: "isolate",
              bottom: 0,
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