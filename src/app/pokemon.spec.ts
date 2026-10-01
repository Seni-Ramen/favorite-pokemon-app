import { TestBed } from '@angular/core/testing';
import { PokemonService } from './pokemon';

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonService);
  });

  it('should include evolution stages for starter Pokémon', () => {
    const ids = service.getAllPokemon().map((pokemon) => pokemon.id);

    expect(ids).toContain(2);
    expect(ids).toContain(3);
    expect(ids).toContain(5);
    expect(ids).toContain(6);
    expect(ids).toContain(8);
    expect(ids).toContain(9);
    expect(ids).toContain(26);
    expect(ids).toContain(153);
    expect(ids).toContain(154);
  });

  it('should show base forms in region lists while retaining evolved forms for detail views', () => {
    const kantoIds = service.getPokemonByRegion('kanto')().map((pokemon) => pokemon.id);
    const allIds = service.getAllPokemon().map((pokemon) => pokemon.id);

    expect(kantoIds).toContain(1);
    expect(kantoIds).toContain(172);
    expect(kantoIds).not.toContain(2);
    expect(kantoIds).not.toContain(25);
    expect(allIds).toContain(2);
    expect(allIds).toContain(25);
  });
});
