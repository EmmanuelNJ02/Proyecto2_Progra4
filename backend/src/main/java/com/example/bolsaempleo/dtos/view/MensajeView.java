package com.example.bolsaempleo.dtos.view;

public class MensajeView {
    private boolean ok;
    private String mensaje;

    public MensajeView() {
    }

    public MensajeView(boolean ok, String mensaje) {
        this.ok = ok;
        this.mensaje = mensaje;
    }

    public boolean isOk() { return ok; }
    public void setOk(boolean ok) { this.ok = ok; }
    public String getMensaje() { return mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }
}
