import { useState, useEffect } from "react";

const COLORS = [
  { name: "bleu", bg: "#1a6cf5", light: "#e8f0ff" },
  { name: "vert", bg: "#16a34a", light: "#dcfce7" },
  { name: "violet", bg: "#7c3aed", light: "#ede9fe" },
  { name: "orange", bg: "#ea580c", light: "#fff7ed" },
  { name: "rose", bg: "#db2777", light: "#fce7f3" },
  { name: "teal", bg: "#0d9488", light: "#f0fdfa" },
];

const ICONS = ["✈️", "🛡️", "📈", "🏠", "🎓", "🚗", "💍", "🌍", "🎯", "💻", "🏖️", "🎁"];

const DEFAULT_POCHETTES = [
  { id: 1, name: "Vacances", icon: "✈️", color: 0, objectif: 3000, epargne: 1200, mensuel: 300 },
  { id: 2, name: "Épargne sécurité", icon: "🛡️", color: 1, objectif: 10000, epargne: 4500, mensuel: 500 },
  { id: 3, name: "Futur PEA", icon: "📈", color: 2, objectif: 15000, epargne: 2400, mensuel: 600 },
  { id: 4, name: "PEL", icon: "🏠", color: 3, objectif: 20000, epargne: 6000, mensuel: 400 },
];

function formatEur(n) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

function ProgressBar({ value, max, color }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div style={{ height: 8, background: "#f1f5f9", borderRadius: 99, overflow: "hidden", margin: "10px 0 6px" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99, transition: "width 0.5s ease" }} />
    </div>
  );
}

function Modal({ onClose, children }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, padding: "1.5rem", width: "100%", maxWidth: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
        {children}
      </div>
    </div>
  );
}

function PochetteForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || { name: "", icon: "🎯", color: 0, objectif: "", epargne: "", mensuel: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const valid = form.name && Number(form.objectif) > 0 && Number(form.mensuel) > 0;

  return (
    <div>
      <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: "1.25rem", color: "#0f172a" }}>
        {initial ? "Modifier la pochette" : "Nouvelle pochette"}
      </h3>

      <label style={labelStyle}>Icône</label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "1rem" }}>
        {ICONS.map(ic => (
          <button key={ic} onClick={() => set("icon", ic)}
            style={{ fontSize: 20, padding: "6px 8px", border: `2px solid ${form.icon === ic ? "#1a6cf5" : "#e2e8f0"}`, borderRadius: 8, background: form.icon === ic ? "#e8f0ff" : "#fff", cursor: "pointer" }}>
            {ic}
          </button>
        ))}
      </div>

      <label style={labelStyle}>Nom de la pochette</label>
      <input style={inputStyle} value={form.name} onChange={e => set("name", e.target.value)} placeholder="ex: Vacances Maroc" />

      <label style={labelStyle}>Couleur</label>
      <div style={{ display: "flex", gap: 8, marginBottom: "1rem" }}>
        {COLORS.map((c, i) => (
          <button key={i} onClick={() => set("color", i)}
            style={{ width: 28, height: 28, borderRadius: "50%", background: c.bg, border: `3px solid ${form.color === i ? "#0f172a" : "transparent"}`, cursor: "pointer" }} />
        ))}
      </div>

      <label style={labelStyle}>Objectif (€)</label>
      <input style={inputStyle} type="number" value={form.objectif} onChange={e => set("objectif", e.target.value)} placeholder="5000" />

      <label style={labelStyle}>Déjà épargné (€)</label>
      <input style={inputStyle} type="number" value={form.epargne} onChange={e => set("epargne", e.target.value)} placeholder="0" />

      <label style={labelStyle}>Versement mensuel (€)</label>
      <input style={inputStyle} type="number" value={form.mensuel} onChange={e => set("mensuel", e.target.value)} placeholder="200" />

      <div style={{ display: "flex", gap: 8, marginTop: "1.25rem" }}>
        <button onClick={onCancel} style={btnSecondary}>Annuler</button>
        <button onClick={() => valid && onSave({ ...form, objectif: +form.objectif, epargne: +form.epargne || 0, mensuel: +form.mensuel })}
          style={{ ...btnPrimary, opacity: valid ? 1 : 0.4 }}>
          {initial ? "Enregistrer" : "Créer la pochette"}
        </button>
      </div>
    </div>
  );
}

