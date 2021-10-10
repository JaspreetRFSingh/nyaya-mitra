package com.nyayamitra.repository;

import com.nyayamitra.model.LegalAidApplication;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LegalAidApplicationRepository extends MongoRepository<LegalAidApplication, String> {
    
    List<LegalAidApplication> findByApplicantId(String applicantId);
    
    List<LegalAidApplication> findByStatus(LegalAidApplication.LegalAidStatus status);
    
    List<LegalAidApplication> findByAssignedLawyerId(String lawyerId);
    
    List<LegalAidApplication> findByDlsaName(String dlsaName);
}
