package com.example.bolsaempleo.exceptions;

import com.example.bolsaempleo.dtos.view.MensajeView;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ApiException.class)
    public ResponseEntity<MensajeView> handleApi(ApiException exception) {
        return ResponseEntity.badRequest().body(new MensajeView(false, exception.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<MensajeView> handleValidation(MethodArgumentNotValidException exception) {
        return ResponseEntity.badRequest().body(new MensajeView(false, "Hay datos inválidos en el formulario."));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<MensajeView> handleGeneral(Exception exception) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MensajeView(false, exception.getMessage()));
    }
}
