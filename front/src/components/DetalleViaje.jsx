import { MapPin } from "lucide-react"
import { formatDia } from "../utils/dates"

export default function DetalleViaje({ viaje }) {
    return (
        <div className="card space-y-4">
            <div>
                <h1 className="font-display text-xl leading-snug">{viaje.destino}</h1>
                <p className="mt-1 text-azul/80">Desde {viaje.origen}</p>
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm">
                <div><dt className="font-semibold text-azul/70">Ida</dt><dd className="text-base">{formatDia(viaje.fechaIda)}</dd></div>
                <div><dt className="font-semibold text-azul/70">Vuelta</dt><dd className="text-base">{formatDia(viaje.fechaVuelta)}</dd></div>
                <div><dt className="font-semibold text-azul/70">Adultos</dt><dd className="text-base">{viaje.adultos}</dd></div>
                <div><dt className="font-semibold text-azul/70">Menores</dt><dd className="text-base">{viaje.menores}</dd></div>
                <div><dt className="font-semibold text-azul/70">Vehículo</dt><dd className="text-base">{viaje.vehiculo}</dd></div>
                <div><dt className="font-semibold text-azul/70">Mascotas</dt><dd className="text-base">{viaje.mascotas ? "Sí" : "No"}</dd></div>
            </dl>
            <div>
                <h2 className="font-bold">Paradas</h2>
                {viaje.paradas.length === 0 && <p className="text-azul/80">Este viaje todavía no tiene paradas.</p>}
                <ul className="mt-2 space-y-2">
                    {viaje.paradas.map((parada, i) => (
                        <li key={i} className="rounded-2xl bg-celeste-claro p-3">
                            <p className="font-semibold">{parada.nombre}</p>
                            {parada.nota && <p className="text-sm text-azul/80">{parada.nota}</p>}
                            <a
                                className="inline-flex items-center gap-1 text-sm font-semibold text-marron underline"
                                href={`https://www.openstreetmap.org/?mlat=${parada.lat}&mlon=${parada.lng}#map=14/${parada.lat}/${parada.lng}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <MapPin size={16} aria-hidden="true" />Ver en el mapa
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
