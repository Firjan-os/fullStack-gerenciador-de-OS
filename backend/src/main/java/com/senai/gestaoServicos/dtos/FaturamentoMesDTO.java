package com.senai.gestaoServicos.dtos;

public class FaturamentoMesDTO {
	
	private String mesAno;
    private Double total;       
    private Long quantidade;
   
    //const
    public FaturamentoMesDTO() {}

	public FaturamentoMesDTO(String mesAno, Double total, Long quantidade) {
		this.mesAno = mesAno;
		this.total = total;
		this.quantidade = quantidade;
	}

	//get set
	public String getMesAno() {
		return mesAno;
	}
	public void setMesAno(String mesAno) {
		this.mesAno = mesAno;
	}

	
	public Double getTotal() {
		return total;
	}
	public void setTotal(Double total) {
		this.total = total;
	}

	
	public Long getQuantidade() {
		return quantidade;
	}
	public void setQuantidade(Long quantidade) {
		this.quantidade = quantidade;
	}
    
    
}
