import { TestBed } from '@angular/core/testing';
import { PokemartService } from './pokemart';

describe('Pokemart', () => {
  let service: PokemartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
