package com.mtaafix.backend.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    public List<UserResponse> getUsers() {

        return adminService.getAllUsers();

    }
    @PatchMapping("/users/{id}/role")
public UserResponse updateUserRole(

        @PathVariable Long id,

        @RequestBody UpdateRoleRequest request){

    return adminService.updateUserRole(id, request);

}

}