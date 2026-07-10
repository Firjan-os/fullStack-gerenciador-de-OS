package com.senai.gestaoServicos.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.senai.gestaoServicos.dtos.EquipamentoDTO;
import com.senai.gestaoServicos.services.EquipamentoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/equipamentos")
@CrossOrigin(origins = "http://localhost:3000")
public class EquipamentoController {

    @Autowired
    private EquipamentoService equipamentoService;
    
    //post
    @PostMapping
    public ResponseEntity<EquipamentoDTO> criar(@Valid @RequestBody EquipamentoDTO dto) {
        EquipamentoDTO salvo = equipamentoService.salvar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }
    
    //get
    @GetMapping
    public ResponseEntity<List<EquipamentoDTO>> listarTodos() {
        List<EquipamentoDTO> equipamentos = equipamentoService.listarTodos();
        return ResponseEntity.ok(equipamentos);
    }
    
    //get por id
    @GetMapping("/{id}")
    public ResponseEntity<EquipamentoDTO> buscarPorId(@PathVariable Long id) {
        EquipamentoDTO equipamento = equipamentoService.buscarPorId(id);
        return ResponseEntity.ok(equipamento);
    }
    
    //put
    @PutMapping("/{id}")
    public ResponseEntity<EquipamentoDTO> atualizar(@PathVariable Long id, @Valid @RequestBody EquipamentoDTO dto) {
        EquipamentoDTO atualizado = equipamentoService.atualizar(id, dto);
        return ResponseEntity.ok(atualizado);
    }
    
    //delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        equipamentoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
