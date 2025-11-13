import React from "react";
import { Sport } from "../types";

interface FilterBarProps {
    onSportChange: (sportId: string) => void;
    currentSport: string;
    sports: Sport[];
}

export const FilterBar: React.FC<FilterBarProps> = ({ currentSport, sports, onSportChange }) => {
    return (
        <div className="flex bg-[#00003c] py-2 text-white px-4">
            <div className="flex flex-col w-1/3">
                <label className="text-sm font-medium text-gray-300">Filter by Sport</label>
                <select
                    name="sport-filter"
                    id="sportId"
                    value={currentSport}
                    onChange={(e) => onSportChange(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 px-2 py-1 rounded-sm mt-1"
                >
                    <option value="all">
                        All Sports
                    </option>
                    {sports.map(sport => (
                        <option key={sport.id} value={sport.id}>{sport.name}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}
