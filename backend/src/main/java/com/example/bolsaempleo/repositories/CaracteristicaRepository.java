package com.example.bolsaempleo.repositories;

import com.example.bolsaempleo.models.Caracteristica;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CaracteristicaRepository extends JpaRepository<Caracteristica, Integer> {
    List<Caracteristica> findAllByOrderByCaracteristicaPadreIdAscNombreCaracteristicaAsc();
}
