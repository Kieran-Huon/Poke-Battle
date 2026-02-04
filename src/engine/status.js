// src/engine/status.js

export function applyEndTurnStatus(poke, log) {
  const s = poke.status?.name;
  if (!s) return;

  const maxHP = poke.stats.hp;

  if (s === "burn") {
    const dmg = Math.floor(maxHP / 16);
    poke.hp = Math.max(0, poke.hp - dmg);
    log.push(`${poke.name} souffre de sa brûlure (-${dmg}).`);
    return;
  }

  if (s === "poison") {
    const dmg = Math.floor(maxHP / 8);
    poke.hp = Math.max(0, poke.hp - dmg);
    log.push(`${poke.name} est empoisonné (-${dmg}).`);
    return;
  }

  if (s === "toxic") {
    poke.status.turns = (poke.status.turns ?? 0) + 1;
    const dmg = Math.floor((maxHP * poke.status.turns) / 16);
    poke.hp = Math.max(0, poke.hp - dmg);
    log.push(`${poke.name} souffre du poison grave (-${dmg}).`);
    return;
  }
}

export function canAct(poke, log) {
  // Paralysie : 25% de full para (vitesse gérée dans battle.js via getStat)
  if (poke.status?.name === "paralyze") {
    if (Math.random() < 0.25) {
      log.push(`${poke.name} est paralysé : il ne peut pas bouger !`);
      return false;
    }
  }

  // Sommeil : décrémente, puis agit quand ça passe sous 0
  if (poke.status?.name === "sleep") {
    poke.status.turns = (poke.status.turns ?? 0) - 1;

    if (poke.status.turns >= 0) {
      log.push(`${poke.name} dort…`);
      return false;
    }

    poke.status = null;
    log.push(`${poke.name} se réveille !`);
  }

  // Gel : 20% de dégeler par tour
  if (poke.status?.name === "freeze") {
    if (Math.random() < 0.2) {
      poke.status = null;
      log.push(`${poke.name} dégèle !`);
    } else {
      log.push(`${poke.name} est gelé !`);
      return false;
    }
  }

  return true;
}
