export default function Modal() {
    return (
        <div className="fixed hidden inset-0 z-50 grid place-content-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="modalTitle" >
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <div className="flex items-start justify-between">
                    <h2 id="modalTitle" className="text-xl font-bold text-gray-900 sm:text-2xl">Nova Tarefa</h2>
                    <button type="button" className="-me-4 -mt-4 cursor-pointer rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none" aria-label="Close" >
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="mt-4">
                    <label htmlFor="Confirm" className="mt-4 block">
                        <span className="text-sm font-medium text-gray-700">Descrição da Tarefa</span>
                        <input type="text" id="Confirm" className="mt-0.5 p-2 w-full rounded border border-gray-300 shadow-sm sm:text-sm" />
                    </label>
                </div>
                <footer className="mt-6 flex justify-between gap-2">
                    <button type="button" className="rounded bg-gray-100 cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200" >Cancelar</button>
                    <button type="button" className="rounded bg-blue-600 cursor-pointer px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">Adicionar</button>
                </footer>
            </div>
        </div>
    )
}