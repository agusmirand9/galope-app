import { UserPlus } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { usersRegisterSchema } from "../../schemas/users"
import { useApiUsuarios } from "../../services/usuarios.services"
import Field from "../../components/Field"
import FormError from "../../components/FormError"

export default function Register() {
    const navigate = useNavigate()
    const { register: registerApi } = useApiUsuarios()
    const [serverError, setServerError] = useState("")

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({ resolver: zodResolver(usersRegisterSchema) })

    const onSubmit = async (datos) => {
        setServerError("")
        try {
            await registerApi(datos)
            toast.success("Cuenta creada. Ya podés iniciar sesión")
            navigate("/login")
        } catch (error) {
            setServerError(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-md space-y-4 rounded-3xl bg-azul p-6" noValidate>
            <h1 className="font-display text-xl leading-snug text-celeste">Crear cuenta</h1>

            <Field dark label="Nombre" htmlFor="name" error={errors.name?.message}>
                <input id="name" type="text" autoComplete="name" className="input" aria-invalid={!!errors.name} {...register("name")} />
            </Field>
            <Field dark label="Email" htmlFor="email" error={errors.email?.message}>
                <input id="email" type="email" autoComplete="email" className="input" aria-invalid={!!errors.email} {...register("email")} />
            </Field>
            <Field dark label="Contraseña" htmlFor="password" hint="Mínimo 8 caracteres" error={errors.password?.message}>
                <input id="password" type="password" autoComplete="new-password" className="input" aria-invalid={!!errors.password} {...register("password")} />
            </Field>
            <Field dark label="Confirmar contraseña" htmlFor="passwordConfirm" error={errors.passwordConfirm?.message}>
                <input id="passwordConfirm" type="password" autoComplete="new-password" className="input" aria-invalid={!!errors.passwordConfirm} {...register("passwordConfirm")} />
            </Field>

            <FormError message={serverError} />

            <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
                {isSubmitting ? "Creando cuenta..." : <><UserPlus size={18} aria-hidden="true" />Crear cuenta</>}
            </button>
            <p className="text-center text-celeste">
                ¿Ya tenés cuenta? <Link to="/login" className="font-semibold text-white underline">Iniciá sesión</Link>
            </p>
        </form>
    )
}
