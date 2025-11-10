import React, { useCallback, useEffect, useState } from "react";
import logo from "./logo.svg";

import { Navbar } from "./components/Navbar";
import { EventList } from "./components/EventList";
import { Category, Competition, Event, EventType, Sport, Venue } from "./types";
import Background from "./components/assets/Background.webp";
import { AddModalEvent } from "./components/AddEventModal";
import { getSports } from "./services/sportService";
import { getCompetitions } from "./services/competitionService";
import { getCategories } from "./services/categoryService";
import { getVenues } from "./services/venueService";

function App() {
  const [sports, setSports] = useState<Sport[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const data = await getSports();
        const parsedSports: Sport[] = data.map((s: any) => ({
          id: s.ID,
          name: s.Name,
        }));
        setSports(parsedSports);
      } catch (error) {
        console.error("Error retrieving sports: ", error);
      }
    };
    fetchSports();

    const fetchCompetitions = async () => {
      try {
        const data = await getCompetitions();
        const parsedCompetitions: Competition[] = data.map((c: any) => ({
          id: c.ID,
          name: c.Name,
          sport_id: c.SportId,
          year: c.Year,
        }));
        setCompetitions(parsedCompetitions);
      } catch (error) {
        console.error("Error retrieving competitions: ", error);
      }
    };
    fetchCompetitions();

    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        const parsedCategories: Category[] = data.map((c: any) => ({
          id: c.ID,
          name: c.Name,
        }));
        setCategories(parsedCategories);
      } catch (error) {
        console.error("Error retrieving categories: ", error);
      }
    };
    fetchCategories();

    const fetchVenues = async () => {
      try {
        const data = await getVenues();
        const parsedVenues: Venue[] = data.map((v: any) => ({
          id: v.ID,
          name: v.Name,
          city: v.City,
          capacity: v.Capacity,
        }));

        setVenues(parsedVenues);
      } catch (error) {
        console.error("Error retrieving venues: ", error);
      }
    };
    fetchVenues();
  }, []);

  const mockEvents: Event[] = [
    {
      id: 1,
      dateTime: "2025-11-04T15:30:00",
      sport: "Tennis",
      venue: "Wiener Stadthalle, Vienna",
      homeTeam: "Player A",
      awayTeam: "Player B",
      description: "Quarterfinal match of the Vienna Open.",
    },
    {
      id: 1,
      dateTime: "2025-11-04T15:30:00",
      sport: "Tennis",
      venue: "Wiener Stadthalle, Vienna",
      homeTeam: "Player A",
      awayTeam: "Player B",
      description: "Quarterfinal match of the Vienna Open.",
    },
    {
      id: 1,
      dateTime: "2025-11-04T15:30:00",
      sport: "Tennis",
      venue: "Wiener Stadthalle, Vienna",
      homeTeam: "Player A",
      awayTeam: "Player B",
      description: "Quarterfinal match of the Vienna Open.",
    },
    {
      id: 1,
      dateTime: "2025-11-04T15:30:00",
      sport: "Tennis",
      venue: "Wiener Stadthalle, Vienna",
      homeTeam: "Player A",
      awayTeam: "Player B",
      description: "Quarterfinal match of the Vienna Open.",
    },
    {
      id: 1,
      dateTime: "2025-11-04T15:30:00",
      sport: "Tennis",
      venue: "Wiener Stadthalle, Vienna",
      homeTeam: "Player A",
      awayTeam: "Player B",
      description: "Quarterfinal match of the Vienna Open.",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddEvent = () => {};

  const handleAddVenue = (newVenue: Venue) => {
    setVenues((prev) => [...prev, newVenue]);
  };

  const handleAddSportEvent = (newSport: Sport) => {
    setSports((prev) => [...prev, newSport]);
  };

  const handleAddCompetition = (newCompetition: Competition) => {
    setCompetitions((prev) => [...prev, newCompetition]);
  };

  const handleAddCategory = (newCategory: Category) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  const handleAddEventType = (newEventType: EventType) => {};

  const eventTypes = [
    {
      id: 1,
      name: "WM",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="">
        <div
          style={{ backgroundImage: `url(${Background})` }}
          className="bg-cover bg-center min-h-screen w-full"
        >
          <div className="pt-10 px-10">
            <div className="flex justify-between items-center px-6 py-3 bg-[#00003c] rounded-lg shadow-md">
              <h1 className="text-4xl text-white font-bold tracking-tight">
                Upcoming Events
              </h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#ea3323] hover:bg[#c62b1d] text-white font-semibold px-5 py-2 rounded-md transition-all duration-200"
              >
                Add Event
              </button>
            </div>
            <div className="pt-5">
              <EventList events={mockEvents} />
            </div>

            {isModalOpen && (
              <AddModalEvent
                onClose={() => setIsModalOpen(false)}
                onAddEvent={handleAddEvent}
                onAddSport={handleAddSportEvent}
                onAddCompetition={handleAddCompetition}
                onAddCategory={handleAddCategory}
                onAddEventType={handleAddEventType}
                onAddVenue={handleAddVenue}
                eventTypes={eventTypes}
                categories={categories}
                competitions={competitions}
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
