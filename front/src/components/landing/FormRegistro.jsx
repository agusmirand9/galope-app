import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { usersLandingSchema } from "../../schemas/users"
import { useApiUsuarios } from "../../services/usuarios.services"
import FormError from "../FormError"

// Registro desde la landing. Mismo patrón que pages/auth/Register.jsx:
// react-hook-form + Zod para validar, y la llamada a la API sale por useApiUsuarios.
export default function FormRegistro() {
    const navigate = useNavigate()
    const { register: registerApi } = useApiUsuarios()
    const [serverError, setServerError] = useState("")

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(usersLandingSchema),
        defaultValues: { name: "", email: "", password: "", terminos: false }
    })

    const onSubmit = async (datos) => {
        setServerError("")
        try {
            const { terminos, ...usuario } = datos   // "terminos" es solo del front, el back no lo recibe
            // El back pide passwordConfirm; acá no hay segundo campo, así que va igual a la contraseña
            await registerApi({ ...usuario, passwordConfirm: usuario.password })
            toast.success("Cuenta creada. Ya podés iniciar sesión")
            navigate("/login")
        } catch (error) {
            setServerError(error.message)
        }
    }

    return (
        <section id="sumate" className="trama-claro relative -mt-14 scroll-mt-0 rounded-t-[4rem] bg-celeste-claro px-4 pt-16 md:pt-20">
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="trama-oscuro mx-auto max-w-xl space-y-5 rounded-t-[3rem] bg-azul px-6 pb-44 pt-12 shadow-lg md:px-16"
            >
                <h2 className="titulo text-center text-3xl text-white">SUMATE A LA COMUNIDAD</h2>

                <div className="space-y-2">
                    <label htmlFor="landing-name" className="sr-only">Nombre</label>
                    <input id="landing-name" type="text" placeholder="Nombre" autoComplete="name" className="input-land" aria-invalid={!!errors.name} {...register("name")} />
                    <FormError message={errors.name?.message} />
                </div>
                <div className="space-y-2">
                    <label htmlFor="landing-email" className="sr-only">Correo electrónico</label>
                    <input id="landing-email" type="email" placeholder="Correo electronico" autoComplete="email" className="input-land" aria-invalid={!!errors.email} {...register("email")} />
                    <FormError message={errors.email?.message} />
                </div>
                <div className="space-y-2">
                    <label htmlFor="landing-password" className="sr-only">Contraseña</label>
                    <input id="landing-password" type="password" placeholder="Contraseña" autoComplete="new-password" className="input-land" aria-invalid={!!errors.password} {...register("password")} />
                    <FormError message={errors.password?.message} />
                </div>

                <div className="space-y-2">
                    <label className="flex items-start gap-3 text-sm text-white">
                        <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-marron" {...register("terminos")} />
                        <span>
                            Acepto los <Link to="/terminos" className="underline">Términos</Link> y la <Link to="/privacidad" className="underline">Política de privacidad</Link>
                        </span>
                    </label>
                    <FormError message={errors.terminos?.message} />
                </div>

                <FormError message={serverError} />

                <div className="flex flex-col items-center gap-3 pt-2">
                    <button type="submit" disabled={isSubmitting} className="btn-land btn-land-marron">
                        {isSubmitting ? "Creando cuenta..." : "Crear mi cuenta"}
                    </button>
                    <p className="text-sm text-white">
                        ¿Ya tenés cuenta? <Link to="/login" className="font-semibold underline">Iniciá sesión</Link>.
                    </p>
                </div>
            </form>
        </section>
    )
}
