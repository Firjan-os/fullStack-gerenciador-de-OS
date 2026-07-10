package com.senai.gestaoServicos.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senai.gestaoServicos.dtos.DashboardDTO;
import com.senai.gestaoServicos.dtos.EquipamentoResumoDTO;
import com.senai.gestaoServicos.dtos.FaturamentoMesDTO;
import com.senai.gestaoServicos.dtos.OrdemServicoDTO;
import com.senai.gestaoServicos.dtos.UsuarioResumoDTO;
import com.senai.gestaoServicos.entities.Equipamento;
import com.senai.gestaoServicos.entities.OrdemServico;
import com.senai.gestaoServicos.entities.StatusOS;
import com.senai.gestaoServicos.entities.Usuario;
import com.senai.gestaoServicos.exception.ResourceNotFoundException;
import com.senai.gestaoServicos.repositories.EquipamentoRepository;
import com.senai.gestaoServicos.repositories.OrdemServicoRepository;
import com.senai.gestaoServicos.repositories.UsuarioRepository;

@Service
public class OrdemServicoService {

    @Autowired
    private OrdemServicoRepository ordemServicoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EquipamentoRepository equipamentoRepository;
    
    //DTO
    private OrdemServico toEntity(OrdemServicoDTO dto) {
        OrdemServico os = new OrdemServico();
        os.setId(dto.getId());
        os.setDataAbertura(dto.getDataAbertura() != null ? dto.getDataAbertura() : LocalDateTime.now());
        os.setStatus(dto.getStatus() != null ? dto.getStatus() : StatusOS.ABERTA);
        os.setValorTotal(dto.getValorTotal());
        os.setDescricao(dto.getDescricao());

        Long usuarioId = dto.getUsuario().getId();
        Long equipamentoId = dto.getEquipamento().getId();

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + usuarioId));
        Equipamento equipamento = equipamentoRepository.findById(equipamentoId)
                .orElseThrow(() -> new ResourceNotFoundException("Equipamento não encontrado com ID: " + equipamentoId));

        os.setUsuario(usuario);
        os.setEquipamento(equipamento);

        return os;
    }

    private OrdemServicoDTO toDTO(OrdemServico os) {
        UsuarioResumoDTO usuarioDTO = new UsuarioResumoDTO(
                os.getUsuario().getId(),
                os.getUsuario().getNome()
        );

        EquipamentoResumoDTO equipamentoDTO = new EquipamentoResumoDTO(
                os.getEquipamento().getId(),
                os.getEquipamento().getNome()
        );

        return new OrdemServicoDTO(
                os.getId(),
                os.getDataAbertura(),
                os.getStatus(),
                os.getValorTotal(),
                os.getDescricao(),
                usuarioDTO,
                equipamentoDTO
        );
    }
    
    //salvar
    public OrdemServicoDTO salvar(OrdemServicoDTO dto) {
        OrdemServico os = toEntity(dto);
        OrdemServico salvo = ordemServicoRepository.save(os);
        return toDTO(salvo);
    }
    
    //listar
    public List<OrdemServicoDTO> listarTodos() {
        return ordemServicoRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    //buscar por id
    public OrdemServicoDTO buscarPorId(Long id) {
        OrdemServico os = ordemServicoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ordem de Serviço não encontrada com ID: " + id));
        return toDTO(os);
    }
    
    //atualizar
    public OrdemServicoDTO atualizar(Long id, OrdemServicoDTO dto) {
        OrdemServico existente = ordemServicoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ordem de Serviço não encontrada com ID: " + id));

        existente.setValorTotal(dto.getValorTotal());
        existente.setDescricao(dto.getDescricao());

        if (dto.getStatus() != null) {
            existente.setStatus(dto.getStatus());
        }

        if (!existente.getUsuario().getId().equals(dto.getUsuario().getId())) {
            Usuario novoUsuario = usuarioRepository.findById(dto.getUsuario().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + dto.getUsuario().getId()));
            existente.setUsuario(novoUsuario);
        }

        if (!existente.getEquipamento().getId().equals(dto.getEquipamento().getId())) {
            Equipamento novoEquipamento = equipamentoRepository.findById(dto.getEquipamento().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Equipamento não encontrado com ID: " + dto.getEquipamento().getId()));
            existente.setEquipamento(novoEquipamento);
        }

        OrdemServico atualizado = ordemServicoRepository.save(existente);
        return toDTO(atualizado);
    }

    //deletar
    public void deletar(Long id) {
        OrdemServico os = ordemServicoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ordem de Serviço não encontrada com ID: " + id));
        ordemServicoRepository.delete(os);
    }
    
    //dashboard
    //faturamento total
    public Double totalFaturado() {
        return ordemServicoRepository.sumValorByStatus(StatusOS.CONCLUIDA);
    }
    
    //numero de em aberto
    public Long countPendentes() {
        return ordemServicoRepository.countByStatusIn(List.of(StatusOS.ABERTA, StatusOS.EM_ANDAMENTO));
    }
    
    //listar pendentes
    public List<OrdemServicoDTO> listarPendentes() {
        return ordemServicoRepository.findByStatusIn(List.of(StatusOS.ABERTA, StatusOS.EM_ANDAMENTO))
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    //pegar dashboard
    public DashboardDTO obterDashboard() {
        Double lucroTotal = ordemServicoRepository.sumValorByStatus(StatusOS.CONCLUIDA);

        Long totalAbertosQuantidade = ordemServicoRepository.countByStatus(StatusOS.ABERTA);
        List<OrdemServico> abertosEntities = ordemServicoRepository.findByStatus(StatusOS.ABERTA);
        List<OrdemServicoDTO> servicosAbertosDTO = abertosEntities.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());

        LocalDateTime dataInicio = LocalDateTime.now().minusMonths(6).withDayOfMonth(1).withHour(0).withMinute(0);
        List<Object[]> resultados = ordemServicoRepository.findFaturamentoUltimosMeses(dataInicio);
        List<FaturamentoMesDTO> faturamentoPorMes = new ArrayList<>();
        for (Object[] row : resultados) {
            String mesAno = (String) row[0];
            Double total = ((Number) row[1]).doubleValue();
            Long quantidade = ((Number) row[2]).longValue();
            faturamentoPorMes.add(new FaturamentoMesDTO(mesAno, total, quantidade));
        }

        return new DashboardDTO(
                lucroTotal,
                totalAbertosQuantidade,
                servicosAbertosDTO,
                faturamentoPorMes
        );
    }
}