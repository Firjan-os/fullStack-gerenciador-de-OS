package com.senai.gestaoServicos.config;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.senai.gestaoServicos.entities.Equipamento;
import com.senai.gestaoServicos.entities.OrdemServico;
import com.senai.gestaoServicos.entities.StatusOS;
import com.senai.gestaoServicos.entities.Usuario;
import com.senai.gestaoServicos.repositories.EquipamentoRepository;
import com.senai.gestaoServicos.repositories.OrdemServicoRepository;
import com.senai.gestaoServicos.repositories.UsuarioRepository;

@Component
public class MassaDados implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EquipamentoRepository equipamentoRepository;

    @Autowired
    private OrdemServicoRepository ordemServicoRepository;

    @Override
    public void run(String... args) throws Exception {
        if (usuarioRepository.count() > 0) {
            return;
        }

        List<Usuario> usuarios = criarUsuarios();
        List<Equipamento> equipamentos = criarEquipamentos(usuarios);
        criarOrdensServico(equipamentos);
    }
    
    //clientes
    private List<Usuario> criarUsuarios() {
        List<Usuario> usuarios = new ArrayList<>();

        usuarios.add(new Usuario("Ana Souza", "11912345678", "ana.souza@email.com"));
        usuarios.add(new Usuario("Carlos Lima", "21923456789", "carlos.lima@email.com"));
        usuarios.add(new Usuario("Mariana Oliveira", "67934567890", "mariana.oliveira@email.com"));
        usuarios.add(new Usuario("João Pereira", "21945678901", "joao.pereira@email.com"));
        usuarios.add(new Usuario("Fernanda Costa", "11956789012", "fernanda.costa@email.com"));
        usuarios.add(new Usuario("Ricardo Almeida", "67967890123", "ricardo.almeida@email.com"));
        usuarios.add(new Usuario("Patrícia Santos", "21978901234", "patricia.santos@email.com"));
        usuarios.add(new Usuario("Eduardo Silva", "11989012345", "eduardo.silva@email.com"));
        usuarios.add(new Usuario("Beatriz Ferreira", "67990123456", "beatriz.ferreira@email.com"));
        usuarios.add(new Usuario("Lucas Rocha", "21901234567", "lucas.rocha@email.com"));

        return usuarioRepository.saveAll(usuarios);
    }
    
    //equipamentos
    private List<Equipamento> criarEquipamentos(List<Usuario> usuarios) {
        List<Equipamento> equipamentos = new ArrayList<>();

        int[] usuarioIndices = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 2, 4, 6, 8};

        String[][] dados = {
            {"Notebook Dell Inspiron", "Dell", "Inspiron 15"},
            {"iPhone 13", "Apple", "A2633"},
            {"Samsung Galaxy S21", "Samsung", "SM-G991B"},
            {"Monitor LG UltraWide", "LG", "29WP500"},
            {"Teclado Mecânico Logitech", "Logitech", "G Pro X"},
            {"Mouse Razer DeathAdder", "Razer", "V2"},
            {"Caixa de Som JBL", "JBL", "Flip 6"},
            {"Tablet Samsung Tab S7", "Samsung", "SM-T870"},
            {"Impressora HP LaserJet", "HP", "M110we"},
            {"Roteador TP-Link Archer", "TP-Link", "AX50"},
            {"Smartwatch Apple Watch SE", "Apple", "SE 2"},
            {"Fone de Ouvido Sony WH-1000XM4", "Sony", "WH-1000XM4"},
            {"Câmera Canon EOS T7", "Canon", "EOS 2000D"},
            {"HD Externo Seagate 1TB", "Seagate", "STGX1000400"},
            {"Projetor Epson EB-X06", "Epson", "EB-X06"}
        };

        for (int i = 0; i < 15; i++) {
            Equipamento equipamento = new Equipamento();
            equipamento.setNome(dados[i][0]);
            equipamento.setMarca(dados[i][1]);
            equipamento.setModelo(dados[i][2]);
            equipamento.setUsuario(usuarios.get(usuarioIndices[i]));
            equipamentos.add(equipamento);
        }

        return equipamentoRepository.saveAll(equipamentos);
    }
    
    //ordens de serviço
    private void criarOrdensServico(List<Equipamento> equipamentos) {
        List<OrdemServico> ordens = new ArrayList<>();

        LocalDateTime[] datas = {
            LocalDateTime.of(2026, Month.JANUARY, 5, 10, 0),
            LocalDateTime.of(2026, Month.JANUARY, 20, 14, 30),
            LocalDateTime.of(2026, Month.FEBRUARY, 10, 9, 15),
            LocalDateTime.of(2026, Month.FEBRUARY, 25, 16, 45),
            LocalDateTime.of(2026, Month.MARCH, 8, 11, 0),
            LocalDateTime.of(2026, Month.MARCH, 22, 13, 20),
            LocalDateTime.of(2026, Month.APRIL, 5, 8, 30),
            LocalDateTime.of(2026, Month.APRIL, 18, 15, 10),
            LocalDateTime.of(2026, Month.MAY, 2, 12, 0),
            LocalDateTime.of(2026, Month.MAY, 17, 10, 50),
            LocalDateTime.of(2026, Month.JUNE, 1, 9, 30),
            LocalDateTime.of(2026, Month.JUNE, 15, 14, 0),
            LocalDateTime.of(2026, Month.JUNE, 28, 11, 45),
            LocalDateTime.of(2026, Month.JULY, 5, 16, 20),
            LocalDateTime.of(2026, Month.JULY, 10, 8, 0) // hoje
        };

        Double[] valores = {120.00, 250.00, 80.00, 430.00, 190.00, 310.00, 90.00, 270.00, 150.00, 400.00, 60.00, 220.00, 380.00, 130.00, 500.00};

        String[] descricoes = {
            "Troca de tela", "Manutenção preventiva", "Limpeza interna", "Substituição de bateria",
            "Atualização de software", "Reparo na placa-mãe", "Troca de teclado", "Instalação de memória",
            "Remoção de vírus", "Backup de dados", "Configuração de rede", "Troca de fonte",
            "Reparo no conector de carga", "Substituição de cooler", "Calibragem de tela"
        };

        for (int i = 0; i < equipamentos.size(); i++) {
            Equipamento equipamento = equipamentos.get(i);
            OrdemServico os = new OrdemServico();
            os.setDataAbertura(datas[i]);
            os.setStatus(StatusOS.ABERTA);
            os.setValorTotal(valores[i]);
            os.setDescricao(descricoes[i]);
            os.setUsuario(equipamento.getUsuario());
            os.setEquipamento(equipamento);
            ordens.add(os);
        }

        ordemServicoRepository.saveAll(ordens);
    }
}