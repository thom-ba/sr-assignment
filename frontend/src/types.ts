export interface Event {
    id: number;
    dateTime: string;
    sport: string;
    venue: string;
    homeTeam: string;
    awayTeam: string;
    description?: string;
}
