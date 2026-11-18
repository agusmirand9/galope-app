// Devuelve una promesa con { lat, lng } o falla con un mensaje legible
export function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Tu navegador no permite obtener la ubicación"))
            return
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => resolve({
                lat: Number(pos.coords.latitude.toFixed(5)),
                lng: Number(pos.coords.longitude.toFixed(5))
            }),
            () => reject(new Error("No pudimos obtener tu ubicación. Activá el permiso en el navegador o cargá las coordenadas a mano")),
            { enableHighAccuracy: true, timeout: 10000 }
        )
    })
}
