import { useState, useEffect } from "react";

const fmt = (v) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function PainelDashboard() {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/ordens-servico/dashboard")
      .then(res => {
        if (!res.ok) throw new Error(`Erro ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log("📊 Dados do backend:", data);
        setDados(data);
      })
      .catch(err => {
        console.error("Erro:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const months1 = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  
  const pendentes = (dados?.servicosAbertos || []).map(s => {
    const data = new Date(s.dataAbertura);
    return {
      client: s.usuario?.nome || "—",
      desc: s.descricao || "—",
      value: s.valorTotal || 0,
      month: months1[data.getMonth()],
      date: data.toLocaleDateString("pt-BR"),
      status: "pendente"
    };
  });

  const totalFaturado = dados?.lucroTotal || 0;

  // Gráfico
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul"];
  const monthlyTotals = months.map((m) => {
    const fat = (dados?.faturamentoPorMes || []).find(f => {
      const mes = parseInt(f.mesAno.split("-")[1]) - 1;
      return months1[mes] === m;
    });
    return fat ? fat.total : 0;
  });

  const W = 720, H = 240;
  const padL = 10, padR = 10, padB = 30, padT = 10;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const maxVal = Math.max(...monthlyTotals, 1) * 1.15;
  const barGap = 26;
  const barW = (chartW - barGap * (months.length - 1)) / months.length;

  const [isLoaded, setIsLoaded] = useState(false);
  const [barHeights, setBarHeights] = useState(months.map(() => 0));

  useEffect(() => {
    if (dados) {
      setTimeout(() => setIsLoaded(true), 100);
      monthlyTotals.forEach((val, i) => {
        setTimeout(() => {
          setBarHeights((prev) => {
            const next = [...prev];
            next[i] = (val / maxVal) * chartH;
            return next;
          });
        }, i * 90 + 100);
      });
    }
  }, [dados]);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="wrap" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <div style={{ color: 'var(--text)', fontSize: '18px' }}>Carregando...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="wrap" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', flexDirection: 'column', gap: '20px' }}>
          <div style={{ color: '#c0313f', fontSize: '18px' }}>Não foi possível conectar ao servidor. Verifique se o backend está rodando.</div>
          <div style={{ color: 'var(--muted)', fontSize: '14px' }}>{error}</div>
        </div>
      </div>
    );
  }

  if (!dados) {
    return (
      <div className="dashboard-container">
        <div className="wrap" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <div style={{ color: 'var(--muted)', fontSize: '18px' }}>Nenhum dado disponível</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
        .dashboard-container{--bg:#0B120F;--surface:#121D19;--surface-2:#182722;--line:#26362F;--gold:#C9A24B;--teal:#4FA98C;--amber:#E0A339;--text:#EDEAE0;--muted:#8B9992;--muted-2:#5E6E68;--radius:10px;background:var(--bg);color:var(--text);font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;background-image:radial-gradient(circle at 15% 0%,rgba(201,162,75,0.05),transparent 40%),repeating-linear-gradient(180deg,transparent,transparent 39px,rgba(255,255,255,0.012) 40px);min-height:100%;padding:30px;margin:-24px}
        .dashboard-container *{box-sizing:border-box}
        .dashboard-container .wrap{max-width:1180px;margin:0 auto}
        .dashboard-container header{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:20px;border-bottom:1px solid var(--line);padding-bottom:24px;margin-bottom:36px}
        .dashboard-container .eyebrow{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:var(--gold);margin:0 0 8px}
        .dashboard-container h1{font-family:'Fraunces',serif;font-weight:500;font-size:clamp(28px,3.4vw,40px);margin:0;letter-spacing:-0.01em;color:var(--text)}
        .dashboard-container .period{font-family:'IBM Plex Mono',monospace;font-size:13px;color:var(--muted);background:var(--surface);border:1px solid var(--line);padding:9px 16px;border-radius:var(--radius);white-space:nowrap}
        .dashboard-container .stats{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:28px}
        .dashboard-container .card-dash{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:26px 28px;position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:center}
        .dashboard-container .card-label{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted);margin:0 0 14px;display:flex;align-items:center;gap:8px}
        .dashboard-container .dot{width:6px;height:6px;border-radius:50%;display:inline-block}
        .dashboard-container .dot.gold{background:var(--gold)}
        .dashboard-container .dot.amber{background:var(--amber)}
        .dashboard-container .big-number{font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:clamp(30px,4vw,46px);color:var(--text);letter-spacing:-0.01em;line-height:1;display:inline-block;margin-bottom:8px}
        .dashboard-container .faturado .big-number{color:var(--gold)}
        .dashboard-container .pendente .big-number{color:var(--amber);font-size:clamp(30px,3.6vw,42px)}
        .dashboard-container .underline-svg{display:block;width:100%;max-width:260px;height:12px;margin-top:6px}
        .dashboard-container .underline-svg path{stroke:var(--gold);stroke-width:2.5;fill:none;stroke-linecap:round;stroke-dasharray:240;stroke-dashoffset:240;transition:stroke-dashoffset 1s ease 0.4s}
        .dashboard-container .underline-svg.drawn path{stroke-dashoffset:0}
        .dashboard-container .panel{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:26px 28px 18px;margin-bottom:28px}
        .dashboard-container .panel-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px;flex-wrap:wrap;gap:10px}
        .dashboard-container .panel-title{font-family:'Fraunces',serif;font-size:19px;font-weight:500;margin:0;color:var(--text)}
        .dashboard-container .legend{display:flex;gap:16px;font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--muted)}
        .dashboard-container .legend span{display:flex;align-items:center;gap:6px}
        .dashboard-container .swatch{width:10px;height:10px;border-radius:2px}
        .dashboard-container #chart{width:100%;height:240px;display:block;overflow:visible}
        .dashboard-container .bar{fill:var(--gold);opacity:0.9;transition:height 0.9s cubic-bezier(.2,.8,.2,1),y 0.9s cubic-bezier(.2,.8,.2,1)}
        .dashboard-container .bar:hover{fill:var(--amber)}
        .dashboard-container .bar.julio{fill:var(--teal);opacity:0.9}
        .dashboard-container .bar.julio:hover{fill:var(--amber)}
        .dashboard-container .axis-label{font-family:'IBM Plex Mono',monospace;font-size:10.5px;fill:var(--muted-2)}
        .dashboard-container .value-label{font-family:'IBM Plex Mono',monospace;font-size:10px;fill:var(--text);opacity:0;transition:opacity 0.4s ease 0.8s}
        .dashboard-container .value-label.show{opacity:1}
        .dashboard-container .gridline{stroke:var(--line);stroke-width:1}
        .dashboard-container table{width:100%;border-collapse:collapse}
        .dashboard-container thead th{text-align:left;font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted-2);font-weight:500;padding:0 10px 12px;border-bottom:1px solid var(--line);background:transparent}
        .dashboard-container thead th.num,.dashboard-container tbody td.num{text-align:right}
        .dashboard-container tbody td{padding:14px 10px;border-bottom:1px solid var(--line);font-size:14px;background:transparent;color:var(--text)}
        .dashboard-container tbody tr:last-child td{border-bottom:none}
        .dashboard-container tbody tr{transition:background 0.2s ease}
        .dashboard-container tbody tr:hover{background:var(--surface-2)}
        .dashboard-container .client{font-weight:500}
        .dashboard-container .desc{color:var(--muted);font-size:13px}
        .dashboard-container td.num{font-family:'IBM Plex Mono',monospace}
        .dashboard-container .pill{display:inline-flex;align-items:center;gap:6px;font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.04em;padding:4px 10px;border-radius:100px}
        .dashboard-container .pill.pendente{background:rgba(224,163,57,0.12);color:var(--amber);border:1px solid rgba(224,163,57,0.35)}
        .dashboard-container footer{margin-top:30px;text-align:center;font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--muted-2);letter-spacing:0.05em}
        @media(max-width:720px){.dashboard-container .stats{grid-template-columns:1fr}}
      `}} />

      <div className="wrap">
        <header>
          <div>
            <p className="eyebrow">Registro de Faturamento</p>
            <h1>Painel Financeiro</h1>
          </div>
          <div className="period">Jan — Jul 2026</div>
        </header>

        <section className="stats">
          <div className="card-dash faturado">
            <p className="card-label"><span className="dot gold"></span>Total Faturado</p>
            <div className="big-number">{fmt(totalFaturado)}</div>
            <svg className={`underline-svg ${isLoaded ? "drawn" : ""}`} viewBox="0 0 260 12" preserveAspectRatio="none">
              <path d="M2,7 C 60,11 100,3 140,6 S 220,10 258,5" />
            </svg>
          </div>

          <div className="card-dash pendente">
            <p className="card-label"><span className="dot amber"></span>Serviços Pendentes</p>
            <div className="big-number">{pendentes.length}</div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <h2 className="panel-title">Faturamento mensal</h2>
            <div className="legend">
              <span><span className="swatch" style={{ background: "var(--gold)" }}></span>Faturado</span>
              <span><span className="swatch" style={{ background: "var(--teal)" }}></span>Julho</span>
            </div>
          </div>
          <svg id="chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
            {[0, 1, 2, 3].map((i) => (
              <line key={`grid-${i}`} x1={padL} x2={W - padR} y1={padT + (chartH / 3) * i} y2={padT + (chartH / 3) * i} className="gridline" />
            ))}
            {monthlyTotals.map((val, i) => {
              const x = padL + i * (barW + barGap);
              const fullHeight = (val / maxVal) * chartH;
              const y0 = padT + chartH;
              const currentH = barHeights[i];
              const isJulio = months[i] === "Jul";
              return (
                <g key={`bar-${i}`}>
                  <rect className={`bar ${isJulio ? "julio" : ""}`} x={x} y={y0 - currentH} width={barW} height={currentH} rx={3} />
                  <text className="axis-label" x={x + barW / 2} y={H - 8} textAnchor="middle">{months[i]}</text>
                  <text className={`value-label ${currentH > 0 ? "show" : ""}`} x={x + barW / 2} y={y0 - fullHeight - 8} textAnchor="middle">
                    {fmt(val)}
                  </text>
                </g>
              );
            })}
          </svg>
        </section>

        <section className="panel">
          <div className="panel-head">
            <h2 className="panel-title">Serviços pendentes — detalhamento</h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Serviço</th>
                <th className="num">Valor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pendentes.map((p, idx) => (
                <tr key={idx}>
                  <td className="client">{p.client}</td>
                  <td className="desc">{p.desc}</td>
                  <td className="num">{fmt(p.value)}</td>
                  <td><span className="pill pendente">● pendente</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <footer>Livro-razão gerado automaticamente a partir dos lançamentos registrados</footer>
      </div>
    </div>
  );
}