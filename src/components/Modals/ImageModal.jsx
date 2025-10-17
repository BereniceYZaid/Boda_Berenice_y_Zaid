import {useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {ChevronLeft, ChevronRight, X} from "lucide-react";
import Loading from "../Commons/Loading.jsx";

const variants = {
    enter: (direction) => {
        return {
            x: direction > 0 ? -100 : 100,
            opacity: 0
        };
    },
    center: {
        x: 0,
        opacity: 1
    },
    exit: (direction) => {
        return {
            x: direction < 0 ? -100 : 100,
            opacity: 0
        };
    }
};

export default function ImageModal({image, closeModal, nextPhoto, prevPhoto, currentIndex}) {

    const [touchStart, setTouchStart] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX);
    }

    const handleTouchEnd = (e) => {
        const touchEnd = e.changedTouches[0].clientX;
        if (touchStart - touchEnd > 50) {
            setDirection(1);
            setIsImageLoaded(false);
            nextPhoto();
        } else if (touchStart - touchEnd < -50) {
            setDirection(-1);
            setIsImageLoaded(false);
            prevPhoto();
        }
    }

    const handleNext = () => {
        setDirection(1);
        setIsImageLoaded(false);
        nextPhoto();
    }

    const handlePrev = () => {
        setDirection(-1);
        setIsImageLoaded(false);
        prevPhoto();
    }

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    }

    return (
        <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
        >
            {/* Contenedor de la imagen con animación - group para hover */}
            <div className="relative max-w-[80vw] max-h-[80vh] group mx-auto"
                 onTouchStart={handleTouchStart}
                 onTouchEnd={handleTouchEnd}
                 onClick={(e) => e.stopPropagation()}
            >

                <AnimatePresence initial={false} mode="wait" custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        onAnimationStart={() => setIsAnimating(true)}
                        onAnimationComplete={() => setIsAnimating(false)}
                    >
                        {/* ✨ Contenedor condicional: fijo mientras carga, flexible cuando está cargada */}
                        <div className={`relative ${
                            isImageLoaded
                                ? ''
                                : 'w-[80vw] h-[80vh]'
                        } flex items-center justify-center`}>

                            {/* Loading mientras carga */}
                            {!isImageLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-50/10 to-violet-50/10 rounded-2xl">
                                    <Loading />
                                </div>
                            )}

                            {/* Imagen */}
                            <img
                                src={image.link}
                                alt={image.title}
                                className="w-auto h-auto max-w-[80vw] max-h-[80vh] object-contain rounded-2xl"
                                style={{
                                    opacity: isImageLoaded ? 1 : 0,
                                    transition: 'opacity 0.3s ease-in-out'
                                }}
                                onLoad={handleImageLoad}
                            />

                            {/* Información de la imagen - overlay */}
                            {isImageLoaded && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 via-transparent to-transparent p-6 rounded-b-2xl">
                                    <div className="w-full h-12"></div>
                                    <h3 className="font-inter text-xl font-semibold text-white mb-2 truncate">
                                        {image.title}
                                    </h3>
                                    {image.description && (
                                        <p className="font-inter text-sm text-white/90">
                                            {image.description}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                    </motion.div>
                </AnimatePresence>

                {/* Botones de navegación y cerrado */}
                {!isAnimating && (
                    <>
                        <button
                            className="absolute top-4 right-4 z-10 size-10 rounded-full bg-white/20 backdrop-blur-md text-white transition-all duration-300 ease-out hover:text-black hover:bg-white/40 hover:scale-110 hover:cursor-pointer opacity-100"
                            onClick={closeModal}
                        >
                            <X className="w-5 h-5 m-auto" />
                        </button>

                        <button
                            className="hidden sm:block absolute top-1/2 left-4 -translate-y-1/2 scale-95 size-12 rounded-full bg-white/20 backdrop-blur-md text-white transition-all duration-300 ease-out hover:text-black hover:bg-white/40 hover:scale-100 hover:cursor-pointer opacity-0 group-hover:opacity-100"
                            onClick={handlePrev}
                        >
                            <ChevronLeft className="w-6 h-6 m-auto" />
                        </button>

                        <button
                            className="hidden sm:block absolute top-1/2 right-4 -translate-y-1/2 scale-95 size-12 rounded-full bg-white/20 backdrop-blur-md text-white transition-all duration-300 ease-out hover:text-black hover:bg-white/40 hover:scale-100 hover:cursor-pointer opacity-0 group-hover:opacity-100"
                            onClick={handleNext}
                        >
                            <ChevronRight className="w-6 h-6 m-auto" />
                        </button>

                    </>
                )}

            </div>
        </div>
    )
}