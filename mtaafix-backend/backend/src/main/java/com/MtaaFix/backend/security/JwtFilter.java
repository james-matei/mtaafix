
package com.mtaafix.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.List;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {
                System.out.println("Request: " + request.getMethod() + " " + request.getRequestURI());
System.out.println("Authorization Header: " + request.getHeader("Authorization"));

        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {

            String token = header.substring(7);

            if (jwtUtil.isTokenValid(token)) {

                String email = jwtUtil.extractEmail(token);

                String role = jwtUtil.extractRole(token);

List<SimpleGrantedAuthority> authorities =
        List.of(new SimpleGrantedAuthority("ROLE_" + role));

UsernamePasswordAuthenticationToken authentication =
        new UsernamePasswordAuthenticationToken(
                email,
                null,
                authorities
        );

SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }
}