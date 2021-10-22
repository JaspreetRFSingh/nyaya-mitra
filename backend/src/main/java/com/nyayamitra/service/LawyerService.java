package com.nyayamitra.service;

import com.nyayamitra.model.Review;
import com.nyayamitra.model.User;
import com.nyayamitra.repository.ReviewRepository;
import com.nyayamitra.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class LawyerService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ReviewRepository reviewRepository;
    
    public List<User> getAllLawyers() {
        return userRepository.findByRoleAndIsEnabled(User.UserRole.LAWYER, true);
    }
    
    public User getLawyerById(String id) {
        User lawyer = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Lawyer not found"));
        
        if (lawyer.getRole() != User.UserRole.LAWYER) {
            throw new RuntimeException("Not a lawyer");
        }
        
        return lawyer;
    }
    
    public List<User> searchLawyers(String specialization, String city, String state) {
        List<User> lawyers = userRepository.findByRoleAndIsEnabled(User.UserRole.LAWYER, true);
        
        if (specialization != null && !specialization.isEmpty()) {
            lawyers = lawyers.stream()
                .filter(l -> l.getSpecializations() != null &&
                    l.getSpecializations().stream()
                        .anyMatch(s -> s.toLowerCase().contains(specialization.toLowerCase())))
                .collect(Collectors.toList());
        }
        
        if (city != null && !city.isEmpty()) {
            lawyers = lawyers.stream()
                .filter(l -> city.equalsIgnoreCase(l.getCity()))
                .collect(Collectors.toList());
        }
        
        if (state != null && !state.isEmpty()) {
            lawyers = lawyers.stream()
                .filter(l -> state.equalsIgnoreCase(l.getState()))
                .collect(Collectors.toList());
        }
        
        return lawyers;
    }
    
    public List<Review> getLawyerReviews(String lawyerId) {
        return reviewRepository.findByLawyerId(lawyerId);
    }
    
    public Review addReview(String lawyerId, Map<String, Object> request) {
        User lawyer = getLawyerById(lawyerId);
        
        Review review = new Review();
        review.setLawyerId(lawyerId);
        review.setLawyerName(lawyer.getFirstName() + " " + lawyer.getLastName());
        review.setClientId((String) request.get("clientId"));
        review.setClientName((String) request.get("clientName"));
        review.setConsultationId((String) request.get("consultationId"));
        review.setRating((Integer) request.get("rating"));
        review.setTitle((String) request.get("title"));
        review.setComment((String) request.get("comment"));
        review.setIsVerified(true);
        review.setHelpfulCount(0);
        review.setCreatedAt(new Date());
        review.setUpdatedAt(new Date());
        
        Review savedReview = reviewRepository.save(review);
        
        // Update lawyer's average rating
        updateLawyerRating(lawyerId);
        
        return savedReview;
    }
    
    private void updateLawyerRating(String lawyerId) {
        List<Review> reviews = reviewRepository.findByLawyerId(lawyerId);
        
        if (!reviews.isEmpty()) {
            double avgRating = reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);
            
            User lawyer = userRepository.findById(lawyerId).orElse(null);
            if (lawyer != null) {
                lawyer.setRating(avgRating);
                lawyer.setTotalConsultations(reviews.size());
                userRepository.save(lawyer);
            }
        }
    }
    
    public List<String> getSpecializations() {
        List<User> lawyers = getAllLawyers();
        return lawyers.stream()
            .filter(l -> l.getSpecializations() != null)
            .flatMap(l -> l.getSpecializations().stream())
            .distinct()
            .collect(Collectors.toList());
    }
}
