import { z } from "zod"

// Mismo esquema que en el back (schemas/users.js). Si cambia uno, cambia el otro.
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

// SOLO FRONT: el formulario de la landing no tiene "confirmar contraseña" (así está en el diseño)
// y suma el tilde de Términos. Las reglas de name, email y password son las mismas que arriba.
// Al enviar se agrega passwordConfirm = password, así el back valida con su esquema de siempre.
export const usersLandingSchema = z.object({
    name: usersRegisterSchema.shape.name,
    email: usersRegisterSchema.shape.email,
    password: usersRegisterSchema.shape.password,
    terminos: z.boolean().refine((acepto) => acepto, "Tenés que aceptar los Términos y la Política de privacidad")
}, "Objeto inválido")
