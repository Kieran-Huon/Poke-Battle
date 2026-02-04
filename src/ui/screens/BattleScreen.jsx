// // src/ui/screens/BattleScreen.jsx
// import { useEffect, useMemo, useState } from "react";
// import { createFighter, runTurn } from "../../engine/battle";
// import { MOVES } from "../../data/moves";

// function clamp(n, a, b) {
//   return Math.max(a, Math.min(b, n));
// }

// function moveLabel(id) {
//   return MOVES?.[id]?.name ?? id;
// }

// function typeLabel(t) {
//   return t;
// }

// function hpColor(ratio) {
//   if (ratio <= 0.2) return "rgba(255, 90, 90, 0.95)";
//   if (ratio <= 0.5) return "rgba(255, 210, 90, 0.95)";
//   return "rgba(90, 255, 150, 0.95)";
// }

// function StageRow({ label, value }) {
//   const v = value ?? 0;
//   const sign = v > 0 ? `+${v}` : `${v}`;
//   return (
//     <div style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 12 }}>
//       <div style={{ opacity: 0.85 }}>{label}</div>
//       <div style={{ fontWeight: 800, opacity: 0.95 }}>{sign}</div>
//     </div>
//   );
// }

// function StatsPanel({ open, onClose, player, enemy }) {
//   if (!open) return null;

//   const boxStyle = {
//     width: 360,
//     borderRadius: 14,
//     border: "1px solid rgba(255,255,255,0.14)",
//     background: "rgba(0,0,0,0.55)",
//     padding: 12,
//   };

//   const titleStyle = { fontWeight: 900, fontSize: 14, marginBottom: 8 };

//   const StatBlock = ({ title, p }) => {
//     if (!p) return null;
//     return (
//       <div style={boxStyle}>
//         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
//           <div>
//             <div style={titleStyle}>{title}</div>
//             <div style={{ fontWeight: 900, fontSize: 16 }}>{p.name}</div>
//             <div style={{ opacity: 0.8, fontSize: 12 }}>{(p.types ?? []).map(typeLabel).join(" / ")}</div>
//             {p.status?.name && (
//               <div style={{ marginTop: 6, fontSize: 12, opacity: 0.9 }}>
//                 Statut : <b>{p.status.name}</b>
//               </div>
//             )}
//           </div>
//           {p.sprite ? (
//             <img
//               src={p.sprite}
//               alt={p.name}
//               style={{
//                 width: 72,
//                 height: 72,
//                 objectFit: "contain",
//                 imageRendering: "pixelated",
//                 filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.35))",
//               }}
//             />
//           ) : null}
//         </div>

//         <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
//           <div style={{ padding: 10, borderRadius: 12, background: "rgba(255,255,255,0.06)" }}>
//             <div style={{ fontWeight: 900, marginBottom: 8, fontSize: 12 }}>Stats</div>
//             <div style={{ fontSize: 12, opacity: 0.95 }}>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span>PV</span>
//                 <b>
//                   {p.hp}/{p.stats.hp}
//                 </b>
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span>ATK</span>
//                 <b>{p.stats.atk}</b>
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span>DEF</span>
//                 <b>{p.stats.def}</b>
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span>SPA</span>
//                 <b>{p.stats.spa}</b>
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span>SPD</span>
//                 <b>{p.stats.spd}</b>
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span>SPE</span>
//                 <b>{p.stats.spe}</b>
//               </div>
//             </div>
//           </div>

//           <div style={{ padding: 10, borderRadius: 12, background: "rgba(255,255,255,0.06)" }}>
//             <div style={{ fontWeight: 900, marginBottom: 8, fontSize: 12 }}>Stages</div>
//             <StageRow label="ATK" value={p.stages?.atk} />
//             <StageRow label="DEF" value={p.stages?.def} />
//             <StageRow label="SPA" value={p.stages?.spa} />
//             <StageRow label="SPD" value={p.stages?.spd} />
//             <StageRow label="SPE" value={p.stages?.spe} />
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div
//       onClick={onClose}
//       style={{
//         position: "fixed",
//         inset: 0,
//         background: "rgba(0,0,0,0.55)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: 14,
//         zIndex: 9999,
//       }}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           width: "min(980px, 100%)",
//           borderRadius: 18,
//           border: "1px solid rgba(255,255,255,0.16)",
//           background: "rgba(20,20,28,0.92)",
//           padding: 14,
//         }}
//       >
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
//           <div style={{ fontWeight: 1000, fontSize: 16 }}>Stats du combat</div>
//           <button
//             onClick={onClose}
//             style={{
//               padding: "8px 10px",
//               borderRadius: 12,
//               border: "1px solid rgba(255,255,255,0.18)",
//               background: "rgba(255,255,255,0.10)",
//               color: "white",
//               cursor: "pointer",
//               fontWeight: 900,
//             }}
//           >
//             Fermer (S)
//           </button>
//         </div>

//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//           <StatBlock title="Joueur" p={player} />
//           <StatBlock title="Rival" p={enemy} />
//         </div>

