export const TYPE_CHART = {
  fire: { grass: 2, water: 0.5, fire: 0.5, ice: 2, steel: 2 },
  water: { fire: 2, grass: 0.5, water: 0.5, ground: 2, rock: 2 },
  grass: { water: 2, fire: 0.5, grass: 0.5, ground: 2, rock: 2 },
  electric: { water: 2, grass: 0.5, electric: 0.5, flying: 2, ground: 0 },
  ground: { electric: 2, fire: 2, flying: 0, rock: 2, steel: 2 },
  dragon: { dragon: 2, fairy: 0, steel: 0.5 },
  fairy: { dragon: 2, fighting: 2, dark: 2, fire: 0.5, steel: 0.5 },
};

export function typeEffect(moveType, defenderTypes) {
  let mult = 1;
  for (const t of defenderTypes) {
    const row = TYPE_CHART[moveType];
    const m = row?.[t];
    if (m != null) mult *= m;
  }
  return mult;
}
