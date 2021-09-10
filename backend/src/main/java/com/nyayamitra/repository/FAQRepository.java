package com.nyayamitra.repository;

import com.nyayamitra.model.FAQ;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FAQRepository extends MongoRepository<FAQ, String> {
    
    List<FAQ> findByCategory(FAQ.LegalCategory category);
    
    List<FAQ> findByTagsContaining(String tag);
    
    List<FAQ> findByIsVerifiedTrue();
    
    List<FAQ> findByCategoryAndIsVerified(FAQ.LegalCategory category, boolean isVerified);
    
    List<FAQ> findByQuestionContainingIgnoreCase(String question);
    
    List<FAQ> findByAnswerContainingIgnoreCase(String answer);
    
    List<FAQ> findTop10ByViewCountOrderByViewCountDesc();
    
    List<FAQ> findTop10ByHelpfulCountOrderByHelpfulCountDesc();
}
