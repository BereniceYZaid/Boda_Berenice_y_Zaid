import React, { useState } from "react";
import { X, Save } from "lucide-react";
import {Button} from "../ui/button.jsx";
import {fetchEditarImagen} from "../../services/fetchers.js";
import {showAlertError} from "../Commons/AlertError.jsx";
import {showAlertSuccess} from "../Commons/AlertSuccess.jsx";
import {Input} from "../ui/input.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select.jsx";
import {Textarea} from "../ui/textarea.jsx";

export default function ImageEditModal({ unHandleEdit, image, categories }) {
    const [title, setTitle] = useState(image.title);
    const [category, setCategory] = useState(
        categories.find(cat => cat.nombre === image.category)
            ? image.category
            : ""
    );
    const [description, setDescription] = useState(image.description || "");
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title?.trim() || !category) {
            showAlertError("Por favor, completa todos los campos obligatorios.");
            return;
        }

        setIsSaving(true);

        try {
            const response = await fetchEditarImagen(image._id, title, description, category);
            setIsSaving(false);

            console.log(response);

            if (response.error) {
                showAlertError(response.error);
            } else {
                showAlertSuccess("Se edito la imagen exitosamente!");
            }

        } catch (error) {
            console.error("Error editando foto:", error);
        }

        setTitle("");
        setCategory("");
        setDescription("");

        unHandleEdit();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-hover">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-inter text-2xl font-semibold text-gray-800">Editar Foto</h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={unHandleEdit}
                        className="rounded-full hover:bg-gray-100 cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="font-inter text-sm font-medium text-gray-700 mb-2 block">
                            Título *
                        </label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="rounded-xl border-gray-200 focus:border-rose-300 focus:ring-rose-200"
                            required
                        />
                    </div>

                    <div>
                        <label className="font-inter text-sm font-medium text-gray-700 mb-2 block">
                            Categoría *
                        </label>
                        <Select value={category} onValueChange={setCategory} required>
                            <SelectTrigger className="rounded-xl border-gray-200 focus:border-rose-300 focus:ring-rose-200 cursor-pointer">
                                <SelectValue placeholder={"Selecciona una categoría"} />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat._id} value={cat.nombre} className={"cursor-pointer"}>
                                        {cat.nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="font-inter text-sm font-medium text-gray-700 mb-2 block">
                            Descripción
                        </label>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="rounded-xl border-gray-200 focus:border-rose-300 focus:ring-rose-200 resize-none"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={unHandleEdit}
                            disabled={isSaving}
                            className="flex-1 rounded-xl border-gray-200 hover:bg-gray-50 cursor-pointer"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={!title || !category || isSaving}
                            className="cursor-pointer flex-1 bg-gradient-to-r from-rose-500 to-violet-500 hover:from-rose-600 hover:to-violet-600 text-white rounded-xl shadow-soft hover:shadow-hover transition-all-smooth"
                        >
                            {isSaving ? (
                                <>
                                    <Save className="w-4 h-4 mr-2 animate-spin" />
                                    Guardando...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Guardar
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}