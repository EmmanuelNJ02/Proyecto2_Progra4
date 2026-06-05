package com.example.bolsaempleo.repositories;

import com.example.bolsaempleo.models.Oferente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OferenteRepository extends JpaRepository<Oferente, Integer> {
    boolean existsByIdentificacion(String identificacion);
}
