import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin');
  const [senha, setSenha] = useState('admin');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulação de login
    navigate('/home');
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="card shadow-lg p-5" style={{ width: '100%', maxWidth: '400px', border: '1px solid var(--line)' }}>
        
        <div className="text-center mb-4">
          <p style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', color: 'var(--gold)', letterSpacing: '0.15em', margin: 0 }}>TEMA 1</p>
          <h2 style={{ fontFamily: 'Fraunces', color: 'var(--text)', margin: 0 }}>Gestão de Serviços</h2>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '8px' }}>E-mail</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '8px' }}>Senha</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2">
            Entrar no Sistema
          </button>
        </form>
        
      </div>
    </div>
  );
}