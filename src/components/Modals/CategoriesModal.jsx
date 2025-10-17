import React, { useState } from 'react';
import { X, Save, Trash2, Plus, Edit2 } from 'lucide-react';
import {showAlertSuccess} from "../Commons/AlertSuccess.jsx";
import {crearCategoria, editarCategoria, eliminarCategoria} from "../../services/fetchers.js";
import {showAlertError} from "../Commons/AlertError.jsx";
import {Button} from "../ui/button.jsx";
import {Input} from "../ui/input.jsx";

export default function CategoriesModal({ closeModal, categories, onUpdate }) {
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editingCategoryName, setEditingCategoryName] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const editableCategories = categories.filter(cat => cat._id !== "todos");

    console.log("editableCategories", editableCategories);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;

        setIsProcessing(true);
        try {
            const response = await crearCategoria(newCategoryName.trim());

            if (response.success) {
                showAlertSuccess('Categoría creada exitosamente');
                setNewCategoryName('');
                onUpdate();
            } else if (response.error) {
                showAlertError(response.error);
            }
        } catch (error) {
            console.error('Error adding category:', error);
            showAlertError('Error al crear la categoría');
        }
        setIsProcessing(false);
    };

    const handleDeleteCategory = async (categoryId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta categoría? Las fotos en esta categoría no se eliminarán.')) {
            setIsProcessing(true);
            try {
                const response = await eliminarCategoria(categoryId);

                if (response.success) {
                    showAlertSuccess('Categoría eliminada exitosamente');
                    onUpdate();
                } else if (response.error) {
                    showAlertError(response.error);
                }
            } catch (error) {
                console.error('Error deleting category:', error);
                showAlertError('Error al eliminar la categoría');
            }
            setIsProcessing(false);
        }
    };

    const handleStartEdit = (category) => {
        setEditingCategoryId(category._id);
        setEditingCategoryName(category.nombre);
    };

    const handleCancelEdit = () => {
        setEditingCategoryId(null);
        setEditingCategoryName('');
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        if (!editingCategoryName.trim()) return;

        setIsProcessing(true);
        try {
            const response = await editarCategoria(editingCategoryId, editingCategoryName.trim());

            if (response.success) {
                showAlertSuccess('Categoría actualizada exitosamente');
                setEditingCategoryId(null);
                setEditingCategoryName('');
                onUpdate();
            } else if (response.error) {
                showAlertError(response.error);
            }
        } catch (error) {
            console.error('Error updating category:', error);
            showAlertError('Error al actualizar la categoría');
        }
        setIsProcessing(false);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-hover max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-inter text-2xl font-semibold text-gray-800">Gestionar Categorías</h2>
                    <Button variant="ghost" size="icon" onClick={closeModal} className="rounded-full hover:bg-gray-100 cursor-pointer">
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                <div className="space-y-3 overflow-y-auto flex-grow mb-6 pr-2">
                    {editableCategories.map((cat) => (
                        <div key={cat._id} className="p-3 bg-gray-50 rounded-xl flex items-center justify-between">
                            {editingCategoryId === cat._id ? (
                                <form onSubmit={handleSaveEdit} className="flex-grow flex items-center gap-2">
                                    <Input
                                        value={editingCategoryName}
                                        onChange={(e) => setEditingCategoryName(e.target.value)}
                                        className="h-9"
                                        autoFocus
                                    />
                                    <Button type="submit" size="icon" variant="ghost" className="text-green-600 hover:bg-green-100 w-9 h-9" disabled={isProcessing}>
                                        <Save className="w-4 h-4" />
                                    </Button>
                                    <Button type="button" size="icon" variant="ghost" onClick={handleCancelEdit} className="w-9 h-9" disabled={isProcessing}>
                                        <X className="w-4 h-4" />
                                    </Button>
                                </form>
                            ) : (
                                <>
                                    <span className="font-inter text-gray-700">{cat.nombre}</span>
                                    <div className="flex gap-1">
                                        <Button size="icon" classname={"cursor-pointer"} variant="ghost" onClick={() => handleStartEdit(cat)} className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 w-9 h-9" disabled={isProcessing}>
                                            <Edit2 className="w-4 h-4" />
                                        </Button>
                                        <Button size="icon" variant="ghost" classname={"cursor-pointer"} onClick={() => handleDeleteCategory(cat._id)} className="text-gray-500 hover:text-red-600 hover:bg-red-50 w-9 h-9" disabled={isProcessing}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleAddCategory} className="flex gap-3 pt-4 border-t border-gray-100">
                    <Input
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Nueva categoría..."
                        className="rounded-xl"
                        disabled={isProcessing}
                    />
                    <Button type="submit" className="rounded-xl bg-gray-800 hover:bg-gray-900 cursor-pointer" disabled={isProcessing}>
                        <Plus className="w-4 h-4 mr-2" />
                        Agregar
                    </Button>
                </form>
            </div>
        </div>
    );
}
