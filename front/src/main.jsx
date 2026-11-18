/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { SessionProvider } from './context/session.context.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))
const Login = lazy(() => import('./pages/auth/Login.jsx'))
const Register = lazy(() => import('./pages/auth/Register.jsx'))
const Logout = lazy(() => import('./pages/auth/Logout.jsx'))
const Viajes = lazy(() => import('./pages/viajes/Viajes.jsx'))
const Detalle = lazy(() => import('./pages/viajes/Detalle.jsx'))
const NuevoViaje = lazy(() => import('./pages/viajes/NuevoViaje.jsx'))
const EditarViaje = lazy(() => import('./pages/viajes/EditarViaje.jsx'))
const EliminarViaje = lazy(() => import('./pages/viajes/EliminarViaje.jsx'))
const Avisos = lazy(() => import('./pages/avisos/Avisos.jsx'))
const NuevoAviso = lazy(() => import('./pages/avisos/NuevoAviso.jsx'))
const Historial = lazy(() => import('./pages/avisos/Historial.jsx'))

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/salir", element: <Logout /> },
      { path: "/viajes", element: <ProtectedRoute element={<Viajes />} /> },
      { path: "/viajes/:id", element: <ProtectedRoute element={<Detalle />} /> },
      { path: "/nuevo-viaje", element: <ProtectedRoute element={<NuevoViaje />} /> },
      { path: "/editar-viaje/:id", element: <ProtectedRoute element={<EditarViaje />} /> },
      { path: "/eliminar-viaje/:id", element: <ProtectedRoute element={<EliminarViaje />} /> },
      { path: "/avisos", element: <ProtectedRoute element={<Avisos />} /> },
      { path: "/nuevo-aviso", element: <ProtectedRoute element={<NuevoAviso />} /> },
      { path: "/historial", element: <ProtectedRoute rol={["admin"]} element={<Historial />} /> },
      { path: "*", element: <NotFound /> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <SessionProvider>
    <RouterProvider router={router} />
  </SessionProvider>
)
