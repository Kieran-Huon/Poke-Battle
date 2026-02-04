export const MOVES = {
  // --- FIRE ---
  "fire-blast": { name: "Déflagration", type: "fire", category: "special", power: 110, acc: 85, pp: 5, effects: {} },
  flamethrower: { name: "Lance-Flammes", type: "fire", category: "special", power: 90, acc: 100, pp: 15, effects: { status: { target: "burn", chance: 10 } } },
  "flare-blitz": { name: "Boutefeu", type: "fire", category: "physical", power: 120, acc: 100, pp: 15, effects: {} },
  ember: { name: "Flammèche", type: "fire", category: "special", power: 40, acc: 100, pp: 25, effects: { status: { target: "burn", chance: 10 } } },
  overheat: { name: "Surchauffe", type: "fire", category: "special", power: 130, acc: 90, pp: 5, effects: { self: { stat: "spa", stage: -2 } } },
  "will-o-wisp": { name: "Feu Follet", type: "fire", category: "status", power: 0, acc: 85, pp: 15, effects: { status: { target: "burn", chance: 100 } } },
  "fire-punch": { name: "Poing de Feu", type: "fire", category: "physical", power: 75, acc: 100, pp: 15, effects: { status: { target: "burn", chance: 10 } } },

  // --- WATER ---
  waterfall: { name: "Cascade", type: "water", category: "physical", power: 80, acc: 100, pp: 15, effects: {} },
  surf: { name: "Surf", type: "water", category: "special", power: 90, acc: 100, pp: 15, effects: {} },

  // --- GRASS ---
  // drain : soigne le lanceur d'un % des dégâts infligés (à gérer dans battle.js)
  "giga-drain": { name: "Giga-Sangsue", type: "grass", category: "special", power: 75, acc: 100, pp: 10, effects: { drain: 0.5 } },
  "energy-ball": { name: "Éco-Sphère", type: "grass", category: "special", power: 90, acc: 100, pp: 10, effects: { statDrop: { target: "spd", stage: -1, chance: 10 } } },
  "leaf-blade": { name: "Lame-Feuille", type: "grass", category: "physical", power: 90, acc: 100, pp: 15, effects: {} },
  "wood-hammer": { name: "Martobois", type: "grass", category: "physical", power: 120, acc: 100, pp: 15, effects: {} },
  synthesis: { name: "Synthèse", type: "grass", category: "status", power: 0, acc: 999, pp: 5, effects: { heal: { self: 0.5 } } },
  growth: { name: "Croissance", type: "normal", category: "status", power: 0, acc: 999, pp: 20, effects: { self: [{ stat: "atk", stage: +1 }, { stat: "spa", stage: +1 }] } },
  "sleep-powder": { name: "Poudre Dodo", type: "grass", category: "status", power: 0, acc: 75, pp: 15, effects: { status: { target: "sleep", chance: 100 } } },
  "grass-knot": { name: "Nœud Herbe", type: "grass", category: "special", power: 80, acc: 100, pp: 20, effects: {} },

  // --- ELECTRIC ---
  thunderbolt: { name: "Tonnerre", type: "electric", category: "special", power: 90, acc: 100, pp: 15, effects: { status: { target: "paralyze", chance: 10 } } },
  "thunder-wave": { name: "Cage-Éclair", type: "electric", category: "status", power: 0, acc: 90, pp: 20, effects: { status: { target: "paralyze", chance: 100 } } },
  // selfSwitch : après avoir touché, le lanceur doit pouvoir switch (à gérer dans battle.js + UI)
  "volt-switch": { name: "Change Éclair", type: "electric", category: "special", power: 70, acc: 100, pp: 20, effects: { selfSwitch: true } },
  "wild-charge": { name: "Éclair Fou", type: "electric", category: "physical", power: 90, acc: 100, pp: 15, effects: {} },
  "thunder-punch": { name: "Poing-Éclair", type: "electric", category: "physical", power: 75, acc: 100, pp: 15, effects: { status: { target: "paralyze", chance: 10 } } },

  // --- ICE ---
  blizzard: { name: "Blizzard", type: "ice", category: "special", power: 110, acc: 70, pp: 5, effects: {} },
  "ice-beam": { name: "Laser Glace", type: "ice", category: "special", power: 90, acc: 100, pp: 10, effects: {} },
  "ice-punch": { name: "Poing Glace", type: "ice", category: "physical", power: 75, acc: 100, pp: 15, effects: {} },
  // prio
  "ice-shard": { name: "Éclats Glace", type: "ice", category: "physical", power: 40, acc: 100, pp: 30, priority: 1, effects: {} },
  avalanche: { name: "Avalanche", type: "ice", category: "physical", power: 60, acc: 100, pp: 10, effects: {} },

  // --- FIGHTING ---
  "close-combat": { name: "Close Combat", type: "fighting", category: "physical", power: 120, acc: 100, pp: 5, effects: { self: [{ stat: "def", stage: -1 }, { stat: "spd", stage: -1 }] } },
  "aura-sphere": { name: "Aurasphère", type: "fighting", category: "special", power: 80, acc: 999, pp: 20, effects: {} },
  "brick-break": { name: "Casse-Brique", type: "fighting", category: "physical", power: 75, acc: 100, pp: 15, effects: {} },
  "low-sweep": { name: "Balayage", type: "fighting", category: "physical", power: 65, acc: 100, pp: 20, effects: { statDrop: { target: "spe", stage: -1, chance: 100 } } },
  superpower: { name: "Surpuissance", type: "fighting", category: "physical", power: 120, acc: 100, pp: 5, effects: { self: [{ stat: "atk", stage: -1 }, { stat: "def", stage: -1 }] } },
  // drain (à gérer plus tard si tu veux comme giga-drain)
  "drain-punch": { name: "Vampi-Poing", type: "fighting", category: "physical", power: 75, acc: 100, pp: 10, effects: { drain: 0.5 } },
  "bulk-up": { name: "Gonflette", type: "fighting", category: "status", power: 0, acc: 999, pp: 20, effects: { self: [{ stat: "atk", stage: +1 }, { stat: "def", stage: +1 }] } },

  // --- GROUND ---
  earthquake: { name: "Séisme", type: "ground", category: "physical", power: 100, acc: 100, pp: 10, effects: {} },

  // --- ROCK ---
  "stone-edge": { name: "Lame de Roc", type: "rock", category: "physical", power: 100, acc: 80, pp: 5, effects: {} },

  // --- DARK ---
  crunch: { name: "Mâchouille", type: "dark", category: "physical", power: 80, acc: 100, pp: 15, effects: {} },
  snarl: { name: "Aboiement", type: "dark", category: "special", power: 55, acc: 95, pp: 15, effects: { statDrop: { target: "spa", stage: -1, chance: 100 } } },
  bite: { name: "Morsure", type: "dark", category: "physical", power: 60, acc: 100, pp: 25, effects: {} },
  "night-slash": { name: "Tranche-Nuit", type: "dark", category: "physical", power: 70, acc: 100, pp: 15, effects: {} },
  "knock-off": { name: "Sabotage", type: "dark", category: "physical", power: 65, acc: 100, pp: 20, effects: {} },
  payback: { name: "Représailles", type: "dark", category: "physical", power: 50, acc: 100, pp: 10, effects: {} },

  // --- GHOST ---
  "shadow-ball": { name: "Ball'Ombre", type: "ghost", category: "special", power: 80, acc: 100, pp: 15, effects: {} },

  // --- POISON ---
  "sludge-bomb": { name: "Bombe Beurk", type: "poison", category: "special", power: 90, acc: 100, pp: 10, effects: {} },
  "poison-jab": { name: "Direct Toxik", type: "poison", category: "physical", power: 80, acc: 100, pp: 20, effects: {} },

  // --- BUG ---
  "x-scissor": { name: "Plaie-Croix", type: "bug", category: "physical", power: 80, acc: 100, pp: 15, effects: {} },
  "u-turn": { name: "Demi-Tour", type: "bug", category: "physical", power: 70, acc: 100, pp: 20, effects: {} },

  // --- STEEL ---
  "meteor-mash": { name: "Poing Météore", type: "steel", category: "physical", power: 90, acc: 90, pp: 10, effects: { self: { stat: "atk", stage: +1 } } },
  "iron-head": { name: "Tête de Fer", type: "steel", category: "physical", power: 80, acc: 100, pp: 15, effects: {} },
  "bullet-punch": { name: "Pisto-Poing", type: "steel", category: "physical", power: 40, acc: 100, pp: 30, effects: {} },

  // --- PSYCHIC ---
  psychic: { name: "Psyko", type: "psychic", category: "special", power: 90, acc: 100, pp: 10, effects: {} },
  psyshock: { name: "Choc Psy", type: "psychic", category: "special", power: 80, acc: 100, pp: 10, effects: { specialUsesDef: true } },
  "zen-headbutt": { name: "Psykoud'Boul", type: "psychic", category: "physical", power: 80, acc: 90, pp: 15, effects: {} },
  "calm-mind": { name: "Plénitude", type: "psychic", category: "status", power: 0, acc: 999, pp: 20, effects: { self: [{ stat: "spa", stage: +1 }, { stat: "spd", stage: +1 }] } },

  // --- FAIRY ---
  moonblast: { name: "Pouvoir Lunaire", type: "fairy", category: "special", power: 95, acc: 100, pp: 15, effects: { statDrop: { target: "spa", stage: -1, chance: 30 } } },

  // --- DRAGON ---
  "draco-meteor": { name: "Draco-Météore", type: "dragon", category: "special", power: 130, acc: 90, pp: 5, effects: { self: { stat: "spa", stage: -2 } } },
  "dragon-dance": { name: "Danse Draco", type: "dragon", category: "status", power: 0, acc: 999, pp: 20, effects: { self: [{ stat: "atk", stage: +1 }, { stat: "spe", stage: +1 }] } },
  outrage: { name: "Colère", type: "dragon", category: "physical", power: 120, acc: 100, pp: 10, effects: {} },
  "dragon-tail": { name: "Draco-Queue", type: "dragon", category: "physical", power: 60, acc: 90, pp: 10, effects: {} },

  // --- FLYING ---
  "air-slash": { name: "Lame d'Air", type: "flying", category: "special", power: 75, acc: 95, pp: 15, effects: {} },
  roost: { name: "Atterrissage", type: "flying", category: "status", power: 0, acc: 999, pp: 10, effects: { heal: { self: 0.5 } } },

  // --- NORMAL / STATUS ---
  // protect-like : prio + volatile protect (le calcul "1/2 puis 1/3" sera géré dans battle.js)
  protect: { name: "Abri", type: "normal", category: "status", power: 0, acc: 999, pp: 10, priority: 4, effects: { volatile: { self: "protect" } } },

  "extreme-speed": { name: "Vitesse Extrême", type: "normal", category: "physical", power: 80, acc: 100, pp: 5, priority: 2, effects: {} },
  "quick-attack": { name: "Vive-Attaque", type: "normal", category: "physical", power: 40, acc: 100, pp: 30, priority: 1, effects: {} },

  encore: { name: "Encore", type: "normal", category: "status", power: 0, acc: 100, pp: 5, effects: {} },
  roar: { name: "Hurlement", type: "normal", category: "status", power: 0, acc: 999, pp: 20, effects: {} },
  curse: { name: "Malédiction", type: "ghost", category: "status", power: 0, acc: 999, pp: 10, effects: { self: [{ stat: "atk", stage: +1 }, { stat: "def", stage: +1 }, { stat: "spe", stage: -1 }] } },
  rest: { name: "Repos", type: "psychic", category: "status", power: 0, acc: 999, pp: 10, effects: { heal: { self: 1.0 }, status: { target: "sleep", chance: 100 } } },

  // --- OTHER CONTROL ---
  taunt: { name: "Provoc", type: "dark", category: "status", power: 0, acc: 100, pp: 20, effects: { volatile: { target: "taunt", turns: 3 } } },
  hypnosis: { name: "Hypnose", type: "psychic", category: "status", power: 0, acc: 60, pp: 20, effects: { status: { target: "sleep", chance: 100 } } },

  // disable : bloque une attaque (à implémenter dans battle.js)
  disable: { name: "Entrave", type: "normal", category: "status", power: 0, acc: 100, pp: 20, effects: { volatile: { target: "disable", turns: 4 } } },

  // --- AEGISLASH / SPEC ---
  "sacred-sword": { name: "Lame Sainte", type: "fighting", category: "physical", power: 90, acc: 100, pp: 15, effects: {} },
  "kings-shield": { name: "Bouclier Royal", type: "steel", category: "status", power: 0, acc: 999, pp: 10, priority: 4, effects: { volatile: { self: "protect" } } },

  // --- ABSOL extras ---
  "psychic-fangs": { name: "Crocs Psy", type: "psychic", category: "physical", power: 85, acc: 100, pp: 10, effects: {} },

  // --- MISC ---
  "focus-blast": { name: "Exploforce", type: "fighting", category: "special", power: 120, acc: 70, pp: 5, effects: {} },
  "shadow-claw": { name: "Griffe Ombre", type: "ghost", category: "physical", power: 70, acc: 100, pp: 15, effects: {} },

  "swords-dance": {
  name: "Danse-Lames",
  type: "normal",
  category: "status",
  power: 0,
  acc: 999,
  pp: 20,
  effects: { self: [{ stat: "atk", stage: +2 }] },
},

};
