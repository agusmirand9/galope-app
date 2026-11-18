import LandingNav from "../components/landing/LandingNav"
import Hero from "../components/landing/Hero"
import Problema from "../components/landing/Problema"
import ComoFunciona from "../components/landing/ComoFunciona"
import Avisos from "../components/landing/Avisos"
import Comunidad from "../components/landing/Comunidad"
import Planes from "../components/landing/Planes"
import FormRegistro from "../components/landing/FormRegistro"
import LandingFooter from "../components/landing/LandingFooter"

// Primera pantalla de quien no tiene cuenta. Cada sección es un componente en components/landing.
export default function Landing() {
    return (
        <div className="bg-celeste-claro">
            <div className="relative">
                <LandingNav />
                <Hero />
            </div>
            <Problema />
            <ComoFunciona />
            <Avisos />
            <Comunidad />
            <Planes />
            <FormRegistro />
            <LandingFooter />
        </div>
    )
}
