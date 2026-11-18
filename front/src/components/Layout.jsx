import { Suspense } from "react"
import { Outlet, useLocation } from "react-router"
import { Bounce, ToastContainer } from "react-toastify"
import { useUsuario } from "../context/session.context"
import Nav from "./Nav"
import Loading from "./Loading"

export default function Layout() {
    const usuario = useUsuario()
    const { pathname } = useLocation()

    // Quien no tiene sesión y entra a "/" ve la landing: ocupa todo el ancho y trae su propio menú
    const esLanding = !usuario && pathname === "/"

    return (
        <div className="min-h-screen">
            {!esLanding && <Nav />}
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <main className={esLanding ? "" : "mx-auto w-full max-w-3xl px-4 pb-16 pt-6"}>
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    )
}
