import React, { useCallback, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { Navbar } from './components/Navbar';
import { EventList } from './components/EventList';
import { Event } from './types';
import Background from "./components/assets/Background.webp";
import { AddModalEvent } from './components/AddEventModal';

function App() {
    const mockEvents: Event[] = [
        {
            id: 1,
            dateTime: "2025-11-04T15:30:00",
            sport: "Tennis",
            venue: "Wiener Stadthalle, Vienna",
            homeTeam: "Player A",
            awayTeam: "Player B",
            description: "Quarterfinal match of the Vienna Open."
        },
        {
            id: 1,
            dateTime: "2025-11-04T15:30:00",
            sport: "Tennis",
            venue: "Wiener Stadthalle, Vienna",
            homeTeam: "Player A",
            awayTeam: "Player B",
            description: "Quarterfinal match of the Vienna Open."
        },
        {
            id: 1,
            dateTime: "2025-11-04T15:30:00",
            sport: "Tennis",
            venue: "Wiener Stadthalle, Vienna",
            homeTeam: "Player A",
            awayTeam: "Player B",
            description: "Quarterfinal match of the Vienna Open."
        },
        {
            id: 1,
            dateTime: "2025-11-04T15:30:00",
            sport: "Tennis",
            venue: "Wiener Stadthalle, Vienna",
            homeTeam: "Player A",
            awayTeam: "Player B",
            description: "Quarterfinal match of the Vienna Open."
        },
        {
            id: 1,
            dateTime: "2025-11-04T15:30:00",
            sport: "Tennis",
            venue: "Wiener Stadthalle, Vienna",
            homeTeam: "Player A",
            awayTeam: "Player B",
            description: "Quarterfinal match of the Vienna Open."
        }
    ]

    const [isModalOpen, setIsModalOpen] = useState(false);
    const sports = [{
        id: 1,
        name: "Ernsthappel Stadion",
        city: "Vienna",
        capacity: 10,
    }];
    const venues = [{
        id: 1,
        name: "Test Venue",
        city: "test",
    }];

    const handleAddEvent = () => { }

    const handleAddSportEvent = (name: String) => {
        return {
            id: 1,
            name: "newsport",
            city: "vienna",
            capacity: 0,
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <div className=''>
                <div
                    style={{ backgroundImage: `url(${Background})` }}
                    className="bg-cover bg-center min-h-screen w-full"
                >
                    <div className='pt-10 px-10'>
                        <div className='flex justify-between items-center px-6 py-3 bg-[#00003c] rounded-lg shadow-md'>
                            <h1 className='text-4xl text-white font-bold tracking-tight'>
                                Upcoming Events
                            </h1>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className='bg-[#ea3323] hover:bg[#c62b1d] text-white font-semibold px-5 py-2 rounded-md transition-all duration-200'>
                                Add Event
                            </button>
                        </div>
                        <div className='pt-5'>
                            <EventList events={mockEvents} />
                        </div>

                        {isModalOpen && (
                            <AddModalEvent
                                onClose={() => setIsModalOpen(false)}
                                onAddEvent={handleAddEvent}
                                onAddSport={handleAddSportEvent}
                                sports={sports}
                                venues={venues}
                            />
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
