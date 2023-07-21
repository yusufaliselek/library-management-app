

export interface IShelf {
    id?: string;
    code: string;
    name: string;
    description: string;
    parts?: number;
}

export interface IPart {
    id?: number;
    name: string;
    description: string;
    shelveId: number;
    count: number;
}