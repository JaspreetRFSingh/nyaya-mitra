package com.nyayamitra.repository;

import com.nyayamitra.model.Document;
import com.nyayamitra.model.DocumentTemplate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DocumentTemplateRepository extends MongoRepository<DocumentTemplate, String> {

    List<DocumentTemplate> findByType(Document.DocumentType type);

    List<DocumentTemplate> findByCategory(Document.DocumentCategory category);

    List<DocumentTemplate> findByTypeAndCategory(Document.DocumentType type, Document.DocumentCategory category);

    List<DocumentTemplate> findByState(String state);

    List<DocumentTemplate> findByIsActiveTrue();

    List<DocumentTemplate> findByIsActiveTrueAndType(Document.DocumentType type);

    List<DocumentTemplate> findByNameContainingIgnoreCase(String name);
}
