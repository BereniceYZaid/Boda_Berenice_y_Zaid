import {X, Upload, Camera, Check, Text} from "lucide-react";
import { Input } from "../ui/input";
import { Textarea} from "../ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { Button } from "../ui/button.jsx";
import {useState} from "react";
import {fetchFormImagen} from "../../services/fetchers.js";

export default function UploadModal({closeModal, categories}) {

    const [titulo, setTitulo] = useState("");
    const [categoria, setCategoria] = useState("")
    const [descripcion, setDescripcion] = useState("");
    const [archivos, setArchivos] = useState([])
    const [subidosContador, setSubidosContador] = useState(0);
    const [estaSubiendo, setEstaSubiendo] = useState(false)

    const cambiarArchivos = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setArchivos(selectedFiles);
    }

    const subirForm = async (e) => {
        e.preventDefault();
        if (!titulo || !categoria || archivos.length === 0) return;

        setEstaSubiendo(true);
        setSubidosContador(0);

        try {
            for (let i = 0; i < archivos.length; i++) {
                let archivo = archivos[i];
                await fetchFormImagen(titulo, descripcion, categoria, archivo)
                setSubidosContador(i + 1)
            }

            setTitulo("");
            setCategoria("");
            setCategoria("");
            setArchivos([]);
            setSubidosContador(0);
            closeModal();

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
        >
            <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-hover max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">

                    <h2 className="font-sans text-2xl font-semibold text-gray-800">Subir Fotos</h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={closeModal}
                        className="rounded-full hover:bg-gray-100"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                <form onSubmit={subirForm} className="space-y-6">
                    <div>

                        <label className="font-inter text-sm font-medium text-gray-700 mb-2 block">
                            Título *
                        </label>

                        <Input
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Ej: Intercambio de anillos"
                            className="rounded-xl border-gray-200 focus:border-rose-300 focus:ring-rose-200"
                            required
                        />

                        <label className="font-inter text-sm font-medium text-gray-700 my-2 block">
                            Categoria *
                        </label>

                        <Select value={categoria} onValueChange={setCategoria} required>
                            <SelectTrigger className={"rounded-xl border-gray-200 focus:border-rose-300 focus:ring-rose-200"}>
                                <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.name}>
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <label className="font-inter text-sm font-medium text-gray-700 my-2 block">
                            Descripción (opcional)
                        </label>

                        <Textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)}
                                  placeholder={"Describe el momento especial"} rows={3}
                                  className={"rounded-xl border-gray-200 focus:border-rose-300 focus:ring-rose-200 resize-none"}>
                        </Textarea>

                        <label className="font-inter text-sm font-medium text-gray-700 mb-2 block">
                            Fotos *
                        </label>

                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center
                                        hover:border-rose-300 transition-colors">
                            <Input type="file"
                                   multiple
                                   accept="image/*"
                                   onChange={cambiarArchivos}
                                   className="hidden"
                                   id="photo-upload"
                                   required />

                            <label htmlFor="photo-upload" className="cursor-pointer">
                                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Camera className="w-6 h-6 text-rose-500" />
                                </div>
                                <p className="font-inter text-sm text-gray-600 mb-1">
                                    Haz clic para seleccionar fotos
                                </p>
                                <p className="font-inter text-xs text-gray-400">
                                    Puedes subir múltiples fotos a la vez
                                </p>
                            </label>

                        </div>

                        {archivos.length > 0 && (
                            <p className="font-inter text-sm text-gray-600 mt-2">
                                {archivos.length} foto(s) seleccionada(s)
                            </p>
                        )}

                    </div>

                    {estaSubiendo && (
                        <div className="bg-rose-50 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-inter text-sm text-rose-700">
                                    Subiendo fotos...
                                </span>
                                <span className="font-inter text-sm text-rose-600">
                                    {subidosContador}/{archivos.length}
                                </span>
                            </div>
                            <div className="w-full bg-rose-200 rounded-full h-2">
                                <div
                                    className="bg-rose-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${(subidosContador / archivos.length) * 100}%` }}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={closeModal}
                            disabled={estaSubiendo}
                            className="flex-1 rounded-xl border-gray-200 hover:bg-gray-50"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={!titulo || !categoria || archivos.length === 0 || estaSubiendo}
                            className="flex-1 bg-gradient-to-r from-rose-500 to-violet-500 hover:from-rose-600 hover:to-violet-600 text-white rounded-xl shadow-soft hover:shadow-hover transition-all-smooth"
                        >
                            {estaSubiendo ? (
                                <>
                                    <Upload className="w-4 h-4 mr-2 animate-spin" />
                                    Subiendo...
                                </>
                            ) : (
                                <>
                                    <Check className="w-4 h-4 mr-2" />
                                    Subir Fotos
                                </>
                            )}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    )
}