export default function ErrorState({ message = "No pudimos cargar la información. Revisá tu conexión e intentá de nuevo." }) {
    return <div role="alert" className="rounded-2xl border-2 border-marron bg-crema p-4 font-medium text-marron">{message}</div>
}
