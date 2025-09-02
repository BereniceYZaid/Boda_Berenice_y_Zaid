import { X, Upload, Camera, Check } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function UploadModal(closeModal) {

    return (
        <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
        >
            <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-hover max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">

                    <h2 className="font-sans text-2xl font-semibold text-gray-800">Subir Fotos</h2>
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm
                        font-medium ring-offset-background transition-colors focus-visible:outline-none
                        focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                        disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 w-10
                        rounded-full hover:bg-gray-100">
                        <X className="w-5 h-5" />
                    </button>

                </div>

                <form onSubmit={} className="space-y-6">
                    <div>

                        <label className="font-inter text-sm font-medium text-gray-700 mb-2 block">
                            Título *
                        </label>

                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ej: Intercambio de anillos"
                            className="rounded-xl border-gray-200 focus:border-rose-300 focus:ring-rose-200"
                            required
                        />

                    </div>
                </form>
            </div>
        </div>
    )
}