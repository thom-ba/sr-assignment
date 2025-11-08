import { XIcon } from "lucide-react";
import React, { useEffect } from "react";

interface ModalProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "";
        }
    }, []);

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-md bg-white/10"
            onClick={onClose}
        >
            <div
                className="bg-[#212350] rounded-lg w-full max-w-2xl text-white transform transition-all "
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between p-4 items-center border-b border-gray-500 text-lg font-bold">
                    <h2 className="">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="px-5 pb-5">
                    {children}
                </div>
            </div>
        </div>
    )
}
