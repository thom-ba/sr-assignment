import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Navbar } from './components/Navbar';
import { EventList } from './components/EventList';
import { Event } from './types';
import Background from "./components/assets/Background.webp";

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
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <div className=''>
                <div
                    style={{ backgroundImage: `url(${Background})` }}
                    className="bg-cover bg-center min-h-screen w-full"
                >
                    <div className='pt-10 px-10 flex justify-between items-center mb-6 flex-wrap gap-4'>
                        <h1 className='text-4xl text-white font-bold tracking-tight pb-5'>
                            Upcoming Events
                        </h1>
                        <EventList events={mockEvents} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
