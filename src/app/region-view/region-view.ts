import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon';
import { PokemonCard } from '../pokemon-card/pokemon-card';

@Component({
  selector: 'app-region-view',
  standalone: true,
  imports: [CommonModule, PokemonCard],
  templateUrl: './region-view.html',
  styleUrl: './region-view.css'
})
export class RegionViewComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly pokemonService = inject(PokemonService);

  private readonly routeData = toSignal(this.route.data);

  readonly currentRegion = computed<'kanto' | 'johto' | 'hoenn'>(() => {
    return (this.routeData()?.['region'] as 'kanto' | 'johto' | 'hoenn') || 'kanto';
  });

  readonly pokemonList = computed(() => {
    return this.pokemonService.getPokemonByRegion(this.currentRegion())();
  });
}