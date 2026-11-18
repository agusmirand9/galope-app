import { ListChecks, Megaphone } from "lucide-react"

// lucide no trae un ícono de ruta con perspectiva: este es propio (mismo trazo que los otros dos)
function IconoRuta(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M8.5 3h7l4.5 18H4z" />
            <path d="M12 6.5v2M12 11.5v2M12 16.5v2.5" />
        </svg>
    )
}

const PASOS = [
    { icono: IconoRuta, titulo: "Recorrido a tu medida", texto: "Armá tu ruta, sumá tus paradas y cambiala cuando quieras." },
    { icono: ListChecks, titulo: "Viaje organizado", texto: "Planificá antes, navegá durante y guardá los recuerdos después." },
    { icono: Megaphone, titulo: "Información confiable", texto: "Cortes, estado del camino y clima, confirmados por otros viajeros." }
]

export default function ComoFunciona() {
    return (
        <section id="como-funciona" className="mx-auto max-w-6xl scroll-mt-6 px-4 pb-24 pt-8 md:px-8 md:pb-32">
            <div className="md:text-center">
                <h2 className="titulo text-4xl uppercase text-azul md:text-5xl">Cómo funciona</h2>
                <p className="mt-2 font-bold text-marron">Así te acompañamos</p>
            </div>

            <ul className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
                {PASOS.map(({ icono: Icono, titulo, texto }) => (
                    <li key={titulo} className="rounded-[4.5rem] bg-azul px-8 py-12 text-center shadow-lg">
                        <Icono className="mx-auto h-14 w-14 text-celeste" aria-hidden="true" />
                        <h3 className="mt-6 text-base font-bold uppercase text-white">{titulo}</h3>
                        <p className="mx-auto mt-3 max-w-60 text-base font-medium text-celeste">{texto}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}
