// import { useMemo, useState } from "react";
// import { POKEMON_POOL } from "../../data/PokemonPool";

// function uniq(arr) {
//   return [...new Set(arr)];
// }

// function makeMovePool(poke) {
//   const a = poke.sets[0].moves;
//   const b = poke.sets[1].moves;
//   return uniq([...a, ...b]);
// }

// export default function TeamSelect({ onStart }) {
//   const [selectedKeys, setSelectedKeys] = useState([]); // 0..3
//   const [modeByKey, setModeByKey] = useState({}); // key -> "A" | "B" | "CUSTOM"
//   const [customMovesByKey, setCustomMovesByKey] = useState({}); // key -> [moveIds]

//   const selectedPokemon = useMemo(() => {
//     return selectedKeys.map((k) => POKEMON_POOL.find((p) => p.key === k)).filter(Boolean);
//   }, [selectedKeys]);

//   function togglePick(key) {
//     setSelectedKeys((prev) => {
//       if (prev.includes(key)) return prev.filter((k) => k !== key);
//       if (prev.length >= 3) return prev; // max 3
//       return [...prev, key];
//     });

//     // init mode si on sélectionne
//     setModeByKey((prev) => ({ ...prev, [key]: prev[key] ?? "A" }));
//   }

//   function setMode(key, mode) {
//     setModeByKey((prev) => ({ ...prev, [key]: mode }));
//     if (mode !== "CUSTOM") return;

//     // auto-remplir custom avec le set A au départ
//     const poke = POKEMON_POOL.find((p) => p.key === key);
//     if (!poke) return;
//     setCustomMovesByKey((prev) => ({ ...prev, [key]: prev[key] ?? [...poke.sets[0].moves] }));
//   }

//   function toggleCustomMove(key, moveId) {
//     setCustomMovesByKey((prev) => {
//       const cur = prev[key] ?? [];
//       const has = cur.includes(moveId);

//       if (has) return { ...prev, [key]: cur.filter((m) => m !== moveId) };
//       if (cur.length >= 4) return prev; // max 4 moves
//       return { ...prev, [key]: [...cur, moveId] };
//     });
//   }

//   function getFinalMoves(poke) {
//     const mode = modeByKey[poke.key] ?? "A";
//     if (mode === "A") return poke.sets[0].moves;
//     if (mode === "B") return poke.sets[1].moves;
//     return customMovesByKey[poke.key] ?? [];
//   }

//   const canStart = useMemo(() => {
//     if (selectedPokemon.length !== 3) return false;
//     for (const p of selectedPokemon) {
//       const mode = modeByKey[p.key] ?? "A";
//       if (mode === "CUSTOM") {
//         const cm = customMovesByKey[p.key] ?? [];
//         if (cm.length !== 4) return false;
//       }
//     }
//     return true;
//   }, [selectedPokemon, modeByKey, customMovesByKey]);

//   function startRun() {
//     // pour l’instant on renvoie juste l’équipe avec moves choisis
//     const team = selectedPokemon.map((p) => ({
//       key: p.key,
//       name: p.name,
//       types: p.types,
//       moves: getFinalMoves(p),
//       // stats + sprite seront ajoutés ensuite via PokéAPI
//       stats: { hp: 200, atk: 150, def: 120, spa: 140, spd: 120, spe: 120 }, // placeholder
//     }));

//     onStart({
//       wins: 0,
//       playerScaling: 1.0,
//       enemyScaling: 1.0,
//       playerTeamBase: team,
//     });
//   }

//   return (
//     <div style={{ padding: 20, fontFamily: "system-ui, sans-serif", color: "white" }}>
//       <h1 style={{ marginTop: 0 }}>Team Select</h1>
//       <p style={{ opacity: 0.85 }}>
//         Choisis <b>3</b> Pokémon. Pour chacun : Set A, Set B, ou Custom (4 attaques parmi 8).
//       </p>

