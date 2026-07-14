package com.senai.gestaoServicos.entities;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "equipamentos")
public class Equipamento {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message = "Nome do equipamento é obrigatório")
    @Column(nullable = false)
    private String nome;
	
	private String marca;
	private String modelo;
	
	@ManyToOne
	@JoinColumn(name="usuario_id", nullable = false)
	@JsonBackReference
	private Usuario usuario;
	
	//cascata para delete
	@JsonManagedReference
	@OneToMany(mappedBy = "equipamento", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<OrdemServico> ordensServico = new HashSet<>();
	
	//const
	public Equipamento() {}

	
	
	public Equipamento(String nome, String marca, String modelo, Usuario usuario) {
		this.nome = nome;
		this.marca = marca;
		this.modelo = modelo;
		this.usuario = usuario;
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
	public void setModelo(String nome) {
		this.modelo = nome;
	}

	
	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	
	@Override
    public String toString() {
        return "Equipamento{id=" + id +
                ", nome='" + nome +
                ", marca='" + marca +
                ", modelo='" + modelo +
                "}";
    }
}
