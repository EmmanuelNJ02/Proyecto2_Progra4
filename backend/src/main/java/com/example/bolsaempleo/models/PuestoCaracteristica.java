package com.example.bolsaempleo.models;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "puesto_caracteristica")
public class PuestoCaracteristica {
    @EmbeddedId
    private PuestoCaracteristicaId id;

    @Column(name = "nivel_deseado", nullable = false)
    private Integer nivelDeseado;

    public PuestoCaracteristica() {
    }

    public PuestoCaracteristicaId getId() { return id; }
    public void setId(PuestoCaracteristicaId id) { this.id = id; }
    public Integer getNivelDeseado() { return nivelDeseado; }
    public void setNivelDeseado(Integer nivelDeseado) { this.nivelDeseado = nivelDeseado; }
}
