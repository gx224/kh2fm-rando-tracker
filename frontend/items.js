{
  items: {
    // Worlds
    "worlds/simulated_twilight_town": { id: 1, data: "roxas" },
    "worlds/twilight_town": { id: 2, total: 3, data: "axel", },
    "worlds/hollow_bastion": { id: 3, total: 3, data: "demyx", secondary: "secondary/sephiroth", },
    "worlds/cavern_of_remembrance": {  id: 4, secondary: [ "depths", "mining", "engine", "transport" ].map(i => `secondary/cor/${i}`) },
    "worlds/land_of_dragons": { id: 5, total: 2, data: "xigbar", },
    "worlds/beast's_castle": { id: 6, total: 2, data: "xaldin", },
    "worlds/olympus_coliseum": { id: 7, total: 2, data: "zexion", secondary: [ "pain_panic", "cerberus", "titan", "goddess", "paradox" ].map(c => `secondary/cups/${c}`) },
    "worlds/disney_castle": { id: 8, data: "marluxia", secondary: "secondary/lingering_will", },
    "worlds/timeless_river": { id: 9 },
    "worlds/port_royal": { id: 10, total: 2, data: "luxord", },
    "worlds/agrabah": { id: 11, total: 2, data: "lexaeus", },
    "worlds/halloween_town": { id: 12, total: 2, data: "vexen", },
    "worlds/pride_land": { id: 13, total: 2, data: "saix", },
    "worlds/space_paranoids": { id: 14, total: 2, data: "larxene", },
    "worlds/the_world_that_never_was": { id: 15, data: "xemnas", secondary: [ "roxas", "xigbar", "luxord", "saix", "kingdom_hearts" ].map(i => `nobody/${i}`) },
    "worlds/atlantica": { id: 16, total: 6, data: "larxene", cls: "atlantica", },
    "worlds/100_acre_wood": { id: 17, total: 6, secondary: [ "page", "page2", "page3", "page4", "page5" ].map(p => `secondary/pages/${p}`), cls: "hundred_acre", },
    "worlds/underdrome_cups": { id: 18, total: 5, },
    "worlds/replica_data": { id: 19, total: 13, },

    // Level
    "other/sora's_level": { id: 20, total: 27, },

    // Drives
    "drive/valor": { id: 21, total: 7, secondary: [ "jump", "jump2", "jump3", "jump4" ].map(i => `secondary/drive/${i}`), cls: "drive", },
    "drive/wisdom": { id: 22, total: 7, secondary: [ "quick", "quick2", "quick3", "quick4" ].map(i => `secondary/drive/${i}`), cls: "drive", },
    "drive/limit": { id: 23, total: 7, secondary: [ "dodge", "dodge2", "dodge3", "dodge4" ].map(i => `secondary/drive/${i}`), cls: "drive", },
    "drive/master": { id: 24, total: 7, secondary: [ "aerial", "aerial2", "aerial3", "aerial4" ].map(i => `secondary/drive/${i}`), cls: "drive", },
    "drive/final": { id: 25, total: 7, secondary: [ "glide", "glide2", "glide3", "glide4" ].map(i => `secondary/drive/${i}`), cls: "drive", },

    // Magic
    "magic/fire": { id: 26, total: 3, },
    "magic/blizzard": { id: 27, total: 3, },
    "magic/thunder": { id: 28, total: 3, },
    "magic/cure": { id: 29, total: 3, },
    "magic/reflect": { id: 30, total: 3, },
    "magic/magnet": { id: 31, total: 3, },

    // Summons
    "summons/chicken_little": { id: 32, total: 7, group: "summon", },
    "summons/genie": { id: 33, total: 7, group: "summon", },
    "summons/stitch": { id: 34, total: 7, group: "summon", },
    "summons/peter_pan": { id: 35, total: 7, group: "summon", },

    // Other
    "other/secret_reports": { id: 36, total: 13, },
    "other/promise_charm": { id: 37 },
    "other/proof_of_nonexistence": { id: 38, secondary: [ "bronze", "silver", "gold" ].map(i => `secondary/crowns/${i}`) },
    "other/proof_of_connection": { id: 39, secondary: [ "bronze", "silver", "gold" ].map(i => `secondary/crowns/${i}`) },
    "other/proof_of_tranquility": { id: 40, secondary: [ "bronze", "silver", "gold" ].map(i => `secondary/crowns/${i}`) },
  },

  preloadImages: [
    ...[ ...Array(26).keys() ].map(i => `numbers/${i + 2}.png`),
    "numbers/max.png",
    ...[ ...Array(4).keys() ].map(i => `secondary/page${i + 2}.png`),

    "secondary/drive/jump.png",
    ...[ ...Array(3).keys() ].map(i => `secondary/drive/jump${i}.png`),

    "secondary/drive/quick.png",
    ...[ ...Array(3).keys() ].map(i => `secondary/drive/quick${i}.png`),

    "secondary/drive/dodge.png",
    ...[ ...Array(3).keys() ].map(i => `secondary/drive/dodge${i}.png`),

    "secondary/drive/aerial.png",
    ...[ ...Array(3).keys() ].map(i => `secondary/drive/aerial${i}.png`),

    "secondary/drive/glide.png",
    ...[ ...Array(3).keys() ].map(i => `secondary/drive/glide${i}.png`),

    ...[ "bronze", "silver", "gold" ].map(c => `secondary/crowns/${c}.png`),
    ...[ "pain_panic", "cerberus", "titan", "goddess", "paradox" ].map(c => `secondary/cups/${c}.png`),
    ...[ "roxas", "xigbar", "luxord", "saix", "kingdom_hearts" ].map(i => `nobody/${i}.png`),
    ...[ "depths", "mining", "engine", "transport" ].map(i => `secondary/cor/${i}.png`),
    "lingering_will.png",
    "sephiroth.png",
    "triangle.png",
  ],
}
