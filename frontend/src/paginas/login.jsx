import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navegar = useNavigate();

  // Função que será chamada ao enviar o formulário
  const lidarComLogin = (evento) => {
    evento.preventDefault();
    // plugar a validação da API aqui.
    
    navegar('/dashboard');
  };

  return (
    
    <div id="tela-login-fundo" className="d-flex align-items-center justify-content-center vh-100 bg-light fundo-tela-login">
      
      <div id="cartao-login" className="card p-4 shadow-sm cartao-acesso" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 id="titulo-login" className="text-center mb-4 titulo-acesso">Oficina OS</h2>
        
        <form id="formulario-login" onSubmit={lidarComLogin} className="formulario-entrada">
          
          <div className="mb-3 grupo-entrada">
            <label htmlFor="campo-email" className="form-label rotulo-campo">E-mail</label>
            <input 
              type="email" 
              id="campo-email" 
              className="form-control campo-texto" 
              placeholder="Digite seu e-mail" 
              required 
            />
          </div>
          
          <div className="mb-4 grupo-entrada">
            <label htmlFor="campo-senha" className="form-label rotulo-campo">Senha</label>
            <input 
              type="password" 
              id="campo-senha" 
              className="form-control campo-texto" 
              placeholder="Digite sua senha" 
              required 
            />
          </div>
          
          <button id="botao-entrar" type="submit" className="btn btn-primary w-100 botao-acao-principal">
            Entrar no Sistema
          </button>
          
        </form>
      </div>

    </div>
  );
}