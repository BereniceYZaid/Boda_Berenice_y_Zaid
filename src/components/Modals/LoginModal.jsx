import {Button} from "../ui/button.jsx";
import {Check, Upload, X, EyeOff, Eye} from "lucide-react";
import {Input} from "../ui/input.jsx";
import {fetchFormLogIn} from "../../services/fetchers.js";
import {useState} from "react";
import {showAlertSuccess} from "../Commons/AlertSuccess.jsx";
import {showAlertError} from "../Commons/AlertError.jsx";
import {useQueryClient} from "@tanstack/react-query";

export default function LoginModal({closeModal}) {

    const queryClient = useQueryClient();
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [estaCargando, setEstaCargando] = useState(false)
    const [mostrar, setMostrar] = useState(false);

    const subirForm = async (e) => {
        e.preventDefault();
        if (!correo || !contrasena ) return;

        setEstaCargando(true);

        try {
            const response = await fetchFormLogIn(correo, contrasena);
            setEstaCargando(false);

            console.log(response);

            if (response.error) {
                showAlertError(response.error);
            } else {
                localStorage.setItem("token", response.token);
                await queryClient.invalidateQueries({queryKey: ["adminStatus"]});
                setCorreo("");
                setContrasena("");
                closeModal();
                showAlertSuccess("Inicio de sesion exitoso!");
            }

        } catch (error) {
            console.error(error);
            setEstaCargando(false);
            showAlertError("Error al iniciar sesion");
            closeModal();
        }
    }

    return (
        <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
        >
            <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-hover max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">

                    <h2 className="font-sans text-2xl font-semibold text-gray-800">Iniciar Sesion</h2>
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
                            Correo electronico
                        </label>

                        <Input
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            placeholder=""
                            className="rounded-xl border-gray-200 focus:border-rose-300 focus:ring-rose-200"
                            required
                        />

                        <label className="font-inter text-sm font-medium text-gray-700 my-2 block">
                            Contraseña
                        </label>

                        <div className="relative">
                            <Input
                                type={mostrar ? "text" : "password"}
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                placeholder=""
                                className="rounded-xl border-gray-200 focus:border-rose-300 focus:ring-rose-200 pr-10"
                                required
                            />
                                <button
                                    type="button"
                                    onClick={() => setMostrar(!mostrar)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                                    tabIndex={-1}
                                >
                                    {mostrar ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                        </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={closeModal}
                            disabled={estaCargando}
                            className="flex-1 rounded-xl border-gray-200 hover:bg-gray-50 cursor-pointer"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={!correo || !contrasena || estaCargando}
                            className="flex-1 bg-gradient-to-r from-rose-500 to-violet-500 hover:from-rose-600 hover:to-violet-600 text-white rounded-xl shadow-soft hover:shadow-hover transition-all-smooth cursor-pointer"
                        >
                            {estaCargando ? (
                                <>
                                    <Upload className="w-4 h-4 mr-2 animate-spin" />
                                    Cargando
                                </>
                            ) : (
                                <>
                                    <Check className="w-4 h-4 mr-2" />
                                    Iniciar Sesion
                                </>
                            )}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    )
}