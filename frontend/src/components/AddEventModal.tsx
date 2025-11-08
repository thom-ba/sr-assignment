import React, { useReducer, useState } from "react";
import { Category, Competition, Sport, Venue } from "../types";
import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import { CirclePlus } from "lucide-react";
import { Button } from "./ui/Button";
import { saveSport } from "../services/sportService";
import { EventType } from "../types";
import { saveCompetition } from "../services/competitionService";

interface AddEventModalProps {
    onClose: () => void;
    onAddEvent: (event: Omit<Event, 'id'>) => void;
    onAddSport: (newSport: Sport) => void;
    onAddCompetition: (newCompetition: Competition) => void;
    onAddCategory: (newCategory: Category) => void;
    onAddEventType: (newEventType: EventType) => void;
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

export const AddModalEvent: React.FC<AddEventModalProps> = ({ onClose, onAddEvent, onAddSport, onAddCompetition, eventTypes, categories, sports, venues, competitions }) => {
    const [state, dispatch] = useReducer(formReducer, {
        ...initialState,
        competitionId: competitions[0]?.id || 0,
        eventTypeId: eventTypes[0]?.id || 0,
        venueId: venues[0]?.id || 0,
    })

    const [step1View, setStep1View] = useState<'select' | 'addCompetition' | 'addSport'>('select');

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
    const [isAddingNewCompetition, setIsAddingNewCompetition] = useState(false)
    const [newCompetitionData, setNewCompetitionData] = useState({
        name: '',
        sportId: 0,
        categoryId: 0,
        year: '',
    });
    const [competitionSearchTerm, setCompetitionSearchTerm] = useState('');
    const [sportSearchTerm, setSportSearchTerm] = useState('');

    const [isAddingNewSport, setIsAddingNewSport] = useState(false)
    const [newSportName, setNewSportName] = useState('')

    const [isAddingNewVenue, setIsAddingNewVenue] = useState(false)
    const [newVenueName, setNewVenueName] = useState('')

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
            setIsAddingNewSport(false);
        } catch (error) {
            console.error("Failed to save new sport: ", error)
        }
    };

    const handleSaveNewVenue = () => { }

    const handleSaveNewCompetition = async () => {
        try {
            const competitionToSave = {
                name: newCompetitionData.name,
                sportId: newCompetitionData.sportId,
                categoryId: newCompetitionData.categoryId,
                year: newCompetitionData.year,
            };

            const newCompetition = await saveCompetition(competitionToSave);

            onAddCompetition(newCompetition);
            setFormData(prev => ({ ...prev, competitionId: newCompetition.id }));

            setNewCompetitionData({ name: '', categoryId: 0, sportId: 0, year: '' })
            setIsAddingNewCompetition(false);
        } catch (error) {
            console.error("Failed to save new Category :", error);
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

                                case 'addCompetition':
                                    return (
                                        <div className="pt-4">
                                            <div className="bg-gray-700 px-4 py-4 rounded-lg border border-gray-400">
                                                <h3>Create a New Competition</h3>
                                                <Input id="newCompetition" name="newCompetition" label="New Competition Name" value={newCompetitionData.name} onChange={(e) => setNewCompetitionData(n => ({
                                                    ...n, name: e.target.value
                                                }))}
                                                />
                                                <div className="pt-2">
                                                    <label htmlFor="newCompetitionCategory" className="text-gray-300 text-sm">Category</label>
                                                    <select name="newCompetitionCategory" id="competitionId" value={newCompetitionData.categoryId}
                                                        onChange={(e) => setNewCompetitionData(n => ({ ...n, categoryId: Number(e.target.value) }))}
                                                        className="w-full bg-gray-700 py-2 px-2 rounded-md border border-gray-600">
                                                        {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                                                    </select>
                                                </div>

                                                <Input id="newCompetitionYear" name="year" label="Year" value={newCompetitionData.year}
                                                    onChange={(e) => setNewCompetitionData(n => ({ ...n, year: e.target.value }))}
                                                />

                                                <div>
                                                    <div className="flex justify-between items-center pt-4 pb-1">
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

                                                <div className="flex justify-end gap-2 pb-1">
                                                    {sports
                                                        .filter(sport => sport.name.toLowerCase().includes(sportSearchTerm.toLowerCase()))
                                                        .map(sport => (
                                                            <button
                                                                key={sport.id}
                                                                type="button"
                                                                onClick={() => {
                                                                    setNewCompetitionData(n => ({ ...n, sportId: sport.id }));
                                                                }}
                                                                className={`w-full text-left px-3 py-2 text-sm transition-colors ${newCompetitionData.sportId === sport.id
                                                                    ? 'bg-emerald-500 text-white font-semibold'
                                                                    : 'text-gray-200 hover:bg-gray-700'
                                                                    }`}
                                                            >
                                                                {sport.name}
                                                            </button>
                                                        ))}
                                                </div>

                                                <div>
                                                    <Button type="button" variant="primary" onClick={() => setStep1View('select')}>
                                                        Back
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    );

                                case 'select':
                                default:
                                    return (
                                        <div>
                                            <div className="flex justify-between items-center pt-4 pb-1">
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

                                            <div className="mt-2 max-h-32 overflow-y-auto rounded-md border border-gray-600 bg-gray-600">
                                                {competitions
                                                    .filter(competition => competition.name.toLowerCase().includes(competitionSearchTerm.toLowerCase()))
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
                                    className="w-full bg-gray-700 py-2 px-2 rounded-md border border-gray-600">
                                    {eventTypes.map(eventType => <option key={eventType.id} value={eventType.id}>{eventType.name}</option>)}
                                </select>
                            </div>
                        )}
                    </div>
                );
            case 2:
                return (
                    <div>

                    </div>
                );
            case 3:
                return (
                    <div>

                    </div>
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
