package com.senai.gestaoServicos.dtos;

import java.util.List;

public class DashboardDTO {
	
	private Double lucroTotal;        
    private Long totalAbertosQuantidade;       
    private List<OrdemServicoDTO> servicosAbertos; 
    private List<FaturamentoMesDTO> faturamentoPorMes; 
    
    //const
    public DashboardDTO() {}

	public DashboardDTO(Double lucroTotal, Long totalAbertosQuantidade, List<OrdemServicoDTO> servicosAbertos,
			List<FaturamentoMesDTO> faturamentoPorMes) {
		this.lucroTotal = lucroTotal;
		this.totalAbertosQuantidade = totalAbertosQuantidade;
		this.servicosAbertos = servicosAbertos;
		this.faturamentoPorMes = faturamentoPorMes;
	}
	
	//get set
	public Double getLucroTotal() {
		return lucroTotal;
	}
	public void setLucroTotal(Double lucroTotal) {
		this.lucroTotal = lucroTotal;
	}

	
	public Long getTotalAbertosQuantidade() {
		return totalAbertosQuantidade;
	}
	public void setTotalAbertosQuantidade(Long totalAbertosQuantidade) {
		this.totalAbertosQuantidade = totalAbertosQuantidade;
	}

	
	public List<OrdemServicoDTO> getServicosAbertos() {
		return servicosAbertos;
	}
	public void setServicosAbertos(List<OrdemServicoDTO> servicosAbertos) {
		this.servicosAbertos = servicosAbertos;
	}

	
	public List<FaturamentoMesDTO> getFaturamentoPorMes() {
		return faturamentoPorMes;
	}
	public void setFaturamentoPorMes(List<FaturamentoMesDTO> faturamentoPorMes) {
		this.faturamentoPorMes = faturamentoPorMes;
	}
    
}
