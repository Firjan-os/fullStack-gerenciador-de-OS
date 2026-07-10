package com.senai.gestaoServicos.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senai.gestaoServicos.dtos.EquipamentoDTO;
import com.senai.gestaoServicos.entities.Equipamento;
import com.senai.gestaoServicos.entities.Usuario;
import com.senai.gestaoServicos.exception.ResourceNotFoundException;
import com.senai.gestaoServicos.repositories.EquipamentoRepository;
import com.senai.gestaoServicos.repositories.UsuarioRepository;

@Service
public class EquipamentoService {

    @Autowired
    private EquipamentoRepository equipamentoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    //DTO
    private Equipamento toEntity(EquipamentoDTO dto) {
        Equipamento equipamento = new Equipamento();
        equipamento.setId(dto.getId());
        equipamento.setNome(dto.getNome());
        equipamento.setMarca(dto.getMarca());
        equipamento.setModelo(dto.getModelo());
        
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + dto.getUsuarioId()));
        equipamento.setUsuario(usuario);

        return equipamento;
    }
    
    private EquipamentoDTO toDTO(Equipamento equipamento) {
        return new EquipamentoDTO(
                equipamento.getId(),
                equipamento.getNome(),
                equipamento.getMarca(),
                equipamento.getModelo(),
                equipamento.getUsuario().getId()
        );
    }
    
    //funções
  	//salvar
    public EquipamentoDTO salvar(EquipamentoDTO dto) {
        Equipamento equipamento = toEntity(dto);
        Equipamento salvo = equipamentoRepository.save(equipamento);
        return toDTO(salvo);
    }

    //listar
    public List<EquipamentoDTO> listarTodos() {
        return equipamentoRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    //buscar com id
    public EquipamentoDTO buscarPorId(Long id) {
        Equipamento equipamento = equipamentoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Equipamento não encontrado com ID: " + id));
        return toDTO(equipamento);
    }

    //atualizar
    public EquipamentoDTO atualizar(Long id, EquipamentoDTO dto) {
        Equipamento existente = equipamentoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Equipamento não encontrado com ID: " + id));

        existente.setModelo(dto.getModelo());
        existente.setMarca(dto.getMarca());

        if (!existente.getUsuario().getId().equals(dto.getUsuarioId())) {
            Usuario novoUsuario = usuarioRepository.findById(dto.getUsuarioId())
                    .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + dto.getUsuarioId()));
            existente.setUsuario(novoUsuario);
        }

        Equipamento atualizado = equipamentoRepository.save(existente);
        return toDTO(atualizado);
    }

    //apagar
    public void deletar(Long id) {
        Equipamento equipamento = equipamentoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Equipamento não encontrado com ID: " + id));
        equipamentoRepository.delete(equipamento);
    }
}
