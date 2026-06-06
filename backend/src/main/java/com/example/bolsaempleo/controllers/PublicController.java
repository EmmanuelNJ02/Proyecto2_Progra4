package com.example.bolsaempleo.controllers;

import com.example.bolsaempleo.services.AppService;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public")
public class PublicController {
    private final AppService appService;

    public PublicController(AppService appService) {
        this.appService = appService;
    }

    @GetMapping("/caracteristicas")
    public List<Map<String, Object>> caracteristicas() {
        return appService.listarCaracteristicas();
    }

    @GetMapping("/puestos/recientes")
    public List<Map<String, Object>> recientes() {
        return appService.puestosPublicosRecientes();
    }

    @GetMapping("/puestos/buscar")
    public List<Map<String, Object>> buscar(@RequestParam(required = false) List<Integer> caracteristicas) {
        return appService.buscarPuestosPublicos(caracteristicas);
    }
}
