package com.mtaafix.backend.auth;

import com.mtaafix.backend.security.JwtUtil;
import com.mtaafix.backend.user.User;
import com.mtaafix.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.mtaafix.backend.exception.EmailAlreadyExistsException;

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

    userRepository.save(user);

    return "User registered successfully";
}

public String login(LoginRequest request) {

    User user = userRepository.findByEmail(request.getEmail())
            .orElse(null);

    if (user == null) {
        return "User not found";
    }

    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        return "Invalid password";
    }

    return jwtUtil.generateToken(user.getEmail());
}

}