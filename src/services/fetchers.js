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

const images = [
    {
        _id: 2,
        src: "/images/2.jpg",
        title: "Titulo2",
        subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquet nunc, id",
        category: "After",
        uploaded_by: "Lupe"
    },
    {
        _id: 1,
        src: "/images/1.jpg",
        title: "Titulo1",
        subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquet nunc, id",
        category: "Boda",
        uploaded_by: "Juanchito"
    },
    {
        _id: 2,
        src: "/images/2.jpg",
        title: "Titulo2",
        subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquet nunc, id",
        category: "After",
        uploaded_by: "Lupe"
    },
    {
        _id: 3,
        src: "/images/3.jpg",
        title: "Titulo3",
        subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquet nunc, id",
        category: "Boda",
        uploaded_by: "Pancho"
    },
    {
        _id: 4,
        src: "/images/4.jpg",
        title: "Titulo4",
        subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquet nunc, id",
        category: "After",
        uploaded_by: "Pencil"
    },
    {
        _id: 5,
        src: "/images/5.jpg",
        title: "Titulo5",
        subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquet nunc, id",
        category: "Boda",
        uploaded_by: "Juan Diego Quijada Castillo"
    },
    {
        _id: 6,
        src: "/images/5.jpg",
        title: "Titulo6",
        subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquet nunc, id",
        category: "After",
        uploaded_by: "Juan Diego Quijada Castillo"
    },
    {
        _id: 7,
        src: "/images/5.jpg",
        title: "Titulo7",
        subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquet nunc, id",
        category: "Boda",
        uploaded_by: "Juan Diego Quijada Castillo"
    },
    {
        _id: 8,
        src: "/images/5.jpg",
        title: "Titulo8",
        subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquet nunc, id",
        category: "Boda",
        uploaded_by: "Juan Diego Quijada Castillo"
    },
    {
        _id: 9,
        src: "/images/5.jpg",
        title: "Titulo9",
        subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquet nunc, id",
        category: "After",
        uploaded_by: "Juan Diego Quijada Castillo"
    },
    {
        _id: 10,
        src: "/images/5.jpg",
        title: "Titulo10",
        subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquet nunc, id",
        category: "Boda",
        uploaded_by: "Juan Diego Quijada Castillo"
    },
    {
        _id: 11,
        src: "/images/5.jpg",
        title: "Titulo10",
        subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquet nunc, id",
        category: "After",
        uploaded_by: "Juan Diego Quijada Castillo"
    },
    {
        _id: 12,
        src: "/images/5.jpg",
        title: "Titulo10",
        subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquet nunc, id",
        category: "Boda",
        uploaded_by: "Juan Diego Quijada Castillo"
    },
    {
        _id: 13,
        src: "/images/5.jpg",
        title: "Titulo10",
        subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquet nunc, id",
        category: "After",
        uploaded_by: "Juan Diego Quijada Castillo"
    },
    {
        _id: 13,
        src: "/images/5.jpg",
        title: "Titulo10",
        subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquet nunc, id",
        category: "After",
        uploaded_by: "Juan Diego Quijada Castillo"
    },
    {
        _id: 13,
        src: "/images/5.jpg",
        title: "Titulo10",
        subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquet nunc, id",
        category: "After",
        uploaded_by: "Juan Diego Quijada Castillo"
    },
    {
        _id: 13,
        src: "/images/5.jpg",
        title: "Titulo10",
        subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquet nunc, id",
        category: "After",
        uploaded_by: "Juan Diego Quijada Castillo"
    },
    {
        _id: 13,
        src: "/images/5.jpg",
        title: "Titulo10",
        subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis aliquet nunc, id",
        category: "After",
        uploaded_by: "Juan Diego Quijada Castillo"
    },
];

export const fetchImagenes = async (numPages = 1, _lastID, category) => {
    console.log(numPages, _lastID, category);
    let filteredImages = images;
    if (category && category !== "Todos") {
        filteredImages = images.filter((img) => img.category === category);
    }

    const total = filteredImages.length;
    const inicio = (numPages - 1) * 5;
    const fin = inicio + 5;
    const items = filteredImages.slice(inicio, fin);

    const hasMore = fin < total;
    return simulateDelay({ items, total, hasMore });
};

export const fetchImageLength = async (category = "Todos") => {
    const total =
        category === "Todos"
            ? images.length
            : images.filter((img) => img.category === category).length;
    return simulateDelay(total);
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
