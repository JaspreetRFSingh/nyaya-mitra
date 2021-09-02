package com.nyayamitra.controller;

import com.nyayamitra.dto.*;
import com.nyayamitra.model.User;
import com.nyayamitra.security.JwtTokenProvider;
import com.nyayamitra.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtTokenProvider tokenProvider;
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
            )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String jwt = tokenProvider.generateToken(userDetails);
        
        User user = userService.findByEmail(loginRequest.getEmail());
        
        AuthResponse response = new AuthResponse(
            jwt,
            "Bearer",
            user.getEmail(),
            user.getFirstName(),
            user.getLastName(),
            user.getRole().name(),
            Collections.singletonList("ROLE_" + user.getRole().name())
        );
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        User user = userService.registerClient(registerRequest);
        
        String jwt = tokenProvider.generateToken(
            new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                user.isEnabled(),
                true, true, true,
                Collections.singletonList(
                    new org.springframework.security.core.authority.SimpleGrantedAuthority(
                        "ROLE_" + user.getRole().name()
                    )
                )
            )
        );
        
        AuthResponse response = new AuthResponse(
            jwt,
            "Bearer",
            user.getEmail(),
            user.getFirstName(),
            user.getLastName(),
            user.getRole().name(),
            Collections.singletonList("ROLE_" + user.getRole().name())
        );
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/register/lawyer")
    public ResponseEntity<?> registerLawyer(@Valid @RequestBody LawyerRegisterRequest request) {
        User user = userService.registerLawyer(request);
        
        String jwt = tokenProvider.generateToken(
            new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                user.isEnabled(),
                true, true, true,
                Collections.singletonList(
                    new org.springframework.security.core.authority.SimpleGrantedAuthority(
                        "ROLE_" + user.getRole().name()
                    )
                )
            )
        );
        
        AuthResponse response = new AuthResponse(
            jwt,
            "Bearer",
            user.getEmail(),
            user.getFirstName(),
            user.getLastName(),
            user.getRole().name(),
            Collections.singletonList("ROLE_" + user.getRole().name())
        );
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userService.findByEmail(email);
        
        return ResponseEntity.ok(user);
    }
}
