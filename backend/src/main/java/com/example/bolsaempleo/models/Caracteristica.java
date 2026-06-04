package com.example.bolsaempleo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "caracteristica")
public class Caracteristica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nombre_caracteristica", nullable = false, length = 100)
    private String nombreCaracteristica;

    @Column(name = "caracteristica_padre_id")
    private Integer caracteristicaPadreId;

    public Caracteristica() {
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNombreCaracteristica() { return nombreCaracteristica; }
    public void setNombreCaracteristica(String nombreCaracteristica) { this.nombreCaracteristica = nombreCaracteristica; }
    public Integer getCaracteristicaPadreId() { return caracteristicaPadreId; }
    public void setCaracteristicaPadreId(Integer caracteristicaPadreId) { this.caracteristicaPadreId = caracteristicaPadreId; }
}

