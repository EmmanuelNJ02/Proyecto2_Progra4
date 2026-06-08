package com.example.bolsaempleo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {

    @GetMapping({
            "/buscar",
            "/login",
            "/empresa",
            "/oferente",
            "/admin",
            "/empresa/dashboard",
            "/oferente/dashboard"
    })
    public String forwardToIndex() {
        return "forward:/index.html";
    }
}

