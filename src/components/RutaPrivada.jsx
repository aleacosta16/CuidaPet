import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

/**
 * Componente que protege rutas (Ruta Privada).
 * Si el usuario no tiene una sesión activa en localStorage, es redirigido a /login.
 */
const RutaPrivada = () => {
    const navigate = useNavigate();
    
    // 1. Verificar el estado de autenticación
    const usuarioJSON = localStorage.getItem('usuarioCuidaPet');
    const isAuthenticated = !!usuarioJSON; 

    // 2. Ejecutar la redirección como un efecto secundario si no está autenticado
    useEffect(() => {
        if (!isAuthenticated) {
            // Redirige a /login si no está autenticado. 
            // 'replace: true' evita que el usuario regrese con el botón 'Atrás'.
            navigate("/login", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    // 3. Renderizar el contenido si está autenticado.
    // Si isAuthenticated es true, <Outlet /> renderiza el componente hijo de la ruta.
    // Si isAuthenticated es false, el useEffect ya disparó la redirección.
    return isAuthenticated ? <Outlet /> : null;
};

export default RutaPrivada;
