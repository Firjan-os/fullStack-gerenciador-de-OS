import { useState, useEffect } from "react";
import { listarOrdens, cadastrarOrdem } from "../services/api";

export default function GestaoServico() {
  const [ordens, setOrdens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // ESTADO DO FORMULÁRIO
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // ESTADOS DOS CAMPOS
  const [usuarioId, setUsuarioId] = useState("");
  const [equipamentoId, setEquipamentoId] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valorTotal, setValorTotal] = useState("");

  useEffect(() => {
    carregarOrdens();
  }, []);

  const carregarOrdens = async () => {
    try {
      setCarregando(true);
      const resposta = await listarOrdens();
      setOrdens(resposta.data);
      setErro(null);
    } catch (err) {
      console.error("Erro ao buscar ordens de serviço:", err);
      setErro("Não foi possível carregar as ordens de serviço.");
    } finally {
      setCarregando(false);
    }
  };

  const handleCadastrarOS = async (e) => {
    e.preventDefault();
    try {
      
      const novaOS = {
        descricao: descricao || null,
        valorTotal: parseFloat(valorTotal) || 0,
        usuario: {
          id: parseInt(usuarioId, 10),
        },
        equipamento: {
          id: parseInt(equipamentoId, 10),
        },
      };

      await cadastrarOrdem(novaOS);

      // Limpa os inputs
      setUsuarioId("");
      setEquipamentoId("");
      setDescricao("");
      setValorTotal("");
      setMostrarFormulario(false);

      // Recarrega a listagem atualizada
      carregarOrdens();
    } catch (err) {
      console.error("Erro ao abrir ordem de serviço:", err);
      const mensagemErro =
        err.response?.data?.message ||
        "Erro ao salvar a Ordem de Serviço no servidor.";
      alert(mensagemErro);
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

  // Helper para tratar e exibir a data/hora do LocalDateTime do Spring Boot
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
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          {mostrarFormulario ? "Cancelar" : "+ Abrir OS"}
        </button>
      </header>

      {mostrarFormulario && (
        <div
          className="card p-4 mb-4 shadow-sm"
          style={{ border: "1px solid var(--line)" }}
        >
          <h4 style={{ fontFamily: "Fraunces" }} className="mb-4 --text">
            Abrir Nova Ordem de Serviço
          </h4>
          <form onSubmit={handleCadastrarOS}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label" style={{ fontSize: "14px" }}>
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
                <label className="form-label" style={{ fontSize: "14px" }}>
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
              <div className="col-md-9 mb-3">
                <label className="form-label" style={{ fontSize: "14px" }}>
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
              <div className="col-md-3 mb-3">
                <label className="form-label" style={{ fontSize: "14px" }}>
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
                Salvar Ordem de Serviço
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
              className="text-center p-5 text-muted"
              style={{ fontFamily: "IBM Plex Mono" }}
            >
              Carregando chamados...
            </div>
          ) : ordens.length === 0 ? (
            <div
              className="text-center p-5 text-muted"
              style={{ fontFamily: "IBM Plex Mono" }}
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

                    {/* Mapeamentos corrigidos acessando as propriedades internas com segurança (?) */}
                    <td style={{ fontWeight: 500 }}>
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
                      style={{ fontFamily: "IBM Plex Mono", fontSize: "13px" }}
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
                        className="btn btn-sm"
                        style={{
                          border: "1px solid var(--line)",
                          color: "var(--text)",
                        }}
                      >
                        Editar
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
