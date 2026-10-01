import { Routes } from '@angular/router';
import { RegionViewComponent } from './region-view/region-view';
import { PokemartComponent } from './pokemart/pokemart';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'kanto', pathMatch: 'full' },
  { path: 'kanto', component: RegionViewComponent, data: { region: 'kanto' } },
  { path: 'johto', component: RegionViewComponent, data: { region: 'johto' } },
  { path: 'hoenn', component: RegionViewComponent, data: { region: 'hoenn' } },
  { path: 'pokemart', component: PokemartComponent },
  { path: 'pokemon/:id', component: PokemonDetailComponent },
  { path: '**', redirectTo: 'kanto' }
];