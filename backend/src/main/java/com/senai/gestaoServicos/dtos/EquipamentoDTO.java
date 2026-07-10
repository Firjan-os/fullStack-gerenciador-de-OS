package com.senai.gestaoServicos.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class EquipamentoDTO {

    private Long id;

    @NotBlank(message = "Modelo é obrigatório")
    private String nome;

    private String marca;
    private String modelo;

    @NotNull(message = "ID do usuário dono é obrigatório")
    private Long usuarioId;
    
    //const
    public EquipamentoDTO() {}

    public EquipamentoDTO(Long id, String nome, String marca, String modelo, Long usuarioId) {
		this.id = id;
		this.nome = nome;
		this.marca = marca;
		this.modelo = modelo;
		this.usuarioId = usuarioId;
	}

	//get set
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}

	
	public String getMarca() {
		return marca;
	}
	public void setMarca(String marca) {
		this.marca = marca;
	}

	
	public String getModelo() {
		return modelo;
	}
	public void setModelo(String modelo) {
		this.modelo = modelo;
	}
	
	
	public Long getUsuarioId() {
		return usuarioId;
	}
	public void setUsuarioId(Long usuarioId) {
		this.usuarioId = usuarioId;
	}
}
