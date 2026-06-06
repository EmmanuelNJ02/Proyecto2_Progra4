package com.example.bolsaempleo.dtos.form;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class PuestoForm {
    private String descripcionGeneral;
    private BigDecimal salario;
    private String tipoPublicacion;
    private Boolean activo;
    private List<RequisitoForm> requisitos = new ArrayList<>();

    public String getDescripcionGeneral() { return descripcionGeneral; }
    public void setDescripcionGeneral(String descripcionGeneral) { this.descripcionGeneral = descripcionGeneral; }
    public BigDecimal getSalario() { return salario; }
    public void setSalario(BigDecimal salario) { this.salario = salario; }
    public String getTipoPublicacion() { return tipoPublicacion; }
    public void setTipoPublicacion(String tipoPublicacion) { this.tipoPublicacion = tipoPublicacion; }
    public Boolean getActivo() { return activo; }
    public void setActivo(Boolean activo) { this.activo = activo; }
    public List<RequisitoForm> getRequisitos() { return requisitos; }
    public void setRequisitos(List<RequisitoForm> requisitos) { this.requisitos = requisitos; }
}
