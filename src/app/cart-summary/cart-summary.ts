import { Component, input, output } from '@angular/core';
import { CartItem } from '../pokemon.models';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  templateUrl: './cart-summary.html',
  styleUrl: './cart-summary.css'
})
export class CartSummaryComponent {
  cart = input.required<CartItem[]>();
  total = input.required<number>();
  totalCount = input.required<number>();

  removeItem = output<number>();
  clearCart = output<void>();
}