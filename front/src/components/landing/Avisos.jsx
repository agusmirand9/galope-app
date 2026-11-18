import { CircleCheck, Clock, Users } from "lucide-react"

// Tarjeta de ejemplo: así se ve un aviso confirmado dentro de la app.
// Los colores de estado (rojo/amarillo/verde) se usan acá porque es un aviso.
function AvisoEjemplo() {
    return (
        <article className="rounded-2xl border-l-8 border-estado-verde bg-white p-5 shadow-md">
            <span className="inline-flex items-center gap-2 rounded-full bg-estado-verde px-3 py-1 text-sm font-bold text-azul">
                <CircleCheck size={18} aria-hidden="true" />Ruta libre
            </span>
            <p className="mt-3 text-lg font-bold">Ruta 40 · San Rafael</p>
            <p className="text-azul/90">Tránsito fluido, sin demoras.</p>
            <p className="mt-3 flex items-center gap-2 text-sm font-semibold"><Users size={16} aria-hidden="true" />Confirmado por 12 viajeros</p>
            <p className="mt-1 flex items-center gap-2 text-sm text-azul/80"><Clock size={16} aria-hidden="true" />Publicado hace 5 min</p>
        </article>
    )
}

const LEYENDA = [
    { color: "bg-estado-verde", texto: "Ruta libre" },
    { color: "bg-estado-amarillo", texto: "Precaución" },
    { color: "bg-estado-rojo", texto: "Ruta cortada" }
]

export default function Avisos() {
    return (
        <section id="avisos" className="mx-auto grid max-w-7xl scroll-mt-6 gap-6 px-4 pb-20 md:grid-cols-2 md:px-8 md:pb-28">
            <div className="flex flex-col rounded-3xl bg-marron p-8 text-white md:p-14">
                <h2 className="titulo text-4xl">AVISOS</h2>

                <p className="mt-10 text-xl font-semibold md:mt-16">Lo que pasa en la ruta, en tiempo real.</p>
                <p className="mt-3 text-lg font-light md:text-base">
                    Cada aviso muestra cuántos viajeros lo confirmaron y hace cuánto se publicó. Así sabés en qué confiar.
                </p>

                <a href="#sumate" className="btn-land btn-land-claro mt-12 w-full md:mt-auto">Crear cuenta</a>
            </div>

            <div className="grid gap-6 md:grid-rows-[auto_1fr]">
                <img src="/img/chalten.webp" alt="Ruta al atardecer rumbo a El Chaltén" className="aspect-2/1 w-full rounded-3xl object-cover object-[50%_88%]" />
                <div className="flex min-h-72 flex-col justify-center gap-5 rounded-3xl bg-celeste p-6 shadow-md md:p-8">
                    <AvisoEjemplo />
                    <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm font-medium" aria-label="Qué significa cada color">
                        {LEYENDA.map(({ color, texto }) => (
                            <li key={texto} className="inline-flex items-center gap-2">
                                <span className={`h-3 w-3 rounded-full ${color}`} aria-hidden="true" />{texto}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}