function BudgetSetup({ budget, onSave, onCancel }) {
  const [val, setVal] = useState(budget);
  return (
    <div>
      <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: "1rem", color: "#0f172a" }}>Budget mensuel disponible</h3>
      <p style={{ fontSize: 13, color: "#64748b", marginBottom: "1rem" }}>Saisis le montant que tu veux répartir chaque mois entre tes pochettes.</p>
      <label style={labelStyle}>Montant (€)</label>
      <input style={inputStyle} type="number" value={val} onChange={e => setVal(+e.target.value)} placeholder="2500" />
      <div style={{ display: "flex", gap: 8, marginTop: "1.25rem" }}>
        <button onClick={onCancel} style={btnSecondary}>Annuler</button>
        <button onClick={() => val > 0 && onSave(val)} style={btnPrimary}>Confirmer</button>
      </div>
    </div>
  );
}

const labelStyle = { display: "block", fontSize: 12, fontWeight: 600, color: "#475569", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" };
const inputStyle = { display: "block", width: "100%", padding: "10px 12px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, marginBottom: "1rem", outline: "none", color: "#0f172a", background: "#f8fafc" };
const btnPrimary = { flex: 1, padding: "10px", background: "#1a6cf5", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" };
const btnSecondary = { flex: 1, padding: "10px", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer" };

export default function App() {
  const [pochettes, setPochettes] = useState(() => {
    try { return JSON.parse(localStorage.getItem("pochettes")) || DEFAULT_POCHETTES; } catch { return DEFAULT_POCHETTES; }
  });
  const [budget, setBudget] = useState(() => Number(localStorage.getItem("budget")) || 2500);
  const [modal, setModal] = useState(null); // null | "add" | "edit" | "budget" | "deposit"
  const [editing, setEditing] = useState(null);
  const [depositForm, setDepositForm] = useState({ pochetteId: null, montant: "" });
  const [view, setView] = useState("dashboard"); // "dashboard" | "detail"
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    localStorage.setItem("pochettes", JSON.stringify(pochettes));
  }, [pochettes]);
  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  const totalMensuel = pochettes.reduce((s, p) => s + p.mensuel, 0);
  const reste = budget - totalMensuel;

  function addPochette(data) {
    setPochettes(p => [...p, { ...data, id: Date.now() }]);
    setModal(null);
  }
  function updatePochette(data) {
    setPochettes(p => p.map(x => x.id === editing.id ? { ...x, ...data } : x));
    setModal(null); setEditing(null);
  }
  function deletePochette(id) {
    setPochettes(p => p.filter(x => x.id !== id));
    setModal(null); setEditing(null);
  }
  function doDeposit() {
    const m = +depositForm.montant;
    if (!m || m <= 0) return;
    setPochettes(p => p.map(x => x.id === depositForm.pochetteId ? { ...x, epargne: x.epargne + m } : x));
    setModal(null); setDepositForm({ pochetteId: null, montant: "" });
  }

  const mois = new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", minHeight: "100vh", background: "#f8fafc", color: "#0f172a" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "1rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}>💰 Mes Pochettes</div>
          <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 1, textTransform: "capitalize" }}>{mois}</div>
        </div>
        <button onClick={() => setModal("budget")} style={{ background: "#f1f5f9", border: "none", borderRadius: 10, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#475569" }}>
          Budget : {formatEur(budget)}
        </button>
      </div>

      <div style={{ padding: "1.25rem", maxWidth: 680, margin: "0 auto" }}>

        {/* Summary cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: "1.5rem" }}>
          {[
            { label: "Total mensuel", value: formatEur(totalMensuel), color: "#0f172a" },
            { label: "Reste libre", value: formatEur(reste), color: reste >= 0 ? "#16a34a" : "#dc2626" },
            { label: "Pochettes", value: pochettes.length, color: "#1a6cf5" },
          ].map(c => (
            <div key={c.label} style={{ background: "#fff", borderRadius: 12, padding: "12px 14px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: c.color }}>{c.value}</div>
            </div>
          ))}
        </div>

        {/* Répartition visuelle */}
        {pochettes.length > 0 && (
          <div style={{ background: "#fff", borderRadius: 14, padding: "1rem 1.25rem", border: "1px solid #e2e8f0", marginBottom: "1.5rem" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Répartition mensuelle</div>
            <div style={{ display: "flex", height: 14, borderRadius: 99, overflow: "hidden", gap: 2, marginBottom: 10 }}>
              {pochettes.map(p => (
                <div key={p.id} style={{ flex: p.mensuel, background: COLORS[p.color].bg, transition: "flex 0.4s" }} title={p.name} />
              ))}
              {reste > 0 && <div style={{ flex: reste, background: "#f1f5f9" }} />}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {pochettes.map(p => (
                <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#64748b" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS[p.color].bg }} />
                  {p.name} · {formatEur(p.mensuel)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pochettes list */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12, marginBottom: "1.5rem" }}>
          {pochettes.map(p => {
            const pct = Math.min(100, Math.round((p.epargne / p.objectif) * 100));
            const moisRestants = p.objectif > p.epargne && p.mensuel > 0 ? Math.ceil((p.objectif - p.epargne) / p.mensuel) : 0;
            const col = COLORS[p.color];
            return (
              <div key={p.id} style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", padding: "1rem 1.25rem", transition: "box-shadow 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: col.light, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{p.icon}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: "#94a3b8" }}>{moisRestants > 0 ? `≈ ${moisRestants} mois restants` : "🎉 Objectif atteint !"}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: col.bg }}>{formatEur(p.mensuel)}<span style={{ fontSize: 10, fontWeight: 400, color: "#94a3b8" }}>/mois</span></div>
                  </div>
                </div>

                <ProgressBar value={p.epargne} max={p.objectif} color={col.bg} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748b" }}>
                  <span>{formatEur(p.epargne)} épargnés</span>
                  <span style={{ fontWeight: 600 }}>{pct}% · objectif {formatEur(p.objectif)}</span>
                </div>

                <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                  <button onClick={() => { setDepositForm({ pochetteId: p.id, montant: "" }); setModal("deposit"); }}
                    style={{ flex: 1, padding: "7px", background: col.light, color: col.bg, border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                    + Verser
                  </button>
                  <button onClick={() => { setEditing(p); setModal("edit"); }}
                    style={{ padding: "7px 10px", background: "#f8fafc", color: "#64748b", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>
                    ✏️
                  </button>
                </div>
              </div>
            );
          })}

          {/* Add card */}
          <div onClick={() => setModal("add")}
            style={{ background: "#f8fafc", borderRadius: 14, border: "1.5px dashed #cbd5e1", padding: "1rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8, cursor: "pointer", minHeight: 160, color: "#94a3b8", transition: "color 0.2s, border-color 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#1a6cf5"; e.currentTarget.style.borderColor = "#1a6cf5"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.borderColor = "#cbd5e1"; }}>
            <div style={{ fontSize: 28 }}>+</div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>Nouvelle pochette</div>
          </div>
        </div>

        {/* Conseil mensuel */}
        {reste < 0 && (
          <div style={{ background: "#fff5f5", border: "1px solid #fecaca", borderRadius: 12, padding: "12px 16px", fontSize: 13, color: "#dc2626", marginBottom: "1rem" }}>
            ⚠️ Tes versements mensuels dépassent ton budget de {formatEur(Math.abs(reste))}. Ajuste les montants.
          </div>
        )}
        {reste > 0 && pochettes.length > 0 && (
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, padding: "12px 16px", fontSize: 13, color: "#16a34a", marginBottom: "1rem" }}>
            💡 Il te reste {formatEur(reste)} libres chaque mois — tu peux les ajouter à une pochette !
          </div>
        )}

      </div>

      {/* Modals */}
      {modal === "add" && (
        <Modal onClose={() => setModal(null)}>
          <PochetteForm onSave={addPochette} onCancel={() => setModal(null)} />
        </Modal>
      )}
      {modal === "edit" && editing && (
        <Modal onClose={() => { setModal(null); setEditing(null); }}>
          <PochetteForm initial={editing} onSave={updatePochette} onCancel={() => { setModal(null); setEditing(null); }} />
          <button onClick={() => deletePochette(editing.id)}
            style={{ width: "100%", marginTop: 8, padding: 10, background: "#fff5f5", color: "#dc2626", border: "1px solid #fecaca", borderRadius: 10, fontSize: 13, cursor: "pointer" }}>
            🗑️ Supprimer cette pochette
          </button>
        </Modal>
      )}
      {modal === "budget" && (
        <Modal onClose={() => setModal(null)}>
          <BudgetSetup budget={budget} onSave={v => { setBudget(v); setModal(null); }} onCancel={() => setModal(null)} />
        </Modal>
      )}
      {modal === "deposit" && (
        <Modal onClose={() => setModal(null)}>
          <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: "1rem", color: "#0f172a" }}>Verser dans la pochette</h3>
          <label style={labelStyle}>Montant (€)</label>
          <input style={inputStyle} type="number" value={depositForm.montant} onChange={e => setDepositForm(f => ({ ...f, montant: e.target.value }))} placeholder="100" autoFocus />
          <div style={{ display: "flex", gap: 8, marginTop: "0.5rem" }}>
            <button onClick={() => setModal(null)} style={btnSecondary}>Annuler</button>
            <button onClick={doDeposit} style={btnPrimary}>Verser</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
