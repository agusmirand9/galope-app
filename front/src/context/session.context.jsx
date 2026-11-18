/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState } from "react"
import { jwtDecode } from "jwt-decode"

export const contexto = createContext()

export function useSession() {
    return useContext(contexto)
}

export function useLogin() {
    const { onLogin } = useSession()
    return onLogin
}

export function useLogout() {
    const { onLogout } = useSession()
    return onLogout
}

export function useUsuario() {
    const { usuario } = useSession()
    return usuario
}

export function useRol() {
    const { onRol } = useSession()
    return onRol()
}

// Lee la sesión guardada y descarta tokens vencidos o corruptos
function leerSesion() {
    try {
        const usuario = JSON.parse(localStorage.getItem("usuario"))
        if (!usuario?.token) return null
        const { exp } = jwtDecode(usuario.token)
        if (exp * 1000 < Date.now()) {
            localStorage.removeItem("usuario")
            return null
        }
        return usuario
    } catch {
        localStorage.removeItem("usuario")
        return null
    }
}

export function SessionProvider({ children }) {
    const [usuario, setUsuario] = useState(leerSesion)

    const onLogin = useCallback((usuario) => {
        localStorage.setItem("usuario", JSON.stringify(usuario))
        setUsuario(usuario)
    }, [])

    const onLogout = useCallback(() => {
        localStorage.removeItem("usuario")
        setUsuario(null)
    }, [])

    const onRol = () => {
        if (usuario?.token) return jwtDecode(usuario.token).rol
        return null
    }

    return (
        <contexto.Provider value={{ usuario, onLogin, onLogout, onRol }}>
            {children}
        </contexto.Provider>
    )
}
