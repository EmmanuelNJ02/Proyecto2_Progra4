package com.example.bolsaempleo.controllers;

import com.example.bolsaempleo.dtos.form.LoginForm;
import com.example.bolsaempleo.dtos.form.RegistroEmpresaForm;
import com.example.bolsaempleo.dtos.form.RegistroOferenteForm;
import com.example.bolsaempleo.dtos.view.LoginView;
import com.example.bolsaempleo.dtos.view.MensajeView;
import com.example.bolsaempleo.services.AppService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AppService appService;

    public AuthController(AppService appService) {
        this.appService = appService;
    }

    @PostMapping("/login")
    public LoginView login(@RequestBody LoginForm form) {
        return appService.login(form);
    }

    @PostMapping("/registro/empresa")
    public MensajeView registrarEmpresa(@RequestBody RegistroEmpresaForm form) {
        return appService.registrarEmpresa(form);
    }

    @PostMapping("/registro/oferente")
    public MensajeView registrarOferente(@RequestBody RegistroOferenteForm form) {
        return appService.registrarOferente(form);
    }
}