//       <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
//         {POKEMON_POOL.map((p) => {
//           const picked = selectedKeys.includes(p.key);
//           return (
//             <button
//               key={p.key}
//               onClick={() => togglePick(p.key)}
//               style={{
//                 width: 220,
//                 textAlign: "left",
//                 padding: 12,
//                 borderRadius: 12,
//                 border: "1px solid rgba(255,255,255,0.15)",
//                 background: picked ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)",
//                 color: "white",
//                 cursor: "pointer",
//               }}
//             >
//               <div style={{ fontWeight: 700, fontSize: 16 }}>{p.name}</div>
//               <div style={{ opacity: 0.8, fontSize: 13 }}>{p.types.join(" / ")}</div>
//               <div style={{ marginTop: 8, opacity: 0.7, fontSize: 12 }}>
//                 {picked ? "Sélectionné ✅" : "Cliquer pour sélectionner"}
//               </div>
//             </button>
//           );
//         })}
//       </div>

//       <hr style={{ margin: "18px 0", borderColor: "rgba(255,255,255,0.12)" }} />

//       <h2>Équipe ({selectedPokemon.length}/3)</h2>

//       {selectedPokemon.length === 0 && <p style={{ opacity: 0.8 }}>Sélectionne des Pokémon ci-dessus.</p>}

//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
//         {selectedPokemon.map((p) => {
//           const mode = modeByKey[p.key] ?? "A";
//           const movePool = makeMovePool(p);
//           const custom = customMovesByKey[p.key] ?? [];
//           const finalMoves = getFinalMoves(p);

//           return (
//             <div
//               key={p.key}
//               style={{
//                 padding: 14,
//                 borderRadius: 14,
//                 border: "1px solid rgba(255,255,255,0.15)",
//                 background: "rgba(255,255,255,0.06)",
//               }}
//             >
//               <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
//                 <div>
//                   <div style={{ fontWeight: 800, fontSize: 18 }}>{p.name}</div>
//                   <div style={{ opacity: 0.8, fontSize: 13 }}>{p.types.join(" / ")}</div>
//                 </div>
//                 <button
//                   onClick={() => togglePick(p.key)}
//                   style={{
//                     height: 34,
//                     padding: "0 10px",
//                     borderRadius: 10,
//                     border: "1px solid rgba(255,255,255,0.2)",
//                     background: "rgba(0,0,0,0.2)",
//                     color: "white",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Retirer
//                 </button>
//               </div>

//               <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
//                 <button
//                   onClick={() => setMode(p.key, "A")}
//                   style={pillStyle(mode === "A")}
//                 >
//                   Set A
//                 </button>
//                 <button
//                   onClick={() => setMode(p.key, "B")}
//                   style={pillStyle(mode === "B")}
//                 >
//                   Set B
//                 </button>
//                 <button
//                   onClick={() => setMode(p.key, "CUSTOM")}
//                   style={pillStyle(mode === "CUSTOM")}
//                 >
//                   Custom
//                 </button>
//               </div>

//               {mode !== "CUSTOM" && (
//                 <div style={{ marginTop: 12, opacity: 0.9 }}>
//                   <div style={{ fontWeight: 700, marginBottom: 6 }}>
//                     {mode === "A" ? p.sets[0].name : p.sets[1].name}
//                   </div>
//                   <ul style={{ margin: 0, paddingLeft: 18 }}>
//                     {finalMoves.map((m) => (
//                       <li key={m}>{m}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {mode === "CUSTOM" && (
//                 <div style={{ marginTop: 12 }}>
//                   <div style={{ fontWeight: 700, marginBottom: 8 }}>
//                     Choisis 4 attaques ({custom.length}/4)
//                   </div>

