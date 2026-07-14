import { useState, useEffect } from "react";
import {
  listarOrdens,
  cadastrarOrdem,
  atualizarOrdem,
  excluirOrdem,
} from "../services/api";

export default function GestaoServico() {
  const [ordens, setOrdens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // ESTADO DO FORMULÁRIO E EDIÇÃO
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [idEdicao, setIdEdicao] = useState(null);

  // ESTADOS DOS CAMPOS
  const [usuarioId, setUsuarioId] = useState("");
  const [equipamentoId, setEquipamentoId] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valorTotal, setValorTotal] = useState("");
  const [status, setStatus] = useState("ABERTA"); // Bate com StatusOS.ABERTA no back

  useEffect(() => {
    carregarOrdens();
  }, []);

  const carregarOrdens = async () => {
    try {
      setCarregando(true);
      const resposta = await listarOrdens();
      setOrdens(resposta.data || []);
      setErro(null);
    } catch (err) {
      console.error("Erro ao buscar ordens de serviço:", err);
      setErro("Não foi possível carregar as ordens de serviço.");
    } finally {
      setCarregando(false);
    }
  };

  // Preenche o formulário com os dados atuais da Ordem de Serviço selecionada
  const prepararEdicao = (os) => {
    setIdEdicao(os.id);
    setUsuarioId(os.usuario?.id ? String(os.usuario.id) : "");
    setEquipamentoId(os.equipamento?.id ? String(os.equipamento.id) : "");
    setDescricao(os.descricao || "");
    setValorTotal(os.valorTotal ? String(os.valorTotal) : "");

    // Normaliza o status vindo do back (ex: remove acentos ou formata se necessário)
    const statusLimpo = os.status === "CONCLUIDO" ? "CONCLUIDA" : os.status;
    setStatus(statusLimpo || "ABERTA");

    setMostrarFormulario(true);
  };

  // Limpa os campos do formulário com segurança
  const resetarFormulario = () => {
    setUsuarioId("");
    setEquipamentoId("");
    setDescricao("");
    setValorTotal("");
    setStatus("ABERTA");
    setIdEdicao(null);
    setMostrarFormulario(false);
  };

  // Função unificada para salvar (Decide entre cadastrar nova OS ou atualizar uma existente)
  const handleSalvarOS = async (e) => {
    e.preventDefault();
    try {
      // Constrói o DTO idêntico ao esperado pelo Spring Boot (OrdemServicoDTO)
      const dadosOS = {
        descricao: descricao || null,
        valorTotal: parseFloat(valorTotal) || 0,
        usuario: {
          id: parseInt(usuarioId, 10),
        },
        equipamento: {
          id: parseInt(equipamentoId, 10),
        },
        status: status, // Aqui passamos "ABERTA", "EM_ANDAMENTO" ou "CONCLUIDA"
      };

      if (idEdicao) {
        // Se houver um ID em edição, faz a atualização (PUT)
        await atualizarOrdem(idEdicao, dadosOS);
      } else {
        // Se não, realiza o cadastro normal (POST)
        await cadastrarOrdem(dadosOS);
      }

      resetarFormulario();
      carregarOrdens();
    } catch (err) {
      console.error("Erro ao salvar ordem de serviço:", err);
      const mensagemErro =
        err.response?.data?.message ||
        "Erro ao salvar a Ordem de Serviço no servidor.";
      alert(mensagemErro);
    }
  };

  // Função para deletar uma OS do banco de dados
  const handleExcluir = async (id) => {
    if (
      window.confirm("Tem certeza que deseja excluir esta ordem de serviço?")
    ) {
      try {
        await excluirOrdem(id);
        carregarOrdens();
      } catch (err) {
        console.error("Erro ao excluir ordem de serviço:", err);
        alert("Erro ao excluir a ordem de serviço.");
      }
    }
  };

  const renderizarStatus = (status) => {
    switch (status) {
      case "CONCLUIDO":
      case "CONCLUIDA":
        return <span className="pill concluida">● Concluída</span>;
      case "EM_ANDAMENTO":
        return <span className="pill pendente">● Em andamento</span>;
      default:
        return <span className="pill aberta">● Aberta</span>;
    }
  };

  const formatarData = (dataString) => {
    if (!dataString) return "-";
    try {
      const data = new Date(dataString);
      return (
        data.toLocaleDateString("pt-BR") +
        " " +
        data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      );
    } catch {
      return dataString;
    }
  };

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
            CHAMADOS TÉCNICOS
          </p>
          <h2 style={{ fontFamily: "Fraunces", margin: 0 }}>
            Ordens de Serviço
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
          {mostrarFormulario ? "Cancelar" : "+ Abrir OS"}
        </button>
      </header>

      {/* Formulário Híbrido: Nova OS / Editar OS */}
      {mostrarFormulario && (
        <div
          className="card p-4 mb-4 shadow-sm"
          style={{ border: "1px solid var(--line)" }}
        >
          <h4
            style={{ fontFamily: "Fraunces", color: "white" }}
            className="mb-4"
          >
            {idEdicao
              ? "Editar Ordem de Serviço"
              : "Abrir Nova Ordem de Serviço"}
          </h4>
          <form onSubmit={handleSalvarOS}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label
                  className="form-label"
                  style={{ fontSize: "14px", color: "white" }}
                >
                  ID do Usuário Responsável
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={usuarioId}
                  onChange={(e) => setUsuarioId(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label
                  className="form-label"
                  style={{ fontSize: "14px", color: "white" }}
                >
                  ID do Equipamento
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={equipamentoId}
                  onChange={(e) => setEquipamentoId(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="row">
              {/* O tamanho do campo de descrição se ajusta dinamicamente caso seja Edição */}
              <div className={idEdicao ? "col-md-6 mb-3" : "col-md-9 mb-3"}>
                <label
                  className="form-label"
                  style={{ fontSize: "14px", color: "white" }}
                >
                  Descrição do Problema
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  maxLength="500"
                />
              </div>

              {/* O select de status só será exibido se você estiver editando uma OS existente */}
              {idEdicao && (
                <div className="col-md-3 mb-3">
                  <label
                    className="form-label"
                    style={{ fontSize: "14px", color: "white" }}
                  >
                    Status do Chamado
                  </label>
                  <select
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="ABERTA">Aberta</option>
                    <option value="EM_ANDAMENTO">Em andamento</option>
                    <option value="CONCLUIDA">Concluída</option>
                  </select>
                </div>
              )}

              <div className="col-md-3 mb-3">
                <label
                  className="form-label"
                  style={{ fontSize: "14px", color: "white" }}
                >
                  Valor Previsto (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={valorTotal}
                  onChange={(e) => setValorTotal(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="d-flex justify-content-end mt-2">
              <button type="submit" className="btn btn-success px-4">
                {idEdicao ? "Atualizar Ordem" : "Salvar Ordem de Serviço"}
              </button>
            </div>
          </form>
        </div>
      )}

      {erro && <div className="alert alert-danger">{erro}</div>}

      <div className="card p-0 shadow-sm">
        <div className="table-responsive">
          {carregando ? (
            <div
              className="text-center p-5"
              style={{ fontFamily: "IBM Plex Mono", color: "white" }}
            >
              Carregando chamados...
            </div>
          ) : ordens.length === 0 ? (
            <div
              className="text-center p-5"
              style={{ fontFamily: "IBM Plex Mono", color: "white" }}
            >
              Nenhuma ordem de serviço encontrada.
            </div>
          ) : (
            <table className="table table-hover mb-0 align-middle">
              <thead>
                <tr>
                  <th className="px-4">ID OS</th>
                  <th>Responsável</th>
                  <th>Equipamento</th>
                  <th>Descrição do Problema</th>
                  <th>Data Abertura</th>
                  <th>Valor Previsto</th>
                  <th>Status</th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {ordens.map((os) => (
                  <tr key={os.id}>
                    <td
                      className="px-4"
                      style={{
                        fontFamily: "IBM Plex Mono",
                        color: "var(--gold)",
                      }}
                    >
                      #{os.id}
                    </td>

                    <td style={{ fontWeight: 500, color: "var(--muted)" }}>
                      {os.usuario?.nome || `Usuário #${os.usuario?.id || "-"}`}
                    </td>
                    <td style={{ color: "var(--muted)", fontSize: "14px" }}>
                      {os.equipamento?.nome ||
                        `Equipamento #${os.equipamento?.id || "-"}`}
                    </td>

                    <td style={{ color: "var(--muted)", fontSize: "14px" }}>
                      {os.descricao || "-"}
                    </td>

                    <td
                      style={{
                        fontFamily: "IBM Plex Mono",
                        fontSize: "13px",
                        color: "var(--muted)",
                      }}
                    >
                      {formatarData(os.dataAbertura)}
                    </td>

                    <td
                      style={{
                        fontFamily: "IBM Plex Mono",
                        color: "var(--text)",
                      }}
                    >
                      {(os.valorTotal || 0).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td>{renderizarStatus(os.status)}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm me-2"
                        style={{
                          border: "1px solid var(--line)",
                          color: "var(--text)",
                        }}
                        onClick={() => prepararEdicao(os)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleExcluir(os.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
