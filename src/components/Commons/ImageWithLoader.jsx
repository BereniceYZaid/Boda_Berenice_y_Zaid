import { useState } from "react";
import Loading from "./Loading.jsx";

export default function ImageWithLoader({ src, alt, className, containerClassName }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleImageLoad = () => {
        setIsLoaded(true);
    };

    const handleImageError = () => {
        setHasError(true);
        setIsLoaded(true);
    };

    return (
        <div className={`relative ${containerClassName || ''}`}>
            {/* Loading mientras carga */}
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-50 to-violet-50 animate-pulse">
                    <Loading />
                </div>
            )}

            {/* Imagen real */}
            {!hasError ? (
                <img
                    src={src}
                    alt={alt}
                    className={className}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
                    Error al cargar
                </div>
            )}
        </div>
    );
}
