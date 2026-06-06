package com.example.bolsaempleo.dtos.view;

public class LoginView {
    private String token;
    private String rol;
    private Integer usuarioId;
    private String estado;
    private String nombre;

    public LoginView() {
    }

    public LoginView(String token, String rol, Integer usuarioId, String estado, String nombre) {
        this.token = token;
        this.rol = rol;
        this.usuarioId = usuarioId;
        this.estado = estado;
        this.nombre = nombre;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
    public Integer getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Integer usuarioId) { this.usuarioId = usuarioId; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
}
