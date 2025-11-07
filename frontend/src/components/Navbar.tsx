import React from "react"
import SportRadarWhite from "./assets/Sportradar-Brand-Line_Color_White.svg"

export const Navbar: React.FC = () => {
    return (
        <nav className="bg-[#00003c] text-white">
            <div className="flex justify-between items-center h-16 px-4">
                <h1>
                    <img src={SportRadarWhite} alt="Sportradar White Logo" className="h-12 m-4" />
                </h1>
                <div className="flex gap-6 m-3 pr-5">
                    <a href="#" className="text-white text-xl hover:text-[#ea3323] hover:underline underline-offset-2 transition-all">Home</a>
                    <a href="#" className="text-white text-xl hover:text-[#ea3323] transition-colors">Sports</a>
                    <a href="#" className="text-white text-xl hover:text-[#ea3323] transition-colors">Venues</a>
                    <a href="#" className="text-white text-xl hover:text-[#ea3323] transition-colors">About</a>
                </div>
            </div>
        </nav>
    )
}
