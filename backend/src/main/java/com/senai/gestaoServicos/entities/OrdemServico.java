package com.senai.gestaoServicos.entities;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "servicos")
public class OrdemServico {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_abertura", nullable = false)
    private LocalDateTime dataAbertura;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusOS status;

    @NotNull(message = "Valor total é obrigatório")
    @Column(nullable = false)
    private Double valorTotal;

    @Size(max = 500, message = "Descrição não pode exceder 500 caracteres")
    private String descricao;

    //relação
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "equipamento_id", nullable = false)
    private Equipamento equipamento;

    //const
    public OrdemServico() {}

	public OrdemServico(LocalDateTime dataAbertura, StatusOS status, Double valorTotal, String descricao, Usuario usuario, Equipamento equipamento) {
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

	
	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	
	public Equipamento getEquipamento() {
		return equipamento;
	}
	public void setEquipamento(Equipamento equipamento) {
		this.equipamento = equipamento;
	}
    
	
	
}
