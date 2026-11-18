import { call } from "./api.services"

const api = {
    login: (usuario) => call("/usuarios/login", "POST", usuario),
    register: (usuario) => call("/usuarios", "POST", usuario)
}

// Mismo patrón de la guía: un hook que devuelve las funciones de la entidad
export function useApiUsuarios() {
    return api
}
