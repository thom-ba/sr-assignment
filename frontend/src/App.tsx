import React, { useCallback, useEffect, useState } from "react";
import logo from "./logo.svg";

import { Navbar } from "./components/Navbar";
import { EventList } from "./components/EventList";
import { Category, Competition, AppEvent, EventType, Sport, Team, Venue } from "./types";
import Background from "./components/assets/Background.webp";
import { AddModalEvent } from "./components/AddEventModal";
import { getSports } from "./services/sportService";
import { getCompetitions } from "./services/competitionService";
import { getCategories } from "./services/categoryService";
import { getVenues } from "./services/venueService";
import { getTeams } from "./services/teamService";
import { getEvents } from "./services/eventService";
import { getEventTypes } from "./services/eventTypesService";

function App() {
    const [sports, setSports] = useState<Sport[]>([]);
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [venues, setVenues] = useState<Venue[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [events, setEvents] = useState<AppEvent[]>([]);
    const [eventTypes, setEventTypes] = useState<EventType[]>([]);

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
                const parsedCompetitions: Competition[] = data.map((c: any) => {
                    return (
                        {
                            id: c.id,
                            name: c.competition_name,
                            sport_id: c.sport.ID,
                            year: c.year,
                        })
                });
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

        const fetchTeams = async () => {
            try {
                const data = await getTeams();
                console.log(data);
                const parsedTeams: Team[] = data.map((t: any) => ({
                    id: t.ID,
                    name: t.Name,
                    countryCode: t.CountryCode,
                }));
                setTeams(parsedTeams);
            } catch (error) {
                console.error("Error retrieving venues: ", error);
            }
        };
        fetchTeams();

        const fetchEventTypes = async () => {
            try {
                const data = await getEventTypes();
                const parsedEventTypes: EventType[] = data.map((e: any) => ({
                    id: e.Id,
                    name: e.Name,
                }));
                setEventTypes(parsedEventTypes);
            } catch (error) {
                console.error("Error retreiving event types: ", error);
            }
        }
        fetchEventTypes();

        const fetchEvents = async () => {
            try {
                const data = await getEvents();
                const parsedEvents: AppEvent[] = data.map((e: any) => {
                    return {
                        id: e.id,
                        competition: {
                            id: e.competition.ID,
                            name: e.competition.Name,
                            sport_id: e.competition.Sport.ID,
                            year: e.competition.Year,
                            sport: {
                                id: e.competition.Sport.ID,
                                name: e.competition.Name
                            },
                            category: {
                                id: e.competition.Category.ID,
                                name: e.competition.Category.Name
                            }
                        },
                        eventType: { id: e.eventType.ID, name: e.eventType.Name },
                        venue: { id: e.venue.ID, name: e.venue.Name, city: e.venue.City, capacity: e.venue.Capacity },
                        homeTeam: { id: e.homeTeam.ID, name: e.homeTeam.Name, countryCode: e.homeTeam.CountryCode },
                        awayTeam: { id: e.awayTeam.ID, name: e.awayTeam.Name, countryCode: e.awayTeam.CountryCode },
                        dateTime: e.eventDateTime,
                        description: e.description,
                        name: e.name,
                    }
                });


                setEvents(parsedEvents);
            } catch (error) {
                console.error("Error retrieving events: ", error);
            }
        }
        fetchEvents();
    }, []);


    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddEvent = (event: AppEvent) => {

    };

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

    const handleAddEventType = (newEventType: EventType) => { };

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
                            <EventList events={events} />
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
                                teams={teams}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
