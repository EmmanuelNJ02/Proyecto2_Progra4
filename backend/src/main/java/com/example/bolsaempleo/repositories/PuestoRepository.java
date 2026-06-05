package com.example.bolsaempleo.repositories;

import com.example.bolsaempleo.models.Puesto;
import com.example.bolsaempleo.models.TipoPublicacion;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PuestoRepository extends JpaRepository<Puesto, Integer> {
    List<Puesto> findTop5ByTipoPublicacionAndActivoTrueOrderByFechaPublicacionDesc(TipoPublicacion tipoPublicacion);
    List<Puesto> findByTipoPublicacionAndActivoTrueOrderByFechaPublicacionDesc(TipoPublicacion tipoPublicacion);
    List<Puesto> findByEmpresaIdOrderByFechaPublicacionDesc(Integer empresaId);
}
