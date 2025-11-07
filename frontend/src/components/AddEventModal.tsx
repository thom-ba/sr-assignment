import React, { useState } from "react";
import { Category, Competition, Sport, Venue } from "../types";
import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import { CirclePlus } from "lucide-react";
import { Button } from "./ui/Button";
import { saveSport } from "../services/sportService";

interface AddEventModalProps {
    onClose: () => void;
    onAddEvent: (event: Omit<Event, 'id'>) => void;
    onAddSport: (newSport: Sport) => void;
    onAddCompetition: (newCompetition: Competition) => void;
    onAddCategory: (newCategory: Category) => void;
    categories: Category[],
    sports: Sport[];
    venues: Venue[];
    competitions: Competition[];
}

export const AddModalEvent: React.FC<AddEventModalProps> = ({ onClose, onAddEvent, onAddSport, categories, sports, venues, competitions }) => {
    const [formData, setFormData] = useState({
        dateTime: '',
        sportId: sports[0]?.id || '',
        venueId: sports[0]?.id || '',
        competitionId: sports[0]?.id || '',
        homeTeam: '',
        awayTeam: '',
        description: '',
    })
    const [isAddingNewCompetition, setIsAddingNewCompetition] = useState(false)
    const [newCompetitionData, setNewCompetitionData] = useState({
        name: '',
        categoryId: '',
        year: new Date().getFullYear().toString(),
    });

    const [isAddingNewSport, setIsAddingNewSport] = useState(false)
    const [newSportName, setNewSportName] = useState('')

    const [isAddingNewVenue, setIsAddingNewVenue] = useState(false)
    const [newVenueName, setNewVenueName] = useState('')

    const handleSubmit = () => { }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSaveNewSport = async () => {
        try {
            const newSport = await saveSport(newSportName);
            onAddSport(newSport);
            setFormData(prev => ({ ...prev, sportId: newSport.id }))
            setNewSportName("");
            setIsAddingNewSport(false);
        } catch (error) {
            console.error("Failed to save new sport: ", error)
        }
    };

    const handleSaveNewVenue = () => { }

    const handleSaveNewCompetition = () => { }

    console.log(sports);

    return (
        <Modal title="Add new Event" onClose={onClose}>
            <form onSubmit={handleSubmit} className="">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="flex justify-between items-center pt-4 pb-1">
                            <label htmlFor="sportId" className="text-sm font-medium text-gray-300">Sport</label>
                            {!isAddingNewSport && (
                                <button type="button" onClick={() => setIsAddingNewSport(true)} className="flex items-center gap-1 text-sm text-emerald-500">
                                    <CirclePlus className="w-4 h-4" />
                                    New
                                </button>
                            )}
                        </div>
                        {!isAddingNewSport ? (
                            <div>
                                <select name="sportId" id="sportId" value={formData.sportId} onChange={handleChange} className="w-full bg-gray-700 py-2 px-2 rounded-md border border-gray-600">
                                    {sports.map(sport => <option key={sport.id} value={sport.id}>{sport.name}</option>)}
                                </select>
                            </div>
                        ) : (
                            <div className="bg-gray-700 px-2 rounded-lg border border-gray-600">
                                <Input id="newSport" name="newSport" label="New Sport Name" value={newSportName} onChange={(e) => setNewSportName(e.target.value)} />
                                <div className="flex justify-end gap-2 pb-1">
                                    <Button variant="primary" type="button" size="small" onClick={() => setIsAddingNewSport(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="button" variant="primary" size="small" onClick={(handleSaveNewSport)}>
                                        Save Sport
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="flex justify-between items-center pt-4 pb-1">
                            <label htmlFor="comeptitionId" className="text-sm font-medium text-gray-300">Competition</label>
                            {!isAddingNewCompetition && (
                                <button type="button" onClick={() => setIsAddingNewCompetition(true)} className="flex items-center gap-1 text-sm text-emerald-500">
                                    <CirclePlus className="w-4 h-4" />
                                    New
                                </button>
                            )}
                        </div>
                        {!isAddingNewCompetition ? (
                            <div>
                                <select name="competitionId" id="competitionId" value={formData.competitionId} onChange={handleChange} className="w-full bg-gray-700 py-2 px-2 rounded-md border border-gray-600">
                                    {competitions.map(competition => <option key={competition.id} value={competition.id}>{competition.name}</option>)}
                                </select>
                            </div>
                        ) : (
                            <div className="bg-gray-700 px-2 rounded-lg border border-gray-600">
                                <Input id="newCompetition" name="newCompetition" label="New Competition Name" value={newCompetitionData.name} onChange={(e) => setNewCompetitionData(n => ({
                                    ...n, name: e.target.value
                                }))}
                                />
                                <div className="pt-2">
                                    <label htmlFor="newCompetitionCategory" className="text-gray-300 text-sm">Competition Category</label>
                                    <select name="competitionId" id="competitionId" value={formData.competitionId}
                                        onChange={(e) => setNewCompetitionData(n => ({ ...n, categoryId: e.target.value }))}
                                        className="w-full bg-gray-700 py-2 px-2 rounded-md border border-gray-600">
                                        {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                                    </select>
                                </div>

                                <Input id="newCompetitionYear" name="year" label="Year" value={newCompetitionData.year}
                                    onChange={(e) => setNewCompetitionData(n => ({ ...n, year: e.target.value }))}
                                />

                                <div className="flex justify-end gap-2 pb-1">
                                    <Button variant="primary" type="button" size="small" onClick={() => setIsAddingNewCompetition(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="button" variant="primary" size="small" onClick={(handleSaveNewCompetition)}>
                                        Save Competition
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input id="homeTeam" name="homeTeam" label="Home Team" value={formData.homeTeam} onChange={handleChange} />
                    <Input id="awayTeam" name="awayTeam" label="Away Team" value={formData.awayTeam} onChange={handleChange} />
                </div>
                <Input id="dateTime" name="dateTime" label="Date and Time" type="datetime-local" value={formData.dateTime} onChange={handleChange}></Input>

                <div>
                    <div className="flex justify-between items-center pt-4 pb-1">
                        <label htmlFor="venueId" className="text-sm font-medium text-gray-300">Venue</label>
                        {!isAddingNewVenue && (
                            <button type="button" onClick={() => setIsAddingNewVenue(true)} className="flex items-center gap-1 text-sm text-emerald-500">
                                <CirclePlus className="w-4 h-4" />
                                New
                            </button>
                        )}
                    </div>
                    {!isAddingNewVenue ? (
                        <div>
                            <select name="venueId" id="venueId" value={formData.venueId} onChange={handleChange} className="w-full bg-gray-700 py-2 px-2 rounded-md border border-gray-600">
                                {venues.map(venue => <option key={venue.id} value={venue.id}>{venue.name}</option>)}
                            </select>
                        </div>
                    ) : (
                        <div className="bg-gray-700 px-2 rounded-lg border border-gray-600">
                            <Input id="newVenue" name="newVenue" label="New Venue Name" value={newVenueName} onChange={(e) => setNewVenueName(e.target.value)} />
                            <div className="flex justify-end gap-2 pb-1">
                                <Button variant="primary" type="button" size="small" onClick={() => setIsAddingNewVenue(false)}>
                                    Cancel
                                </Button>
                                <Button type="button" variant="primary" size="small" onClick={(handleSaveNewVenue)}>
                                    Save Venue
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
                <Input id="description" name="description" label="Description (Optional)" value={formData.description} onChange={handleChange} />

                <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="primary" onClick={onClose}> Cancel </Button>
                    <Button type="submit" variant="primary"> Add Event</Button>
                </div>
            </form>
        </Modal >
    )
}
