/* Aquí van los fetchers*/
const BASE_URL = import.meta.env.VITE_BASE_URL;

/*
export const fetchEjemplo = async () => {
  const res = await fetch(`${BASE_URL}/ejemplo`);
  return res.json();
};
*/

/* todo borrar */
const simulateDelay = (data, ms = 500) =>
    new Promise((resolve) => setTimeout(() => resolve(data), ms));
/* borrar hasta aquí */

export const fetchImagenes = async (page = 1, lastID, category = "Todos") => {
    const url = new URL(`${BASE_URL}/recuperarImagenes`);
    url.searchParams.append("page", page.toString());
    url.searchParams.append("category", category);
    if (lastID) url.searchParams.append("lastID", lastID);

    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("Error al traer imágenes");
    }

    return res.json();
};

export const fetchCategories = async () => {
    const categories = [
        { _id: 1, name: "Todos" },
        { _id: 2, name: "Boda" },
        { _id: 3, name: "After" }
    ];
    return simulateDelay(categories);
}

export const fetchUsername = async () => {
    const username =
        {_id: 50, name: "Juan Diego Quijada Castillo", email:"diego.quijada03@gmail.com"};
    return simulateDelay(username);
}

export const fetchFormImagen = async (titulo, descripcion, categoria, archivo) => {

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("categoria", categoria);
    formData.append("archivo", archivo);

    return await fetch(`${BASE_URL}/subidaImagen`, {
        method: "POST",
        body: formData
    });
};