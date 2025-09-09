export default function ImageModal({image, closeModal}) {
    return (
        <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
        >
            <div className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-hover">
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
            </div>
        </div>
    )
}