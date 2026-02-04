import { MOVES } from "../data/moves";
import { typeEffect } from "./TypeCharts";
import { applyEndTurnStatus, canAct } from "./status";

const STAGE_MULT = {
  "-6": 2 / 8, "-5": 2 / 7, "-4": 2 / 6, "-3": 2 / 5, "-2": 2 / 4, "-1": 2 / 3,
  "0": 1,
  "1": 3 / 2, "2": 4 / 2, "3": 5 / 2, "4": 6 / 2, "5": 7 / 2, "6": 8 / 2,
};

function getStat(poke, stat) {
  const stage = poke.stages?.[stat] ?? 0;
  let val = poke.stats[stat];
  if (stat === "spe" && poke.status?.name === "paralyze") val = Math.floor(val * 0.5);
  return Math.floor(val * STAGE_MULT[String(stage)]);
}

function computeDamage(attacker, defender, moveId) {
  const move = MOVES[moveId];
  if (!move || (move.power ?? 0) <= 0) return { dmg: 0, eff: 1, stab: 1 };

  const isPhysical = move.category === "physical";
  const A = isPhysical ? getStat(attacker, "atk") : getStat(attacker, "spa");

  // psyshock: spécial mais utilise la DEF (défenseur)
  const usesDef = move.effects?.specialUsesDef === true;
  const D = isPhysical
    ? getStat(defender, "def")
    : usesDef
      ? getStat(defender, "def")
      : getStat(defender, "spd");

  const stab = attacker.types.includes(move.type) ? 1.5 : 1.0;
  const eff = typeEffect(move.type, defender.types);
  const rand = 0.85 + Math.random() * 0.15;

  let dmg = Math.floor((move.power * (A / Math.max(1, D))) * stab * eff * rand);

  // burn nerf : physique /2
  if (isPhysical && attacker.status?.name === "burn") dmg = Math.floor(dmg / 2);

  return { dmg: Math.max(1, dmg), eff, stab };
}

export function createFighter(base) {
  const safePP = Object.fromEntries(
    (base.moves ?? []).map((m) => [m, MOVES?.[m]?.pp ?? 10])
  );

  return {
    ...base,
    hp: base.stats.hp,
    status: null,
    volatile: {}, // protect, taunt, disable, protectStreak...
    stages: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
    pp: safePP,
    lastMove: null,
  };
}

function actionPriority(action) {
  if (!action) return 0;
  if (action.type === "switch") return 6; // switch > la plupart des attaques (simple)
  if (action.type === "pass") return 0;
  if (action.type !== "move") return 0;
  const mv = MOVES[action.move];
  return mv?.priority ?? 0;
}

function compareOrder(p, e, pSpe, eSpe) {
  if (p.prio !== e.prio) return p.prio > e.prio ? "player" : "enemy";
  if (pSpe === eSpe) return Math.random() < 0.5 ? "player" : "enemy";
  return pSpe > eSpe ? "player" : "enemy";
}

function isTaunted(poke) {
  return (poke.volatile?.tauntTurns ?? 0) > 0;
}

function isDisabled(poke, moveId) {
  const dis = poke.volatile?.disable;
  return dis && dis.move === moveId && (dis.turns ?? 0) > 0;
}

function protectSuccess(poke) {
  const streak = poke.volatile?.protectStreak ?? 0; // 0 => 100%, 1 => 1/2, 2 => 1/3...
  const chance = 1 / (streak + 1);
  return Math.random() < chance;
}

function resetProtectStreakIfNeeded(poke, usedProtectThisTurn) {
  if (!usedProtectThisTurn) {
    poke.volatile.protectStreak = 0;
  }
}

