export default function Hero() {
    return (
        <>
            <section className="relative isolate flex min-h-[50rem] items-center overflow-hidden md:min-h-[46rem]">
                <img
                    src="/img/hero.webp"
                    alt=""
                    fetchPriority="high"
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-[50%_65%]"
                />
                {/* Velo para que el texto se lea sobre la foto */}
                <div className="absolute inset-0 -z-10 bg-linear-to-b from-azul/40 via-transparent to-black/25" aria-hidden="true" />

                <div className="mx-auto w-full max-w-5xl px-5 pb-16 pt-28 text-left md:text-center">
                    <h1 className="titulo text-[5rem] text-celeste sm:text-[8rem] lg:text-[10rem]">GALOPÉ</h1>
                    <p className="mt-6 max-w-md text-xl font-medium text-white md:mx-auto md:max-w-none md:text-lg">
                        La libertad de viajar a donde quieras,<br className="hidden md:block" /> con la seguridad de estar bien acompañado
                    </p>
                    <div className="mt-10 flex flex-col gap-4 md:flex-row md:justify-center">
                        <a href="#sumate" className="btn-land btn-land-marron">Crear mi cuenta</a>
                        <a href="#como-funciona" className="btn-land btn-land-claro">Ver cómo funciona</a>
                    </div>
                </div>
            </section>
            {/* Franja marrón al pie de la foto */}
            <div className="h-8 bg-marron" aria-hidden="true" />
        </>
    )
}
