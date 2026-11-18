import { useState } from "react"
import { Check, MapPin, Pencil, Trash2, X } from "lucide-react"
import { TIPOS } from "../utils/alerts"
import { hace, venceEn } from "../utils/dates"

export default function ItemAviso({ aviso, esAdmin, onConfirmar, onEditar, onBorrar }) {
    const tipo = TIPOS[aviso.tipo]
    const Icono = tipo.icono
    const [editando, setEditando] = useState(false)
    const [texto, setTexto] = useState(aviso.descripcion ?? "")
    const [borrando, setBorrando] = useState(false)

    const guardar = async () => {
        const ok = await onEditar(aviso._id, texto)
        if (ok) setEditando(false)
    }

    const n = aviso.totalConfirmaciones
    return (
        <article className={`card border-l-8 ${tipo.borde}`}>
            <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold ${tipo.badge}`}>
                    <Icono size={18} aria-hidden="true" />{tipo.label}
                </span>
                {aviso.esMio && <span className="text-sm font-semibold text-azul/70">Tu aviso</span>}
            </div>

            {editando ? (
                <div className="mt-3 space-y-2">
                    <label htmlFor={`desc-${aviso._id}`} className="sr-only">Descripción</label>
                    <textarea id={`desc-${aviso._id}`} className="input" rows={2} maxLength={140} value={texto} onChange={(e) => setTexto(e.target.value)} />
                    <div className="flex gap-2">
                        <button type="button" onClick={guardar} className="btn btn-primary btn-small"><Check size={18} aria-hidden="true" />Guardar</button>
                        <button type="button" onClick={() => setEditando(false)} className="btn btn-secondary btn-small"><X size={18} aria-hidden="true" />Cancelar</button>
                    </div>
                </div>
            ) : (
                <p className="mt-3 text-lg">{aviso.descripcion || <span className="text-azul/60">Sin descripción</span>}</p>
            )}

            <p className="mt-2 text-sm font-semibold">Confirmado por {n} {n === 1 ? "viajero" : "viajeros"}</p>
            <p className="text-sm text-azul/80">Publicado {hace(aviso.createdAt)}, {venceEn(aviso.venceEn)}</p>
            <a
                className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-marron underline"
                href={`https://www.openstreetmap.org/?mlat=${aviso.lat}&mlon=${aviso.lng}#map=14/${aviso.lat}/${aviso.lng}`}
                target="_blank"
                rel="noreferrer"
            >
                <MapPin size={16} aria-hidden="true" />Ver en el mapa
            </a>

            <div className="mt-4 flex flex-wrap items-center gap-2">
                {!aviso.esMio && (
                    <button
                        type="button"
                        onClick={() => onConfirmar(aviso._id)}
                        disabled={aviso.confirmadoPorMi}
                        className="btn btn-primary btn-small"
                    >
                        <Check size={18} aria-hidden="true" />
                        {aviso.confirmadoPorMi ? "Ya lo confirmaste" : "Confirmar"}
                    </button>
                )}
                {aviso.esMio && !editando && (
                    <button type="button" onClick={() => setEditando(true)} className="btn btn-secondary btn-small"><Pencil size={18} aria-hidden="true" />Editar</button>
                )}
                {(aviso.esMio || esAdmin) && !borrando && (
                    <button type="button" onClick={() => setBorrando(true)} className="btn btn-secondary btn-small"><Trash2 size={18} aria-hidden="true" />Borrar</button>
                )}
                {borrando && (
                    <>
                        <span className="text-sm font-semibold">¿Borrar este aviso?</span>
                        <button type="button" onClick={() => onBorrar(aviso._id)} className="btn btn-primary btn-small"><Trash2 size={18} aria-hidden="true" />Sí, borrar</button>
                        <button type="button" onClick={() => setBorrando(false)} className="btn btn-secondary btn-small">Cancelar</button>
                    </>
                )}
            </div>
        </article>
    )
}
