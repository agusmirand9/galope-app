import { Megaphone, MapPin } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { alertsSchema, TIPOS_AVISO } from "../../schemas/alerts"
import { TIPOS } from "../../utils/alerts"
import { getCurrentPosition } from "../../utils/geolocation"
import { useApiAvisos } from "../../services/avisos.services"
import Field from "../../components/Field"
import FormError from "../../components/FormError"

export default function NuevoAviso() {
    const navigate = useNavigate()
    const { createAviso } = useApiAvisos()
    const [ubicacion, setUbicacion] = useState("BUSCANDO")
    const [ubicacionError, setUbicacionError] = useState("")

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm({ resolver: zodResolver(alertsSchema), defaultValues: { descripcion: "" } })

    // Los avisos se publican con la ubicación actual
    useEffect(() => {
        let activo = true
        getCurrentPosition()
            .then(pos => {
                if (!activo) return
                setValue("lat", pos.lat, { shouldValidate: true })
                setValue("lng", pos.lng, { shouldValidate: true })
                setUbicacion("LISTA")
            })
            .catch(error => {
                if (!activo) return
                setUbicacionError(error.message)
                setUbicacion("ERROR")
            })
        return () => { activo = false }
    }, [setValue])

    const onSubmit = async (aviso) => {
        try {
            await createAviso(aviso)
            toast.success("Aviso publicado")
            navigate("/avisos")
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4" noValidate>
            <h1 className="font-display text-xl leading-snug">Publicar aviso</h1>

            <fieldset className="space-y-2">
                <legend className="mb-1 text-sm font-semibold">¿Qué viste en la ruta?</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                    {TIPOS_AVISO.map(valor => {
                        const Icono = TIPOS[valor].icono
                        return (
                        <label key={valor} className="cursor-pointer">
                            <input type="radio" value={valor} className="peer sr-only" {...register("tipo")} />
                            <span className="flex min-h-12 items-center gap-3 rounded-xl border-2 border-celeste bg-white px-3 font-medium peer-checked:border-azul peer-checked:bg-celeste peer-focus-visible:outline-3 peer-focus-visible:outline-marron">
                                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${TIPOS[valor].badge}`} aria-hidden="true">
                                    <Icono size={18} />
                                </span>
                                {TIPOS[valor].label}
                            </span>
                        </label>
                        )
                    })}
                </div>
                <FormError message={errors.tipo?.message} />
            </fieldset>

            <Field label="Descripción (opcional)" htmlFor="descripcion" hint="Hasta 140 caracteres" error={errors.descripcion?.message}>
                <textarea id="descripcion" rows={3} maxLength={140} className="input" aria-invalid={!!errors.descripcion} {...register("descripcion")} />
            </Field>

            <section className="space-y-3 rounded-2xl bg-celeste-claro p-4">
                <h2 className="flex items-center gap-2 font-bold"><MapPin size={20} aria-hidden="true" />Ubicación</h2>
                {ubicacion === "BUSCANDO" && <p className="text-azul/80">Buscando tu ubicación...</p>}
                {ubicacion === "LISTA" && <p className="font-medium">Usamos tu ubicación actual.</p>}
                {ubicacion === "ERROR" && <FormError message={ubicacionError} />}
                <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Latitud" htmlFor="lat" error={errors.lat?.message}>
                        <input id="lat" type="number" step="any" className="input" aria-invalid={!!errors.lat} {...register("lat", { valueAsNumber: true })} />
                    </Field>
                    <Field label="Longitud" htmlFor="lng" error={errors.lng?.message}>
                        <input id="lng" type="number" step="any" className="input" aria-invalid={!!errors.lng} {...register("lng", { valueAsNumber: true })} />
                    </Field>
                </div>
            </section>

            <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
                {isSubmitting ? "Publicando..." : <><Megaphone size={18} aria-hidden="true" />Publicar aviso</>}
            </button>
        </form>
    )
}
