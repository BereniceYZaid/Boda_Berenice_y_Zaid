const BASE_URL = import.meta.env.VITE_BASE_URL;

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
        return {error: "Error al recuperar imagenes"};
    }

    return await res.json();
};

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


export const fetchFormLogIn = async (email, password) => {
    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    return await res.json();
};


export const fetchEliminarImagen = async (id) => {
    const token = localStorage.getItem("token");

    try {
        const res = await fetch(`${BASE_URL}/editarImagenes`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                tipoProceso: 0
            })
        });

        return await res.json();
    } catch (error) {
        console.error("Error al eliminar la imagen:", error);
        return { error: "Error desconocido al eliminar la imagen" }
    }
}

export const fetchEditarImagen = async (id, titulo, descripcion, categoria) => {
    const token = localStorage.getItem("token");
    try {
        const res = await fetch(`${BASE_URL}/editarImagenes`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                titulo: titulo,
                descripcion: descripcion,
                categoria: categoria,
                tipoProceso: 1
            })
        });

        return await res.json();
    } catch (error) {
        console.error("Error al editar la imagen:", error);
        return { error: "Error desconocido al editar la imagen" }
    }
}

export const comprobarAdmin = async () => {
    const token = localStorage.getItem("token");

    if (!token) return { error: false };

    try {
        const res = await fetch(`${BASE_URL}/comprobarAdmin`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const resJson = await res.json();

        if (resJson.error) {
            localStorage.removeItem("token");
            return { error: "Error al comprobar sesion" }
        } else if (resJson.success) {
            return { success: true };
        } else {
            localStorage.removeItem("token");
            return { error: "Error al comprobar sesion" }
        }

    } catch (error) {
        return { error: error }
    }
};

export const fetchCategories = async () => {
    const res = await fetch(`${BASE_URL}/categorias`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("Error al traer categorías");
    }

    const categoriesFromDB = await res.json();

    return [
        { _id: "todos", nombre: "Todos" },
        ...categoriesFromDB
    ];
};

export const crearCategoria = async (nombre) => {
    if (nombre === "Todos") return { error: "No se puede usar el nombre 'Todos'" };

    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/categorias`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombre,
            tipoProceso: 2
        })
    });

    return await res.json();
};

export const editarCategoria = async (id, nombre) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/categorias`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            nombre: nombre,
            tipoProceso: 1
        })
    });

    return await res.json();
};

export const eliminarCategoria = async (id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/categorias`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            tipoProceso: 0
        })
    });

    return await res.json();
};

