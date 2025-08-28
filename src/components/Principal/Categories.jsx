export default function Categories() {
    return (
        <section className="inset-0 w-[90%] mx-auto flex flex-wrap items-center justify-center gap-3 sm:gap-5 mt-10"
                 id="Categorias">
            <button className="h-10 rounded-full bg-white border-gray-200 border-1 px-6 font-sans flex items-center
        justify-center shadow-sm whitespace-nowrap text-gray-700 font-medium cursor-pointer hover:brightness-90 transition duration-300 ease-in-out truncate">Boda
            </button>
            <button className="h-10 rounded-full bg-gradient-to-r from-rose-500 to-violet-500 text-white px-6 font-sans flex items-center
        justify-center shadow-sm whitespace-nowrap font-medium cursor-pointer hover:brightness-90 transition duration-300 ease-in-out truncate">Boda
            </button>
        </section>
    )
}