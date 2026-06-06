package com.example.bolsaempleo.dtos.form;

public class CaracteristicaForm {
    private String nombreCaracteristica;
    private Integer caracteristicaPadreId;

    public String getNombreCaracteristica() { return nombreCaracteristica; }
    public void setNombreCaracteristica(String nombreCaracteristica) { this.nombreCaracteristica = nombreCaracteristica; }
    public Integer getCaracteristicaPadreId() { return caracteristicaPadreId; }
    public void setCaracteristicaPadreId(Integer caracteristicaPadreId) { this.caracteristicaPadreId = caracteristicaPadreId; }
}
