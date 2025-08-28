import {useEffect, useState} from "react";

export default function Slider({images}) {

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, );

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % images.length);
    }

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    }

    return (
            <section id="slider"
                     className="w-[90%] mx-auto max-w-screen-xl overflow-hidden rounded-3xl mt-10 slider group">

                {images.map((slide, index) => (
                    <figure
                        className={`relative w-full h-96 lg:h-[500px] slider-children transition-opacity duration-700
                        ${activeIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                        key={index}
                    >

                        <img src={slide.src} className="w-full h-full block object-cover" alt="Cargando..."/>
                        <div
                            className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                        <div className="absolute inset-0  w-[90%] mx-auto h-max mt-auto py-6">
                            <h3 className="font-sans font-semibold text-white text-2xl mb-2">
                                {slide.title}
                            </h3>
                            <p className="font-sans text-white opacity-90 text-md truncate">
                                {slide.subtitle}
                            </p>
                        </div>

                    </figure>
                ))}

                <div className="slider-dots mb-4 flex gap-2">
                    {images.map((slide, index) => (
                        <button className={`w-2 h-2 rounded-full cursor-pointer ${activeIndex === index ? "bg-white" : "bg-white/40"}`}
                                onClick={() => setActiveIndex(index)}></button>
                    ))}
                </div>

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
            </section>
    )
}