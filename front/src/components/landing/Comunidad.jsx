import { Check } from "lucide-react"

const BENEFICIOS = [
    "Publicá y confirmá avisos de la ruta.",
    "Armá y guardá tus recorridos.",
    "Sumate a una comunidad de viajeros reales."
]

export default function Comunidad() {
    return (
        <section id="comunidad" className="relative scroll-mt-0 rounded-t-[4rem] bg-marron px-5 pb-32 pt-14 text-white md:px-12 md:pt-16 md:pb-36">
            <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
                <div className="grid gap-6">
                    <img src="/img/auto-celular.webp" alt="Una mano saca una foto con el celular desde la ventanilla de un auto" className="aspect-2/1 w-full rounded-2xl object-cover object-[50%_35%]" />
                    <img src="/img/auto-mate.webp" alt="Tablero de un auto en ruta, con un mate en la mano" className="aspect-2/1 w-full rounded-2xl object-cover object-[50%_60%]" />
                </div>

                <div>
                    <h2 className="titulo text-4xl">COMUNIDAD</h2>
                    <p className="mt-8 font-medium">DE VIAJEROS PARA VIAJEROS</p>
                    <p className="font-light">Cada ruta que alguien recorre deja una pista para el que viene detrás. Sumá la tuya.</p>
                    <ul className="mt-6 space-y-2 font-light">
                        {BENEFICIOS.map(b => (
                            <li key={b} className="flex items-start gap-3">
                                <Check size={20} className="mt-0.5 shrink-0 text-celeste" aria-hidden="true" />{b}
                            </li>
                        ))}
                    </ul>
                    <a href="#sumate" className="btn-land btn-land-claro mt-10 w-full">Crear cuenta</a>
                </div>
            </div>
        </section>
    )
}
