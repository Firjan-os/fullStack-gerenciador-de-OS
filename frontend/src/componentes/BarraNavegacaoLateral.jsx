import { NavLink } from 'react-router-dom';

export default function BarraNavegacaoLateral() {
  return (
    <nav 
      id="menu-lateral" 
      className="d-flex flex-column p-4" 
      style={{ 
        width: '260px', 
        backgroundColor: 'var(--surface)', 
        borderRight: '1px solid var(--line)',
        height: '100vh',
        position: 'sticky',
        top: 0
      }}
    >
      <div className="mb-5 text-center">
        <p style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', color: 'var(--gold)', letterSpacing: '0.18em', margin: 0 }}>SISTEMA DE GESTÃO</p>
        <h3 style={{ fontFamily: 'Fraunces', color: 'var(--text)', margin: 0 }}></h3>
      </div>
      
      <ul className="nav nav-pills flex-column mb-auto lista-links gap-2">
        <li className="nav-item">
          <NavLink 
            to="/home" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              color: isActive ? '#000' : 'var(--muted)',
              backgroundColor: isActive ? 'var(--gold)' : 'transparent',
              fontFamily: 'IBM Plex Mono',
              fontSize: '14px',
              transition: 'all 0.3s ease'
            })}
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              color: isActive ? '#000' : 'var(--muted)',
              backgroundColor: isActive ? 'var(--gold)' : 'transparent',
              fontFamily: 'IBM Plex Mono',
              fontSize: '14px',
              transition: 'all 0.3s ease'
            })}
          >
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/clientes" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              color: isActive ? '#000' : 'var(--muted)',
              backgroundColor: isActive ? 'var(--gold)' : 'transparent',
              fontFamily: 'IBM Plex Mono',
              fontSize: '14px',
              transition: 'all 0.3s ease'
            })}
          >
            Clientes
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/equipamentos" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              color: isActive ? '#000' : 'var(--muted)',
              backgroundColor: isActive ? 'var(--gold)' : 'transparent',
              fontFamily: 'IBM Plex Mono',
              fontSize: '14px',
              transition: 'all 0.3s ease'
            })}
          >
            Equipamentos
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/servicos" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              color: isActive ? '#000' : 'var(--muted)',
              backgroundColor: isActive ? 'var(--gold)' : 'transparent',
              fontFamily: 'IBM Plex Mono',
              fontSize: '14px',
              transition: 'all 0.3s ease'
            })}
          >
            Ordens de Serviço
          </NavLink>
        </li>
      </ul>
      
      <div className="mt-auto pt-4" style={{ borderTop: '1px solid var(--line)' }}>
         <NavLink 
            to="/login" 
            className="nav-link text-center w-100" 
            style={{ 
              fontFamily: 'IBM Plex Mono', 
              fontSize: '14px',
              color: '#d9534f',
              border: '1px solid #d9534f',
              borderRadius: '8px',
              padding: '8px'
            }}
         >
            Sair do Sistema
         </NavLink>
      </div>
    </nav>
  );
}