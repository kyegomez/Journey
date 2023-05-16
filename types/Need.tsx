export interface Need {
    completion?: number;
    need_tier?: string;
    id?: string;
    children?: Need[]
}

