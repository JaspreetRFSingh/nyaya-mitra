package com.nyayamitra.service;

import com.nyayamitra.dto.LawyerRegisterRequest;
import com.nyayamitra.dto.RegisterRequest;
import com.nyayamitra.model.User;
import com.nyayamitra.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Date;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public User registerClient(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());
        user.setRole(User.UserRole.CLIENT);
        user.setCity(request.getCity());
        user.setState(request.getState());
        user.setPincode(request.getPincode());
        user.setAddress(request.getAddress());
        user.setEnabled(true);
        user.setVerified(false);
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());
        
        return userRepository.save(user);
    }
    
    public User registerLawyer(LawyerRegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());
        user.setRole(User.UserRole.LAWYER);
        user.setBarCouncilNumber(request.getBarCouncilNumber());
        user.setBarCouncilName(request.getBarCouncilName());
        user.setYearsOfExperience(request.getYearsOfExperience());
        user.setSpecializations(request.getSpecializations());
        user.setEducation(request.getEducation());
        user.setChamberAddress(request.getChamberAddress());
        user.setConsultationFee(request.getConsultationFee());
        user.setCity(request.getCity());
        user.setState(request.getState());
        user.setPincode(request.getPincode());
        user.setAddress(request.getAddress());
        user.setEnabled(false); // Lawyers need admin approval
        user.setVerified(false);
        user.setIsAvailableForConsultation(true);
        user.setRating(0.0);
        user.setTotalConsultations(0);
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());
        
        return userRepository.save(user);
    }
    
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    public User findById(String id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
