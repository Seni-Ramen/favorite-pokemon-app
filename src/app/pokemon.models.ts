export interface Pokemon {
    id: number
    name: string
    type: string
    heldItem: string
    description: string
    imageUrl: string
}

export interface ShopItem {
    id: number
    name: string
    cost: number
    category: string
    description: string
    imageUrl: string
}

export interface CartItem {
    item: ShopItem
    quantity: number
}