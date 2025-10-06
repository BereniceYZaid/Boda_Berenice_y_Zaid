import {useState, useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {ChevronLeft, ChevronRight} from "lucide-react";

const variants = {
    enter: (direction) => {
        return {
            x: direction > 0 ? 100 : -100,
            opacity: 0
        };
    },
    center: {
        x: 0,
        opacity: 1
    },
    exit: (direction) => {
        return {
            x: direction < 0 ? 100 : -100,
            opacity: 0
        };
    }
};

export default function ImageModal({image, closeModal, nextPhoto, prevPhoto, currentIndex}) {

    const [touchStart, setTouchStart] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX);
    }

    const handleTouchEnd = (e) => {
        const touchEnd = e.changedTouches[0].clientX;
        if (touchStart - touchEnd > 50) {
            setDirection(1);
            nextPhoto();
        } else if (touchStart - touchEnd < -50) {
            setDirection(-1);
            prevPhoto();
        }
    }

    // Resetear la dirección después de la animación
    useEffect(() => {
        const timer = setTimeout(() => {
            setDirection(0);
        }, 300);
        return () => clearTimeout(timer);
    }, [currentIndex]);

    console.log("direction", direction, "currentIndex", currentIndex);

    return (
        <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
        >
            <div className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-hover"
                 onTouchStart={handleTouchStart}
                 onTouchEnd={handleTouchEnd}
                 onClick={(e) => e.stopPropagation()}
            >

                <div className="relative">
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

                        <img
                            src={image.link}
                            alt={image.title}
                            className="max-w-full max-h-full object-contain"
                        />

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                            <h3 className="font-inter text-xl font-semibold text-white mb-2 truncate">{image.title}</h3>
                            {image.description && (
                                <p className="font-inter text-sm text-white/90">{image.description}</p>
                            )}
                        </div>

                    </motion.div>
                </AnimatePresence>

                    {!isAnimating && (
                        <>
                            <button
                                className="absolute top-1/2 left-2 -translate-y-1/2 scale-95 size-12 rounded-full ml-3 bg-white/20 backdrop-blur-md text-white transition-all duration-300 ease-out hover:text-black hover:bg-white/40 hover:scale-100 hover:cursor-pointer"
                                onClick={prevPhoto}
                            >
                                <ChevronLeft className="w-6 h-6 m-auto" />
                            </button>

                            <button
                                className="absolute top-1/2 right-2 -translate-y-1/2 scale-95 size-12 rounded-full ml-3 bg-white/20 backdrop-blur-md text-white transition-all duration-300 ease-out hover:text-black hover:bg-white/40 hover:scale-100 hover:cursor-pointer"
                                onClick={nextPhoto}
                            >
                                <ChevronRight className="w-6 h-6 m-auto" />
                            </button>

                        </>
                    )}

                </div>
            </div>


        </div>
    )
}