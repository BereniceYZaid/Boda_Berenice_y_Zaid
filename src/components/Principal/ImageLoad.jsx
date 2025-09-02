export default function ImageLoad({ onLoadMore, disabled }) {
    return (
        <section className="w-[90%] mx-auto mt-10 flex justify-center gap-4 mb-6" id="Paginas">
            <button className="h-10 rounded-full bg-white border-gray-200 border px-6 font-sans flex items-center
        justify-center shadow-sm whitespace-nowrap text-gray-700 font-medium cursor-pointer hover:brightness-90
        transition duration-300 ease-in-out truncate"
            onClick={onLoadMore} disabled={disabled}>
                {disabled ? "Cargando..." : "Cargar Más"}
            </button>
        </section>
    )
}