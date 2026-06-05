package com.example.bolsaempleo.repositories;

import com.example.bolsaempleo.models.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpresaRepository extends JpaRepository<Empresa, Integer> {
}
