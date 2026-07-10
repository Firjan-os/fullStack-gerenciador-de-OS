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

import com.senai.gestaoServicos.dtos.DashboardDTO;
import com.senai.gestaoServicos.dtos.OrdemServicoDTO;
import com.senai.gestaoServicos.services.OrdemServicoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/ordens-servico")
@CrossOrigin(origins = "http://localhost:3000")
public class OrdemServicoController {

    @Autowired
    private OrdemServicoService ordemServicoService;

    //cadastrar
    @PostMapping
    public ResponseEntity<OrdemServicoDTO> criar(@Valid @RequestBody OrdemServicoDTO dto) {
        OrdemServicoDTO salvo = ordemServicoService.salvar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }
    
    //listar
    @GetMapping
    public ResponseEntity<List<OrdemServicoDTO>> listarTodos() {
        return ResponseEntity.ok(ordemServicoService.listarTodos());
    }
    
    //buscar por id
    @GetMapping("/{id}")
    public ResponseEntity<OrdemServicoDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(ordemServicoService.buscarPorId(id));
    }
    
    //atualizar
    @PutMapping("/{id}")
    public ResponseEntity<OrdemServicoDTO> atualizar(@PathVariable Long id, @Valid @RequestBody OrdemServicoDTO dto) {
        return ResponseEntity.ok(ordemServicoService.atualizar(id, dto));
    }
    
    //apagar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        ordemServicoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    //dashboard
    //get faturamento
    @GetMapping("/dashboard/faturado")
    public ResponseEntity<Double> totalFaturado() {
        return ResponseEntity.ok(ordemServicoService.totalFaturado());
    }
    
    //get quantidade de pendente
    @GetMapping("/dashboard/pendentes/count")
    public ResponseEntity<Long> countPendentes() {
        return ResponseEntity.ok(ordemServicoService.countPendentes());
    }
    
    //get lista de pendentes
    @GetMapping("/dashboard/pendentes")
    public ResponseEntity<List<OrdemServicoDTO>> listarPendentes() {
        return ResponseEntity.ok(ordemServicoService.listarPendentes());
    }

    //dashboard completo
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardDTO> obterDashboard() {
        DashboardDTO dashboard = ordemServicoService.obterDashboard();
        return ResponseEntity.ok(dashboard);
    }
}