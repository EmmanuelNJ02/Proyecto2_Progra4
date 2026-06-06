package com.example.bolsaempleo.controllers;

import com.example.bolsaempleo.dtos.form.HabilidadesForm;
import com.example.bolsaempleo.dtos.view.MensajeView;
import com.example.bolsaempleo.services.AppService;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/oferente")
public class OferenteController {
    private final AppService appService;

    public OferenteController(AppService appService) {
        this.appService = appService;
    }

    @GetMapping("/{oferenteId}/perfil")
    public Map<String, Object> perfil(@PathVariable Integer oferenteId) {
        return appService.perfilOferente(oferenteId);
    }

    @PostMapping("/{oferenteId}/habilidades")
    public MensajeView habilidades(@PathVariable Integer oferenteId, @RequestBody HabilidadesForm form) {
        return appService.actualizarHabilidades(oferenteId, form);
    }

    @PostMapping({"/{oferenteId}/curriculum", "/{oferenteId}/cv"})
    public MensajeView curriculum(@PathVariable Integer oferenteId,
                                  @RequestParam(value = "archivo", required = false) MultipartFile archivo,
                                  @RequestParam(value = "file", required = false) MultipartFile file) {
        MultipartFile seleccionado = archivo != null ? archivo : file;
        return appService.subirCurriculum(oferenteId, seleccionado);
    }
}
