import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router"
import { House, LogIn, LogOut, Menu, Route, TriangleAlert, UserPlus, X } from "lucide-react"
import { useUsuario } from "../context/session.context"

// Estilo de cada link: en escritorio es una píldora, en el menú del celular ocupa todo el ancho
const linkClass = (mobile) => ({ isActive }) =>
    `flex items-center gap-2 rounded-full font-semibold transition ${mobile ? "min-h-12 px-4 text-base" : "min-h-11 px-4 text-sm"} ${isActive ? "bg-marron text-white" : "text-azul hover:bg-celeste"}`

export default function Nav() {
    const usuario = useUsuario()
    const [abierto, setAbierto] = useState(false)

    // El menú del celular se cierra con la tecla Escape
    useEffect(() => {
        if (!abierto) return
        const onKeyDown = (e) => { if (e.key === "Escape") setAbierto(false) }
        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [abierto])

    const cerrar = () => setAbierto(false)

    // Mismos links para escritorio y celular
    const items = usuario
        ? [
            { to: "/", label: "Inicio", icon: House, end: true },
            { to: "/viajes", label: "Mis viajes", icon: Route },
            { to: "/avisos", label: "Avisos", icon: TriangleAlert },
            { to: "/salir", label: "Salir", icon: LogOut }
        ]
        : [
            { to: "/", label: "Inicio", icon: House, end: true },
            { to: "/login", label: "Iniciar sesión", icon: LogIn }
        ]

    return (
        <header className="sticky top-0 z-40 px-4 pt-3">
            <nav className="mx-auto max-w-3xl rounded-3xl bg-white px-3 py-2 shadow-sm" aria-label="Principal">
                <div className="flex items-center justify-between">
                    <Link to="/" onClick={cerrar} className="px-2 font-display text-base text-azul">GALOPÉ</Link>

                    {/* Escritorio: links en línea */}
                    <div className="hidden items-center gap-1 sm:flex">
                        {items.map(({ to, label, icon: Icon, end }) => (
                            <NavLink key={to} to={to} end={end} className={linkClass(false)}>
                                <Icon size={18} aria-hidden="true" />{label}
                            </NavLink>
                        ))}
                        {!usuario && (
                            <Link to="/register" className="btn btn-primary btn-small">
                                <UserPlus size={18} aria-hidden="true" />Crear cuenta
                            </Link>
                        )}
                    </div>

                    {/* Celular: botón hamburguesa */}
                    <button
                        type="button"
                        onClick={() => setAbierto(a => !a)}
                        aria-expanded={abierto}
                        aria-controls="menu-movil"
                        aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
                        className="grid h-11 w-11 cursor-pointer place-items-center rounded-full text-azul hover:bg-celeste sm:hidden"
                    >
                        {abierto ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
                    </button>
                </div>

                {/* Celular: panel desplegable */}
                {abierto && (
                    <div id="menu-movil" className="mt-2 flex flex-col gap-1 border-t border-celeste pt-2 sm:hidden">
                        {items.map(({ to, label, icon: Icon, end }) => (
                            <NavLink key={to} to={to} end={end} onClick={cerrar} className={linkClass(true)}>
                                <Icon size={20} aria-hidden="true" />{label}
                            </NavLink>
                        ))}
                        {!usuario && (
                            <Link to="/register" onClick={cerrar} className="btn btn-primary mt-1">
                                <UserPlus size={20} aria-hidden="true" />Crear cuenta
                            </Link>
                        )}
                    </div>
                )}
            </nav>
        </header>
    )
}
