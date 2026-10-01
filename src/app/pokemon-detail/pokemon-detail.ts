import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Pokemon } from '../pokemon.models';
import { PokemonService } from '../pokemon';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css'
})
export class PokemonDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly pokemonService = inject(PokemonService);

  readonly pokemon = computed<Pokemon | undefined>(() => {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!id) {
      return undefined;
    }

    return this.pokemonService.getAllPokemon().find((entry) => entry.id === id);
  });

  readonly evolutionPaths = computed<Pokemon[][]>(() => {
    const selected = this.pokemon();

    if (!selected) {
      return [];
    }

    const evolutionMap: Record<number, number[]> = {
      1: [1, 2, 3],
      2: [1, 2, 3],
      3: [1, 2, 3],
      4: [4, 5, 6],
      5: [4, 5, 6],
      6: [4, 5, 6],
      7: [7, 8, 9],
      8: [7, 8, 9],
      9: [7, 8, 9],
      92: [92, 93, 94],
      93: [92, 93, 94],
      94: [92, 93, 94],
      143: [446, 143],
      446: [446, 143],
      246: [246, 247, 248],
      247: [246, 247, 248],
      248: [246, 247, 248],
      152: [152, 153, 154],
      153: [152, 153, 154],
      154: [152, 153, 154],
      155: [155, 156, 157],
      156: [155, 156, 157],
      157: [155, 156, 157],
      158: [158, 159, 160],
      159: [158, 159, 160],
      160: [158, 159, 160],
      252: [252, 253, 254],
      253: [252, 253, 254],
      254: [252, 253, 254],
      255: [255, 256, 257],
      256: [255, 256, 257],
      257: [255, 256, 257],
      258: [258, 259, 260],
      259: [258, 259, 260],
      260: [258, 259, 260],
      371: [371, 372, 373],
      372: [371, 372, 373],
      373: [371, 372, 373],
      374: [374, 375, 376],
      375: [374, 375, 376],
      376: [374, 375, 376]
    };

    const branchPaths: Record<number, number[][]> = {
      25: [[172, 25, 26]],
      26: [[172, 25, 26]],
      133: [[133, 196], [133, 197]],
      196: [[133, 196], [133, 197]],
      197: [[133, 196], [133, 197]],
      280: [[280, 281, 282], [280, 281, 475]],
      281: [[280, 281, 282], [280, 281, 475]],
      282: [[280, 281, 282], [280, 281, 475]],
      475: [[280, 281, 282], [280, 281, 475]]
    };
    const ids = branchPaths[selected.id] ?? [evolutionMap[selected.id] ?? [selected.id]];

    return ids.map((path) => path
      .map((id) => this.pokemonService.getAllPokemon().find((entry) => entry.id === id))
      .filter((entry): entry is Pokemon => !!entry));
  });
}
