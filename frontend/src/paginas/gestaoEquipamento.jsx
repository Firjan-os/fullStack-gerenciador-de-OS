import { useState } from 'react';

// Dados fic
const equipamentosMock = [
  { id: 101, nome: "Gerador Industrial", modelo: "G-500KVA", marca: "Caterpillar", cliente: "Construtora Alfa (ID: 1)" },
  { id: 102, nome: "Notebook Corporativo", modelo: "ThinkPad T14", marca: "Lenovo", cliente: "Roberto Almeida (ID: 2)" },
  { id: 103, nome: "Ar Condicionado Central", modelo: "Inverter 36000", marca: "LG", cliente: "Clínica Vida (ID: 3)" }
];

export default function GestaoEquipamento() {
  const [equipamentos] = useState(equipamentosMock);

  return (
    <div className="container-fluid p-0">
      <header className="mb-4 d-flex justify-content-between align-items-end" style={{ borderBottom: '1px solid var(--line)', paddingBottom: '20px' }}>
        <div>
          <p style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', color: 'var(--gold)', letterSpacing: '0.18em', margin: 0, textTransform: 'uppercase' }}>INVENTÁRIO</p>
          <h2 style={{ fontFamily: 'Fraunces', margin: 0 }}>Gestão de Equipamentos</h2>
        </div>
        <button className="btn btn-primary px-4">
          + Novo Equipamento
        </button>
      </header>

      <div className="card p-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead>
              <tr>
                <th className="px-4">ID</th>
                <th>Equipamento (Nome)</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Cliente (Dono)</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {equipamentos.map((eq) => (
                <tr key={eq.id}>
                  <td className="px-4" style={{ fontFamily: 'IBM Plex Mono', color: 'var(--gold)' }}>#{eq.id}</td>
                  <td style={{ fontWeight: 500 }}>{eq.nome}</td>
                  <td style={{ color: 'var(--muted)' }}>{eq.marca}</td>
                  <td style={{ color: 'var(--muted)' }}>{eq.modelo}</td>
                  <td style={{ color: 'var(--muted)' }}>{eq.cliente}</td>
                  <td className="text-center">
                    <button className="btn btn-sm me-2" style={{ border: '1px solid var(--line)', color: 'var(--text)' }}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger">Excluir</button>
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