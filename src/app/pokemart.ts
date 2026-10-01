import { Injectable, signal, computed } from '@angular/core'
import { ShopItem, CartItem } from './pokemon.models'

@Injectable({
  providedIn: 'root'
})
export class PokemartService {
  private readonly inventory = signal([
    { id: 1, name: 'Poke Ball', cost: 200, category: '🔴 Ball', description: 'A device for capturing wild Pokémon.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png' },
    { id: 2, name: 'Great Ball', cost: 600, category: '🔵 Ball', description: 'A good Ball with a higher capture rate than a standard Poké Ball.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png' },
    { id: 3, name: 'Ultra Ball', cost: 1200, category: '🟡 Ball', description: 'An ultra-high performance Ball with high capture rates.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png' },
    { id: 4, name: 'Potion', cost: 300, category: '🧪 Medicine', description: 'Restores 20 HP to a single wounded Pokémon.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png' },
    { id: 5, name: 'Super Potion', cost: 700, category: '🧪 Medicine', description: 'Restores 60 HP to a single wounded Pokémon.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/super-potion.png' },
    { id: 6, name: 'Hyper Potion', cost: 1200, category: '🧪 Medicine', description: 'Restores 120 HP to a single wounded Pokémon.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/hyper-potion.png' },
    { id: 7, name: 'Revive', cost: 1500, category: '✨ Medicine', description: 'Revives a fainted Pokémon, restoring half of its maximum HP.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/revive.png' },
    { id: 8, name: 'Antidote', cost: 100, category: '💊 Status Recovery', description: 'Heals a single Pokémon afflicted with poisoning.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/antidote.png' },
    { id: 9, name: 'Paralyze Heal', cost: 200, category: '💊 Status Recovery', description: 'Cures a single Pokémon afflicted with paralysis.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/paralyze-heal.png' },
    { id: 10, name: 'Escape Rope', cost: 550, category: '🧗 Field Item', description: 'A long rope used to escape instantly from caves and dungeons.', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/escape-rope.png' }
  ])

private readonly cartItems = signal<CartItem[]>([])

  readonly items = this.inventory.asReadonly()
  readonly cart = this.cartItems.asReadonly()

  readonly totalCost = computed(() => {
    return this.cartItems().reduce((sum, cartEntry) => sum + (cartEntry.item.cost * cartEntry.quantity), 0)
  })

  readonly totalItemCount = computed(() => {
    return this.cartItems().reduce((sum, cartEntry) => sum + cartEntry.quantity, 0)
  })

  addToCart(item: ShopItem) {
    this.cartItems.update((currentCart) => {
      const index = currentCart.findIndex((entry) => entry.item.id === item.id)
      if (index > -1) {
        return currentCart.map((entry, i) =>
          i === index ? { ...entry, quantity: entry.quantity + 1 } : entry
        )
      }
      return [...currentCart, { item, quantity: 1 }]
    })
  }

  removeFromCart(itemId: number) {
    this.cartItems.update((currentCart) => {
      const existing = currentCart.find((entry) => entry.item.id === itemId)
      if (!existing) return currentCart
      if (existing.quantity > 1) {
        return currentCart.map((entry) =>
          entry.item.id === itemId ? { ...entry, quantity: entry.quantity - 1 } : entry
        )
      }
      return currentCart.filter((entry) => entry.item.id !== itemId)
    })
  }

  clearCart() {
    this.cartItems.set([])
  }
}