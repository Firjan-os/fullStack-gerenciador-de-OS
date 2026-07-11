import api from "./api";

export const listarUsuarios = () => api.get("/clientes");

export const buscarUsuario = (id) => api.get(`/clientes/${id}`);

export const salvarUsuario = (usuario) => api.post("/clientes", usuario);

export const atualizarUsuario = (id, usuario) =>
    api.put(`/clientes/${id}`, usuario);

export const excluirUsuario = (id) =>
    api.delete(`/clientes/${id}`);