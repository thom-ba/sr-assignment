import React, { useState } from "react";
import { Sport, Venue } from "../types";
import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import { CirclePlus } from "lucide-react";
import { Button } from "./ui/Button";


interface AddEventModalProps {
    onClose: () => void;
    onAddEvent: (event: Omit<Event, 'id'>) => void;
    onAddSport: (name: string) => Sport;
    sports: Sport[];
    venues: Venue[];
}

export const AddModalEvent: React.FC<AddEventModalProps> = ({ onClose, onAddEvent, onAddSport, sports, venues }) => {
    const [formData, setFormData] = useState({
        dateTime: '',
        sportId: sports[0]?.id || '',
        venueId: sports[0]?.id || '',
        homeTeam: '',
        awayTeam: '',
        description: '',
    })
    const [isAddingNewSport, setIsAddingNewSport] = useState(false)
    const [newSportName, setNewSportName] = useState('')

    const handleSubmit = () => { }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSaveNewSport = () => {

    }

    return (
        <Modal title="Add new Event" onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <Input id="homeTeam" name="homeTeam" label="Home Team" value={formData.homeTeam} onChange={handleChange} />
                    <Input id="awayTeam" name="awayTeam" label="Away Team" value={formData.awayTeam} onChange={handleChange} />
                </div>
                <Input id="dateTime" name="dateTime" label="Date and Time" type="datetime-local" value={formData.dateTime} onChange={handleChange}></Input>
                <div className="grid grid-cols-2 items-center mb-1">
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
                                <select name="sportId" id="sportId" value={formData.sportId} onChange={handleChange} className="w-full bg-gray-700 py-1 px-1 rounded-sm border border-gray-600">
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
                </div>
            </form>
        </Modal >
    )
}
