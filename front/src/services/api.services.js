// Único punto de salida hacia la API: agrega el token y traduce los errores.
export async function call(uri, method = "GET", body = undefined) {
    const url = import.meta.env.VITE_API_URL ?? "http://localhost:2026/api"
    const token = JSON.parse(localStorage.getItem("usuario"))?.token

    const headers = { "Content-Type": "application/json" }
    if (token) headers.authorization = token

    const res = await fetch(url + uri, {
        headers,
        method,
        body: body === undefined ? undefined : JSON.stringify(body)
    })
    const data = await res.json().catch(() => null)

    if (!res.ok) {
        // Token vencido o inválido: cerramos la sesión
        if (res.status === 401 && token) {
            localStorage.removeItem("usuario")
            window.location.assign("/login")
        }
        // El back responde { message } o una lista de "campo:mensaje" (validación)
        const message = Array.isArray(data) ? data.join(". ") : data?.message
        throw new Error(message ?? "Ocurrió un error inesperado")
    }
    return data
}
