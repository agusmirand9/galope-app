import { call } from "./api.services"

const api = {
    getAvisos: (tipo) => call("/avisos" + (tipo ? `?tipo=${tipo}` : "")),
    createAviso: (aviso) => call("/avisos", "POST", aviso),
    updateAviso: (id, aviso) => call("/avisos/" + id, "PATCH", aviso),
    deleteAviso: (id) => call("/avisos/" + id, "DELETE"),
    createConfirmacion: (id) => call(`/avisos/${id}/confirmaciones`, "POST")
}

export function useApiAvisos() {
    return api
}
