import { useState } from 'react';

// Dados fic
const clientesMock = [
  { id: 1, nome: "Construtora Alfa", telefone: "(11) 98765-4321", email: "contato@alfa.com" },
  { id: 2, nome: "Roberto Almeida", telefone: "(21) 99999-8888", email: "roberto.almeida@email.com" },
  { id: 3, nome: "Clínica Vida", telefone: "(31) 3222-1111", email: "admin@clinicavida.com" }
];

export default function GestaoClientes() {
  const [clientes] = useState(clientesMock);

  return (
    <div className="container-fluid p-0">
      <header className="mb-4 d-flex justify-content-between align-items-end" style={{ borderBottom: '1px solid var(--line)', paddingBottom: '20px' }}>
        <div>
          <p style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', color: 'var(--gold)', letterSpacing: '0.18em', margin: 0, textTransform: 'uppercase' }}>CADASTRO</p>
          <h2 style={{ fontFamily: 'Fraunces', margin: 0 }}>Gestão de Clientes</h2>
        </div>
        <button className="btn btn-primary px-4">
          + Novo Cliente
        </button>
      </header>

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
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td className="px-4" style={{ fontFamily: 'IBM Plex Mono', color: 'var(--gold)' }}>#{cliente.id}</td>
                  <td style={{ fontWeight: 500 }}>{cliente.nome}</td>
                  <td style={{ color: 'var(--muted)' }}>{cliente.telefone}</td>
                  <td style={{ color: 'var(--muted)' }}>{cliente.email}</td>
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