//         <div style={{ marginTop: 10, fontSize: 12, opacity: 0.8 }}>
//           Astuce : appuie sur <b>S</b> pour ouvrir/fermer.
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function BattleScreen({ run, dispatch }) {
//   const initialState = useMemo(() => {
//     const playerTeam = run.playerTeamBase.map(createFighter);

//     const enemyTeamBase = [...run.playerTeamBase]
//       .slice(0, 3)
//       .map((p, i) => ({
//         ...p,
//         key: p.key + "_enemy_" + i,
//         name: "Rival " + p.name,
//       }));

//     const enemyTeam = enemyTeamBase.map(createFighter);

//     return {
//       phase: "battle",
//       winner: null,
//       log: [`Un dresseur apparaît !`],
//       playerTeam,
//       enemyTeam,
//       playerActive: 0,
//       enemyActive: 0,
//       waitingPlayer: true,
//       mustSwitchPlayer: false,
//     };
//   }, [run]);

//   const [state, setState] = useState(initialState);
//   const [showStats, setShowStats] = useState(false);

//   const p = state.playerTeam[state.playerActive];
//   const e = state.enemyTeam[state.enemyActive];

//   const pHpRatio = p ? clamp(p.hp / p.stats.hp, 0, 1) : 0;
//   const eHpRatio = e ? clamp(e.hp / e.stats.hp, 0, 1) : 0;

//   const canAct = state.waitingPlayer && state.phase !== "ended" && p?.hp > 0 && !state.mustSwitchPlayer;

//   // Toggle stats avec la touche S
//   useEffect(() => {
//     function onKey(e) {
//       if (e.key.toLowerCase() === "s") {
//         setShowStats((v) => !v);
//       }
//     }
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   function appendLog(lines) {
//     setState((prev) => ({
//       ...prev,
//       log: [...prev.log, ...lines],
//     }));
//   }

// //   function doTurnWithMove(moveId) {
// //     if (!canAct) return;

// //     if ((p.pp?.[moveId] ?? 0) <= 0) {
// //       appendLog([`${p.name} n'a plus de PP pour ${moveLabel(moveId)} !`]);
// //       return;
// //     }

// //     setState((prev) => ({ ...prev, waitingPlayer: false }));

// //     setState((prev) => {
// //       const next = structuredClone(prev);
// //       runTurn(next, { type: "move", move: moveId });

// //       const cur = next.playerTeam[next.playerActive];
// //       if (cur.hp <= 0) next.mustSwitchPlayer = true;

// //       if (next.phase === "ended") {
// //         next.waitingPlayer = false;
// //         return next;
// //       }

// //       next.waitingPlayer = true;
// //       return next;
// //     });
// //   }

// function doTurnWithMove(moveId) {
//   if (!canAct) return;

//   if ((p.pp?.[moveId] ?? 0) <= 0) {
//     appendLog([`${p.name} n'a plus de PP pour ${moveLabel(moveId)} !`]);
//     return;
//   }

//   setState((prev) => ({ ...prev, waitingPlayer: false }));

//   setState((prev) => {
//     const next = structuredClone(prev);

//     const prevActive = prev.playerActive; // 👈 on garde l'actif AVANT le tour

//     runTurn(next, { type: "move", move: moveId });

//     // ✅ Si le Pokémon qui était actif avant est KO,
//     // et que l'engine a auto-switch -> on annule pour laisser choisir
//     const wasKO = next.playerTeam[prevActive]?.hp <= 0;
//     const engineAutoSwitched = next.playerActive !== prevActive;

//     if (wasKO && engineAutoSwitched) {
//       next.playerActive = prevActive;      // 👈 on revient sur le Pokémon KO (pour l'UI)
//       next.mustSwitchPlayer = true;        // 👈 choix obligatoire
//       next.waitingPlayer = true;           // 👈 tu peux agir (mais seulement switch)
//       next.log = [...next.log, "Ton Pokémon est K.O. — choisis qui envoyer !"];
//       return next;
//     }

//     // Sinon, comportement normal
//     const cur = next.playerTeam[next.playerActive];
//     if (cur.hp <= 0) next.mustSwitchPlayer = true;

//     if (next.phase === "ended") {
//       next.waitingPlayer = false;
//       return next;
//     }

//     next.waitingPlayer = true;
//     return next;
//   });
// }




// //   function doSwitch(toIndex) {
// //     if (state.phase === "ended") return;
// //     if (toIndex === state.playerActive) return;
// //     if (state.playerTeam[toIndex].hp <= 0) return;

// //     setState((prev) => {
// //       const next = structuredClone(prev);
// //       next.playerActive = toIndex;
// //       next.mustSwitchPlayer = false;

// //       next.waitingPlayer = false;
// //       runTurn(next, { type: "switch", to: toIndex });

// //       const cur = next.playerTeam[next.playerActive];
// //       if (cur.hp <= 0) next.mustSwitchPlayer = true;

// //       if (next.phase === "ended") {
// //         next.waitingPlayer = false;
// //         return next;
// //       }

// //       next.waitingPlayer = true;
// //       return next;
// //     });
// //   }

// function doSwitch(toIndex) {
//   if (state.phase === "ended") return;
//   if (toIndex === state.playerActive) return;
//   if (state.playerTeam[toIndex].hp <= 0) return;

//   // ✅ Switch forcé (après KO) = GRATUIT : pas de runTurn
//   if (state.mustSwitchPlayer) {
//     setState((prev) => {
//       const next = structuredClone(prev);
//       next.playerActive = toIndex;
//       next.mustSwitchPlayer = false;
//       next.waitingPlayer = true;
//       next.log = [...next.log, `${next.playerTeam[toIndex].name}, à toi !`];
//       return next;
//     });
//     return;
//   }

//   // Switch normal = action de tour (l'ennemi joue aussi)
//   setState((prev) => {
//     const next = structuredClone(prev);
//     next.playerActive = toIndex;
//     next.mustSwitchPlayer = false;

//     next.waitingPlayer = false;
//     runTurn(next, { type: "switch", to: toIndex });

//     const cur = next.playerTeam[next.playerActive];
//     if (cur.hp <= 0) next.mustSwitchPlayer = true;

//     if (next.phase === "ended") {
//       next.waitingPlayer = false;
//       return next;
//     }

//     next.waitingPlayer = true;
//     return next;
//   });
// }


//   function endBattleContinue() {
//     if (state.winner === "player") dispatch({ type: "WIN_BATTLE", run });
//     else dispatch({ type: "LOSE_RUN" });
//   }

//   const moveButtons = (p?.moves ?? []).slice(0, 4).map((id) => {
//     const mv = MOVES[id];
//     const ppCur = p?.pp?.[id] ?? 0;
//     const ppMax = mv?.pp ?? 0;
//     const disabled = !canAct || ppCur <= 0;

//     return {
//       id,
//       name: moveLabel(id),
//       type: mv?.type ?? "??",
//       ppCur,
//       ppMax,
//       disabled,
//     };
//   });

//   return (
//     <div style={{ padding: 18, fontFamily: "system-ui, sans-serif", color: "white" }}>
//       <StatsPanel open={showStats} onClose={() => setShowStats(false)} player={p} enemy={e} />

//       {/* Top HUD */}
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
//         <div style={{ fontWeight: 900, fontSize: 22 }}>Combat</div>

//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           <button
//             onClick={() => setShowStats((v) => !v)}
//             style={{
//               padding: "8px 10px",
//               borderRadius: 12,
//               border: "1px solid rgba(255,255,255,0.18)",
//               background: "rgba(255,255,255,0.10)",
//               color: "white",
//               cursor: "pointer",
//               fontWeight: 900,
//             }}
//           >
//             Stats (S)
//           </button>

//           <div style={{ opacity: 0.8 }}>
//             {state.phase === "ended"
//               ? state.winner === "player"
//                 ? "Victoire !"
//                 : "Défaite…"
//               : state.mustSwitchPlayer
//               ? "Choisis un Pokémon (KO) !"
//               : state.waitingPlayer
//               ? "À toi !"
//               : "Tour ennemi…"}
//           </div>
//         </div>
//       </div>

//       {/* Arena */}
//       <div
//         style={{
//           marginTop: 14,
//           borderRadius: 16,
//           border: "1px solid rgba(255,255,255,0.12)",
//           background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.15))",
//           padding: 16,
//           minHeight: 360,
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         {/* Enemy info (top-left) */}
//         <div
//           style={{
//             position: "absolute",
//             top: 16,
//             left: 16,
//             width: 320,
//             padding: 12,
//             borderRadius: 14,
//             background: "rgba(0,0,0,0.25)",
//             border: "1px solid rgba(255,255,255,0.12)",
//           }}
//         >
//           <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
//             <div>
//               <div style={{ fontWeight: 900, fontSize: 16 }}>{e?.name ?? "—"}</div>
//               <div style={{ opacity: 0.8, fontSize: 12 }}>{(e?.types ?? []).map(typeLabel).join(" / ")}</div>
//               {e?.status?.name && (
//                 <div style={{ marginTop: 6, fontSize: 12, opacity: 0.9 }}>
//                   Statut : <b>{e.status.name}</b>
//                 </div>
//               )}
//             </div>
//             <div style={{ fontSize: 12, opacity: 0.85 }}>{e ? `${e.hp}/${e.stats.hp}` : ""}</div>
//           </div>

//           <div style={{ marginTop: 10, height: 10, borderRadius: 999, background: "rgba(255,255,255,0.10)" }}>
//             <div
//               style={{
//                 width: `${Math.round(eHpRatio * 100)}%`,
//                 height: "100%",
//                 borderRadius: 999,
//                 background: hpColor(eHpRatio),
//                 transition: "width 200ms ease",
//               }}
//             />
//           </div>
//         </div>

//         {/* Player info (bottom-right) */}
//         <div
//           style={{
//             position: "absolute",
//             bottom: 16,
//             right: 16,
//             width: 340,
//             padding: 12,
//             borderRadius: 14,
//             background: "rgba(0,0,0,0.25)",
//             border: "1px solid rgba(255,255,255,0.12)",
//           }}
//         >
//           <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
//             <div>
//               <div style={{ fontWeight: 900, fontSize: 16 }}>{p?.name ?? "—"}</div>
//               <div style={{ opacity: 0.8, fontSize: 12 }}>{(p?.types ?? []).map(typeLabel).join(" / ")}</div>
//               {p?.status?.name && (
//                 <div style={{ marginTop: 6, fontSize: 12, opacity: 0.9 }}>
//                   Statut : <b>{p.status.name}</b>
//                 </div>
//               )}
//             </div>
//             <div style={{ fontSize: 12, opacity: 0.85 }}>{p ? `${p.hp}/${p.stats.hp}` : ""}</div>
//           </div>

//           <div style={{ marginTop: 10, height: 10, borderRadius: 999, background: "rgba(255,255,255,0.10)" }}>
//             <div
//               style={{
//                 width: `${Math.round(pHpRatio * 100)}%`,
//                 height: "100%",
//                 borderRadius: 999,
//                 background: hpColor(pHpRatio),
//                 transition: "width 200ms ease",
//               }}
//             />
//           </div>
//         </div>

//         {/* Enemy sprite (top-right) */}
//         <div style={{ position: "absolute", top: 84, right: 80, width: 160, height: 160 }}>
//           {e?.sprite ? (
//             <img
//               src={e.sprite}
//               alt={e.name}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "contain",
//                 imageRendering: "pixelated",
//                 filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.35))",
//                 transform: "scaleX(-1)",
//               }}
//             />
//           ) : null}
//         </div>

//         {/* Player sprite (bottom-left) */}
//         <div style={{ position: "absolute", bottom: 84, left: 80, width: 190, height: 190 }}>
//           {p?.sprite ? (
//             <img
//               src={p.sprite}
//               alt={p.name}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "contain",
//                 imageRendering: "pixelated",
//                 filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.35))",
//               }}
//             />
//           ) : null}
//         </div>

//         {/* Ground vibes */}
//         <div
//           style={{
//             position: "absolute",
//             bottom: 46,
//             left: 46,
//             width: 260,
//             height: 46,
//             borderRadius: 999,
//             background: "rgba(0,0,0,0.18)",
//             border: "1px solid rgba(255,255,255,0.08)",
//           }}
//         />
//         <div
//           style={{
//             position: "absolute",
//             top: 138,
//             right: 66,
//             width: 220,
//             height: 40,
//             borderRadius: 999,
//             background: "rgba(0,0,0,0.14)",
//             border: "1px solid rgba(255,255,255,0.08)",
//           }}
//         />

//         {/* Log box */}
//         <div
//           style={{
//             position: "absolute",
//             left: 16,
//             bottom: 16,
//             width: "calc(100% - 32px)",
//             maxWidth: 760,
//             padding: 12,
//             borderRadius: 14,
//             background: "rgba(0,0,0,0.35)",
//             border: "1px solid rgba(255,255,255,0.12)",
//           }}
//         >
//           <div style={{ maxHeight: 96, overflow: "auto", fontSize: 13, lineHeight: 1.4 }}>
//             {state.log.slice(-6).map((line, i) => (
//               <div key={i} style={{ opacity: 0.95 }}>
//                 {line}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Controls */}
//       <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 340px", gap: 14 }}>
//         {/* Moves */}
//         <div
//           style={{
//             borderRadius: 16,
//             border: "1px solid rgba(255,255,255,0.12)",
//             background: "rgba(255,255,255,0.06)",
//             padding: 12,
//           }}
//         >
//           <div style={{ fontWeight: 900, marginBottom: 10 }}>Attaques</div>

//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
//             {moveButtons.map((m) => (
//               <button
//                 key={m.id}
//                 onClick={() => doTurnWithMove(m.id)}
//                 disabled={m.disabled}
//                 style={{
//                   textAlign: "left",
//                   padding: 10,
//                   borderRadius: 14,
//                   border: "1px solid rgba(255,255,255,0.16)",
//                   background: m.disabled ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.22)",
//                   color: "white",
//                   cursor: m.disabled ? "not-allowed" : "pointer",
//                 }}
//               >
//                 <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
//                   <div style={{ fontWeight: 900 }}>{m.name}</div>
//                   <div style={{ fontSize: 12, opacity: 0.85 }}>
//                     PP {m.ppCur}/{m.ppMax}
//                   </div>
//                 </div>
//                 <div style={{ marginTop: 4, fontSize: 12, opacity: 0.8 }}>Type: {m.type}</div>
//               </button>
//             ))}
//           </div>

//           {!canAct && state.phase !== "ended" && (
//             <div style={{ marginTop: 10, opacity: 0.8, fontSize: 12 }}>
//               {state.mustSwitchPlayer ? "Ton Pokémon est KO : tu dois changer." : "Patiente…"}
//             </div>
//           )}
//         </div>

//         {/* Switch */}
//         <div
//           style={{
//             borderRadius: 16,
//             border: "1px solid rgba(255,255,255,0.12)",
//             background: "rgba(255,255,255,0.06)",
//             padding: 12,
//           }}
//         >
//           <div style={{ fontWeight: 900, marginBottom: 10 }}>Changer</div>

//           <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//             {state.playerTeam.map((pk, idx) => {
//               const isActive = idx === state.playerActive;
//               const disabled = pk.hp <= 0 || isActive || (!state.waitingPlayer && !state.mustSwitchPlayer);
//               return (
//                 <button
//                   key={pk.key}
//                   onClick={() => doSwitch(idx)}
//                   disabled={disabled}
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 10,
//                     padding: 10,
//                     borderRadius: 14,
//                     border: "1px solid rgba(255,255,255,0.16)",
//                     background: isActive ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.22)",
//                     opacity: disabled ? 0.6 : 1,
//                     color: "white",
//                     cursor: disabled ? "not-allowed" : "pointer",
//                   }}
//                 >
//                   <div style={{ width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center" }}>
//                     {pk.sprite ? (
//                       <img
//                         src={pk.sprite}
//                         alt={pk.name}
//                         style={{ width: 34, height: 34, objectFit: "contain", imageRendering: "pixelated" }}
//                       />
//                     ) : null}
//                   </div>

//                   <div style={{ flex: 1, textAlign: "left" }}>
//                     <div style={{ fontWeight: 900, fontSize: 14 }}>{pk.name}</div>
//                     <div style={{ fontSize: 12, opacity: 0.85 }}>
//                       PV {pk.hp}/{pk.stats.hp} {pk.hp <= 0 ? " (KO)" : ""}
//                     </div>
//                   </div>

//                   {isActive && (
//                     <div style={{ fontSize: 12, opacity: 0.9, fontWeight: 800 }}>
//                       Actif
//                     </div>
//                   )}
//                 </button>
//               );
//             })}
//           </div>

//           {state.phase === "ended" && (
//             <button
//               onClick={endBattleContinue}
//               style={{
//                 width: "100%",
//                 marginTop: 12,
//                 padding: "12px 14px",
//                 borderRadius: 14,
//                 border: "1px solid rgba(255,255,255,0.18)",
//                 background: "rgba(255,255,255,0.16)",
//                 color: "white",
//                 cursor: "pointer",
//                 fontWeight: 900,
//               }}
//             >
//               Continuer
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }








// src/ui/screens/BattleScreen.jsx
// import { useEffect, useMemo, useState } from "react";
// import { createFighter, runTurn } from "../../engine/battle";
// import { MOVES } from "../../data/moves";

// function clamp(n, a, b) {
//   return Math.max(a, Math.min(b, n));
// }

// function moveLabel(id) {
//   return MOVES?.[id]?.name ?? id;
// }

// function typeLabel(t) {
//   return t;
// }

// function hpColor(ratio) {
//   if (ratio <= 0.2) return "rgba(255, 90, 90, 0.95)";
//   if (ratio <= 0.5) return "rgba(255, 210, 90, 0.95)";
//   return "rgba(90, 255, 150, 0.95)";
// }

// function StageRow({ label, value }) {
//   const v = value ?? 0;
//   const sign = v > 0 ? `+${v}` : `${v}`;
//   return (
//     <div style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 12 }}>
//       <div style={{ opacity: 0.85 }}>{label}</div>
//       <div style={{ fontWeight: 800, opacity: 0.95 }}>{sign}</div>
//     </div>
//   );
// }

// function StatsPanel({ open, onClose, player, enemy }) {
//   if (!open) return null;

//   const boxStyle = {
//     width: 360,
//     borderRadius: 14,
//     border: "1px solid rgba(255,255,255,0.14)",
//     background: "rgba(0,0,0,0.55)",
//     padding: 12,
//   };

//   const titleStyle = { fontWeight: 900, fontSize: 14, marginBottom: 8 };

//   const StatBlock = ({ title, p }) => {
//     if (!p) return null;
//     return (
//       <div style={boxStyle}>
//         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
//           <div>
//             <div style={titleStyle}>{title}</div>
//             <div style={{ fontWeight: 900, fontSize: 16 }}>{p.name}</div>
//             <div style={{ opacity: 0.8, fontSize: 12 }}>{(p.types ?? []).map(typeLabel).join(" / ")}</div>
//             {p.status?.name && (
//               <div style={{ marginTop: 6, fontSize: 12, opacity: 0.9 }}>
//                 Statut : <b>{p.status.name}</b>
//               </div>
//             )}
//           </div>
//           {p.sprite ? (
//             <img
//               src={p.sprite}
//               alt={p.name}
//               style={{
//                 width: 72,
//                 height: 72,
//                 objectFit: "contain",
//                 imageRendering: "pixelated",
//                 filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.35))",
//               }}
//             />
//           ) : null}
//         </div>

//         <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
//           <div style={{ padding: 10, borderRadius: 12, background: "rgba(255,255,255,0.06)" }}>
//             <div style={{ fontWeight: 900, marginBottom: 8, fontSize: 12 }}>Stats</div>
//             <div style={{ fontSize: 12, opacity: 0.95 }}>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span>PV</span>
//                 <b>
//                   {p.hp}/{p.stats.hp}
//                 </b>
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span>ATK</span>
//                 <b>{p.stats.atk}</b>
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span>DEF</span>
//                 <b>{p.stats.def}</b>
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span>SPA</span>
//                 <b>{p.stats.spa}</b>
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span>SPD</span>
//                 <b>{p.stats.spd}</b>
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span>SPE</span>
//                 <b>{p.stats.spe}</b>
//               </div>
//             </div>
//           </div>

//           <div style={{ padding: 10, borderRadius: 12, background: "rgba(255,255,255,0.06)" }}>
//             <div style={{ fontWeight: 900, marginBottom: 8, fontSize: 12 }}>Stages</div>
//             <StageRow label="ATK" value={p.stages?.atk} />
//             <StageRow label="DEF" value={p.stages?.def} />
//             <StageRow label="SPA" value={p.stages?.spa} />
//             <StageRow label="SPD" value={p.stages?.spd} />
//             <StageRow label="SPE" value={p.stages?.spe} />
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div
//       onClick={onClose}
//       style={{
//         position: "fixed",
//         inset: 0,
//         background: "rgba(0,0,0,0.55)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: 14,
//         zIndex: 9999,
//       }}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           width: "min(980px, 100%)",
//           borderRadius: 18,
//           border: "1px solid rgba(255,255,255,0.16)",
//           background: "rgba(20,20,28,0.92)",
//           padding: 14,
//         }}
//       >
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
//           <div style={{ fontWeight: 1000, fontSize: 16 }}>Stats du combat</div>
//           <button
//             onClick={onClose}
//             style={{
//               padding: "8px 10px",
//               borderRadius: 12,
//               border: "1px solid rgba(255,255,255,0.18)",
//               background: "rgba(255,255,255,0.10)",
//               color: "white",
//               cursor: "pointer",
//               fontWeight: 900,
//             }}
//           >
//             Fermer (S)
//           </button>
//         </div>

//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//           <StatBlock title="Joueur" p={player} />
//           <StatBlock title="Rival" p={enemy} />
//         </div>

//         <div style={{ marginTop: 10, fontSize: 12, opacity: 0.8 }}>
//           Astuce : appuie sur <b>S</b> pour ouvrir/fermer.
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function BattleScreen({ run, dispatch }) {
//   const initialState = useMemo(() => {
//     const playerTeam = run.playerTeamBase.map(createFighter);

//     const enemyTeamBase = [...run.playerTeamBase]
//       .slice(0, 3)
//       .map((p, i) => ({
//         ...p,
//         key: p.key + "_enemy_" + i,
//         name: "Rival " + p.name,
//       }));

//     const enemyTeam = enemyTeamBase.map(createFighter);

//     return {
//       phase: "battle",
//       winner: null,
//       log: [`Un dresseur apparaît !`],
//       playerTeam,
//       enemyTeam,
//       playerActive: 0,
//       enemyActive: 0,
//       waitingPlayer: true,

//       mustSwitchPlayer: false,
//       switchMode: null, // null | "ko" | "selfSwitch"
//     };
//   }, [run]);

//   const [state, setState] = useState(initialState);
//   const [showStats, setShowStats] = useState(false);

//   const p = state.playerTeam[state.playerActive];
//   const e = state.enemyTeam[state.enemyActive];

//   const pHpRatio = p ? clamp(p.hp / p.stats.hp, 0, 1) : 0;
//   const eHpRatio = e ? clamp(e.hp / e.stats.hp, 0, 1) : 0;

//   // ✅ pas d'attaque si KO forcé ou pendingSwitch (Change Éclair)
//   const canAct =
//     state.waitingPlayer &&
//     state.phase !== "ended" &&
//     p?.hp > 0 &&
//     !state.mustSwitchPlayer &&
//     !state.pendingSwitch;

//   // Toggle stats avec la touche S
//   useEffect(() => {
//     function onKey(e) {
//       if (e.key.toLowerCase() === "s") {
//         setShowStats((v) => !v);
//       }
//     }
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   function appendLog(lines) {
//     setState((prev) => ({
//       ...prev,
//       log: [...prev.log, ...lines],
//     }));
//   }

//   function doTurnWithMove(moveId) {
//     if (!canAct) return;

//     if ((p.pp?.[moveId] ?? 0) <= 0) {
//       appendLog([`${p.name} n'a plus de PP pour ${moveLabel(moveId)} !`]);
//       return;
//     }

//     setState((prev) => ({ ...prev, waitingPlayer: false }));

//     setState((prev) => {
//       const next = structuredClone(prev);
//       const prevActive = prev.playerActive; // actif AVANT le tour

//       runTurn(next, { type: "move", move: moveId });

//       // ✅ Change Éclair : on doit choisir un switch puis l'ennemi terminera le tour
//       if (next.pendingSwitch?.side === "player" && next.pendingSwitch?.reason === "selfSwitch") {
//         next.mustSwitchPlayer = true;
//         next.switchMode = "selfSwitch";
//         next.waitingPlayer = true;
//         return next;
//       }

//       // ✅ Si le Pokémon actif avant est KO et que l'engine a auto-switch, on annule pour laisser choisir
//       const wasKO = next.playerTeam[prevActive]?.hp <= 0;
//       const engineAutoSwitched = next.playerActive !== prevActive;

//       if (wasKO && engineAutoSwitched) {
//         next.playerActive = prevActive; // revenir sur le KO pour l'UI
//         next.mustSwitchPlayer = true;
//         next.switchMode = "ko";
//         next.waitingPlayer = true;
//         next.log = [...next.log, "Ton Pokémon est K.O. — choisis qui envoyer !"];
//         return next;
//       }

//       // normal
//       const cur = next.playerTeam[next.playerActive];
//       if (cur.hp <= 0) {
//         next.mustSwitchPlayer = true;
//         next.switchMode = "ko";
//       }

//       if (next.phase === "ended") {
//         next.waitingPlayer = false;
//         return next;
//       }

//       next.waitingPlayer = true;
//       return next;
//     });
//   }

//   function doSwitch(toIndex) {
//     if (state.phase === "ended") return;
//     if (toIndex === state.playerActive) return;
//     if (state.playerTeam[toIndex].hp <= 0) return;

//     // ✅ KO forcé = GRATUIT (hors-tour)
//     if (state.mustSwitchPlayer && state.switchMode === "ko") {
//       setState((prev) => {
//         const next = structuredClone(prev);
//         next.playerActive = toIndex;
//         next.mustSwitchPlayer = false;
//         next.switchMode = null;
//         next.waitingPlayer = true;
//         next.log = [...next.log, `${next.playerTeam[toIndex].name}, à toi !`];
//         return next;
//       });
//       return;
//     }

//     // ✅ Change Éclair : switch gratuit + clear pendingSwitch + l'ennemi finit le tour (pass)
//     if (state.mustSwitchPlayer && state.switchMode === "selfSwitch") {
//       setState((prev) => {
//         const next = structuredClone(prev);

//         next.playerActive = toIndex;
//         next.mustSwitchPlayer = false;
//         next.switchMode = null;
//         next.pendingSwitch = null; // ✅ CRITIQUE sinon softlock

//         next.waitingPlayer = false;
//         runTurn(next, { type: "pass" }); // nécessite battle.js support "pass"

//         const cur = next.playerTeam[next.playerActive];
//         if (cur.hp <= 0) {
//           next.mustSwitchPlayer = true;
//           next.switchMode = "ko";
//           next.waitingPlayer = true;
//           next.log = [...next.log, "Ton Pokémon est K.O. — choisis qui envoyer !"];
//           return next;
//         }

//         if (next.phase === "ended") {
//           next.waitingPlayer = false;
//           return next;
//         }

//         next.waitingPlayer = true;
//         return next;
//       });
//       return;
//     }

//     // Switch normal = action de tour
//     setState((prev) => {
//       const next = structuredClone(prev);
//       next.playerActive = toIndex;
//       next.mustSwitchPlayer = false;
//       next.switchMode = null;

//       next.waitingPlayer = false;
//       runTurn(next, { type: "switch", to: toIndex });

//       const cur = next.playerTeam[next.playerActive];
//       if (cur.hp <= 0) {
//         next.mustSwitchPlayer = true;
//         next.switchMode = "ko";
//       }

//       if (next.phase === "ended") {
//         next.waitingPlayer = false;
//         return next;
//       }

//       next.waitingPlayer = true;
//       return next;
//     });
//   }

//   function endBattleContinue() {
//     if (state.winner === "player") dispatch({ type: "WIN_BATTLE", run });
//     else dispatch({ type: "LOSE_RUN" });
//   }

//   const moveButtons = (p?.moves ?? []).slice(0, 4).map((id) => {
//     const mv = MOVES[id];
//     const ppCur = p?.pp?.[id] ?? 0;
//     const ppMax = mv?.pp ?? 0;
//     const disabled = !canAct || ppCur <= 0;

//     return {
//       id,
//       name: moveLabel(id),
//       type: mv?.type ?? "??",
//       ppCur,
//       ppMax,
//       disabled,
//     };
//   });

//   return (
//     <div style={{ padding: 18, fontFamily: "system-ui, sans-serif", color: "white" }}>
//       <StatsPanel open={showStats} onClose={() => setShowStats(false)} player={p} enemy={e} />

//       {/* Top HUD */}
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
//         <div style={{ fontWeight: 900, fontSize: 22 }}>Combat</div>

//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           <button
//             onClick={() => setShowStats((v) => !v)}
//             style={{
//               padding: "8px 10px",
//               borderRadius: 12,
//               border: "1px solid rgba(255,255,255,0.18)",
//               background: "rgba(255,255,255,0.10)",
//               color: "white",
//               cursor: "pointer",
//               fontWeight: 900,
//             }}
//           >
//             Stats (S)
//           </button>

//           <div style={{ opacity: 0.8 }}>
//             {state.phase === "ended"
//               ? state.winner === "player"
//                 ? "Victoire !"
//                 : "Défaite…"
//               : state.mustSwitchPlayer
//               ? state.switchMode === "selfSwitch"
//                 ? "Change Éclair : choisis un Pokémon !"
//                 : "Choisis un Pokémon (KO) !"
//               : state.waitingPlayer
//               ? "À toi !"
//               : "Tour ennemi…"}
//           </div>
//         </div>
//       </div>

//       {/* Arena */}
//       <div
//         style={{
//           marginTop: 14,
//           borderRadius: 16,
//           border: "1px solid rgba(255,255,255,0.12)",
//           background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.15))",
//           padding: 16,
//           minHeight: 360,
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         {/* Enemy info (top-left) */}
//         <div
//           style={{
//             position: "absolute",
//             top: 16,
//             left: 16,
//             width: 320,
//             padding: 12,
//             borderRadius: 14,
//             background: "rgba(0,0,0,0.25)",
//             border: "1px solid rgba(255,255,255,0.12)",
//           }}
//         >
//           <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
//             <div>
//               <div style={{ fontWeight: 900, fontSize: 16 }}>{e?.name ?? "—"}</div>
//               <div style={{ opacity: 0.8, fontSize: 12 }}>{(e?.types ?? []).map(typeLabel).join(" / ")}</div>
//               {e?.status?.name && (
//                 <div style={{ marginTop: 6, fontSize: 12, opacity: 0.9 }}>
//                   Statut : <b>{e.status.name}</b>
//                 </div>
//               )}
//             </div>
//             <div style={{ fontSize: 12, opacity: 0.85 }}>{e ? `${e.hp}/${e.stats.hp}` : ""}</div>
//           </div>

//           <div style={{ marginTop: 10, height: 10, borderRadius: 999, background: "rgba(255,255,255,0.10)" }}>
//             <div
//               style={{
//                 width: `${Math.round(eHpRatio * 100)}%`,
//                 height: "100%",
//                 borderRadius: 999,
//                 background: hpColor(eHpRatio),
//                 transition: "width 200ms ease",
//               }}
//             />
//           </div>
//         </div>

//         {/* Player info (bottom-right) */}
//         <div
//           style={{
//             position: "absolute",
//             bottom: 16,
//             right: 16,
//             width: 340,
//             padding: 12,
//             borderRadius: 14,
//             background: "rgba(0,0,0,0.25)",
//             border: "1px solid rgba(255,255,255,0.12)",
//           }}
//         >
//           <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
//             <div>
//               <div style={{ fontWeight: 900, fontSize: 16 }}>{p?.name ?? "—"}</div>
//               <div style={{ opacity: 0.8, fontSize: 12 }}>{(p?.types ?? []).map(typeLabel).join(" / ")}</div>
//               {p?.status?.name && (
//                 <div style={{ marginTop: 6, fontSize: 12, opacity: 0.9 }}>
//                   Statut : <b>{p.status.name}</b>
//                 </div>
//               )}
//             </div>
//             <div style={{ fontSize: 12, opacity: 0.85 }}>{p ? `${p.hp}/${p.stats.hp}` : ""}</div>
//           </div>

//           <div style={{ marginTop: 10, height: 10, borderRadius: 999, background: "rgba(255,255,255,0.10)" }}>
//             <div
//               style={{
//                 width: `${Math.round(pHpRatio * 100)}%`,
//                 height: "100%",
//                 borderRadius: 999,
//                 background: hpColor(pHpRatio),
//                 transition: "width 200ms ease",
//               }}
//             />
//           </div>
//         </div>

//         {/* Enemy sprite (top-right) */}
//         <div style={{ position: "absolute", top: 84, right: 80, width: 160, height: 160 }}>
//           {e?.sprite ? (
//             <img
//               src={e.sprite}
//               alt={e.name}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "contain",
//                 imageRendering: "pixelated",
//                 filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.35))",
//                 transform: "scaleX(-1)",
//               }}
//             />
//           ) : null}
//         </div>

//         {/* Player sprite (bottom-left) */}
//         <div style={{ position: "absolute", bottom: 84, left: 80, width: 190, height: 190 }}>
//           {p?.sprite ? (
//             <img
//               src={p.sprite}
//               alt={p.name}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "contain",
//                 imageRendering: "pixelated",
//                 filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.35))",
//               }}
//             />
//           ) : null}
//         </div>

//         {/* Ground vibes */}
//         <div
//           style={{
//             position: "absolute",
//             bottom: 46,
//             left: 46,
//             width: 260,
//             height: 46,
//             borderRadius: 999,
//             background: "rgba(0,0,0,0.18)",
//             border: "1px solid rgba(255,255,255,0.08)",
//           }}
//         />
//         <div
//           style={{
//             position: "absolute",
//             top: 138,
//             right: 66,
//             width: 220,
//             height: 40,
//             borderRadius: 999,
//             background: "rgba(0,0,0,0.14)",
//             border: "1px solid rgba(255,255,255,0.08)",
//           }}
//         />

//         {/* Log box */}
//         <div
//           style={{
//             position: "absolute",
//             left: 16,
//             bottom: 16,
//             width: "calc(100% - 32px)",
//             maxWidth: 760,
//             padding: 12,
//             borderRadius: 14,
//             background: "rgba(0,0,0,0.35)",
//             border: "1px solid rgba(255,255,255,0.12)",
//           }}
//         >
//           <div style={{ maxHeight: 96, overflow: "auto", fontSize: 13, lineHeight: 1.4 }}>
//             {state.log.slice(-6).map((line, i) => (
//               <div key={i} style={{ opacity: 0.95 }}>
//                 {line}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Controls */}
//       <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 340px", gap: 14 }}>
//         {/* Moves */}
//         <div
//           style={{
//             borderRadius: 16,
//             border: "1px solid rgba(255,255,255,0.12)",
//             background: "rgba(255,255,255,0.06)",
//             padding: 12,
//           }}
//         >
//           <div style={{ fontWeight: 900, marginBottom: 10 }}>Attaques</div>

//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
//             {moveButtons.map((m) => (
//               <button
//                 key={m.id}
//                 onClick={() => doTurnWithMove(m.id)}
//                 disabled={m.disabled}
//                 style={{
//                   textAlign: "left",
//                   padding: 10,
//                   borderRadius: 14,
//                   border: "1px solid rgba(255,255,255,0.16)",
//                   background: m.disabled ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.22)",
//                   color: "white",
//                   cursor: m.disabled ? "not-allowed" : "pointer",
//                 }}
//               >
//                 <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
//                   <div style={{ fontWeight: 900 }}>{m.name}</div>
//                   <div style={{ fontSize: 12, opacity: 0.85 }}>
//                     PP {m.ppCur}/{m.ppMax}
//                   </div>
//                 </div>
//                 <div style={{ marginTop: 4, fontSize: 12, opacity: 0.8 }}>Type: {m.type}</div>
//               </button>
//             ))}
//           </div>

//           {!canAct && state.phase !== "ended" && (
//             <div style={{ marginTop: 10, opacity: 0.8, fontSize: 12 }}>
//               {state.mustSwitchPlayer
//                 ? state.switchMode === "selfSwitch"
//                   ? "Change Éclair : tu dois changer."
//                   : "Ton Pokémon est KO : tu dois changer."
//                 : "Patiente…"}
//             </div>
//           )}
//         </div>

//         {/* Switch */}
//         <div
//           style={{
//             borderRadius: 16,
//             border: "1px solid rgba(255,255,255,0.12)",
//             background: "rgba(255,255,255,0.06)",
//             padding: 12,
//           }}
//         >
//           <div style={{ fontWeight: 900, marginBottom: 10 }}>Changer</div>

//           <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//             {state.playerTeam.map((pk, idx) => {
//               const isActive = idx === state.playerActive;
//               const disabled = pk.hp <= 0 || isActive || (!state.waitingPlayer && !state.mustSwitchPlayer);

//               return (
//                 <button
//                   key={pk.key}
//                   onClick={() => doSwitch(idx)}
//                   disabled={disabled}
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 10,
//                     padding: 10,
//                     borderRadius: 14,
//                     border: "1px solid rgba(255,255,255,0.16)",
//                     background: isActive ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.22)",
//                     opacity: disabled ? 0.6 : 1,
//                     color: "white",
//                     cursor: disabled ? "not-allowed" : "pointer",
//                   }}
//                 >
//                   <div style={{ width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center" }}>
//                     {pk.sprite ? (
//                       <img
//                         src={pk.sprite}
//                         alt={pk.name}
//                         style={{ width: 34, height: 34, objectFit: "contain", imageRendering: "pixelated" }}
//                       />
//                     ) : null}
//                   </div>

//                   <div style={{ flex: 1, textAlign: "left" }}>
//                     <div style={{ fontWeight: 900, fontSize: 14 }}>{pk.name}</div>
//                     <div style={{ fontSize: 12, opacity: 0.85 }}>
//                       PV {pk.hp}/{pk.stats.hp} {pk.hp <= 0 ? " (KO)" : ""}
//                     </div>
//                   </div>

//                   {isActive && (
//                     <div style={{ fontSize: 12, opacity: 0.9, fontWeight: 800 }}>
//                       Actif
//                     </div>
//                   )}
//                 </button>
//               );
//             })}
//           </div>

//           {state.phase === "ended" && (
//             <button
//               onClick={endBattleContinue}
//               style={{
//                 width: "100%",
//                 marginTop: 12,
//                 padding: "12px 14px",
//                 borderRadius: 14,
//                 border: "1px solid rgba(255,255,255,0.18)",
//                 background: "rgba(255,255,255,0.16)",
//                 color: "white",
//                 cursor: "pointer",
//                 fontWeight: 900,
//               }}
//             >
//               Continuer
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }





// src/ui/screens/BattleScreen.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { createFighter, runTurn } from "../../engine/battle";
import { MOVES } from "../../data/moves";

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function moveLabel(id) {
  return MOVES?.[id]?.name ?? id;
}

function typeLabel(t) {
  return t;
}

function hpColor(ratio) {
  if (ratio <= 0.2) return "rgba(255, 90, 90, 0.95)";
  if (ratio <= 0.5) return "rgba(255, 210, 90, 0.95)";
  return "rgba(90, 255, 150, 0.95)";
}

function StageRow({ label, value }) {
  const v = value ?? 0;
  const sign = v > 0 ? `+${v}` : `${v}`;
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 12 }}>
      <div style={{ opacity: 0.85 }}>{label}</div>
      <div style={{ fontWeight: 800, opacity: 0.95 }}>{sign}</div>
    </div>
  );
}

