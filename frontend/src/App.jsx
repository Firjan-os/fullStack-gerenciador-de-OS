import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import BarraNavegacaoLateral from './componentes/BarraNavegacaoLateral';
import Login from './paginas/login';
import Home from './paginas/home';
import PainelDashboard from './paginas/painelDashboard';
import GestaoClientes from './paginas/gestaoClientes';
import GestaoEquipamento from './paginas/gestaoEquipamento';
import GestaoServico from './paginas/gestaoServico';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Login sem o menu lateral */}
        <Route path="/login" element={<Login />} />
        
        
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Layout com barra Lateral */}
        <Route path="/*" element={
          <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
            <BarraNavegacaoLateral />
            <main className="flex-grow-1 p-4" style={{ height: '100vh', overflowY: 'auto' }}>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<PainelDashboard />} />
                <Route path="/clientes" element={<GestaoClientes />} />
                <Route path="/equipamentos" element={<GestaoEquipamento />} />
                <Route path="/servicos" element={<GestaoServico />} />
              </Routes>
            </main>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}