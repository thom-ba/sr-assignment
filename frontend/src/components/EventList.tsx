import React from "react";
import { Event } from "../types";
import { Clock1, LocationEditIcon, MapPin } from "lucide-react";

interface EventListItemProps {
    event: Event;
}

const EventListItem: React.FC<EventListItemProps> = ({ event }) => {
    const eventDate = new Date(event.dateTime);
    const date = eventDate.toLocaleDateString("de-AT", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
    const time = eventDate.toLocaleTimeString("de-AT", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    return (
        <div className="items-center rounded-lg">
            <div className="p-4 flex justify-between items-center bg-[#ea3323] rounded-t-lg">
                <h2 className="text-white font-semibold">{event.sport}</h2>
                <div className="bg-black/50 text-white px-2 py-1 rounded-full">
                    {date}
                </div>
            </div>

            <div className="bg-[#00003c]">
                <div className="p-6">
                    <div className="flex flex-col items-center text-center mb-4">
                        <div className="flex items-center justify-center gap-4 w-full text-white">
                            <span className="text-2xl font-bold">{event.homeTeam}</span>
                            <span className="text-gray-400">vs</span>
                            <span className="text-2xl font-bold">{event.awayTeam}</span>
                        </div>
                        {event.description && <p className="text-gray-400 text-sm mt-2">{event.description}</p>}
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-4 mt-4 flex justify-between items-center text-gray-400 p-3">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">{time}</span>
                        <Clock1 className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2 text-right">
                        <MapPin className="w-5 h-5" />
                        <span>{event.venue}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface EventListProps {
    events: Event[];
}

const EventListComp: React.FC<EventListProps> = ({ events }) => {
    return (
        <div
            className="bg-cover bg-center min-h-screen w-full"
        >
            {events.length === 0 ? (
                <div className="flex justify-center items-center min-h-screen text-white text-xl">
                    No events yet
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-6">
                    {events.map((event) => (
                        <EventListItem key={event.id} event={event} />
                    ))}
                </div>
            )}
        </div>
    );
};

export function EventList({ events }: EventListProps) {
    return <EventListComp events={events} />;
}
