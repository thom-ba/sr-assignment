import React, { useReducer, useState } from "react";
import { Category, Competition, Sport, Venue } from "../types";
import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import { CirclePlus } from "lucide-react";
import { Button } from "./ui/Button";
import { saveSport } from "../services/sportService";
import { EventType } from "../types";
import { saveCompetition } from "../services/competitionService";
import { saveCategory } from "../services/categoryService";
import { saveVenue } from "../services/venueService";

interface AddEventModalProps {
    onClose: () => void;
    onAddEvent: (event: Omit<Event, 'id'>) => void;
    onAddSport: (newSport: Sport) => void;
    onAddCompetition: (newCompetition: Competition) => void;
    onAddCategory: (newCategory: Category) => void;
    onAddEventType: (newEventType: EventType) => void;
    onAddVenue: (newVenue: Venue) => void;
    eventTypes: EventType[],
    categories: Category[],
    sports: Sport[];
    venues: Venue[];
    competitions: Competition[];
}

interface FormState {
    step: number;
    competitionId: number;
    eventTypeId: number;
    homeTeam: string;
    awayTeam: string;
    dateTime: string;
    venueId: number;
    description: string;
}

type FormAction =
    | { type: 'SET_FIELD'; field: keyof Omit<FormState, 'step'>; value: string }
    | { type: 'NEXT_STEP' }
    | { type: 'PREVIOUS_STEP' }
    | { type: 'RESET' };

const initialState: FormState = {
    step: 1,
    competitionId: 0,
    eventTypeId: 0,
    homeTeam: '',
    awayTeam: '',
    dateTime: '',
    venueId: 0,
    description: '',
};

const formReducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value };
        case 'NEXT_STEP':
            return { ...state, step: state.step + 1 };
        case 'PREVIOUS_STEP':
            return { ...state, step: state.step - 1 };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
};

