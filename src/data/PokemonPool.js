// export const POKEMON_POOL = [
//   {
//     key: "charizard",
//     name: "Dracaufeu",
//     types: ["fire", "flying"],
//     sets: [
//       { name: "Spécial offensif", moves: ["fire-blast", "draco-meteor", "flamethrower", "roost"] },
//       { name: "Mix / setup", moves: ["fire-blast", "air-slash", "earthquake", "dragon-dance"] },
//     ],
//   },
//   {
//     key: "arcanine",
//     name: "Arcanin",
//     types: ["fire"],
//     sets: [
//       { name: "Physique burst", moves: ["flare-blitz", "extreme-speed", "brick-break", "swords-dance"] },
//       { name: "Support brûlure", moves: ["will-o-wisp", "ember", "snarl", "roar"] },
//     ],
//   },
//   {
//     key: "swampert",
//     name: "Laggron",
//     types: ["water", "ground"],
//     sets: [
//       { name: "Tank", moves: ["earthquake", "waterfall", "ice-punch", "protect"] },
//       { name: "Setup bulky", moves: ["earthquake", "waterfall", "curse", "rest"] },
//     ],
//   },
//   {
//     key: "gyarados",
//     name: "Léviator",
//     types: ["water", "flying"],
//     sets: [
//       { name: "Sweeper", moves: ["waterfall", "earthquake", "crunch", "dragon-dance"] },
//       { name: "Contrôle", moves: ["waterfall", "dragon-tail", "taunt", "stone-edge"] },
//     ],
//   },
//   {
//     key: "venusaur",
//     name: "Florizarre",
//     types: ["grass", "poison"],
//     sets: [
//       { name: "Spécial statut", moves: ["giga-drain", "sludge-bomb", "sleep-powder", "synthesis"] },
//       { name: "Setup", moves: ["energy-ball", "sludge-bomb", "growth", "protect"] },
//     ],
//   },
//   {
//     key: "sceptile",
//     name: "Jungko",
//     types: ["grass"],
//     sets: [
//       { name: "Spécial rapide", moves: ["draco-meteor", "energy-ball", "focus-blast", "protect"] },
//       { name: "Physique rapide", moves: ["leaf-blade", "poison-jab", "earthquake", "swords-dance"] },
//     ],
//   },
//   {
//     key: "manectric",
//     name: "Élecsprint",
//     types: ["electric"],
//     sets: [
//       { name: "Spécial pivot", moves: ["thunderbolt", "volt-switch", "overheat", "thunder-wave"] },
//       { name: "Offensif mixte", moves: ["wild-charge", "bite", "overheat", "roar"] },
//     ],
//   },
//   {
//     key: "raichu",
//     name: "Raichu",
//     types: ["electric"],
//     sets: [
//       { name: "Offensif spécial", moves: ["thunderbolt", "grass-knot", "surf", "quick-attack"] },
//       { name: "Support vitesse", moves: ["thunder-wave", "volt-switch", "encore", "protect"] },
//     ],
//   },
//   {
//     key: "weavile",
//     name: "Dimoret",
//     types: ["ice", "dark"],
//     sets: [
//       { name: "Sweeper physique", moves: ["ice-shard", "night-slash", "poison-jab", "swords-dance"] },
//       { name: "Anti-setup", moves: ["knock-off", "ice-shard", "low-sweep", "taunt"] },
//     ],
//   },
//   {
//     key: "abomasnow",
//     name: "Blizzaroi",
//     types: ["grass", "ice"],
//     sets: [
//       { name: "Spécial bulky", moves: ["blizzard", "energy-ball", "sludge-bomb", "protect"] },
//       { name: "Physique lent", moves: ["wood-hammer", "avalanche", "earthquake", "curse"] },
//     ],
//   },
//   {
//     key: "lucario",
//     name: "Lucario",
//     types: ["fighting", "steel"],
//     sets: [
//       { name: "Mixte setup", moves: ["close-combat", "aura-sphere", "extreme-speed", "swords-dance"] },
//       { name: "Spécial", moves: ["aura-sphere", "shadow-ball", "ice-beam", "calm-mind"] },
//     ],
//   },
//   {
//     key: "machamp",
//     name: "Mackogneur",
//     types: ["fighting"],
//     sets: [
//       { name: "Bourrin", moves: ["close-combat", "ice-punch", "thunder-punch", "bulk-up"] },
//       { name: "Tank", moves: ["fire-punch", "payback", "counter", "protect"] },
//     ],
//   },
//   {
//     key: "gengar",
//     name: "Ectoplasma",
//     types: ["ghost", "poison"],
//     sets: [
//       { name: "Glass cannon", moves: ["shadow-ball", "sludge-bomb", "focus-blast", "hypnosis"] },
//       { name: "Contrôle", moves: ["taunt", "disable", "shadow-ball", "protect"] },
//     ],
//   },
//   {
//     key: "aegislash",
//     name: "Exagide",
//     types: ["steel", "ghost"],
//     sets: [
//       { name: "Mixte", moves: ["sacred-sword", "shadow-ball", "iron-head", "kings-shield"] },
//       { name: "Stall", moves: ["kings-shield", "toxic", "drain-punch", "shadow-ball"] },
//     ],
//   },
//   {
//     key: "salamence",
//     name: "Drattak",
//     types: ["dragon", "flying"],
//     sets: [
//       { name: "Sweeper", moves: ["draco-meteor", "fire-blast", "air-slash", "dragon-dance"] },
//       { name: "Physique", moves: ["outrage", "earthquake", "fire-punch", "dragon-dance"] },
//     ],
//   },
//   {
//     key: "garchomp",
//     name: "Carchacrok",
//     types: ["dragon", "ground"],
//     sets: [
//       { name: "Physique", moves: ["earthquake", "outrage", "stone-edge", "swords-dance"] },
//       { name: "Mixte", moves: ["draco-meteor", "earthquake", "flamethrower", "protect"] },
//     ],
//   },
//   {
//     key: "metagross",
//     name: "Métalosse",
//     types: ["steel", "psychic"],
//     sets: [
//       { name: "Tank offensif", moves: ["meteor-mash", "zen-headbutt", "earthquake", "ice-punch"] },
//       { name: "Setup", moves: ["meteor-mash", "low-sweep", "swords-dance", "protect"] },
//     ],
//   },
//   {
//     key: "alakazam",
//     name: "Alakazam",
//     types: ["psychic"],
//     sets: [
//       { name: "Glass cannon", moves: ["psychic", "shadow-ball", "focus-blast", "calm-mind"] },
//       { name: "Contrôle", moves: ["psychic", "encore", "taunt", "protect"] },
//     ],
//   },
//   {
//     key: "absol",
//     name: "Absol",
//     types: ["dark"],
//     sets: [
//       { name: "Burst", moves: ["night-slash", "brick-break", "psychic-fangs", "swords-dance"] },
//       { name: "Harcèlement", moves: ["taunt", "knock-off", "night-slash", "protect"] },
//     ],
//   },
//   {
//     key: "scizor",
//     name: "Cizayox",
//     types: ["bug", "steel"],
//     sets: [
//       { name: "Setup", moves: ["bullet-punch", "u-turn", "superpower", "swords-dance"] },
//       { name: "Bulky", moves: ["bullet-punch", "roost", "knock-off", "protect"] },
//     ],
//   },
//   {
//     key: "pinsir",
//     name: "Scarabrute",
//     types: ["bug"],
//     sets: [
//       { name: "Bourrin", moves: ["close-combat", "x-scissor", "stone-edge", "swords-dance"] },
//       { name: "Anti-tank", moves: ["earthquake", "x-scissor", "taunt", "protect"] },
//     ],
//   },
//   {
//     key: "tyranitar",
//     name: "Tyranocif",
//     types: ["rock", "dark"],
//     sets: [
//       { name: "Tank offensif", moves: ["stone-edge", "crunch", "earthquake", "curse"] },
//       { name: "Pression", moves: ["stone-edge", "bite", "taunt", "protect"] },
//     ],
//   },
//   {
//     key: "rhyperior",
//     name: "Rhinastoc",
//     types: ["ground", "rock"],
//     sets: [
//       { name: "Bourrin", moves: ["earthquake", "stone-edge", "ice-punch", "swords-dance"] },
//       { name: "Tank", moves: ["earthquake", "stone-edge", "protect", "curse"] },
//     ],
//   },
//   {
//     key: "gardevoir",
//     name: "Gardevoir",
//     types: ["psychic", "fairy"],
//     sets: [
//       { name: "Spécial", moves: ["psychic", "moonblast", "thunderbolt", "calm-mind"] },
//       { name: "Support", moves: ["thunder-wave", "psyshock", "taunt", "protect"] },
//     ],
//   },
// ];
export const POKEMON_POOL = [
  {
    key: "charizard",
    apiName: "charizard",
    name: "Dracaufeu",
    types: ["fire", "flying"],
    sets: [
      { name: "Spécial offensif", moves: ["fire-blast", "draco-meteor", "flamethrower", "roost"] },
      { name: "Mix / setup", moves: ["fire-blast", "air-slash", "earthquake", "dragon-dance"] },
    ],
  },
  {
    key: "arcanine",
    apiName: "arcanine",
    name: "Arcanin",
    types: ["fire"],
    sets: [
      { name: "Physique burst", moves: ["flare-blitz", "extreme-speed", "brick-break", "swords-dance"] },
      { name: "Support brûlure", moves: ["will-o-wisp", "ember", "snarl", "roar"] },
    ],
  },
  {
    key: "swampert",
    apiName: "swampert",
    name: "Laggron",
    types: ["water", "ground"],
    sets: [
      { name: "Tank", moves: ["earthquake", "waterfall", "ice-punch", "protect"] },
      { name: "Setup bulky", moves: ["earthquake", "waterfall", "curse", "rest"] },
    ],
  },
  {
    key: "gyarados",
    apiName: "gyarados",
    name: "Léviator",
    types: ["water", "flying"],
    sets: [
      { name: "Sweeper", moves: ["waterfall", "earthquake", "crunch", "dragon-dance"] },
      { name: "Contrôle", moves: ["waterfall", "dragon-tail", "taunt", "stone-edge"] },
    ],
  },
  {
    key: "venusaur",
    apiName: "venusaur",
    name: "Florizarre",
    types: ["grass", "poison"],
    sets: [
      { name: "Spécial statut", moves: ["giga-drain", "sludge-bomb", "sleep-powder", "synthesis"] },
      { name: "Setup", moves: ["energy-ball", "sludge-bomb", "growth", "protect"] },
    ],
  },
  {
    key: "sceptile",
    apiName: "sceptile",
    name: "Jungko",
    types: ["grass"],
    sets: [
      { name: "Spécial rapide", moves: ["draco-meteor", "energy-ball", "focus-blast", "protect"] },
      { name: "Physique rapide", moves: ["leaf-blade", "poison-jab", "earthquake", "swords-dance"] },
    ],
  },
  {
    key: "manectric",
    apiName: "manectric",
    name: "Élecsprint",
    types: ["electric"],
    sets: [
      { name: "Spécial pivot", moves: ["thunderbolt", "volt-switch", "overheat", "thunder-wave"] },
      { name: "Offensif mixte", moves: ["wild-charge", "bite", "overheat", "roar"] },
    ],
  },
  {
    key: "raichu",
    apiName: "raichu",
    name: "Raichu",
    types: ["electric"],
    sets: [
      { name: "Offensif spécial", moves: ["thunderbolt", "grass-knot", "surf", "quick-attack"] },
      { name: "Support vitesse", moves: ["thunder-wave", "volt-switch", "encore", "protect"] },
    ],
  },
  {
    key: "weavile",
    apiName: "weavile",
    name: "Dimoret",
    types: ["ice", "dark"],
    sets: [
      { name: "Sweeper physique", moves: ["ice-shard", "night-slash", "poison-jab", "swords-dance"] },
      { name: "Anti-setup", moves: ["knock-off", "ice-shard", "low-sweep", "taunt"] },
    ],
  },
  {
    key: "abomasnow",
    apiName: "abomasnow",
    name: "Blizzaroi",
    types: ["grass", "ice"],
    sets: [
      { name: "Spécial bulky", moves: ["blizzard", "energy-ball", "sludge-bomb", "protect"] },
      { name: "Physique lent", moves: ["wood-hammer", "avalanche", "earthquake", "curse"] },
    ],
  },
  {
    key: "lucario",
    apiName: "lucario",
    name: "Lucario",
    types: ["fighting", "steel"],
    sets: [
      { name: "Mixte setup", moves: ["close-combat", "aura-sphere", "extreme-speed", "swords-dance"] },
      { name: "Spécial", moves: ["aura-sphere", "shadow-ball", "ice-beam", "calm-mind"] },
    ],
  },
  {
    key: "machamp",
    apiName: "machamp",
    name: "Mackogneur",
    types: ["fighting"],
    sets: [
      { name: "Bourrin", moves: ["close-combat", "ice-punch", "thunder-punch", "bulk-up"] },
      { name: "Tank", moves: ["fire-punch", "payback", "counter", "protect"] },
    ],
  },
  {
    key: "gengar",
    apiName: "gengar",
    name: "Ectoplasma",
    types: ["ghost", "poison"],
    sets: [
      { name: "Glass cannon", moves: ["shadow-ball", "sludge-bomb", "focus-blast", "hypnosis"] },
      { name: "Contrôle", moves: ["taunt", "disable", "shadow-ball", "protect"] },
    ],
  },
  {
    key: "aegislash",
    apiName: "aegislash-shield",
    name: "Exagide",
    types: ["steel", "ghost"],
    sets: [
      { name: "Mixte", moves: ["sacred-sword", "shadow-ball", "iron-head", "kings-shield"] },
      { name: "Stall", moves: ["kings-shield", "toxic", "drain-punch", "shadow-ball"] },
    ],
  },
  {
    key: "salamence",
    apiName: "salamence",
    name: "Drattak",
    types: ["dragon", "flying"],
    sets: [
      { name: "Sweeper", moves: ["draco-meteor", "fire-blast", "air-slash", "dragon-dance"] },
      { name: "Physique", moves: ["outrage", "earthquake", "fire-punch", "dragon-dance"] },
    ],
  },
  {
    key: "garchomp",
    apiName: "garchomp",
    name: "Carchacrok",
    types: ["dragon", "ground"],
    sets: [
      { name: "Physique", moves: ["earthquake", "outrage", "stone-edge", "swords-dance"] },
      { name: "Mixte", moves: ["draco-meteor", "earthquake", "flamethrower", "protect"] },
    ],
  },
  {
    key: "metagross",
    apiName: "metagross",
    name: "Métalosse",
    types: ["steel", "psychic"],
    sets: [
      { name: "Tank offensif", moves: ["meteor-mash", "zen-headbutt", "earthquake", "ice-punch"] },
      { name: "Setup", moves: ["meteor-mash", "low-sweep", "swords-dance", "protect"] },
    ],
  },
  {
    key: "alakazam",
    apiName: "alakazam",
    name: "Alakazam",
    types: ["psychic"],
    sets: [
      { name: "Glass cannon", moves: ["psychic", "shadow-ball", "focus-blast", "calm-mind"] },
      { name: "Contrôle", moves: ["psychic", "encore", "taunt", "protect"] },
    ],
  },
  {
    key: "absol",
    apiName: "absol",
    name: "Absol",
    types: ["dark"],
    sets: [
      { name: "Burst", moves: ["night-slash", "brick-break", "psychic-fangs", "swords-dance"] },
      { name: "Harcèlement", moves: ["taunt", "knock-off", "night-slash", "protect"] },
    ],
  },
  {
    key: "scizor",
    apiName: "scizor",
    name: "Cizayox",
    types: ["bug", "steel"],
    sets: [
      { name: "Setup", moves: ["bullet-punch", "u-turn", "superpower", "swords-dance"] },
      { name: "Bulky", moves: ["bullet-punch", "roost", "knock-off", "protect"] },
    ],
  },
  {
    key: "pinsir",
    apiName: "pinsir",
    name: "Scarabrute",
    types: ["bug"],
    sets: [
      { name: "Bourrin", moves: ["close-combat", "x-scissor", "stone-edge", "swords-dance"] },
      { name: "Anti-tank", moves: ["earthquake", "x-scissor", "taunt", "protect"] },
    ],
  },
  {
    key: "tyranitar",
    apiName: "tyranitar",
    name: "Tyranocif",
    types: ["rock", "dark"],
    sets: [
      { name: "Tank offensif", moves: ["stone-edge", "crunch", "earthquake", "curse"] },
      { name: "Pression", moves: ["stone-edge", "bite", "taunt", "protect"] },
    ],
  },
  {
    key: "rhyperior",
    apiName: "rhyperior",
    name: "Rhinastoc",
    types: ["ground", "rock"],
    sets: [
      { name: "Bourrin", moves: ["earthquake", "stone-edge", "ice-punch", "swords-dance"] },
      { name: "Tank", moves: ["earthquake", "stone-edge", "protect", "curse"] },
    ],
  },
  {
    key: "gardevoir",
    apiName: "gardevoir",
    name: "Gardevoir",
    types: ["psychic", "fairy"],
    sets: [
      { name: "Spécial", moves: ["psychic", "moonblast", "thunderbolt", "calm-mind"] },
      { name: "Support", moves: ["thunder-wave", "psyshock", "taunt", "protect"] },
    ],
  },
];