//                   <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
//                     {movePool.map((m) => {
//                       const checked = custom.includes(m);
//                       const disabled = !checked && custom.length >= 4;
//                       return (
//                         <button
//                           key={m}
//                           onClick={() => toggleCustomMove(p.key, m)}
//                           disabled={disabled}
//                           style={{
//                             padding: "6px 10px",
//                             borderRadius: 999,
//                             border: "1px solid rgba(255,255,255,0.18)",
//                             background: checked ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.2)",
//                             color: "white",
//                             opacity: disabled ? 0.5 : 1,
//                             cursor: disabled ? "not-allowed" : "pointer",
//                           }}
//                         >
//                           {m}
//                         </button>
//                       );
//                     })}
//                   </div>

//                   <div style={{ marginTop: 10, opacity: 0.85 }}>
//                     <b>Set final :</b> {custom.length === 0 ? "—" : custom.join(", ")}
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       <div style={{ marginTop: 18 }}>
//         <button
//           onClick={startRun}
//           disabled={!canStart}
//           style={{
//             padding: "12px 16px",
//             borderRadius: 12,
//             border: "1px solid rgba(255,255,255,0.2)",
//             background: canStart ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.06)",
//             color: "white",
//             cursor: canStart ? "pointer" : "not-allowed",
//             fontWeight: 800,
//           }}
//         >
//           Start Run
//         </button>
//       </div>
//     </div>
//   );
// }

// function pillStyle(active) {
//   return {
//     padding: "6px 10px",
//     borderRadius: 999,
//     border: "1px solid rgba(255,255,255,0.18)",
//     background: active ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.2)",
//     color: "white",
//     cursor: "pointer",
//   };
// }
import { useEffect, useMemo, useState } from "react";
import { POKEMON_POOL } from "../../data/PokemonPool";
import { MOVES } from "../../data/moves";

function uniq(arr) {
  return [...new Set(arr)];
}

function makeMovePool(poke) {
  const a = poke.sets[0].moves;
  const b = poke.sets[1].moves;
  return uniq([...a, ...b]);
}

function moveLabel(moveId) {
  return MOVES?.[moveId]?.name ?? moveId;
}

