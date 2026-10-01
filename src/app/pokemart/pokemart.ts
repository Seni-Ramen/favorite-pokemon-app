import { Component, inject } from '@angular/core';
import { PokemartService } from '../pokemart';
import { CartSummaryComponent } from '../cart-summary/cart-summary';
import { ShopItem } from '../pokemon.models';

@Component({
  selector: 'app-pokemart',
  standalone: true,
  imports: [CartSummaryComponent],
  templateUrl: './pokemart.html',
  styleUrl: './pokemart.css'
})
export class PokemartComponent {
  private readonly martService = inject(PokemartService);

  readonly items = this.martService.items;
  readonly cart = this.martService.cart;
  readonly totalCost = this.martService.totalCost;
  readonly totalCount = this.martService.totalItemCount;

  onAdd(item: ShopItem): void {
    this.martService.addToCart(item);
  }

  onRemove(itemId: number): void {
    this.martService.removeFromCart(itemId);
  }

  onClear(): void {
    this.martService.clearCart();
  }
}