package com.example.bolsaempleo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class OferenteHabilidadId implements Serializable {
    @Column(name = "oferente_id")
    private Integer oferenteId;

    @Column(name = "caracteristica_id")
    private Integer caracteristicaId;

    public OferenteHabilidadId() {
    }

    public OferenteHabilidadId(Integer oferenteId, Integer caracteristicaId) {
        this.oferenteId = oferenteId;
        this.caracteristicaId = caracteristicaId;
    }

    public Integer getOferenteId() { return oferenteId; }
    public void setOferenteId(Integer oferenteId) { this.oferenteId = oferenteId; }
    public Integer getCaracteristicaId() { return caracteristicaId; }
    public void setCaracteristicaId(Integer caracteristicaId) { this.caracteristicaId = caracteristicaId; }

    @Override
    public boolean equals(Object object) {
        if (this == object) { return true; }
        if (!(object instanceof OferenteHabilidadId other)) { return false; }
        return Objects.equals(oferenteId, other.oferenteId) && Objects.equals(caracteristicaId, other.caracteristicaId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(oferenteId, caracteristicaId);
    }
}
