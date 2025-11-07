export interface Event {
    id: number;
    dateTime: string;
    sport: string;
    venue: string;
    homeTeam: string;
    awayTeam: string;
    description?: string;
}

export interface Venue {
    id: number;
    name: string;
    city: string;
    capacity: number;
}

export interface Sport {
    id: number;
    name: string;
}

export interface Category  {
    id: number;
    name: string;
}

export interface EventType {
    id: number,
    name: string,
}

export interface Competition {
    id: number;
    sport_id: number;
    category_id?: number;
    name: string;
    year: string;
}
