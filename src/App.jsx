import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login"; 
import Registro from "./pages/Registro"; 
import Home from "./pages/Home"; 
import TuMascota from "./pages/TuMascota"; 
import RegistrarMascota from "./pages/RegistrarMascota"; 
import Citas from "./pages/Citas"; 
import Recommendations from "./pages/Recommendations"; 
import Perfil from "./pages/Perfil"; 
import RutaPrivada from "./components/RutaPrivada"; 

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route element={<RutaPrivada />}>
            <Route path="/home" element={<Home />} />
            <Route path="/tu-mascota" element={<TuMascota />} />
            <Route path="/registrar-mascota" element={<RegistrarMascota />} />
            <Route path="/citas" element={<Citas />} />
            <Route path="/recomendaciones" element={<Recommendations />} />
            <Route path="/perfil" element={<Perfil />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default App;

