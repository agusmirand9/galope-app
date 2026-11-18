import { Mail } from "lucide-react"
import { Link } from "react-router"
import Logo from "../Logo"

const NAVEGACION = [
    { href: "#como-funciona", label: "Cómo funciona" },
    { href: "#avisos", label: "Avisos" },
    { href: "#comunidad", label: "Comunidad" }
]

// Las redes todavía no tienen perfil: reemplazar los "#" por las URLs reales
const REDES = [
    { nombre: "Instagram", href: "#", icono: "/social/instagram.png" },
    { nombre: "Facebook", href: "#", icono: "/social/facebook.png" },
    { nombre: "TikTok", href: "#", icono: "/social/tiktok.png" }
]

const linkClass = "inline-flex min-h-11 items-center text-sm text-azul hover:underline"

export default function LandingFooter() {
    return (
        <footer className="trama-oscuro relative -mt-28 rounded-t-[5rem] bg-celeste px-6 pb-10 pt-14 md:px-12">
            <div className="mx-auto grid max-w-6xl items-center gap-8 text-center md:grid-cols-[auto_1fr_auto] md:text-left">
                <Logo className="mx-auto h-24 w-auto md:mx-0" />

                <div className="space-y-1 text-center">
                    <nav aria-label="Pie de página" className="flex flex-wrap justify-center gap-x-6">
                        {NAVEGACION.map(({ href, label }) => <a key={href} href={href} className={linkClass}>{label}</a>)}
                        <Link to="/login" className={linkClass}>Iniciar sesión</Link>
                        <a href="#sumate" className={linkClass}>Crear cuenta</a>
                    </nav>
                    <div className="flex flex-wrap justify-center gap-x-6">
                        <Link to="/terminos" className={`${linkClass} text-marron`}>Términos y condiciones</Link>
                        <Link to="/privacidad" className={`${linkClass} text-marron`}>Política de privacidad</Link>
                    </div>
                    <p className="text-sm text-azul">© 2026 GALOPÉ. Todos los derechos reservados.</p>
                </div>

                <div className="flex flex-col items-center gap-4 md:items-start">
                    <a href="mailto:hola@galope.com" className="inline-flex min-h-11 items-center gap-2 text-sm text-azul hover:underline">
                        <Mail size={20} aria-hidden="true" />hola@galope.com
                    </a>
                    <ul className="flex gap-4">
                        {REDES.map(({ nombre, href, icono }) => (
                            <li key={nombre}>
                                <a href={href} aria-label={nombre} className="grid h-11 w-11 place-items-center">
                                    <img src={icono} alt="" className="h-9 w-9" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    )
}
