package com.example.bolsaempleo.repositories;

import com.example.bolsaempleo.models.PuestoCaracteristica;
import com.example.bolsaempleo.models.PuestoCaracteristicaId;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PuestoCaracteristicaRepository extends JpaRepository<PuestoCaracteristica, PuestoCaracteristicaId> {
    List<PuestoCaracteristica> findById_PuestoId(Integer puestoId);
    void deleteById_PuestoId(Integer puestoId);
}
