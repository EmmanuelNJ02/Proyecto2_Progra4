package com.example.bolsaempleo.controllers;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CvController {

    @Value("${app.upload.dir}")
    private String uploadDir;

    @GetMapping("/uploads/cv/{fileName:.+}")
    public ResponseEntity<Resource> verCurriculum(@PathVariable String fileName) {
        try {
            if (!fileName.toLowerCase().endsWith(".pdf") || fileName.contains("..") || fileName.contains("/") || fileName.contains("\\")) {
                return ResponseEntity.badRequest().build();
            }

            Path archivo = localizarArchivo(fileName);
            if (archivo == null) {
                return ResponseEntity.notFound().build();
            }

            Resource recurso = new UrlResource(archivo.toUri());
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                    .body(recurso);
        } catch (Exception exception) {
            return ResponseEntity.notFound().build();
        }
    }

    private Path localizarArchivo(String fileName) {
        Path userDir = Path.of(System.getProperty("user.dir")).toAbsolutePath().normalize();
        Path backendDir = userDir.getFileName() != null && userDir.getFileName().toString().equalsIgnoreCase("backend")
                ? userDir
                : userDir.resolve("backend").normalize();
        if (!Files.exists(backendDir.resolve("src"))) {
            backendDir = userDir;
        }

        List<Path> carpetas = new ArrayList<>();
        carpetas.add(backendDir.resolve(uploadDir).toAbsolutePath().normalize());
        carpetas.add(Path.of(uploadDir).toAbsolutePath().normalize());
        carpetas.add(backendDir.resolve("src/main/resources/static/uploads/cv").toAbsolutePath().normalize());

        for (Path carpeta : carpetas) {
            Path archivo = carpeta.resolve(fileName).normalize();
            if (archivo.startsWith(carpeta) && Files.exists(archivo) && Files.isRegularFile(archivo)) {
                return archivo;
            }
        }
        return null;
    }
}
