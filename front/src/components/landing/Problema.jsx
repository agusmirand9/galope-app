// "¿Cortada la ruta?": en escritorio texto a la izquierda y fotos sobre un panel marrón a la derecha;
// en celular las fotos van pegadas a los bordes, alternadas con el texto.
export default function Problema() {
    const parrafo1 = (
        <p>
            Una rueda pinchada, un camino que no conocés y ninguna gomería a la vista.<br />
            La que sí está abierta, no figura en internet.
        </p>
    )
    const parrafo2 = (
        <p>
            La información <strong>existe</strong>, está en quienes recorren las rutas todos los días.<br /><br />
            <strong>Galopé es el lugar donde esa información se reúne y se confirma.</strong>
        </p>
    )

    return (
        <section className="mx-auto max-w-6xl px-5 py-20 text-lg text-marron md:grid md:grid-cols-2 md:items-center md:gap-12 md:py-28 md:text-base">
            <div>
                <h2 className="text-2xl font-bold leading-snug md:text-xl">
                    ¿Cortada la ruta?<br />Preguntale a quien ya pasó
                </h2>

                <div className="mt-10 flex items-center gap-4 md:mt-5 md:block">
                    <img src="/img/baul.webp" alt="Baúl de un auto cargado con bolsos y una conservadora" className="-ml-5 aspect-3/4 w-[34%] rounded-r-[2.5rem] object-cover md:hidden" />
                    <div className="flex-1 text-center md:text-left">{parrafo1}</div>
                </div>

                <div className="mt-10 flex items-center gap-4 md:mt-6 md:block">
                    <div className="flex-1 text-center md:text-left">{parrafo2}</div>
                    <img src="/img/cartel.webp" alt="Cartel de ruta cubierto de stickers de viajeros" className="-mr-5 aspect-3/5 w-[34%] rounded-l-[2.5rem] object-cover md:hidden" />
                </div>

                <a href="#sumate" className="btn-land btn-land-marron mt-12 w-full md:mt-10">Crear cuenta</a>
            </div>

            {/* Escritorio: fotos sobre el panel marrón (la primera se sale del panel por la izquierda) */}
            <div className="relative hidden md:block">
                <div className="absolute inset-y-0 right-0 w-[82%] rounded-3xl bg-marron shadow-lg" aria-hidden="true" />
                <div className="relative grid grid-cols-2 gap-6 py-10 pr-8">
                    <img src="/img/cartel.webp" alt="Cartel de ruta cubierto de stickers de viajeros" className="aspect-9/16 w-full rounded-3xl object-cover shadow-lg" />
                    <img src="/img/baul.webp" alt="Baúl de un auto cargado con bolsos y una conservadora" className="aspect-9/16 w-full rounded-3xl object-cover shadow-lg" />
                </div>
            </div>
        </section>
    )
}
