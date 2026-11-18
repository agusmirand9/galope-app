import FormError from "./FormError"

// Etiqueta + control + mensaje de error. "dark" es para tarjetas azules.
export default function Field({ label, htmlFor, error, hint, dark = false, children }) {
    return (
        <div className="space-y-1.5">
            <label
                htmlFor={htmlFor}
                className={dark ? "block text-xs font-semibold uppercase tracking-wide text-celeste" : "block text-sm font-semibold text-azul"}
            >
                {label}
            </label>
            {children}
            {hint && !error && <p className={dark ? "text-sm text-celeste" : "text-sm text-azul/70"}>{hint}</p>}
            <FormError message={error} />
        </div>
    )
}