function StatsPanel({ open, onClose, player, enemy }) {
  if (!open) return null;

  const boxStyle = {
    width: 360,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(0,0,0,0.55)",
    padding: 12,
  };

  const titleStyle = { fontWeight: 900, fontSize: 14, marginBottom: 8 };

  const StatBlock = ({ title, p }) => {
    if (!p) return null;
    return (
      <div style={boxStyle}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <div>
            <div style={titleStyle}>{title}</div>
            <div style={{ fontWeight: 900, fontSize: 16 }}>{p.name}</div>
            <div style={{ opacity: 0.8, fontSize: 12 }}>{(p.types ?? []).map(typeLabel).join(" / ")}</div>
            {p.status?.name && (
              <div style={{ marginTop: 6, fontSize: 12, opacity: 0.9 }}>
                Statut : <b>{p.status.name}</b>
              </div>
            )}
          </div>
          {p.sprite ? (
            <img
              src={p.sprite}
              alt={p.name}
              style={{
                width: 72,
                height: 72,
                objectFit: "contain",
                imageRendering: "pixelated",
                filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.35))",
              }}
            />
          ) : null}
        </div>

        <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div style={{ padding: 10, borderRadius: 12, background: "rgba(255,255,255,0.06)" }}>
            <div style={{ fontWeight: 900, marginBottom: 8, fontSize: 12 }}>Stats</div>
            <div style={{ fontSize: 12, opacity: 0.95 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>PV</span>
                <b>
                  {p.hp}/{p.stats.hp}
                </b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>ATK</span>
                <b>{p.stats.atk}</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>DEF</span>
                <b>{p.stats.def}</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>SPA</span>
                <b>{p.stats.spa}</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>SPD</span>
                <b>{p.stats.spd}</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>SPE</span>
                <b>{p.stats.spe}</b>
              </div>
            </div>
          </div>

          <div style={{ padding: 10, borderRadius: 12, background: "rgba(255,255,255,0.06)" }}>
            <div style={{ fontWeight: 900, marginBottom: 8, fontSize: 12 }}>Stages</div>
            <StageRow label="ATK" value={p.stages?.atk} />
            <StageRow label="DEF" value={p.stages?.def} />
            <StageRow label="SPA" value={p.stages?.spa} />
            <StageRow label="SPD" value={p.stages?.spd} />
            <StageRow label="SPE" value={p.stages?.spe} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 14,
        zIndex: 9999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(980px, 100%)",
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,0.16)",
          background: "rgba(20,20,28,0.92)",
          padding: 14,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontWeight: 1000, fontSize: 16 }}>Stats du combat</div>
          <button
            onClick={onClose}
            style={{
              padding: "8px 10px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.10)",
              color: "white",
              cursor: "pointer",
              fontWeight: 900,
            }}
          >
            Fermer (S)
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <StatBlock title="Joueur" p={player} />
          <StatBlock title="Rival" p={enemy} />
        </div>

        <div style={{ marginTop: 10, fontSize: 12, opacity: 0.8 }}>
          Astuce : appuie sur <b>S</b> pour ouvrir/fermer.
        </div>
      </div>
    </div>
  );
}

