package com.nyayamitra.controller;

import com.nyayamitra.model.Review;
import com.nyayamitra.model.User;
import com.nyayamitra.service.LawyerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/lawyers")
@CrossOrigin(origins = "http://localhost:3000")
public class LawyerController {
    
    @Autowired
    private LawyerService lawyerService;
    
    @GetMapping
    public ResponseEntity<List<User>> getAllLawyers() {
        return ResponseEntity.ok(lawyerService.getAllLawyers());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getLawyerById(@PathVariable String id) {
        return ResponseEntity.ok(lawyerService.getLawyerById(id));
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchLawyers(
            @RequestParam(required = false) String specialization,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String state) {
        return ResponseEntity.ok(lawyerService.searchLawyers(specialization, city, state));
    }
    
    @GetMapping("/{id}/reviews")
    public ResponseEntity<List<Review>> getLawyerReviews(@PathVariable String id) {
        return ResponseEntity.ok(lawyerService.getLawyerReviews(id));
    }
    
    @PostMapping("/{id}/review")
    public ResponseEntity<?> addReview(@PathVariable String id,
                                        @RequestBody Map<String, Object> request) {
        return ResponseEntity.ok(lawyerService.addReview(id, request));
    }
    
    @GetMapping("/specializations")
    public ResponseEntity<List<String>> getSpecializations() {
        return ResponseEntity.ok(lawyerService.getSpecializations());
    }
}
