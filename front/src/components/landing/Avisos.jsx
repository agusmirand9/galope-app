export default function Avisos() {
    return (
        <section id="avisos" className="mx-auto grid max-w-7xl scroll-mt-6 gap-6 px-4 pb-20 md:grid-cols-2 md:px-8 md:pb-28">
            <div className="flex flex-col rounded-3xl bg-marron p-8 text-white md:p-14">
                <h2 className="titulo text-4xl">AVISOS</h2>

                <p className="mt-10 font-light md:mt-16">
                    “Ruta 40 · San Rafael, tránsito fluido. Confirmado por 12 viajeros · hace 5 min”.
                </p>

                <div className="mt-8 space-y-1 font-semibold">
                    <p>Cómo se valida un aviso (cuántos lo confirmaron, cuándo se publicó, fotos y comentarios)</p>
                    <p>Lo que pasa en la ruta, en tiempo real.</p>
                    <p>Cada aviso muestra cuántos viajeros lo confirmaron y hace cuánto se publicó. Así sabés en qué confiar.</p>
                </div>

                <a href="#sumate" className="btn-land btn-land-claro mt-12 w-full md:mt-auto">Registrate para confirmar avisos</a>
            </div>

            <div className="grid gap-6 md:grid-rows-[auto_1fr]">
                <img src="/img/chalten.webp" alt="Ruta al atardecer rumbo a El Chaltén" className="aspect-2/1 w-full rounded-3xl object-cover object-[50%_88%]" />
                {/* El celular asoma desde arriba y se corta con el borde de la tarjeta */}
                <div className="relative min-h-72 overflow-hidden rounded-3xl bg-celeste shadow-md">
                    <img src="/img/celular.webp" alt="Pantalla de celular con la app de GALOPÉ" className="absolute left-1/2 top-8 w-[58%] max-w-sm -translate-x-1/2" />
                </div>
            </div>
        </section>
    )
}
