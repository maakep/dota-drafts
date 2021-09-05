const heroes = {
  'Ancient Apparition': 'ancient_apparition',
  'Anti-Mage': 'antimage', //
  'Arc Warden': 'arc_warden',
  'Bounty Hunter': 'bounty_hunter',
  'Chaos Knight': 'chaos_knight',
  Clockwerk: 'rattletrap', //
  'Crystal Maiden': 'crystal_maiden',
  Doom: 'doom_bringer', //
  Lifestealer: 'life_stealer', //
  Magnus: 'magnataur', //
  'Natures Prophet': 'furion', //
  Necrophos: 'necrolyte', //
  Nyx: 'nyx_assassin',
  'Outworld Destroyer': 'obsidian_destroyer', //
  'Queen of Pain': 'queenofpain', //
  'Shadow Fiend': 'nevermore', //
  Timbersaw: 'shredder', //
  'Treant Protector': 'treant', //
  'Wraith King': 'skeleton_king', //
  Zeus: 'zuus', //
};

export function getHeroInUrl(heroName) {
  return heroes[heroName] || heroName.toLowerCase().replaceAll(' ', '_');
}
