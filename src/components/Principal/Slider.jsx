import {useEffect, useState} from "react";

export default function Slider({images, isLoading, error}) {

    const [activeIndex, setActiveIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);

    /* Limitar slides a 5 */
    const maxSlides = images.slice(0, 5);

    /* Tiempo de intervalo para que cambie de imagen es 5 segundos */
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, );

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % maxSlides.length);
    }

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + maxSlides.length) % maxSlides.length);
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

                {maxSlides.length !== 0 && !isLoading && !error ? (
                    maxSlides.map((slide, index) => (
                    <figure
                        className={`relative w-full h-96 lg:h-[500px] slider-children transition-opacity duration-700
                        ${activeIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                        key={index}
                    >

                        <img src={slide.src} className="w-full h-full block object-cover" alt="Cargando..."/>
                        <div
                            className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                        <div className="absolute inset-0  w-[90%] mx-auto h-max mt-auto pb-8">
                            <h3 className="font-sans font-semibold text-white text-2xl mb-2">
                                {slide.title}
                            </h3>
                            <p className="font-sans text-white opacity-90 text-md truncate">
                                {slide.subtitle}
                            </p>
                        </div>

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
                    {maxSlides.map((slide, index) => (
                        <button className={`w-2 h-2 rounded-full cursor-pointer ${activeIndex === index ? "bg-white" : "bg-white/40"}`}
                                onClick={() => setActiveIndex(index)} key={index}></button>
                    ))}
                </div>

                {/* Aqui van las flechas del Slider */}

                {maxSlides.length > 1 && !isLoading && !error && (
                    <>
                        <button className="scale-95 slider-arrow-prev size-12 rounded-full ml-3 bg-white/0 group-hover:backdrop-blur-md text-white/0 group-hover:text-white
                            transition-all duration-300 ease-out hover:text-black hover:bg-white/40 group-hover:bg-white/20 group-hover:scale-100 hover:cursor-pointer"
                                onClick={prevSlide}>
                            <svg className="m-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                 viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="m15 18-6-6 6-6"></path>
                            </svg>
                        </button>

                        <button className="scale-95 slider-arrow-next size-12 rounded-full mr-3 bg-white/0 group-hover:backdrop-blur-md text-white/0 group-hover:text-white
                            transition-all duration-300 ease-out hover:text-black hover:bg-white/40 group-hover:bg-white/20 group-hover:scale-100 hover:cursor-pointer"
                                onClick={nextSlide}>
                            <svg className="m-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                 viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="m9 18 6-6-6-6"></path>
                            </svg>
                        </button>
                    </>

                )}

            </section>
    )
}