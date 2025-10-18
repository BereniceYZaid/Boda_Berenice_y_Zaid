import {useEffect, useState} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loading from "../Commons/Loading.jsx";

export default function Slider({images, isLoading, error}) {

    const [activeIndex, setActiveIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [loadedImages, setLoadedImages] = useState(new Set());
    const [errorImages, setErrorImages] = useState(new Set());

    /* Tiempo de intervalo para que cambie de imagen es 5 segundos */
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, );

    /* Resetear imágenes cargadas cuando cambie el array de imágenes */
    useEffect(() => {
        setLoadedImages(new Set());
        setErrorImages(new Set());
    }, [images]);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % images.length);
    }

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    }

    /* Handlers para carga de imágenes */
    const handleImageLoad = (index) => {
        setLoadedImages(prev => new Set([...prev, index]));
    }

    const handleImageError = (index) => {
        setErrorImages(prev => new Set([...prev, index]));
        setLoadedImages(prev => new Set([...prev, index]));
    }

    /* Manejo de touch para dispositivos moviles */
    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX);
    }
    const handleTouchEnd = (e) => {
        const touchEnd = e.changedTouches[0].clientX;
        if (touchStart - touchEnd > 50) {
            nextSlide();
        } else if (touchStart - touchEnd < -50) {
            prevSlide();
        }
    }

    return (
        <section id="slider"
                 className="w-[90%] mx-auto max-w-screen-xl overflow-hidden rounded-3xl mt-10 slider group"
                 onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
        >

            {/* Este es el Slider */}

            {images.length !== 0 && !isLoading && !error ? (
                images.map((slide, index) => (
                    <figure
                        className={`relative w-full h-96 lg:h-[500px] slider-children transition-opacity duration-700
                        ${activeIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                        key={index}
                    >
                        {/* Loading mientras carga */}
                        {!loadedImages.has(index) && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-50 to-violet-50 animate-pulse z-20">
                                <Loading />
                            </div>
                        )}

                        {/* Error al cargar */}
                        {errorImages.has(index) ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
                                Error al cargar imagen
                            </div>
                        ) : (
                            <>
                                <img
                                    src={slide.link}
                                    className="w-full h-full block object-cover"
                                    alt={slide.title || "Cargando..."}
                                    onLoad={() => handleImageLoad(index)}
                                    onError={() => handleImageError(index)}
                                    style={{
                                        opacity: loadedImages.has(index) ? 1 : 0,
                                        transition: 'opacity 0.3s ease-in-out'
                                    }}
                                />
                                <div
                                    className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                <div className="absolute inset-0  w-[90%] mx-auto h-max mt-auto pb-8">
                                    <h3 className="font-sans font-semibold text-white text-2xl mb-2">
                                        {slide.title}
                                    </h3>
                                    <p className="font-sans text-white opacity-90 text-md truncate">
                                        {slide.description}
                                    </p>
                                </div>
                            </>
                        )}

                    </figure>
                ))) : (
                <figure
                    className={`relative w-full h-96 lg:h-[500px] slider-children flex items-center justify-center
                                    bg-gradient-to-tl from-gray-200 via-purple-100 to-rose-200`} >
                    <div>
                        <span className={"rounded-full bg-white size-16 flex items-center justify-center text-2xl mx-auto mb-3 text-center"}>📷</span>
                        <div className={"text-sans text-gray-700 mx-auto text-medium px-6 text-center"}>
                            <span>No hay fotos aun. ¡Se el primero en compartir!</span>
                        </div>
                    </div>
                </figure>
            )}

            {/* Aqui se crean los puntos debajo del Slider */}

            <div className="slider-dots mb-4 flex gap-2">
                {images.map((slide, index) => (
                    <button className={`w-2 h-2 rounded-full cursor-pointer ${activeIndex === index ? "bg-white" : "bg-white/40"}`}
                            onClick={() => setActiveIndex(index)} key={index}></button>
                ))}
            </div>

            {/* Aqui van las flechas del Slider */}

            {images.length > 1 && !isLoading && !error && (
                <>
                    <button className="scale-95 slider-arrow-prev size-12 rounded-full ml-3 bg-white/0 group-hover:backdrop-blur-md text-white/0 group-hover:text-white
                            transition-all duration-300 ease-out hover:text-black hover:bg-white/40 group-hover:bg-white/20 group-hover:scale-100 hover:cursor-pointer"
                            onClick={prevSlide}>
                        <ChevronLeft className="w-6 h-6 m-auto" />
                    </button>

                    <button className="scale-95 slider-arrow-next size-12 rounded-full mr-3 bg-white/0 group-hover:backdrop-blur-md text-white/0 group-hover:text-white
                            transition-all duration-300 ease-out hover:text-black hover:bg-white/40 group-hover:bg-white/20 group-hover:scale-100 hover:cursor-pointer"
                            onClick={nextSlide}>
                        <ChevronRight className="w-6 h-6 m-auto" />
                    </button>
                </>

            )}

        </section>
    )
}