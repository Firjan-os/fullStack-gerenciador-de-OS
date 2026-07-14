import { useEffect, useState } from "react";
import {
  listarClientes,
  cadastrarCliente,
  atualizarCliente,
  excluirCliente,
} from "../services/api";

export default function GestaoClientes() {
  // Estados para armazenar os dados e controlar a tela
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Estados para o formulário 
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [idEdicao, setIdEdicao] = useState(null);
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
      setClientes(response.data || []); 
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

  // Preenche os inputs com as informações do cliente selecionado e abre o form
  function prepararEdicao(cliente) {
    setIdEdicao(cliente.id);
    setNome(cliente.nome || "");
    setTelefone(cliente.telefone || "");
    setEmail(cliente.email || "");
    setMostrarFormulario(true);
  }

  // Limpa o formulário e os controles de edição
  function resetarFormulario() {
    setNome("");
    setTelefone("");
    setEmail("");
    setIdEdicao(null);
    setMostrarFormulario(false);
  }

  // Função para enviar os dados (Cadastro ou Atualização) para o banco de dados
  async function handleSalvar(e) {
    e.preventDefault();
    try {
      const dadosCliente = { nome, telefone, email };

      if (idEdicao) {
        await atualizarCliente(idEdicao, dadosCliente);
      } else {
        await cadastrarCliente(dadosCliente);
      }

      resetarFormulario();
      buscarDadosDoBanco();
    } catch (err) {
      console.error("Erro ao salvar cliente:", err);
      alert("Erro ao salvar o cliente.");
    }
  }

  // Função para deletar um cliente do banco
  async function handleExcluir(id) {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      try {
        await excluirCliente(id);
        buscarDadosDoBanco();
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
          onClick={() => {
            if (mostrarFormulario) {
              resetarFormulario();
            } else {
              setMostrarFormulario(true);
            }
          }}
        >
          {mostrarFormulario ? "Cancelar" : "+ Novo Cliente"}
        </button>
      </header>

      {/* Formulário Dinâmico de Cadastro / Edição */}
      {mostrarFormulario && (
        <div className="card p-4 mb-4 shadow-sm">
          <h4 style={{ fontFamily: "Fraunces" }} className="mb-3">
            {idEdicao ? "Editar Cliente" : "Novo Cliente"}
          </h4>
          <form onSubmit={handleSalvar}>
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
              {idEdicao ? "Atualizar no Banco" : "Salvar no Banco"}
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
                {!clientes || clientes.length === 0 ? (
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
                          onClick={() => prepararEdicao(cliente)}
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