// "2026-12-20" -> Date local a medianoche (evita el corrimiento de zona horaria)
export function parseDia(texto) {
    const [y, m, d] = texto.split("-").map(Number)
    return new Date(y, m - 1, d)
}

export function formatDia(texto) {
    return parseDia(texto).toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" })
}

// Texto de la tarjeta del próximo viaje
export function diasParaSalir(fechaIda, fechaVuelta) {
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)
    const dias = Math.round((parseDia(fechaIda) - hoy) / 86400000)
    if (dias === 0) return "Hoy salís"
    if (dias < 0 && parseDia(fechaVuelta) >= hoy) return "Viaje en curso"
    if (dias < 7) return "Esta semana"
    return `En ${dias} días`
}

export function hace(fechaIso) {
    const min = Math.max(0, Math.round((Date.now() - new Date(fechaIso).getTime()) / 60000))
    if (min < 1) return "recién"
    if (min < 60) return `hace ${min} min`
    if (min < 1440) return `hace ${Math.round(min / 60)} h`
    return `hace ${Math.round(min / 1440)} d`
}

export function venceEn(fechaIso) {
    const min = Math.round((new Date(fechaIso).getTime() - Date.now()) / 60000)
    if (min < 60) return `vence en ${Math.max(min, 1)} min`
    return `vence en ${Math.round(min / 60)} h`
}
