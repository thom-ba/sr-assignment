import React from "react";
import { AppEvent } from "../types";
import { Clock1, DeleteIcon, LocationEditIcon, MapPin, Pencil, PencilIcon, TrashIcon } from "lucide-react";

interface EventListItemProps {
    event: AppEvent;
    onDelete: (event: AppEvent) => void;
}

const EventListItem: React.FC<EventListItemProps> = ({ event, onDelete }) => {
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
        <div className="relative group items-center rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-4 flex justify-between items-center bg-[#ea3323] rounded-t-lg">
                <h2 className="text-white font-semibold">{event.competition.name || 'Unknown Competition'}</h2>
                <div className="flex gap-4 items-center translate-x-[38px] group-hover:translate-x-0 transition-transform duration-200">
                    <div className="bg-black/50 text-white px-2 py-1 rounded-full">
                        {date}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                            className="bg-black/50 rounded-lg p-2 text-red-500 hover:text-red-600"
                            onClick={(e) => { e.stopPropagation(); onDelete(event); }}
                        >
                            <TrashIcon
                                className="w-5 h-5"
                            />
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-[#00003c]">
                <div className="p-6">
                    <div className="flex flex-col items-center text-center mb-4">
                        <div className="flex items-center justify-center gap-4 w-full text-white">
                            <span className="text-2xl font-bold">{event.homeTeam.name}</span>
                            <span className="text-gray-400">vs</span>
                            <span className="text-2xl font-bold">{event.awayTeam.name}</span>
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
                        <span>{event.venue.name}</span>
                    </div>
                </div>

                {/* <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-center items-center gap-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                    {/* <button
                        className="flex items-center gap-2 py-2 px-4 bg-red-600 backdrop-blur-sm rounded-lg"
                    >
                        <TrashIcon className="w-4 h-4" />
                        <span>Delete</span>
                    </button> */}
                {/* </div> */}
            </div>
        </div>
    );
};

interface EventListProps {
    events: AppEvent[];
    onDelete: (event: AppEvent) => void;
}

export const EventList: React.FC<EventListProps> = ({ events, onDelete }) => {
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
                        <EventListItem key={event.id} event={event} onDelete={onDelete} />
                    ))}
                </div>
            )}
        </div>
    );
};
