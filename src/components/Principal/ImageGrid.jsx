import {useEffect, useState} from "react";
import { Edit2, Trash2, Heart } from "lucide-react";
import Loading from "../Commons/Loading.jsx";
import ImageModal from "../Modals/ImageModal.jsx";

export default function ImageGrid({images, category, isLoading, firstImage}) {
    const [displayImages, setDisplayImages] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("Todos");
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);

    const photoClick = (photo, index) => {
        setSelectedPhoto(photo);
        setCurrentIndex(index);
    };

    const unClickPhoto = () => {
        setSelectedPhoto(null);
    };

    const nextPhoto = () => {
        const nextIndex = (currentIndex + 1) % displayImages.length;
        setSelectedPhoto(displayImages[nextIndex]);
        setCurrentIndex(nextIndex);
    }

    const prevPhoto = () => {
        const prevIndex = (currentIndex - 1 + displayImages.length) % displayImages.length;
        setSelectedPhoto(displayImages[prevIndex]);
        setCurrentIndex(prevIndex);
    }

    useEffect(() => {
        if (currentCategory !== category) {
            setDisplayImages([]);
            setCurrentCategory(category);
        }

        const timeout = setTimeout(() => {
            setDisplayImages(images);
        }, 100);

        return () => clearTimeout(timeout);
    }, [images, category, currentCategory]);

    return (
        <section
            className="mt-6 inset-0 w-[90%] mx-auto grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-w-screen-xl"
            id="Galeria">

            {isLoading ? (
                <div className="text-center py-16 col-span-5">
                    <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Loading></Loading>
                    </div>
                </div>
            ) : (
                firstImage ? (
                        <div className="text-center py-16 col-span-5">
                            <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Heart className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="font-inter text-lg text-gray-500 mb-2">No hay fotos en esta categoría</p>
                            <p className="font-inter text-sm text-gray-400">¡Sé el primero en compartir un momento especial!</p>
                        </div>
                    ): (
                        displayImages.map((image, index) => (
                            <div
                                className="relative border-gray-200 shadow-sm border-2 w-full aspect-square bg-gray-200 rounded-2xl
                                    overflow-hidden cursor-pointer group col-span-1 hover:scale-105 transition-transform duration-300
                                    ease-in-out animate__animated animate__fadeIn" key={index}
                                style={{ animationDelay: `${index * 25}ms` }} onClick={() => photoClick(image, index)}
                            >
                                <img src={image.link} alt={image.title}
                                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300 ease-in-out"/>
                                <div
                                    className="inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent absolute opacity-0 group-hover:opacity-100"></div>
                                <div
                                    className="inset-0 absolute flex items-end font-sans group-hover:opacity-100 opacity-0 transition-opacity duration-300 ease-in-out">
                    <span
                        className="font-semibold text-white text-sm px-2 pb-1 truncate">{image.title}</span>
                                </div>
                            </div>
                        ))
                    )
            )}

            {/* Aquí va el modal para cuando le das clic a una imagen :D */}

            {selectedPhoto && (
                <ImageModal image={selectedPhoto} closeModal={unClickPhoto} nextPhoto={nextPhoto} prevPhoto={prevPhoto}
                            currentIndex={currentIndex}></ImageModal>
            )}
        </section>
    )
}