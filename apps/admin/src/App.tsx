import React from "react";

export const App: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          "radial-gradient(circle at top left, #111827, #020617 55%, #000000 100%)",
        color: "#e5e7eb",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
      }}
    >
      <header
        style={{
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(148, 163, 184, 0.3)",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(15,23,42,0.7)",
          position: "sticky",
          top: 0,
          zIndex: 10
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "999px",
              background:
                "conic-gradient(from 160deg, #38bdf8, #a855f7, #22c55e, #38bdf8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 25px rgba(59,130,246,0.7)"
            }}
          >
            <span
              style={{
                fontWeight: 800,
                fontSize: "0.9rem",
                color: "#020617"
              }}
            >
              B
            </span>
          </div>
          <div>
            <div style={{ fontWeight: 600, letterSpacing: "0.04em" }}>
              BREE ADMIN
            </div>
            <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
              Take-home dashboard template
            </div>
          </div>
        </div>
        <button
          style={{
            borderRadius: "999px",
            padding: "0.4rem 0.95rem",
            border: "1px solid rgba(148, 163, 184, 0.5)",
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(15,23,42,0.4))",
            color: "#e5e7eb",
            fontSize: "0.8rem",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            cursor: "pointer"
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "0.4rem",
              height: "0.4rem",
              borderRadius: "999px",
              backgroundColor: "#22c55e",
              boxShadow: "0 0 8px rgba(34,197,94,0.8)"
            }}
          />
          <span>Monorepo ready</span>
        </button>
      </header>

      <main
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "260px minmax(0, 1fr)",
          gap: "1.5rem",
          padding: "1.5rem 2rem"
        }}
      >
        <aside
          style={{
            borderRadius: "1rem",
            padding: "1.25rem",
            border: "1px solid rgba(148, 163, 184, 0.4)",
            background:
              "linear-gradient(145deg, rgba(15,23,42,0.9), rgba(15,23,42,0.6))",
            boxShadow:
              "0 18px 45px rgba(15,23,42,0.9), 0 0 0 1px rgba(15,23,42,0.9)"
          }}
        >
          <div
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              color: "#9ca3af",
              marginBottom: "0.75rem",
              letterSpacing: "0.16em"
            }}
          >
            Navigation
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {["Overview", "Users", "Content", "Settings"].map((item, index) => {
              const active = index === 0;
              return (
                <button
                  key={item}
                  style={{
                    textAlign: "left",
                    padding: "0.6rem 0.8rem",
                    borderRadius: "0.7rem",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: active ? "rgba(15,118,110,0.22)" : "transparent",
                    color: active ? "#e5e7eb" : "#9ca3af",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "0.9rem"
                  }}
                >
                  <span>{item}</span>
                  {active && (
                    <span
                      style={{
                        fontSize: "0.7rem",
                        padding: "0.05rem 0.45rem",
                        borderRadius: "999px",
                        background:
                          "linear-gradient(120deg, #22c55e, #14b8a6, #0ea5e9)",
                        color: "#022c22",
                        fontWeight: 600
                      }}
                    >
                      ACTIVE
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem"
          }}
        >
          <div
            style={{
              borderRadius: "1rem",
              padding: "1.3rem 1.4rem",
              border: "1px solid rgba(148, 163, 184, 0.6)",
              background:
                "radial-gradient(circle at top left, rgba(45,212,191,0.16), rgba(15,23,42,0.95))",
              boxShadow:
                "0 22px 55px rgba(15,23,42,1), 0 0 0 1px rgba(15,23,42,0.9)"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.75rem"
              }}
            >
              <div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: "1.4rem",
                    letterSpacing: "-0.03em"
                  }}
                >
                  Admin dashboard template
                </h1>
                <p
                  style={{
                    margin: "0.4rem 0 0",
                    fontSize: "0.9rem",
                    color: "#9ca3af",
                    maxWidth: "36rem"
                  }}
                >
                  This panel lives inside a monorepo with a React Native mobile
                  app. Start coding features here without worrying about the
                  project wiring.
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "0.45rem"
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#9ca3af",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em"
                  }}
                >
                  Workspaces
                </span>
                <div
                  style={{
                    display: "flex",
                    gap: "0.4rem",
                    flexWrap: "wrap",
                    justifyContent: "flex-end"
                  }}
                >
                  {[
                    { label: "root", color: "#22c55e" },
                    { label: "admin", color: "#38bdf8" },
                    { label: "mobile", color: "#a855f7" }
                  ].map((w) => (
                    <span
                      key={w.label}
                      style={{
                        fontSize: "0.75rem",
                        borderRadius: "999px",
                        padding: "0.15rem 0.6rem",
                        backgroundColor: "rgba(15,23,42,0.8)",
                        border: `1px solid ${w.color}`,
                        color: w.color
                      }}
                    >
                      {w.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "1rem"
            }}
          >
            {[
              {
                label: "Active users",
                value: "1,284",
                delta: "+18.4%",
                tone: "#22c55e"
              },
              {
                label: "Sessions / day",
                value: "3,792",
                delta: "+6.1%",
                tone: "#38bdf8"
              },
              {
                label: "Error rate",
                value: "0.23%",
                delta: "-0.08%",
                tone: "#f97316"
              }
            ].map((card) => (
              <div
                key={card.label}
                style={{
                  borderRadius: "0.9rem",
                  padding: "1rem 1.05rem",
                  border: "1px solid rgba(148, 163, 184, 0.5)",
                  background:
                    "linear-gradient(145deg, rgba(15,23,42,0.9), rgba(15,23,42,0.65))",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem"
                }}
              >
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#9ca3af",
                    textTransform: "uppercase",
                    letterSpacing: "0.14em"
                  }}
                >
                  {card.label}
                </div>
                <div
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 600,
                    letterSpacing: "-0.03em"
                  }}
                >
                  {card.value}
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: card.tone
                  }}
                >
                  {card.delta} vs last 7 days
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

