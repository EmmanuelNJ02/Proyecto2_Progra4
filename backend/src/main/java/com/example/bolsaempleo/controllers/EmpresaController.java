package com.example.bolsaempleo.controllers;

import com.example.bolsaempleo.dtos.form.PuestoForm;
import com.example.bolsaempleo.dtos.form.RequisitoForm;
import com.example.bolsaempleo.dtos.view.MensajeView;
import com.example.bolsaempleo.services.AppService;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/empresa")
public class EmpresaController {
    private final AppService appService;

    public EmpresaController(AppService appService) {
        this.appService = appService;
    }

    @GetMapping("/{empresaId}/puestos")
    public List<Map<String, Object>> puestos(@PathVariable Integer empresaId) {
        return appService.puestosEmpresa(empresaId);
    }

    @PostMapping("/{empresaId}/puestos")
    public MensajeView publicar(@PathVariable Integer empresaId, @RequestBody PuestoForm form) {
        return appService.publicarPuesto(empresaId, form);
    }

    @PostMapping("/puestos/{puestoId}")
    public MensajeView actualizarPuesto(@PathVariable Integer puestoId, @RequestBody PuestoForm form) {
        return appService.actualizarPuesto(puestoId, form);
    }

    @PostMapping("/puestos/{puestoId}/requisitos")
    public MensajeView actualizarRequisitos(@PathVariable Integer puestoId, @RequestBody List<RequisitoForm> requisitos) {
        return appService.actualizarRequisitosPuesto(puestoId, requisitos);
    }

    @PostMapping("/puestos/{puestoId}/desactivar")
    public MensajeView desactivar(@PathVariable Integer puestoId) {
        return appService.desactivarPuesto(puestoId);
    }

    @PostMapping("/puestos/{puestoId}/activar")
    public MensajeView activar(@PathVariable Integer puestoId) {
        return appService.activarPuesto(puestoId);
    }

    @GetMapping("/puestos/{puestoId}/candidatos")
    public List<Map<String, Object>> candidatos(@PathVariable Integer puestoId, @RequestParam(required = false) Integer minimo) {
        return appService.buscarCandidatos(puestoId, minimo);
    }
}
