import { useState } from "react";
import { useRive, Fit, Layout } from "@rive-app/react-canvas";
import "./App.css";

function App() {
  const [activeNav, setActiveNav] = useState("Home");
  const navItems = ["Home", "About", "Contact"];

  const { rive, RiveComponent } = useRive({
  src: "/char04.riv",
  stateMachines: "State Machine 1",
  autoplay: true,
  layout: new Layout({
    fit: Fit.Cover,
  }),
});

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1300px",
        minHeight: "100vh",
        height: "100vh",
        margin: "0 auto",
        overflow: "hidden",
        position: "relative",
        background: "linear-gradient(90deg, #2a100f 0%, #4b1d1b 50%, #924d2b 100%)",
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
        <div style={{ fontWeight: 700, fontSize: "18px" }}>Logo</div>
        <div style={{ display: "flex", gap: "12px" }}>
          {navItems.map((item) => {
            const isActive = activeNav === item;
            return (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                style={{
                  background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
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
  );
}

export default App;