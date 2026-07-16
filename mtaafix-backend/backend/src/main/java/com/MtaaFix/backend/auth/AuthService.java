package com.mtaafix.backend.auth;

import com.mtaafix.backend.security.JwtUtil;
import com.mtaafix.backend.user.User;
import com.mtaafix.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.mtaafix.backend.exception.EmailAlreadyExistsException;
import com.mtaafix.backend.exception.InvalidCredentialsException;
import com.mtaafix.backend.user.Role;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public String register(RegisterRequest request) {

   if (userRepository.existsByEmail(request.getEmail())) {
    throw new EmailAlreadyExistsException("Email already exists");
}
    User user = new User();

    user.setName(request.getName());
    user.setEmail(request.getEmail());
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setRole(Role.USER);
    userRepository.save(user);

    return "User registered successfully";
}

public String login(LoginRequest request) {

    User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() ->
                    new InvalidCredentialsException("Invalid email or password"));

    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        throw new InvalidCredentialsException("Invalid email or password");
    }

    return jwtUtil.generateToken(user.getEmail(), user.getRole().name());
}

}