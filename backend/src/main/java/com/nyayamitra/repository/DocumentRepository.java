package com.nyayamitra.repository;

import com.nyayamitra.model.Document;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DocumentRepository extends MongoRepository<Document, String> {
    
    List<Document> findByUserId(String userId);
    
    List<Document> findByUserIdAndType(String userId, Document.DocumentType type);
    
    List<Document> findByUserIdAndCategory(String userId, Document.DocumentCategory category);
    
    List<Document> findByUserIdAndStatus(String userId, Document.DocumentStatus status);
    
    List<Document> findByTypeAndCategory(Document.DocumentType type, Document.DocumentCategory category);
    
    List<Document> findByState(String state);
    
    long countByUserId(String userId);
}
