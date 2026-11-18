import { Link } from "react-router"
import Logo from "../Logo"

// Los links de sección son anclas (#id): bajan a la sección de la misma página
const SECCIONES = [
    { href: "#como-funciona", label: "Cómo funciona" },
    { href: "#avisos", label: "Avisos" },
    { href: "#comunidad", label: "Comunidad" }
]

const linkClass = "inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-marron transition hover:bg-celeste"

export default function LandingNav() {
    return (
        <header className="absolute inset-x-0 top-0 z-20">
            {/* Celular: barra de ancho completo con el imagotipo */}
            <nav aria-label="Principal" className="flex items-center justify-between gap-2 rounded-b-3xl bg-celeste-claro px-4 py-3 md:hidden">
                <Link to="/"><Logo className="h-11 w-auto" /></Link>
                <div className="flex items-center gap-2">
                    <Link to="/login" className="inline-flex min-h-11 items-center px-2 text-base text-marron">Iniciar sesión</Link>
                    <a href="#sumate" className="inline-flex min-h-12 items-center rounded-2xl bg-marron px-6 text-base text-white transition hover:bg-marron/90">Sumate</a>
                </div>
            </nav>

            {/* Escritorio: píldora flotante centrada, con el isotipo */}
            <nav aria-label="Principal" className="mx-auto mt-6 hidden w-fit items-center gap-1 rounded-xl bg-celeste-claro p-1.5 shadow-sm md:flex">
                <Link to="/" className="inline-flex min-h-11 items-center px-2">
                    <img src="/pin.svg" alt="GALOPÉ" className="h-8 w-auto" />
                </Link>
                {SECCIONES.map(({ href, label }) => (
                    <a key={href} href={href} className={linkClass}>{label}</a>
                ))}
                <Link to="/login" className={linkClass}>Iniciar sesión</Link>
                <a href="#sumate" className="inline-flex min-h-11 items-center rounded-lg bg-marron px-4 text-sm font-medium text-white transition hover:bg-marron/90">Sumate</a>
            </nav>
        </header>
    )
}
