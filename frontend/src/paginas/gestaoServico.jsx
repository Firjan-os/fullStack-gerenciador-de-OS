import { useState } from 'react';

const ordensMock = [
  { id: 5001, descricao: "Manutenção Preventiva Semestral", status: "Aberta", valor: 1200.00, data_abertura: "25/06/2026", cliente: "Construtora Alfa", equipamento: "Gerador Industrial" },
  { id: 5002, descricao: "Troca de Tela e Teclado", status: "Em andamento", valor: 850.00, data_abertura: "26/06/2026", cliente: "Roberto Almeida", equipamento: "Notebook Corporativo" },
  { id: 5003, descricao: "Limpeza de Filtros e Carga de Gás", status: "Concluída", valor: 450.00, data_abertura: "20/06/2026", cliente: "Clínica Vida", equipamento: "Ar Condicionado Central" }
];

export default function GestaoServico() {
  const [ordens] = useState(ordensMock);

  const renderizarStatus = (status) => {
    switch (status) {
      case "Concluída":
        return <span className="pill concluida">● Concluída</span>;
      case "Em andamento":
        return <span className="pill pendente">● Em andamento</span>;
      default:
        return <span className="pill aberta">● Aberta</span>;
    }
  };

  return (
    <div className="container-fluid p-0">
      <header className="mb-4 d-flex justify-content-between align-items-end" style={{ borderBottom: '1px solid var(--line)', paddingBottom: '20px' }}>
        <div>
          <p style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', color: 'var(--gold)', letterSpacing: '0.18em', margin: 0, textTransform: 'uppercase' }}>CHAMADOS TÉCNICOS</p>
          <h2 style={{ fontFamily: 'Fraunces', margin: 0 }}>Ordens de Serviço</h2>
        </div>
        <button className="btn btn-primary px-4">
          + Abrir OS
        </button>
      </header>

      <div className="card p-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead>
              <tr>
                <th className="px-4">ID OS</th>
                <th>Cliente</th>
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
                  <td className="px-4" style={{ fontFamily: 'IBM Plex Mono', color: 'var(--gold)' }}>#{os.id}</td>
                  <td style={{ fontWeight: 500 }}>{os.cliente}</td>
                  <td style={{ color: 'var(--muted)', fontSize: '14px' }}>{os.equipamento}</td>
                  <td style={{ color: 'var(--muted)', fontSize: '14px' }}>{os.descricao}</td>
                  <td style={{ fontFamily: 'IBM Plex Mono', fontSize: '13px' }}>{os.data_abertura}</td>
                  <td style={{ fontFamily: 'IBM Plex Mono', color: 'var(--text)' }}>
                    {os.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td>{renderizarStatus(os.status)}</td>
                  <td className="text-center">
                    <button className="btn btn-sm" style={{ border: '1px solid var(--line)', color: 'var(--text)' }}>Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}