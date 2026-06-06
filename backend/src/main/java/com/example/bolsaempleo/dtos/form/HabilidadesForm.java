package com.example.bolsaempleo.dtos.form;

import java.util.ArrayList;
import java.util.List;

public class HabilidadesForm {
    private List<RequisitoForm> habilidades = new ArrayList<>();

    public List<RequisitoForm> getHabilidades() { return habilidades; }
    public void setHabilidades(List<RequisitoForm> habilidades) { this.habilidades = habilidades; }
}