export const AddModalEvent: React.FC<AddEventModalProps> = ({ onClose, onAddEvent, onAddSport, onAddCategory, onAddCompetition, onAddVenue, eventTypes, categories, sports, venues, competitions }) => {
    const [state, dispatch] = useReducer(formReducer, {
        ...initialState,
        competitionId: competitions[0]?.id || 0,
        eventTypeId: eventTypes[0]?.id || 0,
        venueId: venues[0]?.id || 0,
    })
    const [step1View, setStep1View] = useState<'select' | 'addCompetition' | 'addSport' | 'addCategory' | 'addVenue'>('select');

    const [formData, setFormData] = useState({
        dateTime: '',
        sportId: sports[0]?.id || 0,
        venueId: sports[0]?.id || 0,
        competitionId: sports[0]?.id || 0,
        eventType: '',
        homeTeam: '',
        awayTeam: '',
        description: '',
    })

    const [newCompetitionData, setNewCompetitionData] = useState({
        name: '',
        sportId: 0,
        categoryId: 0,
        year: '',
    });
    const [newCategoryName, setNewCategoryName] = useState('')

    const [newVenueData, setNewVenueDataa] = useState({
        name: '',
        city: '',
        capacity: 0,
    });

    const [categorySearchTerm, setCategorySearchTerm] = useState('');
    const [competitionSearchTerm, setCompetitionSearchTerm] = useState('');
    const [sportSearchTerm, setSportSearchTerm] = useState('');

    const [newSportName, setNewSportName] = useState('')

    const handleFieldChange = (field: keyof Omit<FormState, 'step'>, value: any) => {
        dispatch({ type: 'SET_FIELD', field, value });
    }

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
            setStep1View('addCompetition')
        } catch (error) {
            console.error("Failed to save new sport: ", error)
        }
    };

    const handleSaveNewVenue = async () => {
        try {
            const venueToSave = {
                name: newVenueData.name,
                city: newVenueData.city,
                capacity: newVenueData.capacity,
            }

            const newVenue = await saveVenue(venueToSave);
            onAddVenue(newVenue);
            setFormData(prev => ({ ...prev, venueId: newVenue.id }));
            setNewVenueDataa({ name: '', city: '', capacity: 0 });
            setStep1View('select');
        } catch (error) {
            console.error("Failed to save new Venue: ", error);
        }
    }

    const handleSaveNewCompetition = async () => {
        try {
            const competitionToSave = {
                name: newCompetitionData.name,
                sport_id: newCompetitionData.sportId,
                category_id: newCompetitionData.categoryId,
                year: `${newCompetitionData.year}`,
            };

            const newCompetition = await saveCompetition(competitionToSave);

            onAddCompetition(newCompetition);

            setFormData(prev => ({ ...prev, competitionId: newCompetition.id }));

            setNewCompetitionData({ name: '', categoryId: 0, sportId: 0, year: '' });
            setStep1View('select');
        } catch (error) {
            console.error("Failed to save new Competition:", error);
        }
    }

    const handleSaveNewCategory = async () => {
        try {
            const newCategory = await saveCategory(newCategoryName);

            onAddCategory(newCategory)
            setNewCategoryName('');
            setStep1View('addCompetition')
        } catch (error) {
            console.error("Failed to save new Category: ", error);
        }
    }

    console.log(sports);

    const renderStepContent = () => {
        switch (state.step) {
            case 1:
                return (
                    <div className="space-y-4 ">
                        {(() => {
                            switch (step1View) {
                                case 'addSport':
                                    return (
                                        <div className="bg-gray-700 px-2 rounded-lg border border-gray-600">
                                            <h2 className="text-lg font-bold text-white">
                                                Create A New Sport
                                            </h2>
                                            <Input id="newSport" name="newSport" label="New Sport Name" value={newSportName} onChange={(e) => setNewSportName(e.target.value)} />
                                            <div className="flex justify-end gap-2 pb-1">
                                                <Button variant="primary" type="button" size="small" onClick={() => setStep1View('addCompetition')}>
                                                    Back
                                                </Button>
                                                <Button type="button" variant="primary" size="small" onClick={(handleSaveNewSport)}>
                                                    Save Sport
                                                </Button>
                                            </div>
                                        </div>
                                    );

                                case 'addCategory':
                                    return (
                                        <div className="bg-gray-700 px-4 py-4 rounded-lg border border-gray-400 mt-4">
                                            <h2 className="text-lg font-bold text-white pb-2">
                                                Create A New Category
                                            </h2>
                                            <Input id="newCategory" name="newCategory" label="New Category Name" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
                                            <div className="flex justify-end gap-2 pb-1">
                                                <Button type="button" variant="primary" size="small" onClick={() => setStep1View('addCompetition')}>
                                                    Back
                                                </Button>
                                                <Button type="button" variant="primary" size="small" onClickCapture={(handleSaveNewCategory)}>
                                                    Save Category
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                case 'addCompetition':
                                    return (
                                        <div className="pt-4">
                                            <div className="bg-gray-700 px-4 py-4 rounded-lg border border-gray-400">
                                                <h3 className="pb-3">
                                                    Create a New Competition
                                                </h3>
                                                <Input id="newCompetition" name="newCompetition" label="New Competition Name" value={newCompetitionData.name} onChange={(e) => setNewCompetitionData(n => ({
                                                    ...n, name: e.target.value
                                                }))}
                                                />

                                                <div className="pt-4">
                                                    <div className="flex justify-between items-center">
                                                        <label className="text-sm font-medium text-gray-300">Category</label>
                                                        <button type="button" onClick={() => setStep1View('addCategory')} className="flex items-center gap-1 text-sm text-emerald-500">
                                                            <CirclePlus className="w-4 h-4" />
                                                            New
                                                        </button>
                                                    </div>
                                                    <Input
                                                        id="category_search"
                                                        type="search"
                                                        placeholder="Search Categories..."
                                                        value={categorySearchTerm}
                                                        onChange={(e) => setCategorySearchTerm(e.target.value)}
                                                        label=""
                                                    />
                                                </div>
                                                <div className="max-h-32 overflow-y-auto border border-gray-600 bg-gray-600">
                                                    {categories
                                                        .filter(category => category.name?.toLowerCase().includes(categorySearchTerm.toLowerCase()))
                                                        .map(category => (
                                                            <button
                                                                key={category.id}
                                                                type="button"
                                                                onClick={() => {
                                                                    setNewCompetitionData(n => ({ ...n, categoryId: category.id }));
                                                                }}
                                                                className={`w-full text-left px-3 py-2 text-sm transition-colors ${newCompetitionData.categoryId === category.id
                                                                    ? 'bg-[#ea3323] text-white font-semibold'
                                                                    : 'text-gray-200 hover:bg-gray-700'
                                                                    }`}
                                                            >
                                                                {category.name}
                                                            </button>
                                                        ))}
                                                </div>

                                                <div className="pt-4">
                                                    <Input id="newCompetitionYear" name="year" label="Year" value={newCompetitionData.year}
                                                        onChange={(e) => setNewCompetitionData(n => ({ ...n, year: e.target.value }))}
                                                    />
                                                </div>

                                                <div className="pt-4">
                                                    <div className="flex justify-between items-center">
                                                        <label className="text-sm font-medium text-gray-300">Sport</label>
                                                        <button type="button" onClick={() => setStep1View('addSport')} className="flex items-center gap-1 text-sm text-emerald-500">
                                                            <CirclePlus className="w-4 h-4" />
                                                            New
                                                        </button>
                                                    </div>
                                                    <Input
                                                        id="sport-search"
                                                        type="search"
                                                        placeholder="Search sports..."
                                                        value={sportSearchTerm}
                                                        onChange={(e) => setSportSearchTerm(e.target.value)}
                                                        label=""
                                                    />
                                                </div>

                                                <div className="max-h-32 overflow-y-auto border border-gray-600 bg-gray-600">
                                                    {sports
                                                        .filter(sport => sport.name?.toLowerCase().includes(sportSearchTerm.toLowerCase()))
                                                        .map(sport => (
                                                            <button
                                                                key={sport.id}
                                                                type="button"
                                                                onClick={() => {
                                                                    setNewCompetitionData(n => ({ ...n, sportId: sport.id }));
                                                                }}
                                                                className={`w-full text-left px-3 py-2 text-sm transition-colors ${newCompetitionData.sportId === sport.id
                                                                    ? 'bg-[#ea3323] text-white font-semibold'
                                                                    : 'text-gray-200 hover:bg-gray-700'
                                                                    }`}
                                                            >
                                                                {sport.name}
                                                            </button>
                                                        ))}
                                                </div>

                                                <div className="flex justify-end gap-2">
                                                    <Button type="button" variant="primary" onClick={() => setStep1View('select')}>
                                                        Back
                                                    </Button>
                                                    <Button type="button" variant="primary" onClick={() => handleSaveNewCompetition()}>
                                                        Save Competition
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                case 'select':
                                default:
                                    return (
                                        <div className="bg-gray-700 px-4 py-4 rounded-lg border border-gray-400 mt-2">
                                            <div className="flex justify-between items-center pb-1">
                                                <label htmlFor="comeptitionId" className="text-sm font-medium text-gray-300">Competition</label>
                                                <button type="button" onClick={() => setStep1View('addCompetition')} className="flex items-center gap-1 text-sm text-emerald-500">
                                                    <CirclePlus className="w-4 h-4" />
                                                    New
                                                </button>
                                            </div>

                                            <div>
                                                <Input
                                                    id="competitionSearch"
                                                    type="search"
                                                    value={competitionSearchTerm}
                                                    onChange={(e) => setCompetitionSearchTerm(e.target.value)}
                                                    placeholder="Search competitions..."
                                                    label=""
                                                />
                                            </div>

                                            <div className="max-h-32 overflow-y-auto border border-gray-600 bg-gray-600">
                                                {competitions
                                                    .filter(competition => competition.name?.toLowerCase().includes(competitionSearchTerm.toLowerCase()))
                                                    .map(competition => (
                                                        <button
                                                            key={competition.id}
                                                            type="button"
                                                            onClick={() => handleFieldChange('competitionId', competition.id)}
                                                            className={`w-full text-left px-3 py-2 text-sm transition-colors ${state.competitionId === competition.id
                                                                ? 'bg-[#ea3323] text-white font-semibold'
                                                                : 'text-gray-200 hover:bg-gray-700'
                                                                }`}
                                                        >
                                                            {competition.name}
                                                        </button>
                                                    ))}
                                            </div>
                                        </div>
                                    );
                            }
                        })()}
                        {step1View === 'select' && (
                            <div>
                                <label htmlFor="eventType" className="text-gray-300 text-sm">Event Type</label>
                                <select name="eventType" id="eventType" value={formData.eventType} onChange={handleChange}
                                    className="w-full bg-gray-700 py-2 px-2 rounded-md border border-gray-400">
                                    {eventTypes.map(eventType => <option key={eventType.id} value={eventType.id}>{eventType.name}</option>)}
                                </select>
                            </div>
                        )}
                    </div>
                );
            case 2:
                return (
                    <div className="bg-gray-700 py-4 px-4 mt-4 rounded-lg border border-gray-400">
                        <div className="grid grid-cols-2 gap-4 pb-4">
                            <Input id="homeTeam" name="homeTeam" label="Home Team" value={formData.homeTeam} onChange={handleChange} />
                            <Input id="awayTeam" name="awayTeam" label="Away Team" value={formData.awayTeam} onChange={handleChange} />
                        </div>
                        <Input id="dateTime" name="dateTime" label="Date and Time" type="datetime-local" value={formData.dateTime} onChange={handleChange} />
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4">
                        {(() => {
                            switch (step1View) {
                                case 'addVenue':
                                    return (
                                        <div className="bg-gray-700 px-4 py-4 rounded-lg border border-gray-400 mt-4">
                                            <h2 className="text-lg font-md text-white pb-2">Create a New Venue</h2>
                                            <Input
                                                id="newVenueName"
                                                name="newVenueName"
                                                label="Venue Name"
                                                value={newVenueData.name}
                                                onChange={(e) => setNewVenueDataa(c => ({ ...c, name: e.target.value }))}
                                            />

                                            <div className="pt-4">
                                                <Input
                                                    id="newVenueCity"
                                                    name="newVenueCity"
                                                    label="City"
                                                    value={newVenueData.city}
                                                    onChange={(e) => setNewVenueDataa(c => ({ ...c, city: e.target.value }))}
                                                />
                                            </div>

                                            <div className="pt-4">
                                                <Input
                                                    id="newVenueCapacity"
                                                    name="newVenueCapacity"
                                                    label="Capacity"
                                                    value={newVenueData.capacity}
                                                    onChange={(e) => setNewVenueDataa(c => ({ ...c, capacity: Number(e.target.value) }))}
                                                />
                                            </div>

                                            <div className="flex justify-end gap-2 pt-2">
                                                <Button
                                                    type="button"
                                                    variant="primary"
                                                    size="small"
                                                    onClick={() => setStep1View('select')}
                                                >
                                                    Back
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="primary"
                                                    size="small"
                                                    onClick={handleSaveNewVenue}
                                                >
                                                    Save Venue
                                                </Button>
                                            </div>
                                        </div>
                                    );

                                case 'select':
                                default:
                                    return (
                                        <div className="bg-gray-700 px-4 py-4 rounded-lg border border-gray-400 mt-4">
                                            <div className="flex justify-between items-center pb-1">
                                                <label
                                                    htmlFor="venueId"
                                                    className="text-sm font-medium text-gray-300"
                                                >
                                                    Venue
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => setStep1View('addVenue')}
                                                    className="flex items-center gap-1 text-sm text-emerald-500"
                                                >
                                                    <CirclePlus className="w-4 h-4" />
                                                    New
                                                </button>
                                            </div>
                                            <select
                                                id="venueId"
                                                name="venueId"
                                                value={formData.venueId}
                                                onChange={handleChange}
                                                className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-md p-2"
                                            >
                                                {venues.map((venue) => (
                                                    <option key={venue.id} value={venue.id}>
                                                        {venue.name}
                                                    </option>
                                                ))}
                                            </select>

                                            <div className="pt-4">
                                                <Input
                                                    id="description"
                                                    name="description"
                                                    label="Event Description"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    );
                            }
                        })()}
                        <div className="space-y-3 px-2 py-2 text-gray-300 border border-gray-400 bg-gray-700 rounded-md">
                            <h3 className="text-lg font-semibold text-white">Review Event Details</h3>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                <h3 className="font-medium text-gray-400">Competition:</h3>
                                <span>{competitions.find(c => c.id === state.competitionId)?.name || "-"}</span>

                                <h3 className="font-medium text-gray-400">Event Type:</h3>
                                <span>{eventTypes.find(e => e.id === Number(formData.eventType))?.name || "-"}</span>

                                <h3 className="font-medium text-gray-400">Home Team:</h3>
                                <span>{formData.homeTeam || "-"}</span>

                                <h3 className="font-medium text-gray-400">Away Team:</h3>
                                <span>{formData.awayTeam || "-"}</span>

                                <h3 className="font-medium text-gray-400">Venue:</h3>
                                <span>{venues.find(v => v.id === Number(formData.venueId))?.name || "-"}</span>

                                <h3 className="font-medium text-gray-400">Date & Time:</h3>
                                <span>{formData.dateTime ? new Date(formData.dateTime).toLocaleString() : "-"}</span>

                                <h3 className="font-medium text-gray-400">Event Name:</h3>
                                <span>
                                    {`${formData.homeTeam || "Team A"} vs ${formData.awayTeam || "Team B"}`}
                                </span>

                                <h3 className="font-medium text-gray-400">Description:</h3>
                                <span>{formData.description || "-"}</span>
                            </div>
                        </div>

                    </div >
                );
            default:
                return null;
        };
    }

    return (
        <Modal title="Add New Event" onClose={onClose}>
            <form onSubmit={handleSubmit} className="">
                <div className="min-h-[500px]">
                    {renderStepContent()}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                    <div>
                        {state.step > 1 && (
                            <Button type="button" variant="primary" onClick={() => dispatch({ type: 'PREVIOUS_STEP' })}>
                                Back
                            </Button>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <Button type="button" variant="primary" onClick={onClose}>
                            Cancel
                        </Button>
                        {state.step < 3 && (
                            <Button type="button" variant="primary" onClick={() => dispatch({ type: 'NEXT_STEP' })}>
                                Next
                            </Button>
                        )}
                        {state.step === 3 && (
                            <Button type="button" variant="primary">
                                Add Event
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </Modal >
    )
}