// Charge les sprites depuis PokéAPI + cache localStorage
function useSprites(pool) {
  const [sprites, setSprites] = useState({}); // key -> url

  useEffect(() => {
    const cacheKey = "poke_sprites_pixel_v1";


    let cachedObj = {};
    const cachedRaw = localStorage.getItem(cacheKey);
    if (cachedRaw) {
      try {
        cachedObj = JSON.parse(cachedRaw);
        setSprites(cachedObj);
      } catch {
        cachedObj = {};
      }
    }

    let cancelled = false;

    (async () => {
      const missing = pool.filter((p) => !cachedObj[p.key]);

      if (missing.length === 0) return;

      const entries = await Promise.all(
        missing.map(async (p) => {
          try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${p.apiName}`);
            const data = await res.json();

            // const url =
            
            //   data?.sprites?.other?.["official-artwork"]?.front_default ||
            //   data?.sprites?.front_default ||
            //   "";
            const url =
  data?.sprites?.versions?.["generation-v"]?.["black-white"]?.animated?.front_default ||
  data?.sprites?.front_default ||
  "";



            return [p.key, url];
          } catch {
            return [p.key, ""];
          }
        })
      );

      const merged = { ...cachedObj, ...Object.fromEntries(entries) };
      if (!cancelled) setSprites(merged);
      localStorage.setItem(cacheKey, JSON.stringify(merged));
    })();

    return () => {
      cancelled = true;
    };
  }, [pool]);

  return sprites;
}

export default function TeamSelect({ onStart }) {
  const [selectedKeys, setSelectedKeys] = useState([]); // 0..3
  const [modeByKey, setModeByKey] = useState({}); // key -> "A" | "B" | "CUSTOM"
  const [customMovesByKey, setCustomMovesByKey] = useState({}); // key -> [moveIds]

  const sprites = useSprites(POKEMON_POOL);

  const selectedPokemon = useMemo(() => {
    return selectedKeys.map((k) => POKEMON_POOL.find((p) => p.key === k)).filter(Boolean);
  }, [selectedKeys]);

  function togglePick(key) {
    setSelectedKeys((prev) => {
      if (prev.includes(key)) return prev.filter((k) => k !== key);
      if (prev.length >= 3) return prev; // max 3
      return [...prev, key];
    });

    // init mode si on sélectionne
    setModeByKey((prev) => ({ ...prev, [key]: prev[key] ?? "A" }));
  }

  function setMode(key, mode) {
    setModeByKey((prev) => ({ ...prev, [key]: mode }));
    if (mode !== "CUSTOM") return;

    // auto-remplir custom avec le set A au départ
    const poke = POKEMON_POOL.find((p) => p.key === key);
    if (!poke) return;
    setCustomMovesByKey((prev) => ({ ...prev, [key]: prev[key] ?? [...poke.sets[0].moves] }));
  }

  function toggleCustomMove(key, moveId) {
    setCustomMovesByKey((prev) => {
      const cur = prev[key] ?? [];
      const has = cur.includes(moveId);

      if (has) return { ...prev, [key]: cur.filter((m) => m !== moveId) };
      if (cur.length >= 4) return prev; // max 4 moves
      return { ...prev, [key]: [...cur, moveId] };
    });
  }

  function getFinalMoves(poke) {
    const mode = modeByKey[poke.key] ?? "A";
    if (mode === "A") return poke.sets[0].moves;
    if (mode === "B") return poke.sets[1].moves;
    return customMovesByKey[poke.key] ?? [];
  }

  const canStart = useMemo(() => {
    if (selectedPokemon.length !== 3) return false;
    for (const p of selectedPokemon) {
      const mode = modeByKey[p.key] ?? "A";
      if (mode === "CUSTOM") {
        const cm = customMovesByKey[p.key] ?? [];
        if (cm.length !== 4) return false;
      }
    }
    return true;
  }, [selectedPokemon, modeByKey, customMovesByKey]);

  function startRun() {
    const team = selectedPokemon.map((p) => ({
      key: p.key,
      apiName: p.apiName,
      name: p.name,
      types: p.types,
      sprite: sprites[p.key] ?? "",
      moves: getFinalMoves(p),
      // stats + sprite seront ajoutés ensuite via PokéAPI (placeholder pour l'instant)
      stats: { hp: 200, atk: 150, def: 120, spa: 140, spd: 120, spe: 120 },
    }));

    onStart({
      wins: 0,
      playerScaling: 1.0,
      enemyScaling: 1.0,
      playerTeamBase: team,
    });
  }

  return (
    <div style={{ padding: 20, fontFamily: "system-ui, sans-serif", color: "white" }}>
      <h1 style={{ marginTop: 0 }}>Team Select</h1>
      <p style={{ opacity: 0.85 }}>
        Choisis <b>3</b> Pokémon. Pour chacun : Set A, Set B, ou Custom (4 attaques parmi 8).
      </p>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {POKEMON_POOL.map((p) => {
          const picked = selectedKeys.includes(p.key);
          const spriteUrl = sprites[p.key];

          return (
            <button
              key={p.key}
              onClick={() => togglePick(p.key)}
              style={{
                width: 240,
                textAlign: "left",
                padding: 12,
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.15)",
                background: picked ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)",
                color: "white",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div
                  style={{
                    width: 74,
                    height: 74,
                    borderRadius: 12,
                    background: "rgba(0,0,0,0.18)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {spriteUrl ? (
                    <img
                      src={spriteUrl}
                      alt={p.name}
                      style={{
                        width: 64,
                        height: 64,
                        objectFit: "contain",
                        filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.35))",
                      }}
                    />
                  ) : (
                    <div style={{ opacity: 0.7, fontSize: 12 }}>...</div>
                  )}
                </div>

                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{p.name}</div>
                  <div style={{ opacity: 0.8, fontSize: 13 }}>{p.types.join(" / ")}</div>
                  <div style={{ marginTop: 6, opacity: 0.7, fontSize: 12 }}>
                    {picked ? "Sélectionné ✅" : "Cliquer pour sélectionner"}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <hr style={{ margin: "18px 0", borderColor: "rgba(255,255,255,0.12)" }} />

      <h2>Équipe ({selectedPokemon.length}/3)</h2>

      {selectedPokemon.length === 0 && <p style={{ opacity: 0.8 }}>Sélectionne des Pokémon ci-dessus.</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 16 }}>
        {selectedPokemon.map((p) => {
          const mode = modeByKey[p.key] ?? "A";
          const movePool = makeMovePool(p);
          const custom = customMovesByKey[p.key] ?? [];
          const finalMoves = getFinalMoves(p);
          const spriteUrl = sprites[p.key];

          return (
            <div
              key={p.key}
              style={{
                padding: 14,
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div
                    style={{
                      width: 58,
                      height: 58,
                      borderRadius: 12,
                      background: "rgba(0,0,0,0.18)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {spriteUrl ? (
                      <img
                        src={spriteUrl}
                        alt={p.name}
                        style={{ width: 52, height: 52, objectFit: "contain" }}
                      />
                    ) : (
                      <div style={{ opacity: 0.7, fontSize: 12 }}>...</div>
                    )}
                  </div>

                  <div>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>{p.name}</div>
                    <div style={{ opacity: 0.8, fontSize: 13 }}>{p.types.join(" / ")}</div>
                  </div>
                </div>

                <button
                  onClick={() => togglePick(p.key)}
                  style={{
                    height: 34,
                    padding: "0 10px",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(0,0,0,0.2)",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Retirer
                </button>
              </div>

              <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button onClick={() => setMode(p.key, "A")} style={pillStyle(mode === "A")}>
                  Set A
                </button>
                <button onClick={() => setMode(p.key, "B")} style={pillStyle(mode === "B")}>
                  Set B
                </button>
                <button onClick={() => setMode(p.key, "CUSTOM")} style={pillStyle(mode === "CUSTOM")}>
                  Custom
                </button>
              </div>

              {mode !== "CUSTOM" && (
                <div style={{ marginTop: 12, opacity: 0.92 }}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>
                    {mode === "A" ? p.sets[0].name : p.sets[1].name}
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {finalMoves.map((m) => (
                      <li key={m}>{moveLabel(m)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {mode === "CUSTOM" && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>
                    Choisis 4 attaques ({custom.length}/4)
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {movePool.map((m) => {
                      const checked = custom.includes(m);
                      const disabled = !checked && custom.length >= 4;
                      return (
                        <button
                          key={m}
                          onClick={() => toggleCustomMove(p.key, m)}
                          disabled={disabled}
                          style={{
                            padding: "6px 10px",
                            borderRadius: 999,
                            border: "1px solid rgba(255,255,255,0.18)",
                            background: checked ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.2)",
                            color: "white",
                            opacity: disabled ? 0.5 : 1,
                            cursor: disabled ? "not-allowed" : "pointer",
                          }}
                        >
                          {moveLabel(m)}
                        </button>
                      );
                    })}
                  </div>

                  <div style={{ marginTop: 10, opacity: 0.9 }}>
                    <b>Set final :</b>{" "}
                    {custom.length === 0 ? "—" : custom.map((m) => moveLabel(m)).join(", ")}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 18 }}>
        <button
          onClick={startRun}
          disabled={!canStart}
          style={{
            padding: "12px 16px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.2)",
            background: canStart ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.06)",
            color: "white",
            cursor: canStart ? "pointer" : "not-allowed",
            fontWeight: 800,
          }}
        >
          Start Run
        </button>
      </div>
    </div>
  );
}

function pillStyle(active) {
  return {
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.18)",
    background: active ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.2)",
    color: "white",
    cursor: "pointer",
  };
}
