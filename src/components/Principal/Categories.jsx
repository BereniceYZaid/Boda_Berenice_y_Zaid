import { Button } from "../ui/button.jsx";
import { useState } from "react";
import { Settings } from 'lucide-react';
import CategoriesModal from "../Modals/CategoriesModal.jsx";
import { useQueryClient } from "@tanstack/react-query";

export default function Categories({ categories, isLoading, error, category, setCategory, isAdmin }) {
    const [showCategoriesModal, setShowCategoriesModal] = useState(false);
    const queryClient = useQueryClient();

    const openCategoriesModal = () => {
        setShowCategoriesModal(true);
    };

    const closeCategoriesModal = () => {
        setShowCategoriesModal(false);
    };

    const handleCategoriesUpdate = () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        queryClient.invalidateQueries({ queryKey: ["images"] });
    };

    return (
        <>
            <section className="inset-0 w-[90%] mx-auto flex flex-wrap items-center justify-center gap-3 sm:gap-5 mt-10"
                     id="Categorias">

                {isLoading && (
                    <button
                        className={"h-10 rounded-full px-6 font-sans flex items-center justify-center shadow-sm " +
                            "whitespace-nowrap font-medium cursor-pointer hover:brightness-90 transition duration-300 " +
                            "ease-in-out truncate bg-gradient-to-r from-rose-500 to-violet-500 text-white"}>
                        Todos
                    </button>
                )}

                {categories.map((cat) => {
                    const isActive = category === cat.nombre;

                    return (
                        <button
                            key={cat._id}
                            onClick={() => setCategory(cat.nombre)}
                            className={`h-10 rounded-full px-6 font-sans flex items-center justify-center shadow-sm whitespace-nowrap font-medium cursor-pointer hover:brightness-90 transition duration-300 ease-in-out truncate
                            ${isActive
                                ? "bg-gradient-to-r from-rose-500 to-violet-500 text-white"
                                : "bg-white border-gray-200 border text-gray-700"
                            }`}
                        >
                            {cat.nombre}
                        </button>
                    );
                })}
                {isAdmin && (
                    <button
                        onClick={openCategoriesModal}
                        className="size-10 rounded-full font-sans flex items-center justify-center shadow-sm
                                  whitespace-nowrap font-medium cursor-pointer hover:brightness-90 transition
                                  duration-300 ease-in-out truncate bg-white border-gray-200 border text-gray-700">
                        <Settings className="w-4 h-4" />
                    </button>
                )}
            </section>

            {showCategoriesModal && (
                <CategoriesModal
                    closeModal={closeCategoriesModal}
                    categories={categories}
                    onUpdate={handleCategoriesUpdate}
                />
            )}
        </>
    );
}