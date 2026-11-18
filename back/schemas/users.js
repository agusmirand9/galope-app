import { z } from "zod"

export const usersRegisterSchema = z.object({
    name: z.string("El nombre es obligatorio").min(3, "El nombre debe tener al menos 3 caracteres"),
    email: z.email("Ingresá un email válido"),
    password: z.string("La contraseña es obligatoria")
        .min(8, "La contraseña debe tener al menos 8 caracteres"),
    passwordConfirm: z.string("Confirmá la contraseña")
}, "Objeto inválido")
    .refine((data) => data.password === data.passwordConfirm, {
        error: "Las contraseñas no coinciden",
        path: ["passwordConfirm"],
    })

export const usersLoginSchema = z.object({
    email: z.email("Ingresá un email válido"),
    password: z.string("La contraseña es obligatoria").min(1, "La contraseña es obligatoria")
})
