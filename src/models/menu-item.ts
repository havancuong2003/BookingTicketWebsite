export interface MenuItem {
    id?: number;
    name: string;
    type: "FOOD" | "DRINK";
    price: number;
    image?: string;
    quantity: number;
}