function applyMoveEffects(attacker, defender, move, log) {
  // boost self
  const self = move.effects?.self;
  if (Array.isArray(self)) {
    for (const s of self) applyStage(attacker, s.stat, s.stage, log, attacker.name);
  } else if (self?.stat) {
    applyStage(attacker, self.stat, self.stage, log, attacker.name);
  }

  // status (burn/para/sleep etc)
  const status = move.effects?.status;
  if (status && defender.hp > 0) {
    const chance = status.chance ?? 100;
    if (Math.random() * 100 < chance) {
      if (!defender.status) {
        defender.status = {
          name: status.target,
          turns: status.target === "sleep" ? 2 + Math.floor(Math.random() * 2) : 0,
        };
        log.push(
          `${defender.name} est ${
            status.target === "burn"
              ? "brûlé"
              : status.target === "paralyze"
                ? "paralysé"
                : status.target
          } !`
        );
      }
    }
  }

  // stat drop sur défenseur
  const statDrop = move.effects?.statDrop;
  if (statDrop && defender.hp > 0) {
    if (Math.random() * 100 < (statDrop.chance ?? 100)) {
      applyStage(defender, statDrop.target, statDrop.stage, log, defender.name);
    }
  }

  // TAUNT (provoc)
  const vol = move.effects?.volatile;
  if (vol?.target === "taunt" && defender.hp > 0) {
    defender.volatile = defender.volatile || {};
    defender.volatile.tauntTurns = vol.turns ?? 3;
    log.push(`${defender.name} est sous Provoc !`);
  }

  // DISABLE (entrave) : cible la dernière attaque utilisée par le défenseur
  if (move.id === "disable" || move.effects?.volatile?.target === "disable") {
    const targetMove = defender.lastMove;
    if (targetMove) {
      defender.volatile = defender.volatile || {};
      defender.volatile.disable = { move: targetMove, turns: (move.effects?.volatile?.turns ?? 4) };
      log.push(`${defender.name} est entravé sur ${MOVES[targetMove]?.name ?? targetMove} !`);
    } else {
      log.push(`Mais Entrave échoue…`);
    }
  }
}

function applyStage(poke, stat, delta, log, who) {
  poke.stages[stat] = Math.max(-6, Math.min(6, (poke.stages[stat] ?? 0) + delta));
  log.push(`${who} ${delta > 0 ? "augmente" : "baisse"} ${stat.toUpperCase()} (${poke.stages[stat]}).`);
}

function enemyChooseAction(state) {
  const e = state.enemyTeam[state.enemyActive];

  // si taunt -> pas de status moves
  const usableMoves = e.moves.filter((m) => e.pp[m] > 0);

  // heal si possible
  const heal = usableMoves.find((m) => MOVES[m]?.effects?.heal?.self);
  if (heal && e.hp / e.stats.hp < 0.35) return { type: "move", move: heal };

  // sinon meilleure puissance (simple)
  let best = usableMoves[0];
  for (const m of usableMoves) {
    const mv = MOVES[m];
    if ((mv?.power ?? 0) > (MOVES[best]?.power ?? 0)) best = m;
  }
  return { type: "move", move: best };
}

function forceSwitchIfNeeded(state, side, log) {
  const team = side === "player" ? state.playerTeam : state.enemyTeam;
  const activeIndex = side === "player" ? state.playerActive : state.enemyActive;
  if (team[activeIndex].hp > 0) return;

  const next = team.findIndex((p) => p.hp > 0);
  if (next === -1) return;
  if (side === "player") state.playerActive = next;
  else state.enemyActive = next;
  log.push(`${side === "player" ? "Tu" : "L'ennemi"} envoie ${team[next].name} !`);
}

function checkEnd(state, log) {
  const playerAlive = state.playerTeam.some((p) => p.hp > 0);
  const enemyAlive = state.enemyTeam.some((p) => p.hp > 0);
  if (!playerAlive) {
    state.phase = "ended";
    state.winner = "enemy";
    log.push(`Défaite…`);
  } else if (!enemyAlive) {
    state.phase = "ended";
    state.winner = "player";
    log.push(`Victoire !`);
  }
}

function tickVolatiles(poke) {
  if (!poke.volatile) return;

  if ((poke.volatile.tauntTurns ?? 0) > 0) poke.volatile.tauntTurns -= 1;

  if (poke.volatile.disable) {
    poke.volatile.disable.turns -= 1;
    if (poke.volatile.disable.turns <= 0) delete poke.volatile.disable;
  }

  // protect ne dure qu'un tour
  if (poke.volatile.protect) poke.volatile.protect = false;
}

