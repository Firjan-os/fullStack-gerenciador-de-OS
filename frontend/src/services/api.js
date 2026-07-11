import axios from "axios";

// URL base do seu backend Spring Boot
const API_URL = "http://localhost:8080/api/clientes";

// 1. Buscar todos os clientes (GET)
export const listarClientes = () => {
  return axios.get(API_URL);
};

// 2. Cadastrar um novo cliente (POST)
export const cadastrarCliente = (cliente) => {
  return axios.post(API_URL, cliente);
};

// 3. Excluir um cliente pelo ID (DELETE)
export const excluirCliente = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};