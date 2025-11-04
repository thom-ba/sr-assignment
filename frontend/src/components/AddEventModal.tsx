import React, { useState } from "react";
import { Sport, Venue } from "../types";
import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";


interface AddEventModalProps {
    onClose: () => void;
    onAddEvent: (event: Omit<Event, 'id'>) => void;
    onAddSport: (name: string) => Sport;
    sports: Sport[];
    venues: Venue[];
}

const AddModalEventComp: React.FC<AddEventModalProps> = ({ onClose, onAddEvent, onAddSport, sports, venues }) => {
    const [formData, setFormData] = useState({
        dateTime: '',
        sportId: sports[0]?.id || '',
        venueId: sports[0]?.id || '',
        homeTeam: '',
        awayTeam: '',
        description: '',
    })

    const handleSubmit = () => { }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <Modal title="Add new Event" onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <Input id="homeTeam" name="homeTeam" label="Home Team" value={formData.homeTeam} onChange={handleChange} />
                    <Input id="awayTeam" name="awayTeam" label="Away Team" value={formData.awayTeam} onChange={handleChange} />
                </div>
                <Input id="dateTime" name="dateTime" label="Date and Time" type="datetime-local" value={formData.dateTime} onChange={handleChange}></Input>
            </form>
        </Modal>
    )
}

export function AddModalEvent({ onClose, onAddEvent, onAddSport, sports, venues }: AddEventModalProps) {
    return (
        <AddModalEventComp
            onClose={onClose}
            onAddEvent={onAddEvent}
            onAddSport={onAddSport}
            sports={sports}
            venues={venues}
        />
    )
}