export function runTurn(state, playerAction) {
  const log = [];
  const p = state.playerTeam[state.playerActive];
  const e = state.enemyTeam[state.enemyActive];

  const enemyAction = enemyChooseAction(state);

  // ordre : priorité > vitesse
  const pSpe = getStat(p, "spe");
  const eSpe = getStat(e, "spe");

  const pMeta = { prio: actionPriority(playerAction) };
  const eMeta = { prio: actionPriority(enemyAction) };

  const first = compareOrder(pMeta, eMeta, pSpe, eSpe);
  const order = first === "player"
    ? [["player", playerAction], ["enemy", enemyAction]]
    : [["enemy", enemyAction], ["player", playerAction]];

  // suivre si un protect a été tenté (pour streak)
  const usedProtect = { player: false, enemy: false };

  for (const [side, action] of order) {
    if (state.phase === "ended") break;
    if (state.pendingSwitch) break; // on stoppe le tour si on doit choisir un switch

    const A = side === "player" ? state.playerTeam[state.playerActive] : state.enemyTeam[state.enemyActive];
    const D = side === "player" ? state.enemyTeam[state.enemyActive] : state.playerTeam[state.playerActive];

    if (A.hp <= 0) continue;
        if (action.type === "pass") {
      // ✅ action vide : on laisse juste l'autre agir
      continue;
    }


    if (action.type === "switch") {
      if (side === "player") state.playerActive = action.to;
      else state.enemyActive = action.to;
      log.push(
        `${side === "player" ? "Tu" : "L'ennemi"} envoie ${
          side === "player"
            ? state.playerTeam[state.playerActive].name
            : state.enemyTeam[state.enemyActive].name
        } !`
      );
      continue;
    }

    const moveId = action.move;
    const move = MOVES[moveId];
    if (!move) continue;

    // taunt = interdit les moves status
    if (move.category === "status" && isTaunted(A)) {
      log.push(`${A.name} est sous Provoc : impossible d'utiliser ${move.name} !`);
      continue;
    }

    // disable
    if (isDisabled(A, moveId)) {
      log.push(`${A.name} est entravé : ${move.name} est bloquée !`);
      continue;
    }

    // PP
    if ((A.pp?.[moveId] ?? 0) <= 0) {
      log.push(`${A.name} n'a plus de PP pour ${move.name} !`);
      continue;
    }

    // status empêchant d’agir
    if (!canAct(A, log)) continue;

    // précision
    const acc = move.acc ?? 100;
    const roll = Math.random() * 100;
    if (acc !== 999 && roll > acc) {
      A.pp[moveId] -= 1;
      A.lastMove = moveId;
      log.push(`${A.name} rate ${move.name} !`);
      continue;
    }

    A.pp[moveId] -= 1;
    A.lastMove = moveId;

    // PROTECT-like
    if (move.effects?.volatile?.self === "protect") {
      A.volatile = A.volatile || {};
      usedProtect[side] = true;

      const ok = protectSuccess(A);
      if (ok) {
        A.volatile.protect = true;
        A.volatile.protectStreak = (A.volatile.protectStreak ?? 0) + 1;
        log.push(`${A.name} se protège avec ${move.name} !`);
      } else {
        // échec : streak augmente quand même dans les jeux, mais ici on le garde simple
        A.volatile.protect = false;
        A.volatile.protectStreak = (A.volatile.protectStreak ?? 0) + 1;
        log.push(`${A.name} tente ${move.name}, mais ça échoue…`);
      }
      continue;
    }

    // heal direct (roost/synthesis/rest)
    if (move.effects?.heal?.self) {
      const amount = Math.floor(A.stats.hp * move.effects.heal.self);
      A.hp = Math.min(A.stats.hp, A.hp + amount);
      log.push(`${A.name} récupère ${amount} PV avec ${move.name}.`);
      // rest applique aussi sleep via effects.status => géré ici
      applyMoveEffects(A, A, move, log);
      continue;
    }

    // si la cible est protégée : 0 dégâts + message
    if (D.volatile?.protect) {
      log.push(`${D.name} bloque l'attaque avec Abri !`);
      continue;
    }

    // dégâts
    const { dmg, eff } = computeDamage(A, D, moveId);
    D.hp = Math.max(0, D.hp - dmg);

    log.push(`${A.name} utilise ${move.name} ! (-${dmg})`);
    if (eff === 0) log.push(`Ça n'affecte pas ${D.name}…`);
    else if (eff >= 4) log.push(`C'est ultra efficace !!`);
    else if (eff >= 2) log.push(`C'est super efficace !`);
    else if (eff <= 0.5) log.push(`Ce n'est pas très efficace…`);

    // drain (giga-sangsue / vampi-poing)
    if (move.effects?.drain && dmg > 0) {
      const healAmt = Math.max(1, Math.floor(dmg * move.effects.drain));
      A.hp = Math.min(A.stats.hp, A.hp + healAmt);
      log.push(`${A.name} récupère ${healAmt} PV.`);
    }

    // appliquer effets (statuts, drops, taunt, disable…)
    applyMoveEffects(A, D, { ...move, id: moveId }, log);

    // VOLT-SWITCH : demander un switch après avoir touché
    // if (move.effects?.selfSwitch && D.hp > 0) {
    //   if (side === "player") {
    //     const hasBench = state.playerTeam.some((pk, idx) => idx !== state.playerActive && pk.hp > 0);
    //     if (hasBench) {
    //       state.pendingSwitch = { side: "player" };
    //       log.push(`Change Éclair : choisis un Pokémon à envoyer !`);
    //       break;
    //     }
    //   } else {
    //     // enemy auto-switch simple
    //     const next = state.enemyTeam.findIndex((pk, idx) => idx !== state.enemyActive && pk.hp > 0);
    //     if (next !== -1) {
    //       state.enemyActive = next;
    //       log.push(`L'ennemi change de Pokémon ! (${state.enemyTeam[next].name})`);
    //     }
    //   }
    // }
    if (move.effects?.selfSwitch && D.hp > 0) {
        if (side === "player") {
            const hasBench = state.playerTeam.some((pk, idx) => idx !== state.playerActive && pk.hp > 0);
            if (hasBench) {
            state.pendingSwitch = { side: "player", reason: "selfSwitch" }; // ✅ NEW
            log.push(`Change Éclair : choisis un Pokémon à envoyer !`);
            break;
            }
        } else {
            const nextIdx = state.enemyTeam.findIndex((pk, idx) => idx !== state.enemyActive && pk.hp > 0);
            if (nextIdx !== -1) {
            state.enemyActive = nextIdx;
            log.push(`L'ennemi change de Pokémon ! (${state.enemyTeam[nextIdx].name})`);
            }
        }
    }


    // KO ?
    if (D.hp <= 0) {
      log.push(`${D.name} est K.O. !`);
      forceSwitchIfNeeded(state, side === "player" ? "enemy" : "player", log);
      checkEnd(state, log);
      break;
    }
  }

  // fin de tour : ticks
  if (state.phase !== "ended" && !state.pendingSwitch) {
    // reset protect streak si pas utilisé
    p.volatile = p.volatile || {};
    e.volatile = e.volatile || {};
    resetProtectStreakIfNeeded(p, usedProtect.player);
    resetProtectStreakIfNeeded(e, usedProtect.enemy);

    applyEndTurnStatus(state.playerTeam[state.playerActive], log);
    applyEndTurnStatus(state.enemyTeam[state.enemyActive], log);

    // diminuer taunt/disable + enlever protect
    tickVolatiles(state.playerTeam[state.playerActive]);
    tickVolatiles(state.enemyTeam[state.enemyActive]);

    checkEnd(state, log);
  }

  state.log = [...state.log, ...log];
  return state;
}
