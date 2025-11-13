export interface AppEvent {
    id: number;
    competition: Competition;
    eventType: EventType;
    venue: Venue;
    homeTeam: Team;
    awayTeam: Team;
    dateTime: string;
    description?: string;
    name: string;
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

export interface Team {
    id: number,
    name: string,
    countryCode: string,
}
