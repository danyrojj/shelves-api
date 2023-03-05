export interface Content {
    productId: string;
    quantity: number;
}

export interface Cell {
    chilled: boolean;
    hazardous: boolean;
    content:Content,
    // capacity: number;
}

export type Shelves = Cell[][];