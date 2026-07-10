package com.senai.gestaoServicos.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.senai.gestaoServicos.entities.OrdemServico;
import com.senai.gestaoServicos.entities.StatusOS;

@Repository
public interface OrdemServicoRepository extends JpaRepository<OrdemServico, Long> {
	
	 @Query("SELECT COALESCE(SUM(o.valorTotal), 0) FROM OrdemServico o WHERE o.status = :status")
	    Double sumValorByStatus(@Param("status") StatusOS status);

	    long countByStatusIn(List<StatusOS> statusList);

	    List<OrdemServico> findByStatusIn(List<StatusOS> statusList);
	    
	    long countByStatus(StatusOS status);

	    List<OrdemServico> findByStatus(StatusOS status);
	
	    @Query(value = "SELECT DATE_FORMAT(o.data_abertura, '%Y-%m') AS mesAno, " +
	                   "COALESCE(SUM(o.valor_total), 0) AS total, " +
	                   "COUNT(o.id) AS quantidade " +
	                   "FROM servicos o " +
	                   "WHERE o.status = 'CONCLUIDA' " +
	                   "AND o.data_abertura >= :dataInicio " +
	                   "GROUP BY mesAno " +
	                   "ORDER BY mesAno ASC", nativeQuery = true)
	    List<Object[]> findFaturamentoUltimosMeses(@Param("dataInicio") LocalDateTime dataInicio);
}
