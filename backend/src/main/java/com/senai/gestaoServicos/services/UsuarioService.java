package com.senai.gestaoServicos.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senai.gestaoServicos.dtos.UsuarioDTO;
import com.senai.gestaoServicos.entities.Usuario;
import com.senai.gestaoServicos.exception.ResourceNotFoundException;
import com.senai.gestaoServicos.repositories.UsuarioRepository;

@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	//DTO
	private UsuarioDTO toDTO(Usuario usuario) {
		return new UsuarioDTO(
				usuario.getId(),
                usuario.getNome(),
                usuario.getTelefone(),
                usuario.getEmail()
		);
	}
	
	private Usuario toEntity(UsuarioDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setId(dto.getId());
        usuario.setNome(dto.getNome());
        usuario.setTelefone(dto.getTelefone());
        usuario.setEmail(dto.getEmail());
        return usuario;
    }
	
	//funções
	//salvar
	public UsuarioDTO salvar(UsuarioDTO dto) {
	    Usuario usuario = toEntity(dto);
	    Usuario salvo = usuarioRepository.save(usuario);
	    return toDTO(salvo);
	}
	
	//listar
    public List<UsuarioDTO> listarTodos() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    //buscar com id
    public UsuarioDTO buscarPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + id));
        return toDTO(usuario);
    }

    //atualizar
    public UsuarioDTO atualizar(Long id, UsuarioDTO dto) {
        Usuario existente = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + id));

        existente.setNome(dto.getNome());
        existente.setTelefone(dto.getTelefone());
        existente.setEmail(dto.getEmail());

        Usuario atualizado = usuarioRepository.save(existente);
        return toDTO(atualizado);
    }

    //apagar
    public void deletar(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + id));
        usuarioRepository.delete(usuario);
    }
}
