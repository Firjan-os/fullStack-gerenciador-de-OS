package com.senai.gestaoServicos.dtos;

import java.time.LocalDateTime;

import com.senai.gestaoServicos.entities.StatusOS;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class OrdemServicoDTO {

	private Long id;
    private LocalDateTime dataAbertura;
    private StatusOS status;

    @NotNull(message = "Valor total é obrigatório")
    @Positive(message = "Valor deve ser maior que zero")
    private Double valorTotal;

    @Size(max = 500, message = "Descrição não pode exceder 500 caracteres")
    private String descricao;

    @NotNull(message = "Usuário é obrigatório")
    private UsuarioResumoDTO usuario;

    @NotNull(message = "Equipamento é obrigatório")
    private EquipamentoResumoDTO equipamento;
 
    //const
    public OrdemServicoDTO() {}

	public OrdemServicoDTO(Long id, LocalDateTime dataAbertura, StatusOS status, Double valorTotal, String descricao, UsuarioResumoDTO usuario, EquipamentoResumoDTO equipamento) {
		this.id = id;
		this.dataAbertura = dataAbertura;
		this.status = status;
		this.valorTotal = valorTotal;
		this.descricao = descricao;
		this.usuario = usuario;
		this.equipamento = equipamento;
	}

	//get set
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	
	public LocalDateTime getDataAbertura() {
		return dataAbertura;
	}
	public void setDataAbertura(LocalDateTime dataAbertura) {
		this.dataAbertura = dataAbertura;
	}

	
	public StatusOS getStatus() {
		return status;
	}
	public void setStatus(StatusOS status) {
		this.status = status;
	}

	
	public Double getValorTotal() {
		return valorTotal;
	}
	public void setValorTotal(Double valorTotal) {
		this.valorTotal = valorTotal;
	}

	
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	
	public UsuarioResumoDTO getUsuario() {
		return usuario;
	}
	public void setUsuario(UsuarioResumoDTO usuario) {
		this.usuario = usuario;
	}

	
	public EquipamentoResumoDTO getEquipamento() {
		return equipamento;
	}
	public void setEquipamento(EquipamentoResumoDTO equipamento) {
		this.equipamento = equipamento;
	}


}
