import { call } from "./api.services"

const api = {
    getViajes: (estado) => call("/viajes" + (estado ? `?estado=${estado}` : "")),
    getViajesById: (id) => call("/viajes/" + id),
    createViaje: (viaje) => call("/viajes", "POST", viaje),
    updateViaje: (id, viaje) => call("/viajes/" + id, "PUT", viaje),
    deleteViaje: (id) => call("/viajes/" + id, "DELETE")
}

export function useApiViajes() {
    return api
}
