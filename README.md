# 🛠️ Sistema de Gestão de Ordens de Serviço (Assistência Técnica) — Firjan SENAI

Aplicação Full Stack para controle completo de reparos técnicos, cadastro de clientes/equipamentos, gerenciamento dinâmico de Ordens de Serviço (OS) e visualização de métricas e faturamento.

---

## 💻 Ecossistema do Projeto

### ⚙️ Back-End
- **Java com Spring Boot**: Construção da API RESTful, lógica de negócio e regras do sistema.
- **Spring Data JPA**: Abstração e manipulação dos dados com suporte a ORM.
- **MySQL**: Banco de dados relacional para persistência dos dados de clientes, equipamentos e ordens de serviço.

### 🎨 Front-End
- **React com JavaScript**: Interface reativa e moderna consumindo a API REST do Back-End.
- **Componentização e Hooks**: Arquitetura focada em modularidade, estado global/local e reutilização de componentes.

---

## 📌 Funcionalidades Principais

- 👤 **Cadastro de Clientes e Equipamentos**: Registro e vinculação de dispositivos para manutenção.
- 📋 **Abertura e Controle de OS**: Gestão de status dinâmicos (Pendente, Em Manutenção, Concluído, etc.).
- 📊 **Dashboard Financeiro e Operacional**: Indicadores de total faturado e contagem de serviços pendentes.

---

## 🛠️ Tecnologias e Proporção no Repositório

| Tecnologia | Função no Projeto | Proporção |
| :--- | :--- | :---: |
| **JavaScript / React** | Interface Reativa e Consumo de API | 53.4% |
| **Java / Spring Boot** | API REST, Regras de Negócio e JPA | 43.8% |
| **CSS3** | Estilização e Design System | 2.5% |
| **HTML5** | Estruturação de Elementos | 0.3% |

---

## 📁 Estrutura do Repositório

```text
projeto-full/
├── backend/     # API Spring Boot (Java, JPA, MySQL)
├── frontend/    # Aplicação React (Components, Hooks, Services)
└── README.md    # Documentação do projeto
```
---

## ⚙️ Como Executar o Projeto Localmente

### Pré-requisitos
- [Git](https://git-scm.com/)
- [Java JDK](https://www.oracle.com/java/technologies/downloads/) (para rodar o Back-End)
- [Node.js](https://nodejs.org/) (para rodar as dependências do Front-End)

### 1. Clonar o repositório
```bash
git clone https://github.com/Firjan-os/projeto-full.git
cd projeto-full
```

### 2. Configurar e rodar o Back-End (Java)
```bash
cd backend
# Execute a aplicação Java através da sua IDE (Eclipse/IntelliJ/VS Code)
# ou via terminal utilizando Maven/Gradle conforme o projeto
```

### 3. Configurar e rodar o Front-End
```bash
cd ../frontend
npm install
npm run dev
```

---

## 👥 Equipe de Desenvolvimento

- **Cassio Oliveira** — [@CassioOliveirasilva](https://github.com/CassioOliveirasilva)
- **Gabriel Alcantra** — [@Gabriel-srAlcantara](https://github.com/Gabriel-srAlcantara)
- **Isabelle Pantoja** — [@BelleCP-ctrl](https://github.com/BelleCP-ctrl)
- **Sophia Almeida** — [@sophialmeida43](https://github.com/sophialmeida43)

---

## 📝 Licença

Projeto desenvolvido exclusivamente para fins acadêmicos e educacionais nas atividades do curso na **Firjan SENAI**.
