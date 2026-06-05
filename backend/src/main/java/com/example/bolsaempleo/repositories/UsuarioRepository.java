package com.example.bolsaempleo.repositories;

import com.example.bolsaempleo.models.Estado;
import com.example.bolsaempleo.models.Rol;
import com.example.bolsaempleo.models.Usuario;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByCorreoElectronico(String correoElectronico);
    boolean existsByCorreoElectronico(String correoElectronico);
    List<Usuario> findByRolAndEstadoOrderByFechaRegistroDesc(Rol rol, Estado estado);
}
