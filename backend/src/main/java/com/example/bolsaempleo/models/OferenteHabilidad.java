package com.example.bolsaempleo.models;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "oferente_habilidad")
public class OferenteHabilidad {
    @EmbeddedId
    private OferenteHabilidadId id;

    @Column(name = "nivel", nullable = false)
    private Integer nivel;

    public OferenteHabilidad() {
    }

    public OferenteHabilidadId getId() { return id; }
    public void setId(OferenteHabilidadId id) { this.id = id; }
    public Integer getNivel() { return nivel; }
    public void setNivel(Integer nivel) { this.nivel = nivel; }
}
