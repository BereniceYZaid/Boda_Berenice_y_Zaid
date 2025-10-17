import { Camera } from "lucide-react";
import {useState} from "react";
import UploadModal from "../Modals/UploadModal.jsx";

export default function Header({categories, isLoading, error, queryClient}) {

    const [uploadModal, setUploadModal] = useState(false);

    const closeUploadModal = () => {
        setUploadModal(false)
    }

    return (
        <>
            <header className="bg-white/90 backdrop-blur-md border-b border-b-rose-100 shadow sticky z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between gap-3">
                    <div className="flex gap-3">
                        <div className="flex items-center justify-center inset-0">
                            <h1 className="font-bodoni text-2xl sm:text-3xl lg:text-4xl text-gray-800 leading-tight ">
                                Berenice & Zaid
                            </h1>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <button
                            disabled={isLoading || error}
                            onClick={() => setUploadModal(true)}
                            className={` cursor-pointer rounded-full text-sm bg-gradient-to-r from-rose-500 to-violet-500 text-white font-sans w-30 font-semibold inline-flex items-center justify-center h-10 transition duration-300 ease-in-out
                                hover:brightness-90 
                                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:saturate-50`}
                        >
                            <Camera className="w-5 h-5 mr-2" />
                            <span>Subir Fotos</span>
                        </button>

                    </div>
                </div>
            </header>
            {uploadModal && (
                <UploadModal closeModal={closeUploadModal} categories={categories} queryClient={queryClient}></UploadModal>
            )}
        </>
    )
}