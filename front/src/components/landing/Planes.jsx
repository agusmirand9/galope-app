import { Check } from "lucide-react"
import { EMAIL_CONTACTO } from "../../utils/contacto"

// Precios de lanzamiento: se cambian acá y se actualizan en toda la sección.
const PRECIOS = {
    premium: { mes: "$4.990", anio: "$49.900" },
    negocio: { mes: "$9.990", anio: "$99.900" }
}

const GRATIS = [
    "Ver, publicar y confirmar avisos",
    "Clima por localidad",
    "Puntos de interés",
    "Hasta 2 recorridos guardados"
]

const PREMIUM = [
    "Todo lo del plan gratis",
    "Recorridos ilimitados",
    "Modo offline para zonas sin señal",
    "Alertas de cortes sobre tu ruta",
    "Álbum de recuerdos para guardar y compartir"
]

const NEGOCIO = [
    "Etiqueta “Socio Galopé” en tu ficha",
    "Aparecés primero en tu zona",
    "Tu teléfono o WhatsApp a la vista",
    "Mención en nuestras redes"
]

function Incluye({ items, className = "" }) {
    return (
        <div className={`mt-8 border-t border-current/25 pt-6 ${className}`}>
            <p className="font-semibold">Incluye</p>
            <ul className="mt-3 space-y-3">
                {items.map(item => (
                    <li key={item} className="flex items-start gap-3">
                        <Check size={20} className="mt-0.5 shrink-0" aria-hidden="true" />{item}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default function Planes() {
    const asuntoNegocio = encodeURIComponent("Quiero sumar mi negocio a Galopé")

    return (
        <section id="planes" className="relative -mt-14 scroll-mt-0 rounded-t-[4rem] bg-celeste-claro px-4 pb-16 pt-20 md:px-8 md:pb-24 md:pt-24">
            <div className="mx-auto max-w-6xl">
                <div className="text-center">
                    <h2 className="titulo text-4xl text-azul md:text-5xl">PLANES</h2>
                    <p className="mt-3 text-xl font-bold text-marron">Gratis para empezar. Premium para viajar sin límites.</p>
                    <p className="mx-auto mt-2 max-w-xl text-azul">Los avisos y el clima son siempre gratis. Premium suma comodidad para los que viajan más.</p>
                </div>

                <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
                    {/* Gratis */}
                    <article className="flex flex-col rounded-3xl bg-celeste p-7 text-azul shadow-md">
                        <h3 className="text-2xl font-bold">Gratis</h3>
                        <p className="text-azul/80">Para salir a la ruta</p>
                        <p className="mt-6 text-5xl font-bold">$0</p>
                        <p className="mt-2 min-h-10 text-sm">Sin tarjeta, por el tiempo que quieras</p>
                        <a href="#sumate" className="btn-land btn-land-marron mt-4 w-full">Crear cuenta</a>
                        <Incluye items={GRATIS} />
                    </article>

                    {/* Premium: va primero en el celular y se levanta en escritorio */}
                    <article className="order-first flex flex-col rounded-3xl bg-azul p-7 text-white shadow-xl md:order-none md:-translate-y-3">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h3 className="text-2xl font-bold">Premium</h3>
                                <p className="text-celeste">Para viajar sin límites</p>
                            </div>
                            <span className="rounded-full bg-celeste px-3 py-1 text-sm font-semibold text-azul">Recomendado</span>
                        </div>
                        <p className="mt-6 text-5xl font-bold">{PRECIOS.premium.mes} <span className="text-base font-medium text-celeste">por mes</span></p>
                        <p className="mt-2 min-h-10 text-sm text-celeste">o {PRECIOS.premium.anio} por año, con 2 meses gratis</p>
                        <a href="#sumate" className="btn-land btn-land-marron mt-4 w-full">Crear cuenta</a>
                        <p className="mt-3 text-center text-sm text-celeste">Creá tu cuenta gratis. Elegís tu plan cuando esté disponible.</p>
                        <Incluye items={PREMIUM} />
                    </article>

                    {/* Negocios */}
                    <article className="flex flex-col rounded-3xl bg-marron p-7 text-white shadow-md">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h3 className="text-2xl font-bold">Socio Galopé</h3>
                                <p className="text-crema">Para gomerías y servicios de ruta</p>
                            </div>
                            <span className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">Para negocios</span>
                        </div>
                        <p className="mt-6 text-5xl font-bold">{PRECIOS.negocio.mes} <span className="text-base font-medium text-crema">por mes</span></p>
                        <p className="mt-2 min-h-10 text-sm text-crema">o {PRECIOS.negocio.anio} por año, con 2 meses gratis</p>
                        <a href={`mailto:${EMAIL_CONTACTO}?subject=${asuntoNegocio}`} className="btn-land btn-land-claro mt-4 w-full">Quiero sumar mi negocio</a>
                        <Incluye items={NEGOCIO} />
                    </article>
                </div>

                <p className="mt-8 text-center text-sm text-azul/80">Precios de lanzamiento, sujetos a cambios.</p>
            </div>
        </section>
    )
}
