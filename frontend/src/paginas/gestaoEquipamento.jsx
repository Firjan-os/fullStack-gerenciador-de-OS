import { useEffect, useState } from "react";
import {
  listarEquipamentos,
  cadastrarEquipamento,
  excluirEquipamento,
} from "../services/api";

export default function GestaoEquipamento() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // CAMPOS DO FORMULÁRIO: Alinhados exatamente com o seu EquipamentoDTO do Java
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [usuarioId, setUsuarioId] = useState(""); // Captura o ID do usuário dono

  useEffect(() => {
    buscarDadosDoBanco();
  }, []);

  async function buscarDadosDoBanco() {
    try {
      setCarregando(true);
      const response = await listarEquipamentos();
      setEquipamentos(response.data);
      setErro(null);
    } catch (err) {
      console.error("Erro ao buscar equipamentos:", err);
      setErro(
        "Não foi possível conectar ao servidor. Verifique se o backend está rodando.",
      );
    } finally {
      setCarregando(false);
    }
  }

  async function handleCadastrar(e) {
    e.preventDefault();
    try {
      
      const novoEquipamento = {
        nome,
        marca,
        modelo,
        usuarioId: parseInt(usuarioId, 10), 
      };

      await cadastrarEquipamento(novoEquipamento);

      // Limpa os campos após o sucesso
      setNome("");
      setMarca("");
      setModelo("");
      setUsuarioId("");
      setMostrarFormulario(false);

      // Atualiza a tabela
      buscarDadosDoBanco();
    } catch (err) {
      console.error("Erro ao cadastrar equipamento:", err);
      const mensagemErro =
        err.response?.data?.message ||
        "Erro ao salvar o equipamento no banco de dados. Verifique os dados informados.";
      alert(mensagemErro);
    }
  }

  async function handleExcluir(id) {
    if (window.confirm("Tem certeza que deseja excluir este equipamento?")) {
      try {
        await excluirEquipamento(id);
        buscarDadosDoBanco();
      } catch (err) {
        console.error("Erro ao excluir equipamento:", err);
        alert("Erro ao excluir o equipamento.");
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
            INVENTÁRIO
          </p>
          <h2 style={{ fontFamily: "Fraunces", margin: 0 }}>
            Gestão de Equipamentos
          </h2>
        </div>
        <button
          className="btn btn-primary px-4"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          {mostrarFormulario ? "Cancelar" : "+ Novo Equipamento"}
        </button>
      </header>

      {/* Formulário de Cadastro ajustado */}
      {mostrarFormulario && (
        <div
          className="card p-4 mb-4 shadow-sm"
          style={{ border: "1px solid var(--line)" }}
        >
          <h4 style={{ fontFamily: "Fraunces" }} className="mb-4">
            Cadastrar Novo Equipamento
          </h4>
          <form onSubmit={handleCadastrar}>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label
                  className="form-label"
                  style={{ fontSize: "14px", color: "var(--text)" }}
                >
                  Nome do Equipamento
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label
                  className="form-label"
                  style={{ fontSize: "14px", color: "var(--text)" }}
                >
                  Marca
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label
                  className="form-label"
                  style={{ fontSize: "14px", color: "var(--text)" }}
                >
                  Modelo
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label
                  className="form-label"
                  style={{ fontSize: "14px", color: "var(--text)" }}
                >
                  ID do Usuário (Dono)
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Ex: 1"
                  value={usuarioId}
                  onChange={(e) => setUsuarioId(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="d-flex justify-content-end mt-2">
              <button type="submit" className="btn btn-success px-4">
                Salvar Equipamento
              </button>
            </div>
          </form>
        </div>
      )}

      {carregando && (
        <div className="text-center my-4">
          <p>Carregando inventário...</p>
        </div>
      )}
      {erro && <div className="alert alert-danger text-center">{erro}</div>}

      {!carregando && !erro && (
        <div className="card p-0 shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead>
                <tr>
                  <th className="px-4">ID</th>
                  <th>Equipamento (Nome)</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>ID Usuário Dono</th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {equipamentos.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      Nenhum equipamento cadastrado no inventário.
                    </td>
                  </tr>
                ) : (
                  equipamentos.map((eq) => (
                    <tr key={eq.id}>
                      <td
                        className="px-4"
                        style={{
                          fontFamily: "IBM Plex Mono",
                          color: "var(--gold)",
                        }}
                      >
                        #{eq.id}
                      </td>
                      <td style={{ fontWeight: 500 }}>{eq.nome}</td>
                      <td style={{ color: "var(--muted)" }}>
                        {eq.marca || "-"}
                      </td>
                      <td style={{ color: "var(--muted)" }}>
                        {eq.modelo || "-"}
                      </td>
                      <td
                        style={{
                          fontFamily: "IBM Plex Mono",
                          fontSize: "13px",
                        }}
                      >
                        #{eq.usuarioId}
                      </td>
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
                          onClick={() => handleExcluir(eq.id)}
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
