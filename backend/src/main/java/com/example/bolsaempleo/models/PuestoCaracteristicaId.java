package com.example.bolsaempleo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PuestoCaracteristicaId implements Serializable {
    @Column(name = "puesto_id")
    private Integer puestoId;

    @Column(name = "caracteristica_id")
    private Integer caracteristicaId;

    public PuestoCaracteristicaId() {
    }

    public PuestoCaracteristicaId(Integer puestoId, Integer caracteristicaId) {
        this.puestoId = puestoId;
        this.caracteristicaId = caracteristicaId;
    }

    public Integer getPuestoId() { return puestoId; }
    public void setPuestoId(Integer puestoId) { this.puestoId = puestoId; }
    public Integer getCaracteristicaId() { return caracteristicaId; }
    public void setCaracteristicaId(Integer caracteristicaId) { this.caracteristicaId = caracteristicaId; }

    @Override
    public boolean equals(Object object) {
        if (this == object) { return true; }
        if (!(object instanceof PuestoCaracteristicaId other)) { return false; }
        return Objects.equals(puestoId, other.puestoId) && Objects.equals(caracteristicaId, other.caracteristicaId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(puestoId, caracteristicaId);
    }
}

