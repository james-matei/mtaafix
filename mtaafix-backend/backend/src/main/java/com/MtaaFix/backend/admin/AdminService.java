package com.mtaafix.backend.admin;

import com.mtaafix.backend.exception.ResourceNotFoundException;
import com.mtaafix.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.mtaafix.backend.exception.ResourceNotFoundException;
import com.mtaafix.backend.user.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.mtaafix.backend.exception.UnauthorizedActionException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;

    public List<UserResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole()
                ))
                .toList();

    }
     
    public UserResponse updateUserRole(Long id, UpdateRoleRequest request) {

    User user = userRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException("User not found"));
                    Authentication authentication =
        SecurityContextHolder.getContext().getAuthentication();

String currentEmail = authentication.getName();

if (user.getEmail().equals(currentEmail)) {

    throw new UnauthorizedActionException(
            "You cannot change your own role."
    );

}

    user.setRole(request.getRole());

    User updated = userRepository.save(user);

    return new UserResponse(
            updated.getId(),
            updated.getName(),
            updated.getEmail(),
            updated.getRole()
    );

}


}