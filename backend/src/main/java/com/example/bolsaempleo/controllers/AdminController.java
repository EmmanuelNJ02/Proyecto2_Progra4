package com.example.bolsaempleo.controllers;

import com.example.bolsaempleo.dtos.form.CaracteristicaForm;
import com.example.bolsaempleo.dtos.view.MensajeView;
import com.example.bolsaempleo.services.AppService;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final AppService appService;

    public AdminController(AppService appService) {
        this.appService = appService;
    }

    @GetMapping("/pendientes/{rol}")
    public List<Map<String, Object>> pendientes(@PathVariable String rol) {
        return appService.pendientes(rol);
    }

    @PostMapping("/usuarios/{id}/aprobar")
    public MensajeView aprobar(@PathVariable Integer id) {
        return appService.aprobarUsuario(id);
    }

    @PostMapping("/usuarios/{id}/rechazar")
    public MensajeView rechazar(@PathVariable Integer id) {
        return appService.rechazarUsuario(id);
    }

    @PostMapping("/caracteristicas")
    public MensajeView crearCaracteristica(@RequestBody CaracteristicaForm form) {
        return appService.crearCaracteristica(form);
    }

    @PostMapping("/caracteristicas/{id}")
    public MensajeView actualizarCaracteristica(@PathVariable Integer id, @RequestBody CaracteristicaForm form) {
        return appService.actualizarCaracteristica(id, form);
    }

    @DeleteMapping("/caracteristicas/{id}")
    public MensajeView eliminarCaracteristica(@PathVariable Integer id) {
        return appService.eliminarCaracteristica(id);
    }
}
