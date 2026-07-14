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
        usuarios.add(new Usuario("Julio Cesar", "11999999999", "julio.cesar@email.com"));
        usuarios.add(new Usuario("Amanda Nunes", "21988888888", "amanda.nunes@email.com"));
        usuarios.add(new Usuario("Roberto Carlos", "67977777777", "roberto.carlos@email.com"));
        usuarios.add(new Usuario("Carla Diaz", "11966666666", "carla.diaz@email.com"));
        usuarios.add(new Usuario("Pedro Henrique", "21955555555", "pedro.henrique@email.com"));

        return usuarioRepository.saveAll(usuarios);
    }
    
    private List<Equipamento> criarEquipamentos(List<Usuario> usuarios) {
        List<Equipamento> equipamentos = new ArrayList<>();

        int[] usuarioIndices = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 2, 4, 6, 8, 10, 12, 14};

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
            {"Projetor Epson EB-X06", "Epson", "EB-X06"},
            {"MacBook Pro", "Apple", "M2 Pro"},
            {"Galaxy Book", "Samsung", "NP750XDA"},
            {"iPad Air", "Apple", "5ª Geração"},
            {"Kindle Paperwhite", "Amazon", "11ª Geração"},
            {"PlayStation 5", "Sony", "CFI-1214A"},
            {"Nintendo Switch", "Nintendo", "OLED"},
            {"Monitor Dell 27", "Dell", "S2721QS"},
            {"Teclado Logitech K380", "Logitech", "K380"}
        };

        for (int i = 0; i < dados.length; i++) {
            Equipamento equipamento = new Equipamento();
            equipamento.setNome(dados[i][0]);
            equipamento.setMarca(dados[i][1]);
            equipamento.setModelo(dados[i][2]);
            equipamento.setUsuario(usuarios.get(usuarioIndices[i]));
            equipamentos.add(equipamento);
        }

        return equipamentoRepository.saveAll(equipamentos);
    }
    
    private void criarOrdensServico(List<Equipamento> equipamentos) {
        List<OrdemServico> ordens = new ArrayList<>();

        Object[][] dados = {
            {Month.JANUARY, 5, 1200.00, "Troca de tela"},
            {Month.JANUARY, 20, 2500.00, "Manutenção preventiva"},
            {Month.JANUARY, 28, 350.00, "Instalação de SSD"},
            {Month.FEBRUARY, 10, 800.00, "Limpeza interna"},
            {Month.FEBRUARY, 25, 4300.00, "Substituição de bateria"},
            {Month.FEBRUARY, 15, 1800.00, "Atualização de drivers"},
            {Month.MARCH, 8, 1900.00, "Atualização de software"},
            {Month.MARCH, 22, 3100.00, "Reparo na placa-mãe"},
            {Month.MARCH, 30, 420.00, "Troca de teclado"},
            {Month.APRIL, 5, 900.00, "Limpeza de cooler"},
            {Month.APRIL, 18, 2700.00, "Instalação de memória"},
            {Month.MAY, 2, 1500.00, "Remoção de vírus"},
            {Month.MAY, 17, 400.00, "Backup de dados"},
            {Month.MAY, 25, 3200.00, "Configuração de rede"},
            {Month.JUNE, 1, 600.00, "Formatação"},
            {Month.JUNE, 15, 2200.00, "Troca de fonte"},
            {Month.JUNE, 28, 3800.00, "Reparo no conector"},
            {Month.JULY, 5, 1300.00, "Substituição de cooler"},
            {Month.JULY, 10, 5000.00, "Calibragem de tela"},
        };

        for (int i = 0; i < dados.length; i++) {
            Equipamento equipamento = equipamentos.get(i % equipamentos.size());
            OrdemServico os = new OrdemServico();
            os.setDataAbertura(LocalDateTime.of(2026, (Month) dados[i][0], (int) dados[i][1], 10, 0));
            os.setStatus(StatusOS.ABERTA);
            os.setValorTotal((Double) dados[i][2]);
            os.setDescricao((String) dados[i][3]);
            os.setUsuario(equipamento.getUsuario());
            os.setEquipamento(equipamento);
            ordens.add(os);
        }

        ordemServicoRepository.saveAll(ordens);
    }
}