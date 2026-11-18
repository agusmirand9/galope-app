import { LocateFixed, Plus, Trash2 } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { tripsSchema, VEHICULOS } from "../schemas/trips"
import { getCurrentPosition } from "../utils/geolocation"
import Field from "./Field"

// Formulario compartido por "Nuevo viaje" y "Editar viaje"
export default function FormViaje({ defaultValues, onSubmit, titulo, textoBoton }) {
    const {
        register,       // conecta cada input con el formulario
        handleSubmit,   // valida (con zod) y recién entonces llama a onSubmit
        control,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm({ resolver: zodResolver(tripsSchema), defaultValues })

    const { fields, append, remove } = useFieldArray({ control, name: "paradas" })

    const usarMiUbicacion = async (i) => {
        try {
            const pos = await getCurrentPosition()
            setValue(`paradas.${i}.lat`, pos.lat, { shouldValidate: true })
            setValue(`paradas.${i}.lng`, pos.lng, { shouldValidate: true })
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4" noValidate>
            <h1 className="font-display text-xl leading-snug">{titulo}</h1>

            <Field label="Origen" htmlFor="origen" error={errors.origen?.message}>
                <input id="origen" type="text" className="input" aria-invalid={!!errors.origen} {...register("origen")} />
            </Field>
            <Field label="Destino" htmlFor="destino" error={errors.destino?.message}>
                <input id="destino" type="text" className="input" aria-invalid={!!errors.destino} {...register("destino")} />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Fecha de ida" htmlFor="fechaIda" error={errors.fechaIda?.message}>
                    <input id="fechaIda" type="date" className="input" aria-invalid={!!errors.fechaIda} {...register("fechaIda")} />
                </Field>
                <Field label="Fecha de vuelta" htmlFor="fechaVuelta" error={errors.fechaVuelta?.message}>
                    <input id="fechaVuelta" type="date" className="input" aria-invalid={!!errors.fechaVuelta} {...register("fechaVuelta")} />
                </Field>
                <Field label="Adultos" htmlFor="adultos" error={errors.adultos?.message}>
                    <input id="adultos" type="number" min="1" className="input" aria-invalid={!!errors.adultos} {...register("adultos", { valueAsNumber: true })} />
                </Field>
                <Field label="Menores" htmlFor="menores" error={errors.menores?.message}>
                    <input id="menores" type="number" min="0" className="input" aria-invalid={!!errors.menores} {...register("menores", { valueAsNumber: true })} />
                </Field>
            </div>

            <Field label="Vehículo" htmlFor="vehiculo" error={errors.vehiculo?.message}>
                <select id="vehiculo" className="input" aria-invalid={!!errors.vehiculo} {...register("vehiculo")}>
                    {VEHICULOS.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
            </Field>

            <label className="flex min-h-12 cursor-pointer items-center gap-3 font-semibold">
                <input type="checkbox" className="h-6 w-6 accent-marron" {...register("mascotas")} />
                Viajan mascotas
            </label>

            <section className="space-y-3">
                <h2 className="font-bold">Paradas</h2>
                {fields.length === 0 && <p className="text-azul/80">Todavía no sumaste paradas. Podés agregarlas ahora o después.</p>}

                {fields.map((field, i) => (
                    <fieldset key={field.id} className="space-y-3 rounded-2xl bg-celeste-claro p-4">
                        <legend className="px-1 text-sm font-semibold">Parada {i + 1}</legend>
                        <Field label="Nombre" htmlFor={`parada-nombre-${i}`} error={errors.paradas?.[i]?.nombre?.message}>
                            <input id={`parada-nombre-${i}`} type="text" className="input" aria-invalid={!!errors.paradas?.[i]?.nombre} {...register(`paradas.${i}.nombre`)} />
                        </Field>
                        <Field label="Nota (opcional)" htmlFor={`parada-nota-${i}`} error={errors.paradas?.[i]?.nota?.message}>
                            <input id={`parada-nota-${i}`} type="text" className="input" aria-invalid={!!errors.paradas?.[i]?.nota} {...register(`paradas.${i}.nota`)} />
                        </Field>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Field label="Latitud" htmlFor={`parada-lat-${i}`} error={errors.paradas?.[i]?.lat?.message}>
                                <input id={`parada-lat-${i}`} type="number" step="any" className="input" aria-invalid={!!errors.paradas?.[i]?.lat} {...register(`paradas.${i}.lat`, { valueAsNumber: true })} />
                            </Field>
                            <Field label="Longitud" htmlFor={`parada-lng-${i}`} error={errors.paradas?.[i]?.lng?.message}>
                                <input id={`parada-lng-${i}`} type="number" step="any" className="input" aria-invalid={!!errors.paradas?.[i]?.lng} {...register(`paradas.${i}.lng`, { valueAsNumber: true })} />
                            </Field>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button type="button" onClick={() => usarMiUbicacion(i)} className="btn btn-secondary btn-small"><LocateFixed size={18} aria-hidden="true" />Usar mi ubicación</button>
                            <button type="button" onClick={() => remove(i)} className="btn btn-secondary btn-small"><Trash2 size={18} aria-hidden="true" />Quitar parada</button>
                        </div>
                    </fieldset>
                ))}

                <button
                    type="button"
                    onClick={() => append({ nombre: "", nota: "", lat: "", lng: "" })}
                    className="btn btn-secondary btn-small"
                >
                    <Plus size={18} aria-hidden="true" />Agregar parada
                </button>
            </section>

            <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
                {isSubmitting ? "Guardando..." : textoBoton}
            </button>
        </form>
    )
}
