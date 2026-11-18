import { LogIn } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { usersLoginSchema } from "../../schemas/users"
import { useApiUsuarios } from "../../services/usuarios.services"
import { useLogin } from "../../context/session.context"
import Field from "../../components/Field"
import FormError from "../../components/FormError"

export default function Login() {
    const navigate = useNavigate()
    const loginSession = useLogin()
    const { login } = useApiUsuarios()
    const [serverError, setServerError] = useState("")

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({ resolver: zodResolver(usersLoginSchema) })

    const onSubmit = async (datos) => {
        setServerError("")
        try {
            const usuario = await login(datos)
            loginSession(usuario)
            navigate("/viajes")
        } catch (error) {
            setServerError(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-md space-y-4 rounded-3xl bg-azul p-6" noValidate>
            <h1 className="font-display text-xl leading-snug text-celeste">Iniciar sesión</h1>

            <Field dark label="Email" htmlFor="email" error={errors.email?.message}>
                <input id="email" type="email" autoComplete="email" className="input" aria-invalid={!!errors.email} {...register("email")} />
            </Field>
            <Field dark label="Contraseña" htmlFor="password" error={errors.password?.message}>
                <input id="password" type="password" autoComplete="current-password" className="input" aria-invalid={!!errors.password} {...register("password")} />
            </Field>

            <FormError message={serverError} />

            <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
                {isSubmitting ? "Ingresando..." : <><LogIn size={18} aria-hidden="true" />Ingresar</>}
            </button>
            <p className="text-center text-celeste">
                ¿No tenés cuenta? <Link to="/register" className="font-semibold text-white underline">Sumate</Link>
            </p>
        </form>
    )
}
