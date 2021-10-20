package com.nyayamitra.repository;

import com.nyayamitra.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends MongoRepository<Review, String> {
    
    List<Review> findByLawyerId(String lawyerId);
    
    List<Review> findByClientId(String clientId);
    
    List<Review> findByConsultationId(String consultationId);
    
    long countByLawyerId(String lawyerId);
    
    double countByLawyerIdAndRatingGreaterThanEqual(String lawyerId, int rating);
}
