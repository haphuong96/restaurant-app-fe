export type AdminProduct = {
    id: number,
    name: string,
    thumbnail: string,
    price: number,
    current_price: number,
    description: string,
    category: AdminProductCategory,
    is_active: boolean,
    is_best_seller: boolean
}

export type AdminProductCategory = {
    id: number,
    name: string
}