export default function imageGrid({images}) {

    return (
        <section
            className="mt-6 inset-0 w-[90%] mx-auto grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-w-screen-xl"
            id="Galeria">
            {images.map((image, index) => (
                <div
                    className="relative border-gray-200 shadow-sm border-2 w-full aspect-square bg-gray-200 rounded-2xl overflow-hidden cursor-pointer group col-span-1 hover:scale-105 transition-transform duration-300 ease-in-out"
                    key={index}>
                    <img src={image.src} alt="Cargando..."
                         className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300 ease-in-out"/>
                    <div
                        className="inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent absolute opacity-0 group-hover:opacity-100"></div>
                    <div
                        className="inset-0 absolute flex items-end font-sans group-hover:opacity-100 opacity-0 transition-opacity duration-300 ease-in-out">
                    <span
                        className="font-semibold text-white text-sm px-2 pb-1 truncate">HolaaaaHolaaaaHolaaaaHolaaaaHolaaaaHolaaaaHolaaaaHolaaaaHolaaaaHolaaaaHolaaaaHolaaaa</span>
                    </div>
                </div>
            ))}
        </section>
    )
}