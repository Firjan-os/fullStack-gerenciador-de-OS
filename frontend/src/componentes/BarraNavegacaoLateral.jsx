import { NavLink } from 'react-router-dom';

export default function BarraNavegacaoLateral() {
  return (
    
    <nav id="menu-lateral" className="d-flex flex-column p-3 bg-dark text-white vh-100 area-navegacao" style={{ width: '250px' }}>
      <h3 id="logotipo-texto" className="mb-4 text-center">Oficina OS</h3>
      
      <ul className="nav nav-pills flex-column mb-auto lista-links">
        <li className="nav-item item-lista">
          <NavLink to="/dashboard" className="nav-link text-white link-menu">
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item item-lista">
          <NavLink to="/clientes" className="nav-link text-white link-menu">
            Clientes
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}