package com.nyayamitra.repository;

import com.nyayamitra.model.Case;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CaseRepository extends MongoRepository<Case, String> {
    
    List<Case> findByUserId(String userId);
    
    List<Case> findByUserIdAndType(String userId, Case.CaseType type);
    
    List<Case> findByUserIdAndStatus(String userId, Case.CaseStatus status);
    
    List<Case> findByLawyerId(String lawyerId);
    
    List<Case> findByCourtName(String courtName);
    
    List<Case> findByState(String state);
    
    List<Case> findByTypeAndStatus(Case.CaseType type, Case.CaseStatus status);
    
    List<Case> findByNextHearingDateBetween(java.util.Date start, java.util.Date end);
    
    long countByUserId(String userId);
    
    long countByLawyerId(String lawyerId);
}
