package com.mtaafix.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/admin")
public class AdminTestController {

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String admin() {

        return "Welcome Admin";

    }

}