import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importação dos componentes e páginas
import BarraNavegacaoLateral from './componentes/BarraNavegacaoLateral';
import Login from './paginas/login';
import PainelDashboard from './paginas/painelDashboard';
import GestaoClientes from './paginas/gestaoClientes';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública de Login (sem o menu lateral) */}
        <Route path="/login" element={<Login />} />
        
        {/* Rota raiz redireciona para o login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Grupo de rotas privadas (com o menu lateral) */}
        <Route path="/*" element={
          <div id="layout-principal" className="d-flex estrutura-base">
            <BarraNavegacaoLateral />
            <main id="area-conteudo" className="flex-grow-1 p-4 fundo-cinza-claro" style={{ height: '100vh', overflowY: 'auto' }}>
              <Routes>
                <Route path="/dashboard" element={<PainelDashboard />} />
                <Route path="/clientes" element={<GestaoClientes />} />
              </Routes>
            </main>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}