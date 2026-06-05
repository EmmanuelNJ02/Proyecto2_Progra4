package com.example.bolsaempleo.repositories;

import com.example.bolsaempleo.models.OferenteHabilidad;
import com.example.bolsaempleo.models.OferenteHabilidadId;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OferenteHabilidadRepository extends JpaRepository<OferenteHabilidad, OferenteHabilidadId> {
    List<OferenteHabilidad> findById_OferenteId(Integer oferenteId);
    List<OferenteHabilidad> findById_CaracteristicaIdIn(List<Integer> caracteristicaIds);
    void deleteById_OferenteId(Integer oferenteId);
}
