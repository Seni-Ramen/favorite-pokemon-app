import { computed, Injectable, signal } from '@angular/core';
import { Pokemon } from './pokemon.models';

@Injectable({
    providedIn: 'root'
})
export class PokemonService {
    private readonly baseFormIds = new Set([
        1, 4, 7, 92, 133, 172, 246, 446,
        152, 155, 158,
        252, 255, 258, 280, 371, 374
    ]);

    private readonly regions = {
        kanto: signal([
            { id: 1, name: 'Bulbasaur', type: '🌿 Grass / ☠️ Poison', heldItem: '🌱 Miracle Seed', description: 'Carries a seed on its back from birth that blooms as it grows.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
            { id: 2, name: 'Ivysaur', type: '🌿 Grass / ☠️ Poison', heldItem: '🌱 Miracle Seed', description: 'Its bulb grows larger as it absorbs sunlight and energy.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png' },
            { id: 3, name: 'Venusaur', type: '🌿 Grass / ☠️ Poison', heldItem: '🌱 Miracle Seed', description: 'Its flower blooms with intense power and can absorb sunlight.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png' },
            { id: 4, name: 'Charmander', type: '🔥 Fire', heldItem: '🪵 Charcoal', description: 'The flame on its tail indicates its life force and emotions.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
            { id: 5, name: 'Charmeleon', type: '🔥 Fire', heldItem: '🪵 Charcoal', description: 'Its claws and tail flames grow sharper as it matures.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png' },
            { id: 6, name: 'Charizard', type: '🔥 Fire / 🦅 Flying', heldItem: '🪵 Charcoal', description: 'A mighty dragon-like Pokémon that can soar across the sky.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png' },
            { id: 7, name: 'Squirtle', type: '💧 Water', heldItem: '💧 Mystic Water', description: 'Shelters inside its shell, then strikes back with strong water spouts.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
            { id: 8, name: 'Wartortle', type: '💧 Water', heldItem: '💧 Mystic Water', description: 'Its tail becomes more developed as it gains battle experience.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png' },
            { id: 9, name: 'Blastoise', type: '💧 Water', heldItem: '💧 Mystic Water', description: 'Its cannons fire compressed water with devastating force.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png' },
            { id: 172, name: 'Pichu', type: '⚡ Electric', heldItem: '🟡 Light Ball', description: 'A tiny Pokémon that stores a little electricity in its cheeks.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/172.png' },
            { id: 25, name: 'Pikachu', type: '⚡ Electric', heldItem: '🟡 Light Ball', description: 'Stores electricity in cheek pouches and discharges it when threatened.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
            { id: 133, name: 'Eevee', type: '⚪ Normal', heldItem: '🍎 Sitrus Berry', description: 'Its unstable genetic code allows it to evolve into several forms.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png' },
            { id: 26, name: 'Raichu', type: '⚡ Electric', heldItem: '🟡 Light Ball', description: 'A powerful electric Pokémon with a great reserve of stored energy.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png' },
            { id: 92, name: 'Gastly', type: '👻 Ghost / ☠️ Poison', heldItem: '🏷️ Spell Tag', description: 'A gaseous Pokémon that can envelop its surroundings in a toxic mist.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png' },
            { id: 93, name: 'Haunter', type: '👻 Ghost / ☠️ Poison', heldItem: '🏷️ Spell Tag', description: 'It lurks in darkness and uses its hands to drain the life from targets.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/93.png' },
            { id: 94, name: 'Gengar', type: '👻 Ghost / ☠️ Poison', heldItem: '🏷️ Spell Tag', description: 'Hides in shadows to absorb warmth from surroundings.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png' },
            { id: 246, name: 'Larvitar', type: '🪨 Rock / 🏜️ Ground', heldItem: '🪨 Hard Stone', description: 'It feeds on soil as it grows toward its powerful final form.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/246.png' },
            { id: 247, name: 'Pupitar', type: '🪨 Rock / 🏜️ Ground', heldItem: '🪨 Hard Stone', description: 'Its hard shell protects the powerful energy building within.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/247.png' },
            { id: 143, name: 'Snorlax', type: '⚪ Normal', heldItem: '🍎 Leftovers', description: 'Spends most of its day sleeping and eating huge amounts of food.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png' }
        ]),
        johto: signal([
            { id: 152, name: 'Chikorita', type: '🌿 Grass', heldItem: '🌱 Miracle Seed', description: 'Waves its leaf around to release a calming sweet aroma.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/152.png' },
            { id: 153, name: 'Bayleef', type: '🌿 Grass', heldItem: '🌱 Miracle Seed', description: 'A fragrant plant Pokémon whose body blooms with life.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/153.png' },
            { id: 154, name: 'Meganium', type: '🌿 Grass', heldItem: '🌱 Miracle Seed', description: 'Its heavy aroma pacifies battle and nurtures the land.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/154.png' },
            { id: 155, name: 'Cyndaquil', type: '🔥 Fire', heldItem: '🪵 Charcoal', description: 'Flares flames from its back when startled or angry.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/155.png' },
            { id: 156, name: 'Quilava', type: '🔥 Fire', heldItem: '🪵 Charcoal', description: 'Its flames burn hotter and more steadily with age.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/156.png' },
            { id: 157, name: 'Typhlosion', type: '🔥 Fire', heldItem: '🪵 Charcoal', description: 'Its blazing body can scorch the battlefield in an instant.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/157.png' },
            { id: 158, name: 'Totodile', type: '💧 Water', heldItem: '💧 Mystic Water', description: 'Possesses powerful jaws capable of biting through anything.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/158.png' },
            { id: 159, name: 'Croconaw', type: '💧 Water', heldItem: '💧 Mystic Water', description: 'Its jaw strength grows as it learns to bite through stone.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/159.png' },
            { id: 160, name: 'Feraligatr', type: '💧 Water', heldItem: '💧 Mystic Water', description: 'A giant predator that rules rivers with unstoppable force.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/160.png' },
            { id: 196, name: 'Espeon', type: '🔮 Psychic', heldItem: '🥄 Twisted Spoon', description: 'Reads air currents with fine fur to predict opponent actions.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/196.png' },
            { id: 197, name: 'Umbreon', type: '🌙 Dark', heldItem: '🕶️ Black Glasses', description: 'Rings on its body glow when darkness falls or during combat.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/197.png' },
            { id: 446, name: 'Munchlax', type: '⚪ Normal', heldItem: '🍎 Leftovers', description: 'It stores food beneath its fur and evolves through a strong bond.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/446.png' },
            { id: 248, name: 'Tyranitar', type: '🪨 Rock / 🌙 Dark', heldItem: '🪨 Hard Stone', description: 'Its armor skin resists damage, moving mountains with raw strength.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/248.png' }
        ]),
        hoenn: signal([
            { id: 252, name: 'Treecko', type: '🌿 Grass', heldItem: '🌱 Miracle Seed', description: 'Scales sheer vertical walls using tiny hooks on its soles.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/252.png' },
            { id: 253, name: 'Grovyle', type: '🌿 Grass', heldItem: '🌱 Miracle Seed', description: 'Its quick reflexes and vine-like limbs make it a master climber.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/253.png' },
            { id: 254, name: 'Sceptile', type: '🌿 Grass', heldItem: '🌱 Miracle Seed', description: 'A stealthy hunter and climber whose speed is remarkable.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/254.png' },
            { id: 255, name: 'Torchic', type: '🔥 Fire', heldItem: '🪵 Charcoal', description: 'Harbors a flame sac in its belly, launching 1800 degree fireballs.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/255.png' },
            { id: 256, name: 'Combusken', type: '🔥 Fire / 🥊 Fighting', heldItem: '🪵 Charcoal', description: 'A fierce fighter with blazing punches and relentless energy.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/256.png' },
            { id: 257, name: 'Blaziken', type: '🔥 Fire / 🥊 Fighting', heldItem: '🪵 Charcoal', description: 'Its fiery legs can launch explosive kicks with precision.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/257.png' },
            { id: 258, name: 'Mudkip', type: '💧 Water', heldItem: '💧 Mystic Water', description: 'Uses the fin on its head as radar to detect movements in water.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/258.png' },
            { id: 259, name: 'Marshtomp', type: '💧 Water / 🏜️ Ground', heldItem: '💧 Mystic Water', description: 'It grips the ground and digs in while defending its territory.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/259.png' },
            { id: 260, name: 'Swampert', type: '💧 Water / 🏜️ Ground', heldItem: '💧 Mystic Water', description: 'A huge amphibious Pokémon with massive power and endurance.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/260.png' },
            { id: 280, name: 'Ralts', type: '🔮 Psychic / ✨ Fairy', heldItem: '🛡️ Mind Plate', description: 'It senses the emotions of those nearby and hides in the shadows.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/280.png' },
            { id: 281, name: 'Kirlia', type: '🔮 Psychic / ✨ Fairy', heldItem: '🛡️ Mind Plate', description: 'This shy Pokémon uses psychic energy to protect its companions.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/281.png' },
            { id: 282, name: 'Gardevoir', type: '🔮 Psychic / ✨ Fairy', heldItem: '🛡️ Mind Plate', description: 'Protects its trainer at any cost using psychic powers.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/282.png' },
            { id: 475, name: 'Gallade', type: '🔮 Psychic / 🥊 Fighting', heldItem: '🛡️ Mind Plate', description: 'A precise warrior that protects others with its blade-like arms.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/475.png' },
            { id: 371, name: 'Bagon', type: '🐉 Dragon', heldItem: '🦷 Dragon Fang', description: 'It dreams of flying and trains by repeatedly leaping from cliffs.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/371.png' },
            { id: 372, name: 'Shelgon', type: '🐉 Dragon', heldItem: '🦷 Dragon Fang', description: 'It rests inside a sturdy shell while preparing to evolve.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/372.png' },
            { id: 373, name: 'Salamence', type: '🐉 Dragon / 🦅 Flying', heldItem: '🦷 Dragon Fang', description: 'Grew wings through sheer willpower and flies high in jubilation.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/373.png' },
            { id: 374, name: 'Beldum', type: '⚙️ Steel / 🔮 Psychic', heldItem: '🥋 Metal Coat', description: 'A compact steel Pokémon that can emit magnetic waves.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/374.png' },
            { id: 375, name: 'Metang', type: '⚙️ Steel / 🔮 Psychic', heldItem: '🥋 Metal Coat', description: 'Its two bodies share one mind and search for weak points.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/375.png' },
            { id: 376, name: 'Metagross', type: '⚙️ Steel / 🔮 Psychic', heldItem: '🥋 Metal Coat', description: 'Four brains linked together analyze battles like a supercomputer.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/376.png' }
        ])
    }

    getPokemonByRegion(region: 'kanto' | 'johto' | 'hoenn') {
        return computed(() => this.regions[region]().filter((pokemon) => this.baseFormIds.has(pokemon.id)));
    }

    getAllPokemon() {
        return [
            ...this.regions.kanto(),
            ...this.regions.johto(),
            ...this.regions.hoenn()
        ];
    }
}
