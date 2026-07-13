import axios from "axios";

// ==========================================
// 1. ROTAS DE CLIENTES
// ==========================================
const CLIENTES_URL = "http://localhost:8080/api/clientes";

// Buscar todos os clientes (GET)
export const listarClientes = () => {
  return axios.get(CLIENTES_URL);
};

// Cadastrar um novo cliente (POST)
export const cadastrarCliente = (cliente) => {
  return axios.post(CLIENTES_URL, cliente);
};

// Excluir um cliente pelo ID (DELETE)
export const excluirCliente = (id) => {
  return axios.delete(`${CLIENTES_URL}/${id}`);
};


// ==========================================
// 2. ROTAS DE EQUIPAMENTOS
// ==========================================
const EQUIPAMENTOS_URL = "http://localhost:8080/api/equipamentos"; 

// Buscar todos os equipamentos (GET)
export const listarEquipamentos = () => {
  return axios.get(EQUIPAMENTOS_URL);
};

// Buscar um equipamento por ID (GET)
export const buscarEquipamento = (id) => {
  return axios.get(`${EQUIPAMENTOS_URL}/${id}`);
};

// Cadastrar um novo equipamento (POST)
export const cadastrarEquipamento = (equipamento) => {
  return axios.post(EQUIPAMENTOS_URL, equipamento);
};

// Atualizar um equipamento existente (PUT)
export const atualizarEquipamento = (id, equipamento) => {
  return axios.put(`${EQUIPAMENTOS_URL}/${id}`, equipamento);
};

// Excluir um equipamento pelo ID (DELETE)
export const excluirEquipamento = (id) => {
  return axios.delete(`${EQUIPAMENTOS_URL}/${id}`);
};


// ==========================================
// 3. ROTAS DE ORDENS DE SERVIÇO
// ==========================================
const ORDENS_URL = "http://localhost:8080/api/ordens-servico";

// Buscar todas as ordens (GET)
export const listarOrdens = () => {
  return axios.get(ORDENS_URL);
};

// Buscar uma ordem por ID (GET)
export const buscarOrdem = (id) => {
  return axios.get(`${ORDENS_URL}/${id}`);
};

// Cadastrar uma nova ordem (POST)
export const cadastrarOrdem = (ordem) => {
  return axios.post(ORDENS_URL, ordem);
};

// Atualizar uma ordem existente (PUT)
export const atualizarOrdem = (id, ordem) => {
  return axios.put(`${ORDENS_URL}/${id}`, ordem);
};

// Excluir uma ordem pelo ID (DELETE)
export const excluirOrdem = (id) => {
  return axios.delete(`${ORDENS_URL}/${id}`);
};