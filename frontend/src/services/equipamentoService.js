import api from "./api";

export const listarEquipamentos = () =>
    api.get("/equipamentos");

export const buscarEquipamento = (id) =>
    api.get(`/equipamentos/${id}`);

export const cadastrarEquipamento = (equipamento) =>
    api.post("/equipamentos", equipamento);

export const atualizarEquipamento = (id, equipamento) =>
    api.put(`/equipamentos/${id}`, equipamento);

export const excluirEquipamento = (id) =>
    api.delete(`/equipamentos/${id}`);