import type { Task } from "../types/Task";

type CardProps = {
    task: Task
}

export default function Card( { task }: CardProps) {
    return (
        <div draggable className="cursor-move m-6 shadow block rounded-md border border-gray-300 p-4 sm:p-6">
            <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
                <div className="sm:order-last sm:shrink-0">
                <img alt="Photo User" src="https://images.unsplash.com/photo-1752599071610-5c4c87cef0e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8fA%3D%3D" className="size-16 rounded-full object-cover sm:size-[72px]"/>
                </div>
                <div className="mt-4 sm:mt-0">
                <h3 className="text-lg font-medium text-pretty text-gray-900">{task.descricao}</h3>
                <p className="mt-1 text-sm text-gray-700">{task.user}</p>
                </div>
            </div>
            <dl className="mt-6 flex gap-4 lg:gap-6">
                <div className="flex items-center gap-2">
                <dt className="text-gray-700">
                    <span className="sr-only"> Published on </span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"/>
                    </svg>
                </dt>
                <dd className="text-xs text-gray-700">15/07/2025</dd>
                </div>
                <div className="flex items-center gap-2">
                <dt className="text-gray-700">
                    <span className="sr-only"> Reading time </span>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5M12 3.75a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Z"
                    />
                    </svg>
                </dt>

                <dd className="text-xs text-gray-700">Criado há 12 minutos</dd>
                </div>
            </dl>
        </div>
    )
}