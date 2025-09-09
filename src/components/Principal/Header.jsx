import { Camera, Heart, LogIn } from "lucide-react";
import {useState} from "react";
import UploadModal from "../Modals/UploadModal.jsx";

export default function Header({user, isLoading, error, categories}) {

    const [uploadModal, setUploadModal] = useState(false);

    const closeUploadModal = () => {
        setUploadModal(false)
    }

    return (
        <>
            <header className="bg-white/90 backdrop-blur-md border-b border-b-rose-100 shadow sticky z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between gap-3">
                    <div className="flex gap-3">
                        <div
                            className="bg-gradient-to-br from-rose-400 to-violet-400 rounded-full size-10 min-w-10 min-h-10 inset-0 flex items-center justify-center h-10">
                            <Heart className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex items-center justify-center inset-0">
                            <h1 className="font-dancing text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 leading-tight ">
                                Nuestro Gran Dia
                            </h1>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className="flex items-center justify-center inset-0 hidden md:flex">
                            {isLoading ? (
                                <span className="font-sans text-sm text-gray-600">Cargando...</span>
                            ) : error ? (
                                <span className="font-sans text-sm text-red-600">Error al cargar el usuario</span>
                            ) : (
                                <span className="font-sans text-sm text-gray-600">¡Hola <span className="truncate">{user.name}</span>!</span>
                            )}
                        </div>
                        <button
                            className="rounded-full text-sm bg-gradient-to-r from-rose-500 to-violet-500 text-white font-sans w-30 font-semibold inline-flex items-center justify-center inset-0 cursor-pointer hover:brightness-90 transition duration-300 ease-in-out h-10"
                            onClick={() => { setUploadModal(true) }}
                            >
                            <Camera className="w-5 h-5 mr-2" />
                            <span>Subir Fotos</span>
                        </button>
                    </div>
                </div>
            </header>
            {uploadModal && (
                <UploadModal closeModal={closeUploadModal} categories={categories} ></UploadModal>
            )}
        </>
    )
}