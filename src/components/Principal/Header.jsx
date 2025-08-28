export default function Header({username}) {

    return (
        <header className="bg-white/90 backdrop-blur-md border-b border-b-rose-100 shadow sticky z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between gap-3">
                <div className="flex gap-3">
                    <div
                        className="bg-gradient-to-br from-rose-400 to-violet-400 rounded-full size-10 min-w-10 min-h-10 inset-0 flex items-center justify-center h-10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             className="lucide lucide-heart w-5 h-5 text-white">
                            <path
                                d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                        </svg>
                    </div>
                    <div className="flex items-center justify-center inset-0">
                        <h1 className="font-dancing text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 leading-tight ">
                            Nuestro Gran Dia
                        </h1>
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="flex items-center justify-center inset-0 hidden md:flex">
                        <span className="font-sans text-sm text-gray-600">¡Hola <span className="truncate">{username}</span>!</span>
                    </div>
                    <button
                        className="rounded-full text-sm bg-gradient-to-r from-rose-500 to-violet-500 text-white font-sans w-30 font-semibold inline-flex items-center justify-center inset-0 cursor-pointer hover:brightness-90 transition duration-300 ease-in-out h-10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             className="lucide lucide-camera w-4 h-4 mr-2">
                            <path
                                d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                            <circle cx="12" cy="13" r="3"></circle>
                        </svg>
                        <span>Subir Fotos</span>
                    </button>
                </div>
            </div>
        </header>
    )
}