/* -----------------------------
   Step-by-step animation helpers
------------------------------ */

function isEnemyName(name) {
  return typeof name === "string" && name.startsWith("Rival ");
}

function findIndexByName(team, name) {
  if (!name) return -1;
  return (team ?? []).findIndex((p) => p.name === name);
}

function cloneLiteState(base) {
  // structuredClone OK mais ici on garde simple
  return structuredClone(base);
}

function parseIntSafe(x) {
  const n = Number.parseInt(x, 10);
  return Number.isFinite(n) ? n : 0;
}

function applyLinePatch(draft, line, ctx) {
  // ctx = { pActive, eActive } (indices qu’on fait vivre pendant l’anim)
  const playerTeam = draft.playerTeam;
  const enemyTeam = draft.enemyTeam;

  const pAct = ctx.pActive;
  const eAct = ctx.eActive;

  // 1) Switch lines
  // "Tu envoie X !"
  {
    const m = line.match(/^Tu envoie (.+) !$/);
    if (m) {
      const name = m[1];
      const idx = findIndexByName(playerTeam, name);
      if (idx !== -1) {
        draft.playerActive = idx;
        ctx.pActive = idx;
      }
      return;
    }
  }

  // "L'ennemi envoie X !"
  {
    const m = line.match(/^L'ennemi envoie (.+) !$/);
    if (m) {
      const name = m[1];
      const idx = findIndexByName(enemyTeam, name);
      if (idx !== -1) {
        draft.enemyActive = idx;
        ctx.eActive = idx;
      }
      return;
    }
  }

  // "L'ennemi change de Pokémon ! (Rival X)"
  {
    const m = line.match(/^L'ennemi change de Pokémon ! \((.+)\)$/);
    if (m) {
      const name = m[1];
      const idx = findIndexByName(enemyTeam, name);
      if (idx !== -1) {
        draft.enemyActive = idx;
        ctx.eActive = idx;
      }
      return;
    }
  }

  // "X, à toi !" (après switch gratuit KO, côté joueur)
  {
    const m = line.match(/^(.+), à toi !$/);
    if (m) {
      const name = m[1];
      const idx = findIndexByName(playerTeam, name);
      if (idx !== -1) {
        draft.playerActive = idx;
        ctx.pActive = idx;
      }
      return;
    }
  }

  // 2) Damage line: "A utilise Move ! (-12)"
  {
    const m = line.match(/^(.+?) utilise .+! \(-(\d+)\)$/);
    if (m) {
      const attackerName = m[1];
      const dmg = parseIntSafe(m[2]);

      const attackerIsEnemy = isEnemyName(attackerName);

      if (attackerIsEnemy) {
        // enemy hits player active
        const def = playerTeam[pAct];
        if (def) def.hp = Math.max(0, (def.hp ?? 0) - dmg);
      } else {
        // player hits enemy active
        const def = enemyTeam[eAct];
        if (def) def.hp = Math.max(0, (def.hp ?? 0) - dmg);
      }
      return;
    }
  }

  // 3) Heal line: "A récupère 12 PV." or "A récupère 12 PV avec ..."
  {
    const m = line.match(/^(.+?) récupère (\d+) PV(?: .*)?\.$/);
    if (m) {
      const who = m[1];
      const amt = parseIntSafe(m[2]);
      const whoIsEnemy = isEnemyName(who);

      if (whoIsEnemy) {
        const mon = enemyTeam[eAct];
        if (mon) mon.hp = Math.min(mon.stats.hp, (mon.hp ?? 0) + amt);
      } else {
        const mon = playerTeam[pAct];
        if (mon) mon.hp = Math.min(mon.stats.hp, (mon.hp ?? 0) + amt);
      }
      return;
    }
  }

  // 4) KO line: "X est K.O. !"
  {
    const m = line.match(/^(.+?) est K\.O\. !$/);
    if (m) {
      const who = m[1];
      const whoIsEnemy = isEnemyName(who);

      if (whoIsEnemy) {
        const mon = enemyTeam[eAct];
        if (mon) mon.hp = 0;
      } else {
        const mon = playerTeam[pAct];
        if (mon) mon.hp = 0;
      }
      return;
    }
  }

  // 5) End-turn status sometimes includes "(-X)" but not using "utilise".
  // Example possible: "X souffre... (-3)"
  {
    const m = line.match(/^(.+?) .*\(-(\d+)\)$/);
    if (m) {
      const who = m[1];
      const dmg = parseIntSafe(m[2]);
      const whoIsEnemy = isEnemyName(who);

      if (whoIsEnemy) {
        const mon = enemyTeam[eAct];
        if (mon) mon.hp = Math.max(0, (mon.hp ?? 0) - dmg);
      } else {
        const mon = playerTeam[pAct];
        if (mon) mon.hp = Math.max(0, (mon.hp ?? 0) - dmg);
      }
      return;
    }
  }
}

function buildAnimatedSteps(prevState, finalState) {
  const prevLogLen = prevState.log.length;
  const newLines = finalState.log.slice(prevLogLen);

  // base = on part du prevState, mais on va faire vivre HP/actives progressivement
  const base = cloneLiteState(prevState);

  const ctx = {
    pActive: base.playerActive,
    eActive: base.enemyActive,
  };

  const steps = [];
  for (const line of newLines) {
    const s = cloneLiteState(base);

    // append ONE line
    s.log = [...s.log, line];

    // apply patch on hp/actives for this line
    applyLinePatch(s, line, ctx);

    // keep base updated for next line
    base.playerTeam = s.playerTeam;
    base.enemyTeam = s.enemyTeam;
    base.playerActive = s.playerActive;
    base.enemyActive = s.enemyActive;
    base.log = s.log;

    steps.push(s);
  }

  // last step should match engine flags (pendingSwitch/mustSwitch/winner/etc)
  // => we merge the final flags into the last visible snapshot to avoid mismatch.
  if (steps.length > 0) {
    const last = steps[steps.length - 1];
    // keep gradual hp/log/actives, but copy important flags from final
    last.phase = finalState.phase;
    last.winner = finalState.winner;
    last.waitingPlayer = finalState.waitingPlayer;
    last.mustSwitchPlayer = finalState.mustSwitchPlayer;
    last.switchMode = finalState.switchMode;
    last.pendingSwitch = finalState.pendingSwitch ?? null;
  }

  return steps;
}

export default function BattleScreen({ run, dispatch }) {
  const initialState = useMemo(() => {
    const playerTeam = run.playerTeamBase.map(createFighter);

    const enemyTeamBase = [...run.playerTeamBase]
      .slice(0, 3)
      .map((p, i) => ({
        ...p,
        key: p.key + "_enemy_" + i,
        name: "Rival " + p.name,
      }));

    const enemyTeam = enemyTeamBase.map(createFighter);

    return {
      phase: "battle",
      winner: null,
      log: [`Un dresseur apparaît !`],
      playerTeam,
      enemyTeam,
      playerActive: 0,
      enemyActive: 0,
      waitingPlayer: true,

      mustSwitchPlayer: false,
      switchMode: null, // null | "ko" | "selfSwitch"
      pendingSwitch: null, // engine
    };
  }, [run]);

  const [state, setState] = useState(initialState);
  const [showStats, setShowStats] = useState(false);

  // animation queue
  const [animQueue, setAnimQueue] = useState([]);
  const [animating, setAnimating] = useState(false);
  const animTimerRef = useRef(null);

  const p = state.playerTeam[state.playerActive];
  const e = state.enemyTeam[state.enemyActive];

  const pHpRatio = p ? clamp(p.hp / p.stats.hp, 0, 1) : 0;
  const eHpRatio = e ? clamp(e.hp / e.stats.hp, 0, 1) : 0;

  // ✅ pas d'attaque si KO forcé ou pendingSwitch (Change Éclair) ou anim
  const canAct =
    !animating &&
    state.waitingPlayer &&
    state.phase !== "ended" &&
    p?.hp > 0 &&
    !state.mustSwitchPlayer &&
    !state.pendingSwitch;

  // Toggle stats avec la touche S
  useEffect(() => {
    function onKey(e) {
      if (e.key.toLowerCase() === "s") setShowStats((v) => !v);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Play animation queue (1 line every X ms)
  useEffect(() => {
    if (!animQueue.length) return;

    setAnimating(true);

    let i = 0;
    const stepMs = 600;

    const tick = () => {
      const next = animQueue[i];
      if (!next) {
        setAnimQueue([]);
        setAnimating(false);
        return;
      }
      setState(next);
      i += 1;
      animTimerRef.current = setTimeout(tick, stepMs);
    };

    animTimerRef.current = setTimeout(tick, 50);

    return () => {
      if (animTimerRef.current) clearTimeout(animTimerRef.current);
    };
  }, [animQueue]);

  function appendLog(lines) {
    setState((prev) => ({
      ...prev,
      log: [...prev.log, ...lines],
    }));
  }

  function startAnimatedTransition(prev, final) {
    const steps = buildAnimatedSteps(prev, final);
    if (!steps.length) {
      setState(final);
      return;
    }
    setAnimQueue(steps);
  }

  function doTurnWithMove(moveId) {
    if (!canAct) return;

    if ((p.pp?.[moveId] ?? 0) <= 0) {
      appendLog([`${p.name} n'a plus de PP pour ${moveLabel(moveId)} !`]);
      return;
    }

    // lock input now
    setState((prev) => ({ ...prev, waitingPlayer: false }));

    setState((prev) => {
      const next = structuredClone(prev);
      const prevActive = prev.playerActive; // actif AVANT le tour

      runTurn(next, { type: "move", move: moveId });

      // ✅ Change Éclair : on doit choisir un switch puis l'ennemi terminera le tour
      if (next.pendingSwitch?.side === "player" && next.pendingSwitch?.reason === "selfSwitch") {
        next.mustSwitchPlayer = true;
        next.switchMode = "selfSwitch";
        next.waitingPlayer = true;

        // animation from prev -> next
        startAnimatedTransition(prev, next);
        return prev; // display stays prev while anim plays
      }

      // ✅ Si le Pokémon actif avant est KO et que l'engine a auto-switch, on annule pour laisser choisir
      const wasKO = next.playerTeam[prevActive]?.hp <= 0;
      const engineAutoSwitched = next.playerActive !== prevActive;

      if (wasKO && engineAutoSwitched) {
        next.playerActive = prevActive; // revenir sur le KO pour l'UI
        next.mustSwitchPlayer = true;
        next.switchMode = "ko";
        next.waitingPlayer = true;
        next.log = [...next.log, "Ton Pokémon est K.O. — choisis qui envoyer !"];

        startAnimatedTransition(prev, next);
        return prev;
      }

      // normal
      const cur = next.playerTeam[next.playerActive];
      if (cur.hp <= 0) {
        next.mustSwitchPlayer = true;
        next.switchMode = "ko";
      }

      if (next.phase === "ended") {
        next.waitingPlayer = false;
      } else {
        next.waitingPlayer = true;
      }

      startAnimatedTransition(prev, next);
      return prev;
    });
  }

  function doSwitch(toIndex) {
    if (animating) return;
    if (state.phase === "ended") return;
    if (toIndex === state.playerActive) return;
    if (state.playerTeam[toIndex].hp <= 0) return;

    // ✅ KO forcé = GRATUIT (hors-tour)
    if (state.mustSwitchPlayer && state.switchMode === "ko") {
      setState((prev) => {
        const next = structuredClone(prev);
        next.playerActive = toIndex;
        next.mustSwitchPlayer = false;
        next.switchMode = null;
        next.waitingPlayer = true;
        next.log = [...next.log, `${next.playerTeam[toIndex].name}, à toi !`];

        // instant (pas besoin d’anim ici, c’est juste un "send out")
        return next;
      });
      return;
    }

    // ✅ Change Éclair : switch gratuit + clear pendingSwitch + l'ennemi finit le tour (pass)
    if (state.mustSwitchPlayer && state.switchMode === "selfSwitch") {
      setState((prev) => {
        const next = structuredClone(prev);

        next.playerActive = toIndex;
        next.mustSwitchPlayer = false;
        next.switchMode = null;
        next.pendingSwitch = null; // ✅ CRITIQUE sinon softlock

        next.waitingPlayer = false;
        runTurn(next, { type: "pass" }); // battle.js doit supporter "pass"

        const cur = next.playerTeam[next.playerActive];
        if (cur.hp <= 0) {
          next.mustSwitchPlayer = true;
          next.switchMode = "ko";
          next.waitingPlayer = true;
          next.log = [...next.log, "Ton Pokémon est K.O. — choisis qui envoyer !"];
        } else if (next.phase === "ended") {
          next.waitingPlayer = false;
        } else {
          next.waitingPlayer = true;
        }

        startAnimatedTransition(prev, next);
        return prev;
      });
      return;
    }

    // Switch normal = action de tour (l'ennemi joue aussi)
    setState((prev) => {
      const next = structuredClone(prev);
      next.playerActive = toIndex;
      next.mustSwitchPlayer = false;
      next.switchMode = null;

      next.waitingPlayer = false;
      runTurn(next, { type: "switch", to: toIndex });

      const cur = next.playerTeam[next.playerActive];
      if (cur.hp <= 0) {
        next.mustSwitchPlayer = true;
        next.switchMode = "ko";
      }

      if (next.phase === "ended") {
        next.waitingPlayer = false;
      } else {
        next.waitingPlayer = true;
      }

      startAnimatedTransition(prev, next);
      return prev;
    });
  }

  function endBattleContinue() {
    if (state.winner === "player") dispatch({ type: "WIN_BATTLE", run });
    else dispatch({ type: "LOSE_RUN" });
  }

  const moveButtons = (p?.moves ?? []).slice(0, 4).map((id) => {
    const mv = MOVES[id];
    const ppCur = p?.pp?.[id] ?? 0;
    const ppMax = mv?.pp ?? 0;
    const disabled = !canAct || ppCur <= 0;

    return {
      id,
      name: moveLabel(id),
      type: mv?.type ?? "??",
      ppCur,
      ppMax,
      disabled,
    };
  });

  return (
    <div style={{ padding: 18, fontFamily: "system-ui, sans-serif", color: "white" }}>
      <StatsPanel open={showStats} onClose={() => setShowStats(false)} player={p} enemy={e} />

      {/* Top HUD */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ fontWeight: 900, fontSize: 22 }}>Combat</div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => setShowStats((v) => !v)}
            style={{
              padding: "8px 10px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.10)",
              color: "white",
              cursor: "pointer",
              fontWeight: 900,
            }}
          >
            Stats (S)
          </button>

          <div style={{ opacity: 0.8 }}>
            {state.phase === "ended"
              ? state.winner === "player"
                ? "Victoire !"
                : "Défaite…"
              : animating
              ? "Combat…"
              : state.mustSwitchPlayer
              ? state.switchMode === "selfSwitch"
                ? "Change Éclair : choisis un Pokémon !"
                : "Choisis un Pokémon (KO) !"
              : state.waitingPlayer
              ? "À toi !"
              : "Tour ennemi…"}
          </div>
        </div>
      </div>

      {/* Arena */}
      <div
        style={{
          marginTop: 14,
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.15))",
          padding: 16,
          minHeight: 360,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Enemy info (top-left) */}
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            width: 320,
            padding: 12,
            borderRadius: 14,
            background: "rgba(0,0,0,0.25)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ fontWeight: 900, fontSize: 16 }}>{e?.name ?? "—"}</div>
              <div style={{ opacity: 0.8, fontSize: 12 }}>{(e?.types ?? []).map(typeLabel).join(" / ")}</div>
              {e?.status?.name && (
                <div style={{ marginTop: 6, fontSize: 12, opacity: 0.9 }}>
                  Statut : <b>{e.status.name}</b>
                </div>
              )}
            </div>
            <div style={{ fontSize: 12, opacity: 0.85 }}>{e ? `${e.hp}/${e.stats.hp}` : ""}</div>
          </div>

          <div style={{ marginTop: 10, height: 10, borderRadius: 999, background: "rgba(255,255,255,0.10)" }}>
            <div
              style={{
                width: `${Math.round(eHpRatio * 100)}%`,
                height: "100%",
                borderRadius: 999,
                background: hpColor(eHpRatio),
                transition: "width 350ms ease",
              }}
            />
          </div>
        </div>

        {/* Player info (bottom-right) */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            width: 340,
            padding: 12,
            borderRadius: 14,
            background: "rgba(0,0,0,0.25)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ fontWeight: 900, fontSize: 16 }}>{p?.name ?? "—"}</div>
              <div style={{ opacity: 0.8, fontSize: 12 }}>{(p?.types ?? []).map(typeLabel).join(" / ")}</div>
              {p?.status?.name && (
                <div style={{ marginTop: 6, fontSize: 12, opacity: 0.9 }}>
                  Statut : <b>{p.status.name}</b>
                </div>
              )}
            </div>
            <div style={{ fontSize: 12, opacity: 0.85 }}>{p ? `${p.hp}/${p.stats.hp}` : ""}</div>
          </div>

          <div style={{ marginTop: 10, height: 10, borderRadius: 999, background: "rgba(255,255,255,0.10)" }}>
            <div
              style={{
                width: `${Math.round(pHpRatio * 100)}%`,
                height: "100%",
                borderRadius: 999,
                background: hpColor(pHpRatio),
                transition: "width 350ms ease",
              }}
            />
          </div>
        </div>

        {/* Enemy sprite (top-right) */}
        <div style={{ position: "absolute", top: 84, right: 80, width: 160, height: 160 }}>
          {e?.sprite ? (
            <img
              src={e.sprite}
              alt={e.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                imageRendering: "pixelated",
                filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.35))",
                transform: "scaleX(-1)",
              }}
            />
          ) : null}
        </div>

        {/* Player sprite (bottom-left) */}
        <div style={{ position: "absolute", bottom: 84, left: 80, width: 190, height: 190 }}>
          {p?.sprite ? (
            <img
              src={p.sprite}
              alt={p.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                imageRendering: "pixelated",
                filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.35))",
              }}
            />
          ) : null}
        </div>

        {/* Ground vibes */}
        <div
          style={{
            position: "absolute",
            bottom: 46,
            left: 46,
            width: 260,
            height: 46,
            borderRadius: 999,
            background: "rgba(0,0,0,0.18)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 138,
            right: 66,
            width: 220,
            height: 40,
            borderRadius: 999,
            background: "rgba(0,0,0,0.14)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        />

        {/* Log box */}
        <div
          style={{
            position: "absolute",
            left: 16,
            bottom: 16,
            width: "calc(100% - 32px)",
            maxWidth: 760,
            padding: 12,
            borderRadius: 14,
            background: "rgba(0,0,0,0.35)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div style={{ maxHeight: 96, overflow: "auto", fontSize: 13, lineHeight: 1.4 }}>
            {state.log.slice(-6).map((line, i) => (
              <div key={i} style={{ opacity: 0.95 }}>
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 340px", gap: 14 }}>
        {/* Moves */}
        <div
          style={{
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.06)",
            padding: 12,
          }}
        >
          <div style={{ fontWeight: 900, marginBottom: 10 }}>Attaques</div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {moveButtons.map((m) => (
              <button
                key={m.id}
                onClick={() => doTurnWithMove(m.id)}
                disabled={m.disabled}
                style={{
                  textAlign: "left",
                  padding: 10,
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.16)",
                  background: m.disabled ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.22)",
                  color: "white",
                  cursor: m.disabled ? "not-allowed" : "pointer",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <div style={{ fontWeight: 900 }}>{m.name}</div>
                  <div style={{ fontSize: 12, opacity: 0.85 }}>
                    PP {m.ppCur}/{m.ppMax}
                  </div>
                </div>
                <div style={{ marginTop: 4, fontSize: 12, opacity: 0.8 }}>Type: {m.type}</div>
              </button>
            ))}
          </div>

          {(!canAct || animating) && state.phase !== "ended" && (
            <div style={{ marginTop: 10, opacity: 0.8, fontSize: 12 }}>
              {animating
                ? "…"
                : state.mustSwitchPlayer
                ? state.switchMode === "selfSwitch"
                  ? "Change Éclair : tu dois changer."
                  : "Ton Pokémon est KO : tu dois changer."
                : "Patiente…"}
            </div>
          )}
        </div>

        {/* Switch */}
        <div
          style={{
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.06)",
            padding: 12,
          }}
        >
          <div style={{ fontWeight: 900, marginBottom: 10 }}>Changer</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {state.playerTeam.map((pk, idx) => {
              const isActive = idx === state.playerActive;
              const disabled =
                animating ||
                pk.hp <= 0 ||
                isActive ||
                (!state.waitingPlayer && !state.mustSwitchPlayer);

              return (
                <button
                  key={pk.key}
                  onClick={() => doSwitch(idx)}
                  disabled={disabled}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: 10,
                    borderRadius: 14,
                    border: "1px solid rgba(255,255,255,0.16)",
                    background: isActive ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.22)",
                    opacity: disabled ? 0.6 : 1,
                    color: "white",
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                >
                  <div style={{ width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {pk.sprite ? (
                      <img
                        src={pk.sprite}
                        alt={pk.name}
                        style={{ width: 34, height: 34, objectFit: "contain", imageRendering: "pixelated" }}
                      />
                    ) : null}
                  </div>

                  <div style={{ flex: 1, textAlign: "left" }}>
                    <div style={{ fontWeight: 900, fontSize: 14 }}>{pk.name}</div>
                    <div style={{ fontSize: 12, opacity: 0.85 }}>
                      PV {pk.hp}/{pk.stats.hp} {pk.hp <= 0 ? " (KO)" : ""}
                    </div>
                  </div>

                  {isActive && (
                    <div style={{ fontSize: 12, opacity: 0.9, fontWeight: 800 }}>
                      Actif
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {state.phase === "ended" && (
            <button
              onClick={endBattleContinue}
              style={{
                width: "100%",
                marginTop: 12,
                padding: "12px 14px",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.16)",
                color: "white",
                cursor: "pointer",
                fontWeight: 900,
              }}
            >
              Continuer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
