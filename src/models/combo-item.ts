import { MenuItem } from "./menu-item";

export interface ComboItem {
    id?: number;
    name: string;
    items: MenuItem[]; // Items included in the combo
    price: number;
    image?: string;
}
