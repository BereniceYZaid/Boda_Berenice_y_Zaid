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

export const fetchImagenes = async () => {
    const images = [
        {
            id: 1,
            src: "/images/1.jpg",
            title: "Titulo1",
            subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquet nunc, id",
            category: "Boda",
            uploaded_by: "Juanchito"
        },
        {
            id: 2,
            src: "/images/2.jpg",
            title: "Titulo2",
            subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquet nunc, id",
            category: "Boda",
            uploaded_by: "Lupe"
        },
        {
            id: 3,
            src: "/images/3.jpg",
            title: "Titulo3",
            subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquet nunc, id",
            category: "Boda",
            uploaded_by: "Pancho"
        },
        {
            id: 4,
            src: "/images/4.jpg",
            title: "Titulo4",
            subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquet nunc, id",
            category: "Boda",
            uploaded_by: "Pencil"
        },
        {
            id: 5,
            src: "/images/5.jpg",
            title: "Titulo5",
            subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquet nunc, id",
            category: "After",
            uploaded_by: "Juan Diego Quijada Castillo"
        },
    ];
    return simulateDelay(images);
};

export const fetchCategories = async () => {
    const categories = [
        { id: 1, name: "Todos" },
        { id: 2, name: "Boda" },
        { id: 3, name: "After" }
    ];
    return simulateDelay(categories);
}

export const fetchUsername = async () => {
    const username = {id: 50, name: "Juan Diego Quijada Castillo"}
    return simulateDelay(username);
}
