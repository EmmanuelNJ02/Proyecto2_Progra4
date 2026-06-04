package com.example.bolsaempleo.config;

import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:8080")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path userDir = Path.of(System.getProperty("user.dir")).toAbsolutePath().normalize();

        Path backendDir = userDir.getFileName() != null && userDir.getFileName().toString().equalsIgnoreCase("backend")
                ? userDir
                : userDir.resolve("backend").normalize();

        if (!Files.exists(backendDir.resolve("src"))) {
            backendDir = userDir;
        }

        String uploadsBackend = backendDir.resolve("uploads").toAbsolutePath().normalize().toUri().toString();
        String uploadsActual = userDir.resolve("uploads").toAbsolutePath().normalize().toUri().toString();
        String uploadsStatic = backendDir.resolve("src/main/resources/static/uploads").toAbsolutePath().normalize().toUri().toString();

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(
                        uploadsBackend,
                        uploadsActual,
                        uploadsStatic,
                        "file:uploads/",
                        "file:./uploads/",
                        "file:backend/uploads/"
                );
    }
}

