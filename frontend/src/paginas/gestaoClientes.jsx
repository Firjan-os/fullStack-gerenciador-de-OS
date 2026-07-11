import { useEffect, useState } from "react";
import {
  listarClientes,
  cadastrarCliente,
  excluirCliente,
} from "../services/api";

export default function GestaoClientes() {
  // Estados para armazenar os dados e controlar a tela
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Estados para o formulário de cadastro (Novo Cliente)
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  // Executa assim que a tela abre
  useEffect(() => {
    buscarDadosDoBanco();
  }, []);

  // Função para buscar os clientes no Spring Boot
  async function buscarDadosDoBanco() {
    try {
      setCarregando(true);
      const response = await listarClientes();
      setClientes(response.data); // Salva a lista vinda do banco no estado
      setErro(null);
    } catch (err) {
      console.error("Erro ao buscar clientes:", err);
      setErro(
        "Não foi possível conectar ao servidor. Verifique se o backend está rodando.",
      );
    } finally {
      setCarregando(false);
    }
  }

  // Função para enviar o novo cliente para o banco de dados
  async function handleCadastrar(e) {
    e.preventDefault();
    try {
      const novoCliente = { nome, telefone, email };
      await cadastrarCliente(novoCliente);

      // Limpa os campos e fecha o formulário
      setNome("");
      setTelefone("");
      setEmail("");
      setMostrarFormulario(false);

      // Atualiza a lista na tela com os dados novos
      buscarDadosDoBanco();
    } catch (err) {
      console.error("Erro ao cadastrar cliente:", err);
      alert("Erro ao salvar o cliente.");
    }
  }

  // Função para deletar um cliente do banco
  async function handleExcluir(id) {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      try {
        await excluirCliente(id);
        buscarDadosDoBanco(); // Atualiza a lista após deletar
      } catch (err) {
        console.error("Erro ao excluir cliente:", err);
        alert("Erro ao excluir o cliente.");
      }
    }
  }

  return (
    <div className="container-fluid p-0">
      <header
        className="mb-4 d-flex justify-content-between align-items-end"
        style={{ borderBottom: "1px solid var(--line)", paddingBottom: "20px" }}
      >
        <div>
          <p
            style={{
              fontFamily: "IBM Plex Mono",
              fontSize: "11px",
              color: "var(--gold)",
              letterSpacing: "0.18em",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            CADASTRO
          </p>
          <h2 style={{ fontFamily: "Fraunces", margin: 0 }}>
            Gestão de Clientes
          </h2>
        </div>
        <button
          className="btn btn-primary px-4"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          {mostrarFormulario ? "Cancelar" : "+ Novo Cliente"}
        </button>
      </header>

      {/* Formulário Dinâmico de Cadastro */}
      {mostrarFormulario && (
        <div className="card p-4 mb-4 shadow-sm">
          <h4 style={{ fontFamily: "Fraunces" }} className="mb-3">
            Novo Cliente
          </h4>
          <form onSubmit={handleCadastrar}>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Telefone</label>
                <input
                  type="text"
                  className="form-control"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">E-mail</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-success px-4">
              Salvar no Banco
            </button>
          </form>
        </div>
      )}

      {/* Feedbacks de Carregamento ou Erro */}
      {carregando && (
        <div className="text-center my-5">
          <p>Carregando dados da API...</p>
        </div>
      )}
      {erro && <div className="alert alert-danger text-center">{erro}</div>}

      {/* Tabela de Clientes */}
      {!carregando && !erro && (
        <div className="card p-0 shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead>
                <tr>
                  <th className="px-4">ID</th>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>E-mail</th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {clientes.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      Nenhum cliente cadastrado no banco de dados.
                    </td>
                  </tr>
                ) : (
                  clientes.map((cliente) => (
                    <tr key={cliente.id}>
                      <td
                        className="px-4"
                        style={{
                          fontFamily: "IBM Plex Mono",
                          color: "var(--gold)",
                        }}
                      >
                        #{cliente.id}
                      </td>
                      <td style={{ fontWeight: 500 }}>{cliente.nome}</td>
                      <td style={{ color: "var(--muted)" }}>
                        {cliente.telefone}
                      </td>
                      <td style={{ color: "var(--muted)" }}>{cliente.email}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm me-2"
                          style={{
                            border: "1px solid var(--line)",
                            color: "var(--text)",
                          }}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleExcluir(cliente.id)}
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
