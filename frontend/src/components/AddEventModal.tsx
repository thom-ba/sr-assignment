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
        sportId: sports[0]?.id || '',
        venueId: sports[0]?.id || '',
        competitionId: sports[0]?.id || '',
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

    const [isAddingNewSport, setIsAddingNewSport] = useState(false)
    const [newSportName, setNewSportName] = useState('')

    const [isAddingNewVenue, setIsAddingNewVenue] = useState(false)
    const [newVenueName, setNewVenueName] = useState('')

    const handleFieldChange = (field: keyof Omit<FormState, 'step'>, value: string) => {
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
                    <div className="space-y-4">
                        {(() => {
                            switch (step1View) {
                                case 'addSport':
                                    return (
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
                                    );
                                case 'addCompetition':
                                    return (
                                        <div>

                                        </div>
                                    );
                                case 'select':
                                default:
                                    return (
                                        <div>

                                        </div>
                                    );
                            }
                        })()}
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
                <div>
                    {renderStepContent()}
                </div>

                <div className="flex">
                    <div>
                        {state.step > 1 && (
                            <Button type="button" variant="primary" onClick={() => dispatch({ type: 'PREVIOUS_STEP' })}>
                                Back
                            </Button>
                        )}
                    </div>
                    <div className="">
                        <Button type="button" variant="primary" onClick={onClose}>
                            Cancel
                        </Button>
                        {state.step > 3 && (
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
