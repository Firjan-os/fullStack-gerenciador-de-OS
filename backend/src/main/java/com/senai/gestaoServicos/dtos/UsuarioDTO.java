package com.senai.gestaoServicos.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class UsuarioDTO {
	
	private Long id;

    @NotBlank(message = "Nome é obrigatório")
    @Pattern(regexp = "^[A-Za-zÀ-ÖØ-öø-ÿ\\s]+$", message = "Nome deve conter apenas letras e espaços")
    private String nome;

    @NotBlank(message = "Telefone é obrigatório")
    @Pattern(regexp = "^[0-9]+$", message = "Telefone deve conter apenas números")
    private String telefone;

    @Email(message = "E-mail inválido")
    private String email;
    
    //const
    public UsuarioDTO() {}

	public UsuarioDTO(Long id, String nome, String telefone, String email) {
		super();
		this.id = id;
		this.nome = nome;
		this.telefone = telefone;
		this.email = email;
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

	
	public String getTelefone() {
		return telefone;
	}
	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
    
 
}
