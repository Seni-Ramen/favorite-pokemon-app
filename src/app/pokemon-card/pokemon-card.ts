import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pokemon } from '../pokemon.models';

@Component({
  imports: [RouterLink],
  selector: 'app-pokemon-card',
  standalone: true,
  styleUrl: './pokemon-card.css',
  templateUrl: './pokemon-card.html',
})
export class PokemonCard {
  pokemon = input.required<Pokemon>();
}
