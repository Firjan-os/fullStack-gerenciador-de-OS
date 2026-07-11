import api from "./api";

export const listarOrdens = () =>
    api.get("/ordens-servico");

export const buscarOrdem = (id) =>
    api.get(`/ordens-servico/${id}`);

export const cadastrarOrdem = (ordem) =>
    api.post("/ordens-servico", ordem);

export const atualizarOrdem = (id, ordem) =>
    api.put(`/ordens-servico/${id}`, ordem);

export const excluirOrdem = (id) =>
    api.delete(`/ordens-servico/${id}`);