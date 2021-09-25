package com.nyayamitra.repository;

import com.nyayamitra.model.Consultation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ConsultationRepository extends MongoRepository<Consultation, String> {
    
    List<Consultation> findByClientId(String clientId);
    
    List<Consultation> findByLawyerId(String lawyerId);
    
    List<Consultation> findByClientIdAndStatus(String clientId, Consultation.ConsultationStatus status);
    
    List<Consultation> findByLawyerIdAndStatus(String lawyerId, Consultation.ConsultationStatus status);
    
    List<Consultation> findByStatus(Consultation.ConsultationStatus status);
    
    List<Consultation> findByScheduledDateBetween(java.util.Date start, java.util.Date end);
    
    long countByClientId(String clientId);
    
    long countByLawyerId(String lawyerId);
    
    Optional<Consultation> findByIdAndClientId(String id, String clientId);
    
    Optional<Consultation> findByIdAndLawyerId(String id, String lawyerId);
}
